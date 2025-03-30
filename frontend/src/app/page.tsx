'use client';

import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [requirements, setRequirements] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileChange(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');
    setRequirements(''); // Clear previous requirements

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Sending request to backend...');
      const response = await fetch('http://localhost:8000/extract-requirements', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to extract requirements');
      }

      const data = await response.text();
      console.log('Received data from backend:', data);
      
      // Clean up the data if needed
      const cleanData = data.replace(/Generated Requirements:[\s-]*/g, '');
      console.log('Cleaned data:', cleanData);
      
      setRequirements(cleanData);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to process the PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Requirements Extractor
          </h1>
          <p className="text-lg text-gray-600">
            Upload a PDF document to extract and structure software requirements
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div 
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition-colors duration-200
                ${isDragging 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Upload className={`h-12 w-12 mb-4 transition-colors duration-200
                ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
              <label className="cursor-pointer">
                <span className="text-blue-600 hover:text-blue-800">
                  Click to upload
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </label>
              <p className="mt-2 text-sm text-gray-500">
                or drag and drop a PDF file
              </p>
            </div>

            {file && (
              <div className="text-sm text-gray-600">
                Selected file: {file.name}
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={!file || loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${loading || !file 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? 'Processing...' : 'Extract Requirements'}
            </button>
          </form>
        </div>

        {requirements && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Extracted Requirements
              </h2>
            </div>
            <div className="p-6 bg-gray-50">
              <div className="prose prose-slate max-w-none font-mono text-sm">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-900 mb-4" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-3" {...props} />,
                      p: ({node, ...props}) => <p className="text-gray-800 mb-4" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-6 text-gray-800 mb-4" {...props} />,
                      li: ({node, ...props}) => <li className="text-gray-800 mb-2" {...props} />,
                    }}
                  >
                    {requirements}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
