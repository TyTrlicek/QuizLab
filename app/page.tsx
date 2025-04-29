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

  const items : string[] = ['1','2']
  const [postState, setPostState] = useState<Post[]>([]);

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
  

  useEffect(() => {
    console.log(postState);
  }, [postState]);

  return (
    <>
    <div className = "h-12 mt-2 flex justify-between mx-4">

      <div className="flex items-center gap-x-4 flex-1/2">
        <Dropdown dropDownElements={['Newest', 'Trending', 'Most Popular']} dropDownTitle={'sort'}/>
        <Dropdown dropDownElements={categoriesList} dropDownTitle={'categories'}/>
      </div>
      <input type = "text" placeholder='Search' className='border-2 border-gray-500 rounded-2xl p-2 flex-1/2 mx-4'></input>
    </div>
    <main>
      <div>{postState.length > 0 ? postState[0].quizTitle : "Loading..."}</div>
      <QuizList posts={postState}/>
    </main>
    </>
    
  );
}
