import React from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image';
import Link from 'next/link';

interface QuizCardProps {
  title: string,
  created: string,
  user: string,
  thumbnail: string;
  id: number;
}


const QuizCard = ({ title, created, user, thumbnail }: QuizCardProps) => {
  console.log("thumbnail", thumbnail)
  return (
    <Link href={`/tournament/?{id}`}>
    <div className="rounded-lg overflow-hidden shadow-md flex flex-col h-full">
  {/* Image container with dynamic height */}
  <div className="flex items-center justify-center overflow-hidden border-b-2 border-gray-700 py-0"  style={{ backgroundColor: 'var(--dark-gray)'}}>
    <img
      src={thumbnail}
      alt="post thumbnail"
      className="max-w-full max-h-52 min-w-2/3"

    />
  </div>
  
  {/* Content section */}
  <div className="p-4 flex-grow" style={{ backgroundColor: 'var(--dark-gray)'}}>
    <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
    <p className="text-sm text-gray-600">Created by: {user}</p>
  </div>
</div>
</Link>
  )
}

export default QuizCard