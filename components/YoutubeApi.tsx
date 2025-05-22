import React, { useState } from 'react';
import { Button } from './ui/button';
import { SelectedListItem, YoutubeEntry, isVideo } from './types';
import { useSelectedList } from './SelectedListContext';


const YoutubeApi: React.FC = () => {
const { selectedList, setSelectedList } = useSelectedList();
  const [videoId, setVideoId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');
  const [checked, setChecked] = useState();

  const [videoEdits, setVideoEdits] = useState<Record<string, { title: string; isEditing: boolean }>>({});

// Handle input change
const handleTitleChange = (videoId: string, newTitle: string) => {
  setVideoEdits(prev => ({
    ...prev,
    [videoId]: { ...prev[videoId], title: newTitle },
  }));
};

// Handle title confirm
const handleTitleSubmit = (videoId: string) => {
    const editedTitle = videoEdits[videoId]?.title || '';
  
    // Update the selected list with the new title
    setSelectedList(prevList =>
      prevList.map(item =>
        isVideo(item) && item.videoId === videoId
          ? { ...item, title: editedTitle }
          : item
      )
    );
  
    // Exit edit mode
    setVideoEdits(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], isEditing: false },
    }));
  };

// Toggle editing mode
const toggleEditMode = (videoId: string) => {
  setVideoEdits(prev => ({
    ...prev,
    [videoId]: {
      title: prev[videoId]?.title || '',
      isEditing: true,
    },
  }));
};

  const handleClearUrls = () => {
    setSelectedList(prev => prev.filter(item => !isVideo(item)));
    setVideoId(null);
  };

  const extractVideoId = (youtubeUrl: string) => {
    const match = youtubeUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
    return match ? match[1] : null;
  };

  const playVideo = (videoId: string) => {
    setVideoId(videoId);
  };

  const handleListRemoval = (videoIdToRemove: string) => {
    const updatedList = selectedList.filter(item => !(isVideo(item) && item.videoId === videoIdToRemove));
    setSelectedList(updatedList);
  };


  return (
    <div className="p-4 flex">
      {videoId && (
        <div className="mt-4">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div className="max-w-xl mx-auto my-8 p-6 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-2xl shadow-md">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter YouTube URL"
            className="p-2 border rounded-md w-full"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-full hover:bg-[var(--primary-color-dark)] transition cursor-pointer border border-white"
            onClick={() => {
              if (inputValue.trim() === "") return;
                console.log("selected list", selectedList);
              const id = extractVideoId(inputValue);
              if (!id) {
                alert('Invalid Youtube URL');
                return;
              }

              const newEntry: YoutubeEntry = {
                id: id,
                url: inputValue,
                videoId: id,
                title: `YouTube Video ${selectedList.length + 1}`,
                type: 'video',
                mediaType: 'video',
              };

              setSelectedList(prev => [...prev, newEntry]);  // Adding the new entry
              setInputValue('');
              setVideoEdits(prev => ({
                ...prev,
                [id]: { title: newEntry.title, isEditing: false },
              }));
            }}
            style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}  
          >
            Submit
          </button>

          <button
            className="border border-white rounded-md p-2 cursor-pointer"
            style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}
            onClick={handleClearUrls}
            
          >
            clear
          </button>
        </div>

        <div className='text-sm cursor-default mt-2' style={{ color: 'var(--text-secondary)' }}>
          {`${selectedList.filter(isVideo).length}/64`}
        </div>

        <ul>
  {selectedList.filter(isVideo).map((entry, index) => {
    const editState = videoEdits[entry.videoId] || { title: entry.title, isEditing: false };

    return (
      <div key={index} className="flex gap-2 items-center justify-start">
        <li onClick={() => playVideo(entry.videoId)} className="hover:underline hover:text-blue-500 cursor-pointer w-1/2">
          {entry.url}
        </li>

        <div className="flex items-center gap-2 w-1/2">
        {editState.isEditing ? (
  <div className="flex items-center gap-2 w-full">
    <input
      type="text"
      placeholder="Enter Video Title"
      className="border border-white p-2 rounded-md flex-grow"
      value={editState.title}
      onChange={(e) => handleTitleChange(entry.videoId, e.target.value)}
    />
    <button
      className="text-green-500 text-lg hover:scale-110 transition-transform"
      onClick={() => handleTitleSubmit(entry.videoId)}
      title="Save"
    >
      ✔️
    </button>
  </div>
) : (
  <div className="flex items-center justify-between w-full gap-4">
    <span className="font-medium flex-grow text-left text-ellipsis overflow-hidden whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
      {editState.title}
    </span>
    <button
      className="text-sm text-blue-500 underline hover:scale-105 transition-transform"
      onClick={() => toggleEditMode(entry.videoId)}
      title="Edit"
    >
      ✏️ Edit
    </button>
  </div>
)}

        </div>
      </div>
    );
  })}
</ul>

      </div>

      <div className='w-1/2'>
        <div className='flex justify-center items-center gap-x-8'>
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Selected Videos <span className='text-sm'>{`${selectedList.filter(isVideo).length}/64`}</span>
          </h1>
          <Button variant={'default'} size={'sm'} effect={'ringHover'} onClick={handleClearUrls} className='cursor-pointer'
          style={{ backgroundColor: 'var(--accent-color)', color: 'white' }}>
            Clear List
          </Button>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 border px-5" style={{ borderColor: 'var(--text-color)' }}>
            {selectedList.filter(isVideo).map((item, index) => (
              <div key={`selected-${index}`} className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`} alt={`Selected ${index}`} className="w-full h-full object-cover" />
                <button
                  className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  title="Remove"
                  onClick={() => handleListRemoval(item.videoId)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeApi;
