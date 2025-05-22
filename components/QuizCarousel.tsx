import React from 'react';

interface QuizCarouselProps {
  quizTemplates: string[]
  maxWidth?: string;
}

const QuizCarousel: React.FC<QuizCarouselProps> = ({ quizTemplates, maxWidth = '800px' }) => {
  return (
    <div
      className="flex overflow-x-auto gap-4 p-2"
      style={{ maxWidth }}
    >
      {quizTemplates.map((quizTemplate, index) => (
        <div key={index} className="flex-none">
          <button className='p-2 rounded-md bg-gray-500 border border-black cursor-pointer'>{quizTemplate}</button>
        </div>
      ))}
    </div>
  );
};

export default QuizCarousel;
