import os
import json
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def prepare_data():
    # Create data directory if it doesn't exist
    data_dir = Path("data/raw")
    data_dir.mkdir(parents=True, exist_ok=True)
    
    # Example: Create a sample requirements document
    sample_doc = {
        "text": """# Software Requirements Document

## Functional Requirements
1. User Authentication
   - Users must be able to log in with email and password
   - Support for password reset functionality
   - Two-factor authentication option

2. Document Management
   - Upload PDF and Word documents
   - Extract text from documents
   - Save extracted requirements

## Non-Functional Requirements
1. Performance
   - Page load time < 2 seconds
   - Support for documents up to 50MB

2. Security
   - All data must be encrypted
   - Regular security audits

## User Stories
As a user, I want to:
- Upload my requirements documents
- Extract requirements automatically
- Export requirements in different formats

## Acceptance Criteria
1. Document upload works for PDF and Word files
2. Requirements are extracted with 90% accuracy
3. Export works in markdown and JSON formats""",
        "metadata": {
            "type": "requirements",
            "title": "Sample Requirements Document"
        }
    }
    
    # Save as JSON file
    output_file = data_dir / "sample_requirements.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(sample_doc, f, indent=2, ensure_ascii=False)
    
    logger.info(f"Created sample data at {output_file}")

if __name__ == "__main__":
    prepare_data() 