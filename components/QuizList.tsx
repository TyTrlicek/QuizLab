import React from 'react'
import QuizCard from './QuizCard'
import { DEFAULT_MEDIA_ITEM, isAnime, Post } from './types'

interface QuizListProps {
  posts: Post[],
  selectedSort: string;
  selectedCategory: string;
}


const QuizList = ({ posts, selectedCategory, selectedSort }: QuizListProps) => {
  console.log(selectedCategory);
  console.log(selectedSort);

  const filteredPosts = posts
  .filter((post) =>
    selectedCategory === "all" ? true : post.selectedCategories.includes(selectedCategory)
  )
  
  return (
    <div>
        <ul className='mt-6 lg:mx-48 md:mx-32 sm:mx-2 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
          {filteredPosts.map((post, index) => (
            <QuizCard key={index} title={post.quizTitle} created={post.createdAt} user="default" thumbnail={post.image} id={post.id} categories={post.selectedCategories} length={post.quizList.length}/>
          ))}
        </ul>
    </div>
  )
}

export default QuizList

