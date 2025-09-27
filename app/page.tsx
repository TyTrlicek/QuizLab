'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import QuizList from "@/components/QuizList";
import Dropdown from "@/components/Dropdown";
import { categoriesList } from "@/components/utils";
import { useEffect, useState } from "react";
import { Post, SelectedListItem } from "@/components/types";
import { Search, Filter, TrendingUp, Clock, Star, Zap } from "lucide-react";

export default function Home() {
  const [postState, setPostState] = useState<Post[]>([]);
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('http://localhost:5000/home');
        const data = await res.json();
        setPostState(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 md:px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 md:mb-6 animate-gradient px-2">
            QuizLab
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Create and compete in epic head-to-head tournaments with images and videos
          </p>

          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mb-8 md:mb-12 px-4">
            <div className="glass-card p-3 md:p-4 text-center animate-float">
              <div className="text-xl md:text-2xl font-bold text-cyan-400">{postState.length}</div>
              <div className="text-xs md:text-sm text-gray-400">Active Tournaments</div>
            </div>
            <div className="glass-card p-3 md:p-4 text-center animate-float" style={{animationDelay: '0.5s'}}>
              <div className="text-xl md:text-2xl font-bold text-purple-400">1.2K</div>
              <div className="text-xs md:text-sm text-gray-400">Battles Fought</div>
            </div>
            <div className="glass-card p-3 md:p-4 text-center animate-float" style={{animationDelay: '1s'}}>
              <div className="text-xl md:text-2xl font-bold text-amber-400">Beta</div>
              <div className="text-xs md:text-sm text-gray-400">Version</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 md:top-20 left-4 md:left-10 w-12 md:w-20 h-12 md:h-20 bg-cyan-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 md:bottom-20 right-4 md:right-10 w-10 md:w-16 h-10 md:h-16 bg-purple-500/20 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
      </section>

      {/* Filter Section */}
      <section className="px-4 md:px-6 pb-6 md:pb-8 relative z-[50]">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-4 md:p-6 mb-6 md:mb-8 relative z-[50]">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="relative w-full">
                {/* <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> */}
                <input
                  type="text"
                  placeholder="Search tournaments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center relative z-[60]">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Filter className="w-4 h-4" />
                  <span>Sort & Filter:</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 relative z-[60]">
                  <Dropdown
                    dropDownElements={['Newest', 'Trending', 'Most Popular']}
                    dropDownTitle={selectedSort}
                    onChange={setSelectedSort}
                    width="w-full sm:w-auto"
                  />

                  <Dropdown
                    dropDownElements={['All Categories', ...categoriesList]}
                    dropDownTitle={selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                    onChange={(value) => setSelectedCategory(value === 'All Categories' ? 'all' : value)}
                    width="w-full sm:w-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Featured Categories */}
          <div className="mb-6 md:mb-8 mt-16 md:mt-20 relative z-[10]">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2 px-2">
              <TrendingUp className="w-5 md:w-6 h-5 md:h-6 text-cyan-400" />
              Trending Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {['gaming', 'movies', 'music', 'sports', 'science', 'anime'].map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="glass-card p-3 md:p-4 text-center hover:border-cyan-400 transition-all group relative z-[10]"
                >
                  <div className="w-10 md:w-12 h-10 md:h-12 mx-auto mb-2 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Zap className="w-5 md:w-6 h-5 md:h-6 text-white" />
                  </div>
                  <div className="text-xs md:text-sm font-medium">{category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quiz List */}
      <main className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-400" />
            Featured Tournaments
          </h2>
          <QuizList
            posts={postState}
            selectedSort={selectedSort}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
          />
        </div>
      </main>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/5 to-transparent rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
