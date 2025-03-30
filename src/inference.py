import torch
from transformers import Qwen2VLForConditionalGeneration, AutoProcessor
import logging
from pathlib import Path
import PyPDF2
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file."""
    try:
        with open(pdf_path, 'rb') as file:
            # Create PDF reader object
            pdf_reader = PyPDF2.PdfReader(file)
            
            # Get the number of pages
            num_pages = len(pdf_reader.pages)
            logger.info(f"Processing PDF with {num_pages} pages")
            
            # Extract text from all pages
            text = ""
            for page_num in range(num_pages):
                # Get the page object
                page = pdf_reader.pages[page_num]
                # Extract text from the page
                text += page.extract_text()
                logger.info(f"Processed page {page_num + 1}/{num_pages}")
            
            return text.strip()
    except Exception as e:
        logger.error(f"Error extracting text from PDF: {str(e)}")
        raise

def generate_requirements(text):
    # Model configuration
    model_name = "Qwen/Qwen2-VL-2B-Instruct"
    project_root = Path(__file__).parent.parent
    model_path = project_root / "final_model"
    
    if not model_path.exists():
        logger.error("Trained model not found. Please run train.py first.")
        return
    
    logger.info("Loading trained model and processor")
    
    try:
        # Load processor from original model
        processor = AutoProcessor.from_pretrained(
            model_name,
            trust_remote_code=True
        )
        
        # Load fine-tuned model
        model = Qwen2VLForConditionalGeneration.from_pretrained(
            model_path,
            torch_dtype=torch.float16,
            device_map="auto",
            trust_remote_code=True
        )
        
        # Create the prompt
        prompt = f"""Analyze the following text and extract key functional and non-functional requirements. Organize the extracted information into a structured requirements document.

{text}

# Guidelines:
# - Identify and categorize requirements into functional and non-functional types.
# - Present the extracted information in a well-structured format without modifying the original intent.
# - Ensure clarity and conciseness in descriptions.
# - Do not print this prompt template in the output.

# Format the output as follows:

# # Requirements Document

# ## Functional Requirements
# - Clearly state the core functionalities of the system.

# ## Non-Functional Requirements
# - Define quality attributes such as performance, security, scalability, and reliability.

# ## User Stories
# - Represent features from an end-user perspective using the format:
#   "As a [user role], I want [feature] so that [benefit]."

# ## Acceptance Criteria
# - Specify measurable conditions that must be met for each requirement to be considered complete.

# ## Document Summary
# - Provide a concise overview summarizing the document's key insights.

# Ensure the extracted content follows this structure while maintaining clarity and completeness."""
        
        # Process the input
        inputs = processor(
            text=prompt,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=1024
        ).to(model.device)
        
        # Get the prompt length
        prompt_length = inputs['input_ids'].shape[1]
        
        # Generate output
        logger.info("Generating requirements...")
        outputs = model.generate(
            **inputs,
            max_new_tokens=1024,
            temperature=0.8,
            top_p=0.95,
            do_sample=True,
            pad_token_id=processor.tokenizer.pad_token_id,
            eos_token_id=processor.tokenizer.eos_token_id,
            repetition_penalty=1.5,
            num_beams=5,
            early_stopping=True,
            no_repeat_ngram_size=3
        )
        
        # Decode only the generated part (excluding the prompt)
        generated_text = processor.decode(outputs[0][prompt_length:], skip_special_tokens=True)
        
        # Clean up the output
        try:
            # Remove any remaining prompt text if present
            end_idx = generated_text.find("Extract and structure software requirements")
            if end_idx != -1:
                generated_text = generated_text[:end_idx].strip()
        except Exception as e:
            logger.error(f"Error processing generated text: {str(e)}")
        
        # Save the output to a file
        output_dir = Path("output")
        output_dir.mkdir(exist_ok=True)
        
        output_file = output_dir / "generated_requirements.md"
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(generated_text)
        logger.info(f"Requirements saved to {output_file}")
        
        return generated_text
    except Exception as e:
        logger.error(f"Error generating requirements: {str(e)}")
        return f"Error generating requirements: {str(e)}"

if __name__ == "__main__":
    # Check if a PDF file path is provided as command line argument
    import sys
    if len(sys.argv) > 1:
        pdf_path = sys.argv[1]
        if not os.path.exists(pdf_path):
            logger.error(f"PDF file not found: {pdf_path}")
            sys.exit(1)
        
        logger.info(f"Processing PDF file: {pdf_path}")
        text = extract_text_from_pdf(pdf_path)
        generate_requirements(text)
    else:
        # Use default test text if no PDF file is provided
        test_text = """The system should allow users to log in using their email and password.
        It must support password reset functionality and two-factor authentication.
        The login page should load within 2 seconds.
        All user data must be encrypted at rest and in transit.
        Users should be able to upload PDF documents up to 50MB in size."""
        
        generate_requirements(test_text) 