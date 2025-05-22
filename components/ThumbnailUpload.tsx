import React, { useState, DragEvent, ChangeEvent } from 'react';

interface ThumbnailUploadProps {
  onFileSelect?: (file: File) => void;
}

const ThumbnailUpload: React.FC<ThumbnailUploadProps> = ({ onFileSelect }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Keep the active state true to style the component while dragging
    setDragActive(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect?.(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect?.(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2 w-1/2 flex flex-col">
      <label className="text-text-secondary font-semibold justify-center items-center text-center">
        Upload Quiz Thumbnail
      </label>
      <div
        className={`relative border-2 rounded-md p-6 cursor-pointer transition 
                    ${dragActive ? 'border-border-color bg-white' : 'border-primary-color bg-primary-light'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
        />
        <div className="flex flex-col items-center justify-center">
          <svg
            className="w-12 h-12 mb-2 text-primary-color"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 37v2a2 2 0 002 2h34a2 2 0 002-2v-2M16 19l8-8m0 0l8 8m-8-8v26"
            />
          </svg>
          <p className="text-sm text-text-secondary">
            Drag and drop an image here, or click to select
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailUpload;
