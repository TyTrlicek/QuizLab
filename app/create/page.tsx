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
  const [toggleTitleEdit, setToggleTitleEdit] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);


  

  const router = useRouter();

  const handleClearList = () => {
    setSelectedList([]);
  }

  const handleTitleChange = (index: number, newTitle: string) => {
    const updatedList = selectedList.map((item, i) => 
    i === index ? {...item, title: newTitle } : item);

    setSelectedList(updatedList);
  };



  const handleQuizPublish = async (quizTitle: string, quizType: string, selectedCategories: string[]) => {
    if(!quizType) return console.log('No Quiz Type Entered');
    if(!quizTitle) return console.log('No Quiz Title Entered');
    if(selectedCategories.length === 0) return console.log('No Categories Entered');

    if(quizType === 'Trivia') {
        redirect('/create/trivia');
    }

    if (quizType === 'Tournament' && imageOrVideo === "Image") {

    let upperBound = 2 ** Math.ceil(Math.log2(selectedList.length));

    const initialLength = selectedList.length;
    const paddedList = [...selectedList];

    for (let i = initialLength; i < upperBound; i++) {
      paddedList.push(DEFAULT_MEDIA_ITEM);
    }

    setSelectedList(paddedList);
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
          router.push('/');
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
              router.push('/');
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
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 px-4 md:px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 animate-gradient px-2">
            Create Tournament
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Design epic head-to-head battles with images or videos
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 md:top-20 left-4 md:left-10 w-12 md:w-20 h-12 md:h-20 bg-cyan-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-10 md:bottom-20 right-4 md:right-10 w-10 md:w-16 h-10 md:h-16 bg-purple-500/20 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-20 space-y-6 md:space-y-8">
        {/* Quiz Title */}
        <div className="glass-card p-4 md:p-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base">1</span>
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-white">Tournament Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tournament Title</label>
              <input
                type="text"
                placeholder="Enter an engaging title for your tournament..."
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Quiz Type & Media Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Thumbnail Upload */}
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-purple-400 to-amber-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-base">2</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Thumbnail</h3>
            </div>
            <ThumbnailUpload />
          </div>

          {/* Media Type Selection */}
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-amber-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-base">3</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Media Type</h3>
            </div>

            <div className="space-y-3">
              {["Image", "Video"].map((type) => (
                <label
                  key={type}
                  className={`flex items-center justify-between p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                    imageOrVideo === type
                      ? 'border-cyan-400 bg-cyan-400/10'
                      : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      imageOrVideo === type ? 'border-cyan-400 bg-cyan-400' : 'border-gray-400'
                    }`}>
                      {imageOrVideo === type && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <span className="font-medium text-white text-sm md:text-base">{type}</span>
                  </div>
                  <input
                    type="radio"
                    name="image-video"
                    value={type}
                    checked={imageOrVideo === type}
                    onChange={(e) => setimageOrVideo(e.target.value)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Quiz Type Selection */}
        <div className="glass-card p-4 md:p-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base">4</span>
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-white">Tournament Type</h2>
          </div>

          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {[
              { type: "Tournament", desc: "Head-to-head elimination battles", icon: "🏆" }
            ].map(({ type, desc, icon }) => (
              <label
                key={type}
                className={`p-4 md:p-6 rounded-xl cursor-pointer transition-all duration-300 border text-center ${
                  quizType === type
                    ? 'border-cyan-400 bg-cyan-400/10'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">{icon}</div>
                <h3 className="font-bold text-white mb-1 md:mb-2 text-sm md:text-base">{type}</h3>
                <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4">{desc}</p>
                <div className={`w-4 h-4 rounded-full border-2 mx-auto ${
                  quizType === type ? 'border-cyan-400 bg-cyan-400' : 'border-gray-400'
                }`}>
                  {quizType === type && (
                    <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="quiz-type"
                  value={type}
                  checked={quizType === type}
                  onChange={(e) => setQuizType(e.target.value)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Categories Selection */}
        <div className="glass-card p-4 md:p-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base">5</span>
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-white">Categories</h2>
            <span className="text-xs md:text-sm text-gray-400 ml-auto">
              {selectedCategories.length} selected
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
            {categoriesList.map((category) => (
              <label
                key={category}
                className={`p-2 md:p-3 rounded-xl cursor-pointer transition-all duration-300 border text-center ${
                  selectedCategories.includes(category)
                    ? 'border-cyan-400 bg-cyan-400/10'
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-center gap-1 md:gap-2">
                  <div className={`w-3 h-3 rounded border ${
                    selectedCategories.includes(category)
                      ? 'border-cyan-400 bg-cyan-400'
                      : 'border-gray-400'
                  }`}>
                    {selectedCategories.includes(category) && (
                      <div className="w-1 h-1 bg-white rounded m-0.5"></div>
                    )}
                  </div>
                  <span className="text-xs md:text-sm font-medium text-white">{category}</span>
                </div>
                <input
                  type="checkbox"
                  value={category}
                  onChange={handleInputChange}
                  checked={selectedCategories.includes(category)}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Content Selection */}
        {quizType === 'Tournament' && (
          <div className="glass-card p-4 md:p-8">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm md:text-base">5</span>
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-white">Tournament Content</h2>
            </div>

            {imageOrVideo === 'Image' && (
              <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
                {/* Image Selector */}
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Browse Images</h3>
                  <div className="border border-white/10 rounded-xl p-3 md:p-4">
                    <ImageSelector />
                  </div>
                </div>

                {/* Selected Images */}
                <div>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h3 className="text-base md:text-lg font-semibold text-white">
                      Selected Images
                      <span className="text-xs md:text-sm text-gray-400 ml-2">
                        {selectedList.length}/64
                      </span>
                    </h3>
                    <button
                      onClick={handleClearList}
                      className="btn btn-secondary text-xs md:text-sm"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="border border-white/10 rounded-xl p-3 md:p-4 max-h-80 md:max-h-96 overflow-auto no-scrollbar">
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      {selectedList.map((item, index) => (
                        <div key={`selected-${index}`} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-800">
                            <img
                              src={getImageUrl(item)}
                              alt={`Selected ${index}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <button
                              className="absolute top-1 md:top-2 right-1 md:right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 md:w-6 h-5 md:h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              title="Remove"
                              onClick={() => handleListRemoval(item)}
                            >
                              ✕
                            </button>
                          </div>

                          {/* Title Editor */}
                          <div className="mt-1 md:mt-2">
                            {editingIndex === index ? (
                              <input
                                value={item.title}
                                onChange={e => handleTitleChange(index, e.target.value)}
                                onBlur={() => setEditingIndex(null)}
                                autoFocus
                                className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-xs"
                              />
                            ) : (
                              <div className="flex items-center gap-1 md:gap-2">
                                <span className="text-xs text-gray-300 flex-1 truncate">
                                  {item.title || 'Untitled'}
                                </span>
                                <button
                                  onClick={() => setEditingIndex(index)}
                                  className="text-xs px-1 md:px-2 py-1 rounded bg-cyan-500 hover:bg-cyan-600 text-white"
                                >
                                  Edit
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {imageOrVideo === "Video" && (
              <div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Video Selection</h3>
                <YoutubeApi/>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-end items-center pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
            <button className="btn btn-secondary w-full sm:w-auto">
              Save Draft
            </button>
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={() => handleQuizPublish(quizTitle, quizType, selectedCategories)}
            >
              Create Tournament
            </button>
          </div>
          {responseMsg && (
            <div className="text-center w-full sm:w-auto">
              <span className="text-sm text-green-400">{responseMsg}</span>
            </div>
          )}
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/5 to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default page;
