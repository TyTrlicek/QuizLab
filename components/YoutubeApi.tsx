import React, { useState } from 'react';
import { Button } from './ui/button';
import { SelectedListItem, YoutubeEntry, isVideo } from './types';
import { useSelectedList } from './SelectedListContext';
import { Plus, X, Edit3, Check, Play, Trash2 } from 'lucide-react';

const YoutubeApi: React.FC = () => {
const { selectedList, setSelectedList } = useSelectedList();
  const [videoId, setVideoId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [title, setTitle] = useState('');
  const [checked, setChecked] = useState();
  const [isLoadingTitle, setIsLoadingTitle] = useState(false);

  const [videoEdits, setVideoEdits] = useState<Record<string, { title: string; isEditing: boolean }>>({});

const handleTitleChange = (videoId: string, newTitle: string) => {
  setVideoEdits(prev => ({
    ...prev,
    [videoId]: { ...prev[videoId], title: newTitle },
  }));
};

const handleTitleSubmit = (videoId: string) => {
    const editedTitle = videoEdits[videoId]?.title || '';
  
    setSelectedList(prevList =>
      prevList.map(item =>
        isVideo(item) && item.videoId === videoId
          ? { ...item, title: editedTitle }
          : item
      )
    );
  
    setVideoEdits(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], isEditing: false },
    }));
  };

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

  const fetchYouTubeTitle = async (videoId: string): Promise<string> => {
    try {
      // Using YouTube oEmbed API which doesn't require API key
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (response.ok) {
        const data = await response.json();
        return data.title || `YouTube Video ${selectedList.filter(isVideo).length + 1}`;
      }
    } catch (error) {
      console.error('Failed to fetch YouTube title:', error);
    }
    return `YouTube Video ${selectedList.filter(isVideo).length + 1}`;
  };

  const playVideo = (videoId: string) => {
    setVideoId(videoId);
  };

  const handleListRemoval = (videoIdToRemove: string) => {
    const updatedList = selectedList.filter(item => !(isVideo(item) && item.videoId === videoIdToRemove));
    setSelectedList(updatedList);
  };


  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Video Input Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Add YouTube Videos</h3>

        {/* Input Form */}
        <div className="glass-card p-6 mb-6">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Paste YouTube URL here..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
            />
            <button
              onClick={async () => {
                if (inputValue.trim() === "") return;
                if (isLoadingTitle) return;

                const id = extractVideoId(inputValue);
                if (!id) {
                  alert('Invalid YouTube URL');
                  return;
                }

                setIsLoadingTitle(true);

                try {
                  // Fetch the actual YouTube title
                  const youtubeTitle = await fetchYouTubeTitle(id);

                  const newEntry: YoutubeEntry = {
                    id: id,
                    url: inputValue,
                    videoId: id,
                    title: youtubeTitle,
                    type: 'video',
                    mediaType: 'video',
                  };

                  setSelectedList(prev => [...prev, newEntry]);
                  setInputValue('');
                  setVideoEdits(prev => ({
                    ...prev,
                    [id]: { title: newEntry.title, isEditing: false },
                  }));
                } finally {
                  setIsLoadingTitle(false);
                }
              }}
              disabled={isLoadingTitle}
              className={`btn btn-primary flex items-center gap-2 ${isLoadingTitle ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoadingTitle ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              {selectedList.filter(isVideo).length}/64 videos selected
            </span>
            {selectedList.filter(isVideo).length > 0 && (
              <button
                onClick={handleClearUrls}
                className="btn btn-secondary text-sm flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Video Preview */}
        {videoId && (
          <div className="glass-card p-4 mb-6">
            <h4 className="text-white font-medium mb-3">Preview</h4>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Video List */}
        {selectedList.filter(isVideo).length > 0 && (
          <div className="glass-card p-4">
            <h4 className="text-white font-medium mb-3">Video List</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
              {selectedList.filter(isVideo).map((entry, index) => {
                const editState = videoEdits[entry.videoId] || { title: entry.title, isEditing: false };

                return (
                  <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                    <button
                      onClick={() => playVideo(entry.videoId)}
                      className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                      title="Preview"
                    >
                      <Play className="w-3 h-3 text-white fill-current ml-0.5" />
                    </button>

                    <div className="flex-1 min-w-0">
                      {editState.isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editState.title}
                            onChange={(e) => handleTitleChange(entry.videoId, e.target.value)}
                            className="flex-1 px-2 py-1 text-sm bg-white/10 border border-white/20 rounded text-white"
                            placeholder="Enter video title"
                          />
                          <button
                            onClick={() => handleTitleSubmit(entry.videoId)}
                            className="text-green-400 hover:text-green-300"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white truncate">{editState.title}</span>
                          <button
                            onClick={() => toggleEditMode(entry.videoId)}
                            className="text-gray-400 hover:text-cyan-400 ml-2"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleListRemoval(entry.videoId)}
                      className="flex-shrink-0 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected Videos Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Selected Videos
            <span className="text-sm text-gray-400 ml-2">
              ({selectedList.filter(isVideo).length}/64)
            </span>
          </h3>
        </div>

        <div className="border border-white/10 rounded-xl p-4 max-h-96 overflow-auto no-scrollbar">
          {selectedList.filter(isVideo).length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Play className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No videos selected yet</p>
              <p className="text-sm">Add YouTube URLs to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {selectedList.filter(isVideo).map((item, index) => {
                const editState = videoEdits[item.videoId] || { title: item.title, isEditing: false };

                return (
                  <div key={`selected-${index}`} className="relative group">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-800">
                      <img
                        src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
                        alt={editState.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <button
                        onClick={() => handleListRemoval(item.videoId)}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        title="Remove video"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => playVideo(item.videoId)}
                        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        title="Preview video"
                      >
                        <Play className="w-8 h-8 text-white fill-current" />
                      </button>
                    </div>

                    <div className="mt-2">
                      {editState.isEditing ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            value={editState.title}
                            onChange={(e) => handleTitleChange(item.videoId, e.target.value)}
                            className="flex-1 px-2 py-1 text-xs bg-white/5 border border-white/10 rounded text-white"
                            placeholder="Video title"
                          />
                          <button
                            onClick={() => handleTitleSubmit(item.videoId)}
                            className="text-green-400 hover:text-green-300"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-300 flex-1 truncate">
                            {editState.title}
                          </span>
                          <button
                            onClick={() => toggleEditMode(item.videoId)}
                            className="text-gray-400 hover:text-cyan-400"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YoutubeApi;
