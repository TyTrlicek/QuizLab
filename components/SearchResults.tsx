import React, { useState, useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { useSelectedList } from './SelectedListContext';
import Dropdown from './Dropdown';
import { MediaItem, SelectedListItem, isAnime, isMusic } from './types';

// Function to get the access token using client credentials flow (for Spotify)
async function getAccessToken() {
  const response = await fetch('http://localhost:5000/api/spotify-token');
  const data = await response.json();
  return data.access_token;
}

// Function to search Spotify (for songs, artists, albums)
async function searchSpotify(query: string, musicType: string | null) {
  const token = await getAccessToken();

  // Determine which type to search for based on the musicType
  let typeParam = 'track,album,artist';
  if (musicType === 'Songs') typeParam = 'track';
  else if (musicType === 'Albums') typeParam = 'album';
  else if (musicType === 'Artists') typeParam = 'artist';

  const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${typeParam}&limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data;
}

// Function to map Spotify data to your MediaItem types
function mapSpotifyToMediaItem(data: any) {
  // Create arrays for each type
  const mappedItems = [];
  
  // Process tracks if they exist
  if (data.tracks?.items) {
    const tracks = data.tracks.items.map((item: any) => ({
      id: item.id,
      title: item.name,
      imageUrl: item.album.images[0]?.url || null,
      mediaType: 'music',
      music_id: item.id,
      song: item.name,
      artist: item.artists[0]?.name,
      picture_medium: item.album.images[0]?.url || null,
      type: 'song',
    }));
    mappedItems.push(...tracks);
  }
  
  // Process albums if they exist
  if (data.albums?.items) {
    const albums = data.albums.items.map((item: any) => ({
      id: item.id,
      title: item.name,
      imageUrl: item.images[0]?.url || null,
      mediaType: 'music',
      music_id: item.id,
      album: item.name,
      artist: item.artists[0]?.name,
      picture_medium: item.images[0]?.url || null,
      type: 'album',
    }));
    mappedItems.push(...albums);
  }
  
  // Process artists if they exist
  if (data.artists?.items) {
    const artists = data.artists.items.map((item: any) => ({
      id: item.id,
      title: item.name,
      imageUrl: item.images[0]?.url || null,
      mediaType: 'music',
      music_id: item.id,
      artist: item.name,
      picture_medium: item.images[0]?.url || null,
      type: 'artist',
    }));
    mappedItems.push(...artists);
  }
  
  return mappedItems.filter(Boolean);
}

// Main component
const SearchResults: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SelectedListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { selectedList, setSelectedList } = useSelectedList();
  const [searchCategory, setSearchCategory] = useState<string>('Anime');
  const [musicType, setMusicType] = useState<string | null>(null);
  
  // Use a ref to keep track of the current category
  const categoryRef = useRef(searchCategory);
  // Use a ref for music type as well
  const musicTypeRef = useRef(musicType);
  
  // Update the refs whenever states change
  useEffect(() => {
    categoryRef.current = searchCategory;
  }, [searchCategory]);
  
  useEffect(() => {
    musicTypeRef.current = musicType;
  }, [musicType]);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    
    // Use the refs to get current values
    const currentCategory = categoryRef.current;
    const currentMusicType = musicTypeRef.current;
    
    console.log('Search initiated. Type:', currentCategory, 'Music Type:', currentMusicType);
    
    try {
      if (currentCategory === 'Anime') {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}`);
        console.log("search query", searchQuery);
        console.log("search results", searchResults);
        const data = await response.json();
        console.log('data', data);
        setSearchResults(data.data || []);
        setTimeout(() => {
          console.log("search results", searchResults);
        }, 1000);
        
      } else if (currentCategory === 'Music') {
        console.log('Searching for Music. Type:', currentMusicType);
        const data = await searchSpotify(searchQuery, currentMusicType);
        
        const mappedResults = mapSpotifyToMediaItem(data);
        console.log('Music results:', mappedResults);
        setSearchResults(mappedResults);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      handleSearch(searchQuery);
    }, 500),
    [handleSearch]
  );

  // Re-trigger search when category or music type changes
  useEffect(() => {
    console.log('Category changed to:', searchCategory);
    if (query.trim()) {
      // Small delay to ensure state update is reflected
      setTimeout(() => {
        debouncedSearch(query);
      }, 0);
    }
  }, [searchCategory, query]);
  
  // Re-trigger search when music type changes
  useEffect(() => {
    console.log('Music type changed to:', musicType);
    if (searchCategory === 'Music' && query.trim()) {
      setTimeout(() => {
        debouncedSearch(query);
      }, 0);
    }
  }, [musicType, searchCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleImageSelection = (item: SelectedListItem) => {
    if (selectedList.includes(item)) return;
    setSelectedList([...selectedList, item]);
  };

  const handleDropdownChange = (selectedSearchCategory: string) => {
    console.log('Changing search category to:', selectedSearchCategory);
    setSearchCategory(selectedSearchCategory);
    // Clear previous search results when changing category
    setSearchResults([]);
    
    // Reset music type when changing to/from Music category
    if (selectedSearchCategory !== 'Music') {
      setMusicType(null);
    }
  };
  
  const handleMusicTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value;
    console.log('Music type selected:', selectedType);
    setMusicType(selectedType);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder={`Search ${searchCategory}`}
          value={query}
          onChange={handleInputChange}
          className="w-full sm:w-2/3 p-2 border rounded-md"
        />
        <Dropdown
          dropDownElements={['Anime', 'Music']}
          dropDownTitle={searchCategory}
          onChange={handleDropdownChange}
          width='w-12'
        />
      </div>

      {searchCategory === 'Music' && (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        {["Artists", "Songs", "Albums"].map((type) => (
          <label 
            key={type}
            className={`flex items-center gap-2 px-3 py-2 border rounded-md shadow-sm cursor-pointer transition
              ${musicType === type ? 'bg-gray-600 text-white' : 'bg-primary-accent-color hover:bg-gray-100'}`}
          >
            <input
              type="radio"
              name="music-type"
              value={type}
              checked={musicType === type}
              onChange={handleMusicTypeChange}
              className="accent-primary-color"
            />
            <span className="text-sm font-medium">{type}</span>
          </label>
        ))}
      </div>
      
      )}

      {loading && <p>Loading...</p>}
      {searchResults.length === 0 && query.length > 1 && !loading && <p></p>}

      {searchCategory === 'Anime' && searchResults.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {searchResults.map((item, index) =>
            isAnime(item) ? (
              <div key={`anime-${item.mal_id}-${index}`} onClick={() => handleImageSelection(item)} className="cursor-pointer hover:opacity-80">
                <img src={item.images.jpg.image_url} alt={item.title} className="w-full rounded-md" height={40} width={40}/>
                <h4 className="mt-2 text-sm font-medium">{item.title}</h4>
              </div>
            ) : null
          )}
        </div>
      )}

      {searchCategory === 'Music' && searchResults.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {searchResults.map((item, index) =>
            isMusic(item) ? (
              <div key={`music-${item.music_id || index}`} onClick={() => handleImageSelection(item)} className="cursor-pointer hover:opacity-80">
                <img src={item.picture_medium} alt={item.title} className="w-full rounded-md" />
                <h4 className="mt-2 text-sm font-medium">{item.title}</h4>
                {item.artist && <p className="text-xs text-gray-500">{item.artist}</p>}
                {item.album_id && <p className="text-xs text-gray-500">Album: {item.album_id}</p>}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;