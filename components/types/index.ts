// Base for all media
export interface BaseMedia {
    id: string | number;
    type: 'image' | 'video';  // Used for rendering
    title: string;
    imageUrl?: string;
    videoId?: string;
    mediaType: 'anime' | 'music' | 'video';
  }
  
  // YouTube item
  export interface YoutubeEntry {
    id: string;
    url: string;
    videoId: string;
    imageUrl?: string;
    title: string;
    type: 'video';
    mediaType: 'video';
  }
  
  // Anime item
  export interface Anime extends BaseMedia {
    mediaType: 'anime';
    mal_id: number;
    images: {
      jpg: {
        image_url: string;
      };
    };
  }
  
  // Music item
  export interface Music extends BaseMedia {
    mediaType: 'music';
    music_id: number;
    artist?: string;
    song?: string;
    picture_medium: string;
    album_id?: string;
  }
  
  // Video (non-YouTube)
  export interface Video extends BaseMedia {
    mediaType: 'video';
    videoId: string;
  }

  export const DEFAULT_YOUTUBE_ITEM: YoutubeEntry = {
    id: '',
    title: '',
    url: '',
    videoId: '',
    mediaType: 'video',
    type: 'video'

  };

  export const DEFAULT_MEDIA_ITEM: MediaItem = {
    id: '',
    title: '',
    mediaType: 'anime',
    type: 'image',
    mal_id: 0,     
    images: {
      jpg: {
        image_url: 'https://via.placeholder.com/150'
      }
    },
  };

  export interface Post {
    id: number;
    quizTitle: string;
    selectedCategories: string[];
    quizType: string;
    quizList: SelectedListItem[]; 
    createdAt: string;
    image: string;
  }
  
  
  

  export const isAnime = (item: SelectedListItem): item is Anime =>
    'mal_id' in item;
  
  export const isMusic = (item: SelectedListItem): item is Music =>
    'music_id' in item && item.mediaType === 'music';
  
  export const isVideo = (item: SelectedListItem): item is YoutubeEntry =>
    item.mediaType === 'video' && 'url' in item && 'videoId' in item;
  
  
  // A shared type that includes everything you'll select from
  export type MediaItem = Anime | Music | Video;
  export type SelectedListItem = MediaItem | YoutubeEntry;
  