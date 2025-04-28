"use client"

import React, { useEffect, useState } from 'react';
import { getFirstRound, getNewRound } from './utils';
import Matchup from './Matchup';
import { useSelectedList } from '@/components/SelectedListContext';
import { SelectedListItem } from './types';

type ItemPair = {
    first: SelectedListItem;
    second: SelectedListItem;
}

const Tournament = () => {
    const { selectedList, setSelectedList } = useSelectedList();
    const [roundState, setRoundState] = useState<ItemPair[]>([]);
    const [itemState, setItemState] = useState<ItemPair | null>(null);
    const [index, setIndex] = useState(0);
    const [winnerArr, setWinnerArr] = useState<SelectedListItem[]>([]);
    const [finalWinner, setFinalWinner] = useState<SelectedListItem>();

    useEffect(() => {
        if (!selectedList || selectedList.length === 0) {
            setSelectedList([]); // Set to an empty array or some default value if necessary
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
        />
    );
};

export default Tournament;
