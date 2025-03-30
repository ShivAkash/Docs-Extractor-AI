import os
import json
from typing import List, Dict, Any
from datasets import Dataset
from transformers import PreTrainedTokenizer
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

class RequirementsProcessor:
    """
    Processor for handling requirements documents and preparing them for training.
    """
    
    def __init__(
        self,
        tokenizer: PreTrainedTokenizer,
        max_length: int = 2048,
        max_prompt_length: int = 512
    ):
        self.tokenizer = tokenizer
        self.max_length = max_length
        self.max_prompt_length = max_prompt_length
        
    def process_document(self, document: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process a single requirements document into training format.
        """
        # Extract text and metadata
        text = document.get("text", "")
        metadata = document.get("metadata", {})
        
        # Create prompt
        prompt = self._create_prompt(text, metadata)
        
        # Create target (expected output)
        target = self._create_target(text, metadata)
        
        # Tokenize
        tokenized = self.tokenizer(
            prompt,
            max_length=self.max_prompt_length,
            padding="max_length",
            truncation=True,
            return_tensors="pt"
        )
        
        # Tokenize target
        target_tokenized = self.tokenizer(
            target,
            max_length=self.max_length - self.max_prompt_length,
            padding="max_length",
            truncation=True,
            return_tensors="pt"
        )
        
        return {
            "input_ids": tokenized["input_ids"].squeeze(),
            "attention_mask": tokenized["attention_mask"].squeeze(),
            "labels": target_tokenized["input_ids"].squeeze(),
            "prompt": prompt,
            "target": target,
            "metadata": metadata
        }
    
    def _create_prompt(self, text: str, metadata: Dict[str, Any]) -> str:
        """
        Create a prompt for the model based on the document content and metadata.
        """
        prompt = f"""Extract software requirements from the following document.
Document Type: {metadata.get('type', 'Unknown')}
Document Title: {metadata.get('title', 'Untitled')}

Document Content:
{text}

Please extract and format the requirements in the following structure:
1. Functional Requirements
2. Non-Functional Requirements
3. User Stories
4. Acceptance Criteria

Format the output in markdown."""
        
        return prompt
    
    def _create_target(self, text: str, metadata: Dict[str, Any]) -> str:
        """
        Create the target output format for training.
        """
        # This would typically be the ground truth or expected output
        # For now, we'll use a template that can be replaced with actual data
        target = f"""# Requirements Document

## Functional Requirements
[Extracted functional requirements]

## Non-Functional Requirements
[Extracted non-functional requirements]

## User Stories
[Extracted user stories]

## Acceptance Criteria
[Extracted acceptance criteria]"""
        
        return target
    
    def prepare_dataset(
        self,
        documents: List[Dict[str, Any]],
        split: str = "train"
    ) -> Dataset:
        """
        Prepare a dataset from a list of documents.
        """
        processed_data = []
        
        for doc in documents:
            try:
                processed = self.process_document(doc)
                processed_data.append(processed)
            except Exception as e:
                logger.error(f"Error processing document: {e}")
                continue
        
        return Dataset.from_list(processed_data)
    
    def save_dataset(
        self,
        dataset: Dataset,
        output_dir: str,
        split: str = "train"
    ):
        """
        Save the processed dataset to disk.
        """
        output_path = Path(output_dir) / f"{split}_processed"
        dataset.save_to_disk(output_path)
        logger.info(f"Saved {split} dataset to {output_path}")
    
    def load_dataset(
        self,
        input_dir: str,
        split: str = "train"
    ) -> Dataset:
        """
        Load a processed dataset from disk.
        """
        input_path = Path(input_dir) / f"{split}_processed"
        if not input_path.exists():
            raise FileNotFoundError(f"Dataset not found at {input_path}")
        
        return Dataset.load_from_disk(input_path) 