# Requirements Extractor

A tool that automatically extracts and structures software requirements from PDF documents using fine-tuned Qwen2-VL model. The system provides a user-friendly web interface for uploading PDFs and generates well-structured requirements documentation.

## Features

- PDF document processing
- Automatic requirements extraction
- Structured output in markdown format
- Modern, responsive web interface
- Drag-and-drop file upload
- Real-time processing feedback

## Project Structure

```
requirements-extractor/
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

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn
- CUDA-capable GPU (recommended for faster inference)

## Setup

### Backend Setup

1. Create and activate a Python virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Start the backend server:
```bash
python main.py
```

The backend server will run on `http://localhost:8000`

### Frontend Setup

1. Install Node.js dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Upload a PDF document by either:
   - Clicking the upload area
   - Dragging and dropping a PDF file
3. Wait for the processing to complete
4. View the extracted requirements in the structured format

## Output Format

The extracted requirements are structured as follows:

```markdown
# Requirements Document

## Functional Requirements
- [Extracted functional requirements]

## Non-Functional Requirements
- [Extracted non-functional requirements]

## User Stories
- [Extracted user stories]

## Acceptance Criteria
- [Extracted acceptance criteria]

## Document Summary
- [Summary of key insights]
```

## Model Details

The system uses:
- Qwen2-VL-2B-Instruct as the base model
- Fine-tuned for requirements extraction
- LoRA for efficient adaptation
- Optimized for PDF document processing

## Development

### Training the Model

To train the model on your own data:

1. Prepare your training data
2. Run the training script:
```bash
python src/train.py
```

### Customizing the Frontend

The frontend is built with:
- Next.js 14
- Tailwind CSS
- React Markdown
- TypeScript

To modify the UI:
1. Edit files in `frontend/src/app`
2. Styles are in `frontend/src/app/globals.css`

## Troubleshooting

Common issues and solutions:

1. **Backend not starting**
   - Check if port 8000 is available
   - Ensure all dependencies are installed
   - Verify Python version compatibility

2. **Frontend not connecting to backend**
   - Verify backend is running
   - Check CORS settings in backend
   - Ensure correct API URL in frontend

3. **Model loading issues**
   - Verify model files are present in `final_model/`
   - Check GPU memory availability
   - Ensure CUDA is properly configured

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Qwen2-VL model team
- FastAPI framework
- Next.js team
- All contributors and users 