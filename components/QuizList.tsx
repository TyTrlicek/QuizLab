import React from 'react'
import QuizCard from './QuizCard'
import { DEFAULT_MEDIA_ITEM, isAnime, Post } from './types'

interface QuizListProps {
  posts: Post[],
  selectedSort: string;
  selectedCategory: string;
  searchQuery?: string;
}

const QuizList = ({ posts, selectedCategory, selectedSort, searchQuery = '' }: QuizListProps) => {
  const filteredPosts = posts
    .filter((post) => {
      const matchesCategory = selectedCategory === "all" || selectedCategory === "All Categories"
        ? true
        : post.selectedCategories.includes(selectedCategory);

      const matchesSearch = searchQuery === ''
        ? true
        : post.quizTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.selectedCategories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case 'Newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'Trending':
          return Math.random() - 0.5; // Random for now
        case 'Most Popular':
          return b.quizList.length - a.quizList.length;
        default:
          return 0;
      }
    });

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12 md:py-20 px-4">
        <div className="glass-card p-6 md:p-8 max-w-md mx-auto">
          <div className="text-3xl md:text-4xl mb-3 md:mb-4">🔍</div>
          <h3 className="text-lg md:text-xl font-bold mb-2">No quizzes found</h3>
          <p className="text-gray-400 text-sm md:text-base">Try adjusting your filters or search terms</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {filteredPosts.map((post, index) => (
        <QuizCard
          key={post.id}
          title={post.quizTitle}
          created={post.createdAt}
          user="default"
          thumbnail={post.image}
          id={post.id}
          categories={post.selectedCategories}
          length={post.quizList.length}
        />
      ))}
    </div>
  )
}

export default QuizList

