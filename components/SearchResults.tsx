'use client';

import React, { useState, useCallback, useContext, createContext } from 'react';
import { debounce } from 'lodash';

type Anime = {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
};



const SearchResults: React.FC = ({}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedList, setSelectedList] = useState<Anime[]>([]);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}`);
      const data = await response.json();
      setResults(data.data || []);
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      setLoading(false);
    }
  };

  // Memoize debounced search to avoid creating it every render
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => handleSearch(searchQuery), 500),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value); // Update query
    debouncedSearch(value); // Pass the updated value to the debounced search
  };

  const handleImageSelection = (anime: Anime) => {
    const updatedList = [...selectedList,anime];
    setSelectedList(updatedList);
};

  return (
    <>
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search Anime"
          value={query}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {loading && <p>Loading...</p>}

      {results.length === 0 && query.length > 1 && <p>No Results Found</p>}

      {results.length !== 0 && (
        <div
          className="scrollable grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          style={{ maxHeight: '400px', overflowY: 'auto' }} // Fixed height and scrolling
        >
          {results.map((anime, index) => (
            <div
              key={`${anime.mal_id}-${index}`}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => handleImageSelection(anime)}
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-2">
                <h4 className="font-semibold text-sm">{anime.title}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className='flex gap-2'>
      <div
          className="scrollable grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {selectedList.map((anime, index) => (
                <img src={anime.images.jpg.image_url} alt="List-item" className='w-full h-40 object-cover' key={`selected-${index}`}/>
            ))}
          </div>
    </div>
    </>
    
  );
};

export default SearchResults;
