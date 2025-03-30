from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse
import uvicorn
import os
import tempfile
from pathlib import Path
import sys

# Add the project root directory to Python path
project_root = str(Path(__file__).parent.parent)
sys.path.append(project_root)

# Change working directory to project root
os.chdir(project_root)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/extract-requirements", response_class=PlainTextResponse)
async def extract_requirements(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        return "Error: Please upload a PDF file"
    
    try:
        # Create a temporary file to store the uploaded PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name
        
        # Process the PDF using your existing script
        from src.inference import extract_text_from_pdf, generate_requirements
        
        # Extract text from PDF
        text = extract_text_from_pdf(temp_file_path)
        
        # Generate requirements
        requirements = generate_requirements(text)
        
        # Clean up the temporary file
        os.unlink(temp_file_path)
        
        return requirements
        
    except Exception as e:
        return f"Error processing PDF: {str(e)}"

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 