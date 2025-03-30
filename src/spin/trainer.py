import torch
import torch.nn as nn
from transformers import Trainer, TrainingArguments
from peft import get_peft_model, LoraConfig
from typing import Optional, Dict, Any
import logging

logger = logging.getLogger(__name__)

class SPINTrainer(Trainer):
    """
    Self-Play Fine-Tuning (SPIN) trainer that implements the SPIN algorithm.
    The trainer generates synthetic data from the model's previous iterations
    and uses it for self-improvement.
    """
    
    def __init__(
        self,
        model: nn.Module,
        args: TrainingArguments,
        beta: float = 0.1,
        train_dataset: Optional[Any] = None,
        eval_dataset: Optional[Any] = None,
        **kwargs
    ):
        super().__init__(model, args, train_dataset, eval_dataset, **kwargs)
        self.beta = beta
        self.current_iteration = 0
        self.best_eval_loss = float('inf')
        
    def compute_loss(self, model, inputs, return_outputs=False):
        """
        Compute the SPIN loss which combines:
        1. Standard language modeling loss
        2. Self-play loss from synthetic data
        """
        # Get real data loss
        outputs = model(**inputs)
        real_loss = outputs.loss
        
        # Generate synthetic data from previous iteration
        if self.current_iteration > 0:
            with torch.no_grad():
                synthetic_outputs = self.model.generate(
                    input_ids=inputs["input_ids"],
                    attention_mask=inputs["attention_mask"],
                    max_length=self.args.max_length,
                    temperature=0.7,
                    do_sample=True,
                    pad_token_id=self.tokenizer.pad_token_id,
                    eos_token_id=self.tokenizer.eos_token_id,
                )
            
            # Compute loss on synthetic data
            synthetic_loss = self.model(
                input_ids=synthetic_outputs,
                attention_mask=torch.ones_like(synthetic_outputs),
                labels=synthetic_outputs
            ).loss
            
            # Combine losses with beta parameter
            total_loss = real_loss + self.beta * synthetic_loss
        else:
            total_loss = real_loss
            
        return (total_loss, outputs) if return_outputs else total_loss
    
    def training_step(self, model, inputs):
        """
        Perform a training step with SPIN loss
        """
        model.train()
        inputs = self._prepare_inputs(inputs)
        
        with self.compute_loss_context_manager():
            loss = self.compute_loss(model, inputs)
            
        if self.args.gradient_accumulation_steps > 1:
            loss = loss / self.args.gradient_accumulation_steps
            
        loss.backward()
        
        return loss.detach()
    
    def evaluate(self, eval_dataset=None, ignore_keys=None):
        """
        Evaluate the model and update best loss
        """
        eval_output = super().evaluate(eval_dataset, ignore_keys)
        
        if eval_output["eval_loss"] < self.best_eval_loss:
            self.best_eval_loss = eval_output["eval_loss"]
            self.save_model()
            
        return eval_output
    
    def train(self, *args, **kwargs):
        """
        Train the model with SPIN
        """
        # Initialize LoRA if not already done
        if not hasattr(self.model, "peft_config"):
            lora_config = LoraConfig(
                r=16,
                lora_alpha=32,
                target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
                lora_dropout=0.05,
                bias="none",
                task_type="CAUSAL_LM",
            )
            self.model = get_peft_model(self.model, lora_config)
            
        # Training loop
        for iteration in range(self.args.num_train_epochs):
            self.current_iteration = iteration
            logger.info(f"Starting SPIN iteration {iteration + 1}")
            
            train_output = super().train(*args, **kwargs)
            
            # Evaluate after each iteration
            eval_output = self.evaluate()
            logger.info(f"SPIN iteration {iteration + 1} completed")
            logger.info(f"Training loss: {train_output.training_loss}")
            logger.info(f"Evaluation loss: {eval_output['eval_loss']}")
            
        return train_output 