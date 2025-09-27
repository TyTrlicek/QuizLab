import React, { ChangeEvent, useRef, useState } from 'react';
import SearchResults from './SearchResults';
import { useSelectedList } from './SelectedListContext';
import { UploadedImage } from './types';
import { supabase } from '@/lib/supbaseClient';


type Tab = 'upload' | 'search';

const ImageSelector: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { selectedList, setSelectedList } = useSelectedList();

  const processFile = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;
  
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file);
  
    if (error) {
      console.error('Error uploading file:', error.message);
      return;
    }
  
    // Get public URL (if bucket is public)
    const { data: { publicUrl } } = supabase.storage
  .from('images')
  .getPublicUrl(filePath);

const uploadedItem: UploadedImage = {
  id: Date.now().toString(),
  title: file.name,
  type: 'image',
  uploadUrl: publicUrl,
  mediaType: 'upload',
  imageUrl: publicUrl,
  file: file,
};

console.log('public url', publicUrl)

setSelectedList((prev) => [...prev, uploadedItem]);
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
          </div>
        ) : (
          <SearchResults />
        )}
      </div>
    </div>
  );
};

export default ImageSelector;
