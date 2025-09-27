import React from 'react'
import Link from 'next/link';
import { Clock, User, Hash, Play, Trophy, Brain } from 'lucide-react';

interface QuizCardProps {
  title: string,
  created: string,
  user: string,
  thumbnail: string;
  id: number;
  categories: string[];
  length: number;
}

const QuizCard = ({ title, created, user, thumbnail, id, categories, length }: QuizCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getQuizIcon = () => {
    // You can customize this based on quiz type if you have that data
    return <Brain className="w-5 h-5" />;
  };

  return (
    <Link href={`/tournament/${id}`}>
      <div className="glass-card group cursor-pointer h-full flex flex-col overflow-hidden">
        {/* Thumbnail Section */}
        <div className="relative h-40 md:h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-cyan-400/20 backdrop-blur-sm rounded-full p-3 md:p-4 border border-cyan-400/50">
              <Play className="w-6 md:w-8 h-6 md:h-8 text-cyan-400 fill-current" />
            </div>
          </div>

          {/* Quiz Type Badge */}
          <div className="absolute top-2 md:top-3 left-2 md:left-3 z-20">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2 md:px-3 py-1 flex items-center gap-1 md:gap-2">
              {getQuizIcon()}
              <span className="text-xs font-medium text-white">Tournament</span>
            </div>
          </div>

          {/* Item Count */}
          <div className="absolute top-2 md:top-3 right-2 md:right-3 z-20">
            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg px-2 md:px-3 py-1 flex items-center gap-1">
              <Hash className="w-3 h-3" />
              <span className="text-xs font-bold text-white">{length}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3 md:p-5 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="font-bold text-base md:text-lg text-white mb-2 md:mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>

          {/* Meta Info */}
          <div className="flex items-center gap-3 md:gap-4 text-xs text-gray-400 mb-3 md:mb-4">
            {/* <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{user}</span>
            </div> */}
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="hidden sm:inline">{formatDate(created)}</span>
              <span className="sm:hidden">{new Date(created).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
            {categories.slice(0, 2).map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium rounded-md bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-300 border border-cyan-500/30"
              >
                {category}
              </span>
            ))}
            {categories.length > 2 && (
              <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-500/20 text-gray-400 border border-gray-500/30">
                +{categories.length - 2}
              </span>
            )}
          </div>

          {/* Hover Effect Line */}
          <div className="h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 mt-3 md:mt-4"></div>
        </div>
      </div>
    </Link>
  )
}

export default QuizCard