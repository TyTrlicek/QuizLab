import React from 'react'
import QuizCard from './QuizCard'
import { DEFAULT_MEDIA_ITEM, isAnime, Post } from './types'
import { getImageUrl } from './utils'

interface QuizListProps {
  posts: Post[]
}


const QuizList = ({ posts }: QuizListProps) => {
  return (
    <div>
        <ul className='mt-6 grid grid-cols-3 gap-3'>
          {posts.map((post, index) => (
            <QuizCard key={index} title={post.quizTitle} created={post.createdAt} user="default" thumbnail={post.image} id={post.id}/>
          ))}
        </ul>
    </div>
  )
}

export default QuizList

