import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const Stories = dynamic(() => import('react-insta-stories'), { ssr: false });

interface StoryDetailModalProps {
  stories: any[];
  togglePopup: () => void;
  alldata: any[];
  selectedStory: any
}

const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  stories,
  togglePopup,
  alldata,
  selectedStory
}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUserIndex, setCurrentUserIndex] = useState(selectedStory.index);
  const [story,setStory]=useState(stories)

  const formattedStories: any[] = story.flatMap((story) =>
    story.stories.map((item: any) => {
      const isVideo = item.media_url?.includes("videos"); 
      
      return {
        url: item.media_url || "",
        type: isVideo ? 'video' : 'image', 
        header: {
          heading: `${story.user?.firstname || ""} ${story.user?.lastname || ""}`,
          subheading: "1 hour ago",
          profileImage: story.user?.image || "/profile-avatar-legacy-50.png",
        },
        duration: item.duration ? item.duration * 1000 : 5000,
      };
    })
  );
  

  const goToNextUser = () => {
    if (currentUserIndex + 1 < alldata.length) {
      setCurrentUserIndex(currentUserIndex + 1);  
      setCurrentIndex(0); 
      setStory([alldata[currentUserIndex + 1]]);  
    } else {
      togglePopup();  
    }
  };

  const goToPreviousUser = () => {
    if (currentUserIndex - 1 >= 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      setCurrentIndex(alldata[currentUserIndex - 1].stories.length - 1);
      setStory([alldata[currentUserIndex - 1]]);
      setCurrentIndex(0); 
    } else {
      togglePopup();
    }
  };

  const onStoryEnd = (storyIndex: number) => {
    if (storyIndex + 1 >= alldata[currentUserIndex]?.stories.length) {
      goToNextUser();  // Go to the next user when the current user's stories are finished
    } else {
      setCurrentIndex(storyIndex + 1);  // Move to the next story automatically
    }
  };


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
    >
      <div
        className="w-full max-w-[400px] h-full flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Stories
          stories={formattedStories}
          defaultInterval={alldata[currentUserIndex]?.stories[currentIndex]?.duration || 5000}
          currentIndex={currentIndex}
          onStoryEnd={(s: any, storyIndex: any) => onStoryEnd(storyIndex)}
          onAllStoriesEnd={togglePopup}
          width="100%"
          height="100%"
        />
      </div>
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={togglePopup}
      >
        ✕
      </button>

      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4 w-full flex justify-between items-center">
        <button
          onClick={goToPreviousUser}
          className="bg-white text-black px-4 py-2 rounded-full"
        >
          &lt;
        </button>

        <button
          onClick={goToNextUser}
          className="bg-white text-black px-4 py-2 rounded-full"
        >
          &gt; 
        </button>
      </div>
    </div>
  );
};

export default StoryDetailModal;
