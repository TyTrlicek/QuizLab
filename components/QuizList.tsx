import React from 'react'
import QuizCard from './QuizCard'

const QuizList = () => {
  return (
    <div>
        <ul className='mt-6 grid grid-cols-3 gap-3'>
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        </ul>
    </div>
  )
}

export default QuizList

