import React, { useState } from 'react';
import SearchResults from './SearchResults';

type Tab = 'upload' | 'search';

const ImageSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('upload');

  return (
    <div className="max-w-lg mx-auto my-8 border border-border-color rounded-lg shadow-sm">
      
      
      <div className="flex border-b border-border-color">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-2 text-center text-sm font-medium focus:outline-none 
            ${activeTab === 'upload' ? '!bg-gray-700 !text-white !border-b-2 !border-primary-color' : '!text-text-color'}`}
        >
          Upload Image
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex-1 py-2 text-center text-sm font-medium focus:outline-none 
            ${activeTab === 'search' ? '!bg-gray-700 !text-white !border-b-2 !border-primary-color' : '!text-text-color'}`}
        >
          Search Existing Images
        </button>
      </div>

      {/* Content section */}
      <div className="p-4">
        {activeTab === 'upload' ? (
          // Upload Area (drag and drop or click to upload)
          <div className="border-2 border-dashed border-border-color rounded-lg p-8 text-center">
            <p className="mb-4 text-text-secondary">
              Click here or drag and drop an image
            </p>
            {/* Hidden file input, triggered by label click */}
            <input
              type="file"
              accept="image/*"
              id="upload-input"
              className="hidden"
            />
            <label
              htmlFor="upload-input"
              className="cursor-pointer inline-block py-2 px-4 bg-accent-color text-white rounded hover:bg-accent-hover transition"
            >
              Choose File
            </label>
          </div>
        ) : (
          // Search Area
          
          <SearchResults />
        )}
      </div>
    </div>
  );
};

export default ImageSelector;
