"use client"
import { redirect } from 'next/navigation';
import QuizCarousel from "@/components/QuizCarousel";
import { categoriesList } from "../../components/utils";
import { useState } from 'react'
import ImageSelector from "@/components/ImageSelector";
import ThumbnailUpload from "@/components/ThumbnailUpload";

const page = () => {

  const [quizTitle, setQuizTitle] = useState('');
  const [quizType, setQuizType] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedList, setSelectedList] = useState([]);
  const quizTemplates = ['Slideshow', 'Picture Click', 'Standard Text'];

  const handleQuizPublish = (quizTitle: string, quizType: string, selectedCategories: string[]) => {
    if(!quizType)
    {
        console.log('No Quiz Type Entered')
        return
    }
    console.log(`Quiz Type: ${quizType}`);
    if(!quizTitle)
        {
            console.log('No Quiz Title Entered')
            return
        }
    console.log(`Quiz Title: ${quizTitle}`);
    if(selectedCategories.length === 0)
        {
            console.log('No Categories Entered')
            return
        }
    console.log(`Categories: ${selectedCategories}`);
        
    if(quizType === 'Trivia') {
        redirect('/create/trivia');
    }

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
  
    if (checked) {
      const newSelected = [...selectedCategories, value];
      setSelectedCategories(newSelected);
      console.log('Added:', value);
      console.log('Selected Categories:', newSelected);
      console.log(quizTitle);
    } else {
      const newSelected = selectedCategories.filter((category) => category !== value);
      setSelectedCategories(newSelected);
      console.log('Removed:', value);
      console.log('Selected Categories:', newSelected);
    }
  };

  return (
    <div className="space-y-8 px-6 py-8 bg-background-color gradient-bg">
      <h1 className="mt-4 text-4xl font-bold mb-8 text-text-color">Create Quiz</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="bg-input-bg text-text-color p-3 m-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color w-full"
        />
      </div>

      <ThumbnailUpload />

      <div className="bg-dark-gray rounded-2xl shadow-lg p-4">
        <h2 className="text-lg font-semibold text-text-color mb-4">Choose Quiz Type</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["Tournament", "Trivia", "Tier List"].map((type) => (
            <label key={type} className="flex items-center justify-between border border-border-color rounded-xl bg-input-bg px-4 py-3 cursor-pointer shadow-md transition hover:bg-primary-color/10">
              <span className="text-sm font-medium text-text-color">{type}</span>
              <input
                type="radio"
                name="quiz-type"
                value={type}
                checked={quizType === type}
                onChange={(e) => setQuizType(e.target.value)}
                className="accent-primary-color w-4 h-4"
              />
            </label>
          ))}
        </div>
      </div>

      <h3 className="text-3xl text-primary-color font-semibold">Categories</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {categoriesList.map((category) => (
          <label key={category} 
          className="flex items-center space-x-2 p-3 border border-border-color rounded-xl cursor-pointer hover:bg-primary-color/10 transition">
            <input
              type="checkbox"
              id={category}
              value={category}
              className="accent-primary-color w-5 h-5 rounded-sm border-gray-300 focus:ring-primary-color"
              onChange={handleInputChange}
              checked={selectedCategories.includes(category)}
            />
            <span className="text-sm font-medium text-text-color">{category}</span>
          </label>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        

        {quizType === 'Trivia' && 
        <div>
            <h4>Template</h4>
            <QuizCarousel quizTemplates={quizTemplates}/>
            </div>
            }

        {quizType !== 'Trivia' && <ImageSelector />}

        
        
      </div>
      
      <div className="mt-8 flex justify-end">
        <button className="btn-primary px-6 py-2 rounded-lg mr-4">
          Save Draft
        </button>
        <button className="btn-accent px-6 py-2 rounded-lg"
        onClick={() => handleQuizPublish(quizTitle, quizType, selectedCategories)}
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default page;