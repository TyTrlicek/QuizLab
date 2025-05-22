import React from 'react';
import { isAnime, isMusic, isVideo, SelectedListItem } from './types';

type ItemPair = {
  first: SelectedListItem;
  second: SelectedListItem;
};

type MatchupProps = {
  tournamentState: ItemPair | null;
  index: number;
  handleOnClick: (item: SelectedListItem) => void;
  totalRoundCount: number;
  finalWinner?: SelectedListItem;
  imageOrVideo: string;
};

const Matchup: React.FC<MatchupProps> = ({
  tournamentState,
  index,
  handleOnClick,
  totalRoundCount,
  finalWinner,
  imageOrVideo
}) => {

  const renderMedia = (item: SelectedListItem) => {
    console.log(item.videoId);
    if(imageOrVideo === "Image")
      return (
        <img
          src={item.image ? item.image : ``}
          alt={item.title}
          className="w-[600px] h-[600px] object-cover rounded-xl shadow-md"
        />
      );

    if (imageOrVideo === "Video") {
      console.log(item.videoId);
      return (
        <iframe
          src={`https://www.youtube.com/embed/${item.videoId}`}
          title={item.title}
          className="w-[600px] h-[337.5px] rounded-xl shadow-md"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    return (
      <img
        src="globe.svg"
        alt="Unknown"
        className="w-[600px] h-[600px] object-cover rounded-xl shadow-md"
      />
    );
  };

  const Card = ({ item }: { item: SelectedListItem }) => (
    <div
      className="flex flex-col justify-center items-center w-1/2 p-4 m-2 rounded-2xl border border-[var(--border-color)] bg-[var(--inputhover-bg)] cursor-pointer transition-transform duration-300 :scale-105 hover:shadow-lg"
      onClick={() => handleOnClick(item)}
    >
      <span className="text-[var(--text-color)] text-xl font-semibold mb-4 text-center">
        {item.title}
      </span>
      {renderMedia(item)}
    </div>
  );

  if (finalWinner)
    return (
      <div className="flex justify-center items-center h-full bg-[var(--background-color)] p-8">
        <div className="flex flex-col justify-center items-center bg-[var(--input-bg)] p-6 rounded-2xl shadow-xl border border-[var(--border-color)]">
          <span className="text-[var(--primary-color)] text-3xl font-bold mb-6 cursor-alias">
            Winner: {finalWinner.title}
          </span>
          {renderMedia(finalWinner)}
        </div>
      </div>
    );

  if (!tournamentState) return null;

  return (
    <>
    <div className='flex justify-center'>
    <h1 className='text-6xl font-semibold justify-center'>Quiz Title </h1>
    </div>
    <div className="flex flex-col gap-8 items-center justify-center h-full bg-[var(--background-color)] p-6">
      <div className="text-2xl text-[var(--text-color)] font-bold">
        Round {index + 1} / {totalRoundCount}
      </div>
      <div className="flex justify-evenly items-center w-full gap-6">
        <Card item={tournamentState.first} />
        <span className="text-[var(--primary-color)] text-3xl font-bold">vs</span>
        <Card item={tournamentState.second} />
      </div>
    </div>
    </>
  );
};

export default Matchup;
