'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import QuizList from "@/components/QuizList";
import Dropdown from "@/components/Dropdown";
import { categoriesList } from "@/components/utils";
import { useEffect, useState } from "react";
import { Post, SelectedListItem } from "@/components/types";




export default function Home() {
  const [postState, setPostState] = useState<Post[]>([]);
  const [selectedSort, setSelectedSort] = useState('Newest');
  const [selectedCategory, setSelectedCategory] = useState('all');

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
    <>
      <div className="h-12 mt-2 flex items-end justify-start gap-x-4 lg:mx-48 md:mx-32 sm:mx-2">
  <div className="flex items-end gap-x-4">
    <Dropdown
      dropDownElements={['Newest', 'Trending', 'Most Popular']}
      dropDownTitle="sort"
      onChange={setSelectedSort}
    />
    <Dropdown
      dropDownElements={categoriesList}
      dropDownTitle="categories"
      onChange={setSelectedCategory}
    />
  </div>
  <input
    type="text"
    placeholder="Search"
    className="border-2 border-gray-500 rounded-2xl p-2 w-1/3"
  />
</div>

      <main>
        <QuizList
          posts={postState}
          selectedSort={selectedSort}
          selectedCategory={selectedCategory}
        />
      </main>
    </>
  );
}
