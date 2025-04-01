"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ReactMarkdown from "react-markdown";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

export default function ExtractorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [requirements, setRequirements] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError("");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError("");
    } else {
      setError("Please drop a PDF file");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/extract-requirements", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process PDF");
      }

      const data = await response.text();
      setRequirements(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const downloadWordFile = async () => {
    if (!requirements) return;

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "Extracted Requirements",
            heading: HeadingLevel.HEADING_1,
          }),
          ...requirements.split('\n').map(line => {
            if (line.startsWith('# ')) {
              return new Paragraph({
                text: line.replace('# ', ''),
                heading: HeadingLevel.HEADING_1,
              });
            } else if (line.startsWith('## ')) {
              return new Paragraph({
                text: line.replace('## ', ''),
                heading: HeadingLevel.HEADING_2,
              });
            } else if (line.startsWith('### ')) {
              return new Paragraph({
                text: line.replace('### ', ''),
                heading: HeadingLevel.HEADING_3,
              });
            } else if (line.startsWith('- ')) {
              return new Paragraph({
                text: line.replace('- ', ''),
                bullet: {
                  level: 0,
                },
              });
            } else if (line.startsWith('* ')) {
              return new Paragraph({
                text: line.replace('* ', ''),
                bullet: {
                  level: 0,
                },
              });
            } else if (line.trim()) {
              return new Paragraph({
                children: [
                  new TextRun({
                    text: line,
                  }),
                ],
              });
            }
            return new Paragraph({});
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "requirements.docx");
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Extractor" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="py-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-colors duration-200 ${
                    isDragging ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF files only
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                </label>
                {file && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Selected file: {file.name}
                  </p>
                )}
              </div>

              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}

              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  disabled={loading || !file}
                  className="inline-flex justify-center py-2 px-6 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#8B5CF6] hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B5CF6] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Extract Requirements"}
                </button>
                {requirements && (
                  <button
                    type="button"
                    onClick={downloadWordFile}
                    className="inline-flex justify-center py-2 px-6 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Download Word File
                  </button>
                )}
              </div>
            </form>

            {requirements && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Extracted Requirements
                </h3>
                <div className="relative rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-boxdark">
                  <div className="absolute right-4 top-4 flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Markdown</span>
                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-4 pt-12">
                    <div className="prose dark:prose-invert max-w-none font-mono text-sm">
                      <ReactMarkdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-gray-700 dark:text-gray-300 mb-1">
                              {children}
                            </li>
                          ),
                          code: ({ children }) => (
                            <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm">
                              {children}
                            </code>
                          ),
                          pre: ({ children }) => (
                            <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 mb-4 overflow-x-auto">
                              {children}
                            </pre>
                          ),
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
        </div>
      </div>
    </DefaultLayout>
  );
} 