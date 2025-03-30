import os
import torch
from transformers import Qwen2VLForConditionalGeneration, AutoTokenizer, AutoProcessor
import logging
from pathlib import Path
import shutil

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def download_model():
    # Model configuration
    model_name = "Qwen/Qwen2-VL-2B-Instruct"
    cache_dir = Path("models/cache")
    cache_dir.mkdir(parents=True, exist_ok=True)
    
    logger.info(f"Starting download of {model_name}")
    logger.info(f"Model will be cached in: {cache_dir}")
    
    try:
        # Download model
        logger.info("Downloading model...")
        model = Qwen2VLForConditionalGeneration.from_pretrained(
            model_name,
            torch_dtype=torch.float16,
            device_map="auto",
            cache_dir=cache_dir,
            local_files_only=False  # Force download
        )
        logger.info("Model downloaded successfully")
        
        # Save model explicitly
        logger.info("Saving model files...")
        model.save_pretrained(cache_dir)
        logger.info("Model files saved successfully")
        
        # Download processor
        logger.info("Downloading processor...")
        processor = AutoProcessor.from_pretrained(
            model_name,
            cache_dir=cache_dir,
            local_files_only=False  # Force download
        )
        logger.info("Processor downloaded successfully")
        
        # Save processor explicitly
        logger.info("Saving processor files...")
        processor.save_pretrained(cache_dir)
        logger.info("Processor files saved successfully")
        
        # Save model info
        model_info = {
            "name": model_name,
            "cache_dir": str(cache_dir),
            "model_size": sum(p.numel() for p in model.parameters()),
            "trainable_params": sum(p.numel() for p in model.parameters() if p.requires_grad)
        }
        
        with open(cache_dir / "model_info.json", "w") as f:
            import json
            json.dump(model_info, f, indent=2)
        
        logger.info(f"Model info saved to {cache_dir}/model_info.json")
        logger.info(f"Total model size: {model_info['model_size']:,} parameters")
        logger.info(f"Trainable parameters: {model_info['trainable_params']:,}")
        
        # List all files in cache directory
        logger.info("Files in cache directory:")
        for file in cache_dir.glob("*"):
            logger.info(f"- {file.name}")
        
        # Verify essential files exist
        essential_files = ["config.json", "tokenizer.json", "tokenizer_config.json"]
        for file in essential_files:
            if not (cache_dir / file).exists():
                logger.error(f"Essential file {file} is missing!")
                raise FileNotFoundError(f"Essential file {file} is missing!")
            else:
                logger.info(f"Verified {file} exists")
        
    except Exception as e:
        logger.error(f"Error downloading model: {e}")
        raise

if __name__ == "__main__":
    download_model() 