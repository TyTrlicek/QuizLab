import React, { ChangeEvent, useRef, useState } from 'react';
import SearchResults from './SearchResults';
import { useSelectedList } from './SelectedListContext';
import { UploadedImage } from './types';


type Tab = 'upload' | 'search';

const ImageSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('upload');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { selectedList, setSelectedList } = useSelectedList();
  

  const processFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  
    const uploadedItem: UploadedImage = {
      id: Date.now().toString(),  // Simple unique ID
      title: file.name,
      type: 'image',
      mediaType: 'upload',
      imageUrl: url,
      file: file,
    };
  
    setSelectedList(prev => [...prev, uploadedItem]);
  
    console.log("Selected file:", file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8 border border-border-color rounded-lg shadow-sm">
      {/* Tab Buttons */}
      <div className="flex border-b border-border-color">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-2 text-center text-sm font-medium focus:outline-none cursor-pointer
            ${activeTab === 'upload'
              ? '!bg-[var(--accent-color)] !text-[var(--text-color)] !border-b-2 !border-primary-color'
              : '!text-text-color'}`}
        >
          Upload Image
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex-1 py-2 text-center text-sm font-medium focus:outline-none cursor-pointer
            ${activeTab === 'search'
              ? '!bg-[var(--accent-color)] !text-[var(--text-color)] !border-b-2 !border-primary-color'
              : '!text-text-color'}`}
        >
          Search Existing Images
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {activeTab === 'upload' ? (
          <div
            className="border-2 border-dashed border-border-color rounded-lg p-8 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <p className="mb-4 text-text-secondary">
              Click here or drag and drop an image
            </p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="inline-block py-2 px-4 bg-accent-color text-white rounded hover:bg-accent-hover transition">
              Choose File
            </span>

            {/* Optional Image Preview */}
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-6 max-h-48 mx-auto rounded shadow"
              />
            )}
          </div>
        ) : (
          <SearchResults />
        )}
      </div>
    </div>
  );
};

export default ImageSelector;
