'use client'
import { useSelectedList } from '@/components/SelectedListContext';
import { Anime } from '@/components/types/Anime';
import { isAnime, isMusic, SelectedListItem, YoutubeEntry } from './types';

async function fetchList() {
  
}

export const categoriesList = [
    'all',
    'anime',
    'manga',
    'sports',
    'movies',
    'video games',
    'people',
    'music'
]


export const getImageUrl = (item: SelectedListItem): string => {
  if ('videoId' in item) {
    // It's a YouTube entry
    return `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
  } else if (isAnime(item)) {
    // It's an Anime item
    return item.images.jpg.image_url;
  } else if (isMusic(item)) {
    // It's a Music item
    return item.picture_medium;
  }
  // Fallback image
  return 'https://via.placeholder.com/300';
};




export function getFirstRound(selectedList: SelectedListItem[]){
  const tempList = [...selectedList];
    let selectedItems: SelectedListItem[] = [];
      
      for(let i = 0; i < selectedList.length; i++)
      {
    
        const randomNum = Math.floor(Math.random() * tempList.length)
        selectedItems[i] = tempList[randomNum];
        tempList.splice(randomNum,1);
      }
      return getNewRound(selectedItems);
    }
    
    export function getNewRound (selectedItems: SelectedListItem[]) {
      const tournamentItems = [];
    
      for(let i = 0; i < selectedItems.length-1; i+=2)
      {
        const itemPair = {
          first: selectedItems[i],
          second: selectedItems[i+1]
        };
    
        tournamentItems.push(itemPair);
      }
    
      return tournamentItems;
    }
