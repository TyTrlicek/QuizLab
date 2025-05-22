"use client"
import { redirect } from 'next/navigation';
import QuizCarousel from "@/components/QuizCarousel";
import { categoriesList, getImageUrl } from "../../components/utils";
import { useState } from 'react'
import ImageSelector from "@/components/ImageSelector";
import ThumbnailUpload from "@/components/ThumbnailUpload";
import { useSelectedList } from '@/components/SelectedListContext';
import axios from 'axios'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { DEFAULT_MEDIA_ITEM, DEFAULT_YOUTUBE_ITEM, SelectedListItem, YoutubeEntry } from '@/components/types';
import YoutubeApi from '@/components/YoutubeApi';

const page = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizType, setQuizType] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { selectedList, setSelectedList } = useSelectedList(); 
  const quizTemplates = ['Slideshow', 'Picture Click', 'Standard Text'];
  const [responseMsg, setResponseMsg] = useState('');
  const [imageOrVideo, setimageOrVideo] = useState('');

  

  const router = useRouter();

  const handleClearList = () => {
    setSelectedList([]);
  }



  const handleQuizPublish = async (quizTitle: string, quizType: string, selectedCategories: string[]) => {
    if(!quizType) return console.log('No Quiz Type Entered');
    if(!quizTitle) return console.log('No Quiz Title Entered');
    if(selectedCategories.length === 0) return console.log('No Categories Entered');

    if(quizType === 'Trivia') {
        redirect('/create/trivia');
    }

    if (quizType === 'Tournament' && imageOrVideo === "Image") {
      // Calculate the upper bound for padding (padded to the next power of 2)
    let upperBound = 2 ** Math.ceil(Math.log2(selectedList.length));

    const initialLength = selectedList.length;
    const paddedList = [...selectedList];

    // Add padding to the list to the next power of 2
    for (let i = initialLength; i < upperBound; i++) {
      paddedList.push(DEFAULT_MEDIA_ITEM);
    }

    setSelectedList(paddedList); // Set the padded list
      const reducedList = selectedList.map(item => ({
        id: item.id,
        title: item.title,
        image: getImageUrl(item),

      }));
    
      try {
        const data = {
          quizType,
          quizTitle,
          selectedCategories,
          reducedList,
          imageOrVideo,
        };    
        const res = await axios.post('http://localhost:5000/api/create', data);
        setResponseMsg(res.data.message);
    
        
    
        setTimeout(() => {
          router.push('/'); // Navigate to the tournament page
        }, 0);
      } catch (error) {
        console.error('Error sending Post request:', error);
        setResponseMsg('Something went wrong');
      }
    }
    

    if(quizType === 'Tournament' && imageOrVideo === "Video"){
      let upperBound = 2 ** Math.ceil(Math.log2(selectedList.length));
        
          const initialLength = selectedList.length;
          const paddedList = [...selectedList];
          for(let i = initialLength; i < upperBound; i++)
          {
            paddedList.push(DEFAULT_YOUTUBE_ITEM);
          }
          setSelectedList(paddedList);
          
          const reducedList = selectedList.map(item => ({
            id: item.id,
            title: item.title,
            image: getImageUrl(item),
            videoId: item.videoId
          }));
          try {
            const data = {
              quizType,
              quizTitle,
              selectedCategories,
              reducedList,
              imageOrVideo,
            };
        
            const res = await axios.post('http://localhost:5000/api/create', data);
            setResponseMsg(res.data.message);
        
            
    
            setTimeout(() => {
              router.push('/'); // Navigate to the tournament page
            }, 0);
          } catch (error) {
            console.error('Error sending Post request:', error);
            setResponseMsg('Something went wrong');
          }
          
    }
  }

  const handleListRemoval = (item: SelectedListItem) => {
    const updatedList = selectedList.filter(listItem => listItem !== item);
    setSelectedList(updatedList);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const newSelected = checked
      ? [...selectedCategories, value]
      : selectedCategories.filter((category) => category !== value);
    
    setSelectedCategories(newSelected);
  };

  return (
    <div className="space-y-8 px-6 py-8" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
      <h1 className="mt-4 text-4xl font-bold mb-8">Create Quiz</h1>

      <input
        type="text"
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
        className="bg-[var(--input-bg)] text-[var(--text-color)] p-3 m-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] w-full"
      />
      <div className='flex gap-4 justify-center items-center align-top'>
      <ThumbnailUpload />
      <div className="rounded-2xl shadow-lg p-4 w-1/2 justify-center flex flex-col" style={{ backgroundColor: 'var(--dark-gray)', borderColor: 'var(--border-color)' }}>
      <h3 className="text-3xl font-semibold text-white mb-2">Image/Video</h3>
      {["Image", "Video"].map((type) => (
            <label key={type} className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer shadow-md transition hover:bg-[var(--primary-color)]/10"
              style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)' }}>
              <span className="text-sm font-medium">{type}</span>
              <input
                type="radio"
                name="image-video"
                value={type}
                checked={imageOrVideo === type}
                onChange={(e) => setimageOrVideo(e.target.value)}
                className="accent-[var(--primary-color)] w-4 h-4"
              />
            </label>
          ))}
      </div>
      </div>

      <div className="rounded-2xl shadow-lg p-4" style={{ backgroundColor: 'var(--dark-gray)', borderColor: 'var(--border-color)' }}>
        <h2 className="text-3xl font-semibold mb-4">Choose Quiz Type</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["Tournament", "Trivia", "Tier List"].map((type) => (
            <label key={type} className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer shadow-md transition hover:bg-[var(--primary-color)]/10"
              style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)' }}>
              <span className="text-sm font-medium">{type}</span>
              <input
                type="radio"
                name="quiz-type"
                value={type}
                checked={quizType === type}
                onChange={(e) => setQuizType(e.target.value)}
                className="accent-[var(--primary-color)] w-4 h-4"
              />
            </label>
          ))}
        </div>
      </div>
      <div className="rounded-2xl shadow-lg p-4" style={{ backgroundColor: 'var(--dark-gray)', borderColor: 'var(--border-color)' }}>
        <h3 className="text-3xl font-semibold text-white">Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {categoriesList.map((category) => (
            <label key={category} className="flex items-center space-x-2 p-3 border rounded-xl cursor-pointer hover:bg-[var(--primary-color)]/10 transition"
              style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)' }}>
              <input
                type="checkbox"
                value={category}
                className="accent-[var(--primary-color)] w-5 h-5"
                onChange={handleInputChange}
                checked={selectedCategories.includes(category)}
              />
              <span className="text-sm font-medium">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {quizType === 'Trivia' && (
        <div>
          <h4>Template</h4>
          <QuizCarousel quizTemplates={quizTemplates}/>
        </div>
      )}

      {quizType !== 'Trivia' && imageOrVideo === 'Image' && (
        <div className='flex gap-y-2 justify-center align-top'>
          <div className='w-1/2'>
            <ImageSelector />
          </div>
          <div className='w-1/2'>
            <div className='flex justify-center items-center gap-x-8'>
              <h1 className="text-2xl font-semibold mb-4 text-center">Selected Images <span className='text-sm'>{`${selectedList.length}/64`}</span></h1>
              <Button variant={'default'} size={'sm'} effect={'ringHover'} onClick={handleClearList} className='cursor-pointer'>Clear List</Button>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border px-5 max-h-96 overflow-auto no-scrollbar my-4" style={{ borderColor: 'var(--text-color)' }}>
                {selectedList.map((item, index) => (
                  <div key={`selected-${index}`}>
                  <div className="relative group rounded-lg overflow-hidden shadow-md mt-1 mb-1 hover:shadow-lg transition-shadow duration-300 h-52">
                    <img src={getImageUrl(item)} alt={`Selected ${index}`} className="w-full h-full" />
                    <button
                      className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      title="Remove"
                      onClick={() => handleListRemoval(item)}
                    >
                      ✕
                    </button>
                    
                  </div>
                  <div key={`title-${index}`}>{item.title || 'default title'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    {imageOrVideo === "Video" && (
    <YoutubeApi/>
  )}


      <div className="mt-8 flex justify-end">
        <button
          className="px-6 py-2 rounded-lg mr-4 cursor-pointer"
          style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
        >
          Save Draft
        </button>
        <button
          className="px-6 py-2 rounded-lg cursor-pointer"
          style={{ backgroundColor: 'var(--accent-color)', color: 'var(--text-color)' }}
          onClick={() => handleQuizPublish(quizTitle, quizType, selectedCategories)}
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default page;
