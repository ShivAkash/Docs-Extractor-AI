import os
import torch
from transformers import (
    Qwen2VLForConditionalGeneration,
    AutoProcessor,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from peft import LoraConfig, get_peft_model
from datasets import load_dataset
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def main():
    # 1. Load model and processor from cache
    cache_dir = Path("models/cache")
    if not cache_dir.exists():
        logger.error("Model cache not found. Please run download_model.py first.")
        return
    
    logger.info("Loading model and processor from cache")
    
    model = Qwen2VLForConditionalGeneration.from_pretrained(
        cache_dir,
        torch_dtype=torch.float16,
        device_map="auto"
    )
    
    processor = AutoProcessor.from_pretrained(cache_dir)
    
    # 2. Setup LoRA for efficient fine-tuning
    lora_config = LoraConfig(
        r=8,
        lora_alpha=16,
        target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
        lora_dropout=0.05,
        bias="none",
        task_type="CAUSAL_LM"
    )
    
    model = get_peft_model(model, lora_config)
    model.print_trainable_parameters()
    
    # 3. Load and prepare dataset
    dataset = load_dataset("text", data_files={"train": "data/raw/*.txt"})
    
    def tokenize_function(examples):
        # Process text with the processor
        processed = processor(
            text=examples["text"],
            padding="max_length",
            truncation=True,
            max_length=512,
            return_tensors="pt"
        )
        return processed
    
    tokenized_dataset = dataset.map(
        tokenize_function,
        batched=True,
        remove_columns=dataset["train"].column_names
    )
    
    # 4. Setup training arguments
    training_args = TrainingArguments(
        output_dir="./results",
        num_train_epochs=2,
        per_device_train_batch_size=4,
        gradient_accumulation_steps=4,
        learning_rate=1e-4,
        fp16=True,
        logging_steps=10,
        save_steps=50,
        save_total_limit=2,
        remove_unused_columns=False,
        optim="adamw_torch",
        report_to="none"  # Disable wandb logging
    )
    
    # 5. Initialize trainer
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized_dataset["train"],
        data_collator=DataCollatorForLanguageModeling(
            tokenizer=processor.tokenizer,
            mlm=False
        )
    )
    
    # 6. Train the model
    logger.info("Starting training...")
    trainer.train()
    
    # 7. Save the model
    trainer.save_model("./final_model")
    logger.info("Training completed and model saved.")

if __name__ == "__main__":
    main() 