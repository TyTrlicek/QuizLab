import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import QuizList from "@/components/QuizList";
import Dropdown from "@/components/Dropdown";
import { categoriesList } from "@/components/utils";


export default function Home() {

  const items : string[] = ['1','2']

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
      <QuizList />
    </main>
    </>
    
  );
}
