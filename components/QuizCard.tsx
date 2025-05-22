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
  categories: string[];
  length: number;
}


const QuizCard = ({ title, created, user, thumbnail, id, categories, length }: QuizCardProps) => {
  console.log("id", id)
  return (
    <Link href={`/tournament/${id}`}>
    <div className="rounded-lg overflow-hidden shadow-md flex flex-col h-96 not-[]:h-full cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg">
  {/* Image container with dynamic height */}
  <div className="flex items-center justify-center overflow-hidden border-b-2 border-gray-700 py-0 h-2/3"  style={{ backgroundColor: 'var(--background-secondary)'}}>
    <img
      src={thumbnail}
      alt="post thumbnail"
      className="max-w-full h-full min-w-2/3"
    />
  </div>
  
  {/* Content section */}
  <div className="p-4 flex flex-col h-1/3" style={{ backgroundColor: 'var(--background-secondary)'}}>
    <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
    <div>
      <p className="text-sm text-white">Created by: {user}</p>
      <p className="text-sm text-white">Date Created: {created}</p>
    </div>
    <p style={{color: 'var(--text-secondary)'}}>Items: {length}</p>

    <div className='flex flex-row mt-2 gap-2 overflow-x-auto no-scrollbar'>
    {categories.map((category, index) => (
      <div key={index} className='inline rounded-md p-1 font-semibold text-white max-h-8 w-fit whitespace-nowrap ' style={{backgroundColor: 'var(--accent-color)'}}>{category}</div>
    ))}
  </div>
  </div>

  
</div>
</Link>
  )
}

export default QuizCard