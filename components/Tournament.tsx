"use client"

import React, { useEffect, useState } from 'react';
import { getFirstRound, getNewRound } from './utils';
import Matchup from './Matchup';
import { useSelectedList } from '@/components/SelectedListContext';
import { DEFAULT_MEDIA_ITEM, SelectedListItem } from './types';

type ItemPair = {
    first: SelectedListItem;
    second: SelectedListItem;
}

type TournamentProps = {
    id: string;
  };


const Tournament = ({ id }: TournamentProps) => {

    const [roundState, setRoundState] = useState<ItemPair[]>([]);
    const [itemState, setItemState] = useState<ItemPair | null>(null);
    const [index, setIndex] = useState(0);
    const [winnerArr, setWinnerArr] = useState<SelectedListItem[]>([]);
    const [finalWinner, setFinalWinner] = useState<SelectedListItem>();
    const [selectedList, setSelectedList] = useState<SelectedListItem[]>([]);
    const [imageOrVideo, setImageOrVideo] = useState('');

    useEffect(() => {
        async function fetchDatabase() {
          const res = await fetch(`http://localhost:5000/getquiz/${id}`);
          const data = await res.json();
          console.log('data', data);
          const list = await data.quizList;
          const imageVideo = await data.imageOrVideo;
          console.log(imageVideo + "testestest")
          setImageOrVideo(imageVideo);
          let upperBound = 2 ** Math.ceil(Math.log2(list.length));
              console.log('upperbound', upperBound);
          
              const initialLength = list.length;
              const paddedList = [...list];
          
              // Add padding to the list to the next power of 2
              for (let i = initialLength; i < upperBound; i++) {
                paddedList.push(DEFAULT_MEDIA_ITEM);
              }
              setSelectedList(paddedList); // Set the padded list
        }
        fetchDatabase();
      }, [id]);
      
    useEffect(() => {
        if (!selectedList || selectedList.length === 0) {
            return;
        }
        // Fetch first round data when selectedList is available
        async function fetchData() {
            const firstRound = await getFirstRound(selectedList);
            setRoundState(firstRound);
            setItemState(firstRound[0]);
        }
        fetchData();
    }, [selectedList, setSelectedList]); // Re-run when selectedList changes

    function handleOnClick(clickedItem: SelectedListItem) {
        if (roundState.length <= 1) {
            handleRoundChange(clickedItem, true);
            return;
        }

        if (index < roundState.length - 1) {
            setItemState(roundState[index + 1]);
            setWinnerArr(prev => [...prev, clickedItem]);
            setIndex(prev => prev + 1);
        } else {
            handleRoundChange(clickedItem);
        }
    }

    function handleRoundChange(clickedItem: SelectedListItem, isLast = false) {
        if (isLast) {
            setFinalWinner(clickedItem);
            return;
        }

        setWinnerArr(prevWinners => {
            const finalWinners = [...prevWinners, clickedItem];
            const newRound = getNewRound(finalWinners);
            setRoundState(newRound);
            setItemState(newRound[0] || null);
            return [];
        });

        setIndex(0);
    }

    return (
        <Matchup
            tournamentState={itemState} 
            index={index}
            handleOnClick={handleOnClick}
            totalRoundCount={roundState.length}
            finalWinner={finalWinner}
            imageOrVideo={imageOrVideo}
        />
    );
};

export default Tournament;
