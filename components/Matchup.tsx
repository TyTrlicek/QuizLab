"use client";

import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { SelectedListItem } from './types';
import { Trophy, Zap, Crown, Sparkles, Swords } from 'lucide-react';

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
  pendingWinner?: SelectedListItem | null;
};

const Matchup: React.FC<MatchupProps> = ({
  tournamentState,
  index,
  handleOnClick,
  totalRoundCount,
  finalWinner,
  imageOrVideo,
  pendingWinner
}) => {

  // Helper to render the image or video
  const renderMedia = (item: SelectedListItem) => {
    if (imageOrVideo === "Image") {
      return (
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={item.image ? item.image : "globe.svg"}
            alt={item.title}
            className="w-full h-64 md:h-80 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
      );
    }
    if (imageOrVideo === "Video") {
      return (
        <div className="relative aspect-video rounded-2xl overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${item.videoId}`}
            title={item.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }
    return (
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src="globe.svg"
          alt="Unknown"
          className="w-full h-64 md:h-80 lg:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>
    );
  };

  // Enhanced Card component with modern design
  const Card = ({ item, disableClick = false, side }: { item: SelectedListItem, disableClick?: boolean, side?: 'left' | 'right' }) => (
    <motion.div
      layoutId={String(item.id)}
      className="glass-card group cursor-pointer transition-all duration-500 hover:scale-105 hover:border-cyan-400 w-full mx-auto"
      onClick={() => !disableClick && handleOnClick(item)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
      style={{ zIndex: 2 }}
    >
      {/* Media Section */}
      <div className="relative">
        {renderMedia(item)}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

        {/* Battle Icon */}
        <div className="absolute top-3 md:top-4 right-3 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-cyan-400/20 backdrop-blur-sm rounded-full p-1.5 md:p-2 border border-cyan-400/50">
            <Zap className="w-4 md:w-5 h-4 md:h-5 text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-white text-center group-hover:text-cyan-400 transition-colors duration-300">
          {item.title}
        </h3>

        {/* Selection Indicator */}
        <div className="mt-3 md:mt-4 flex justify-center">
          <div className="w-6 md:w-8 h-0.5 md:h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </motion.div>
  );

  // Final winner display with celebration
  if (finalWinner)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
        {/* Celebration Background */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-500/20 via-transparent to-transparent animate-pulse"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50,
                opacity: 0
              }}
              animate={{
                y: -50,
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </div>

        {/* Winner Card */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0.4 }}
          className="glass-card p-8 max-w-2xl mx-auto text-center relative"
        >
          {/* Crown Icon */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-pulse-glow">
              <Crown className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent mb-4"
          >
            🎉 CHAMPION! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="text-xl text-gray-300 mb-8"
          >
            {finalWinner.title}
          </motion.p>

          {/* Winner Media */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            {renderMedia(finalWinner)}
          </motion.div>

          {/* Sparkles Effect */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + (i * 10)}%`,
                  top: `${20 + (i % 3) * 20}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: 2.5 + (i * 0.2),
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );

  if (!tournamentState) return null;

  // --- Winner Animation: Elegant Center Display ---
  if (pendingWinner) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
        <AnimatePresence>
          <motion.div
            key={pendingWinner.id}
            layoutId={String(pendingWinner.id)}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -30 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.6
            }}
            className="glass-card p-8 max-w-lg w-full text-center relative overflow-hidden"
          >
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-600/10 to-amber-400/20 animate-gradient"></div>

            {/* Subtle Particle Effects */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                  style={{
                    left: `${20 + (i * 12)}%`,
                    top: `${30 + (i % 2) * 20}%`
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                    y: [0, -20, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.3 + (i * 0.1),
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Trophy Icon */}
              <motion.div
                initial={{ y: -30, scale: 0 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ delay: 0.1, type: "spring", bounce: 0.6 }}
                className="mb-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              {/* Winner Text */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent mb-4"
              >
                Winner!
              </motion.h2>

              {/* Winner Media */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mb-4 max-w-xs mx-auto"
              >
                {renderMedia(pendingWinner)}
              </motion.div>

              {/* Winner Title */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="text-xl font-bold text-white mb-4"
              >
                {pendingWinner.title}
              </motion.p>

              {/* Progress Bar */}
              <motion.div
                className="w-full h-1 bg-white/20 rounded-full overflow-hidden"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // --- Normal Matchup Battle Arena ---
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Battle Arena Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10"></div>

      {/* Animated Energy Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-cyan-400/30 rounded-full"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-purple-400/20 rounded-full"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Tournament Header */}
        <div className="text-center mb-8 md:mb-12 px-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            Tournament Battle
          </motion.h1>

          {/* Round Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3"
          >
            <Swords className="w-4 md:w-6 h-4 md:h-6 text-cyan-400" />
            <span className="text-lg md:text-xl font-bold text-white">
              Round {index + 1} of {totalRoundCount}
            </span>
          </motion.div>
        </div>

        {/* Battle Arena */}
        <div className="flex flex-col gap-6 md:gap-8 lg:flex-row items-center justify-center lg:gap-16 px-4">
          {/* First Contestant */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full max-w-sm lg:flex-1"
          >
            <Card item={tournamentState.first} side="left" />
          </motion.div>

          {/* VS Section */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", bounce: 0.6 }}
            className="flex flex-col items-center my-4 lg:my-0"
          >
            <div className="glass-card p-4 md:p-6 rounded-full border-2 border-cyan-400/50 bg-gradient-to-r from-cyan-400/10 to-purple-600/10">
              <span className="text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                VS
              </span>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mt-3 md:mt-4 w-6 md:w-8 h-6 md:h-8 border-2 border-cyan-400 border-t-transparent rounded-full"
            />
          </motion.div>

          {/* Second Contestant */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="w-full max-w-sm lg:flex-1"
          >
            <Card item={tournamentState.second} side="right" />
          </motion.div>
        </div>

        {/* Battle Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-8 md:mt-12 px-4"
        >
          <p className="text-gray-300 text-base md:text-lg">
            Choose your champion by clicking on your preferred option
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Matchup;
