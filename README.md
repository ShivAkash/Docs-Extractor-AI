# Automata - Requirements Extractor

A powerful application that extracts requirements from PDF documents using AI, with a modern web interface built with Next.js.

## Project Structure

```
requirements-extractor/
├── frontend/           # Next.js frontend application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
├── backend/           # Python backend application
│   ├── src/          # Source code
│   └── requirements.txt # Backend dependencies
└── README.md         # This file
```

## Features

- **PDF Requirements Extraction**: Upload PDF documents and extract requirements using AI
- **Markdown Export**: View extracted requirements in a beautiful markdown format
- **Word Document Export**: Download requirements as a formatted Word document
- **Modern UI**: Clean and intuitive interface built with Next.js and Tailwind CSS
- **Dark Mode Support**: Seamless dark/light mode switching
- **Responsive Design**: Works perfectly on all device sizes

## Prerequisites

- Node.js 18.x or later
- Python 3.8 or later
- Git

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   python src/main.py
   ```

The backend API will be available at `http://localhost:8000`

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Click the "Extract Requirements" button
3. Upload your PDF document
4. Wait for the extraction process to complete
5. View the extracted requirements in the markdown viewer
6. Optionally download the requirements as a Word document

## Development

### Frontend Development

- Built with Next.js 14
- Uses Tailwind CSS for styling
- TypeScript for type safety
- React Markdown for markdown rendering
- Docx.js for Word document generation

### Backend Development

- FastAPI for the REST API
- PyPDF2 for PDF processing
- Custom AI model for requirements extraction

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

