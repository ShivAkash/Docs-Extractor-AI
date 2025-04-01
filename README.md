# Docs Extractor AI

Docs Extractor AI is an intelligent tool that automatically extracts and structures software requirements from PDF documents using the fine-tuned Qwen2-VL model. The system provides a user-friendly web interface for uploading PDFs and generates well-structured requirements documentation.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Demo](#demo)
- [Project Structure](#project-structure)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## Features

- **PDF Document Processing**  
  Upload and process PDF documents through an intuitive drag-and-drop interface.
  
- **Automatic Requirements Extraction**  
  Leverage the power of Qwen2-VL model to extract requirements automatically.
  
- **Structured Output**  
  Generate well-organized requirements documentation in markdown format.
  
- **Real-time Processing**  
  Get immediate feedback on document processing status.

## Technology Stack

- **Frontend:**  
  - Next.js 14  
  - React  
  - Tailwind CSS
  - TypeScript

- **Backend:**  
  - FastAPI
  - Python 3.8+

- **AI Model:**  
  - Qwen2-VL-2B-Instruct
  - LoRA fine-tuning

- **Document Processing:**  
  - PDF parsing
  - Markdown generation

## Getting Started

### Prerequisites

- **Python:** Version 3.8 or higher  
- **Node.js:** Version 16 or higher  
- **Package Manager:** npm or yarn  
- **GPU:** CUDA-capable (recommended for faster inference)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/docs-extractor-ai.git
   cd docs-extractor-ai
   ```

2. **Backend Setup:**

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup:**

   ```bash
   cd frontend
   npm install
   ```

4. **Start the Development Servers:**

   Backend:
   ```bash
   cd backend
   python main.py
   ```

   Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

5. **View the Application:**

   Open your browser and navigate to http://localhost:3000.

## Demo

https://github.com/user-attachments/assets/0d9bb015-76b1-4698-9c6d-03d339b98ffd


## Project Structure

```
docs-extractor-ai/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main FastAPI application
│   └── requirements.txt     # Backend dependencies
├── frontend/               # Next.js frontend
│   ├── src/
│   │   └── app/           # Frontend application code
│   └── package.json        # Frontend dependencies
├── src/                    # Core Python modules
│   ├── inference.py        # Model inference code
│   └── train.py           # Model training code
├── final_model/           # Trained model files
├── output/                # Generated requirements output
└── example.pdf           # Example PDF for testing
```

## Usage Examples

### Uploading Documents:
- Drag and drop PDF files into the upload area
- Click to select files from your device

### Processing Documents:
- View real-time processing status
- Monitor extraction progress

### Viewing Results:
- Browse structured requirements
- Export in markdown format
- Share results with team members

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. **Fork the Repository**

2. **Create a Feature Branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit Your Changes:**

   ```bash
   git commit -m "Add some fix/feature"
   ```

4. **Push to Your Branch:**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request:**
   Submit a pull request outlining your changes.

## Acknowledgments

- Qwen2-VL model team for the base model
- FastAPI framework for the backend
- Next.js team for the frontend framework
- All contributors and users of the project 
