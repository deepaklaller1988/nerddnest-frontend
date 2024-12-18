import React, { useEffect, useState } from "react";
import Stories from "react-insta-stories";

interface StoryDetailModalProps {
  stories: any[];
  selectedStory: number;
  togglePopup: () => void;
  alldata: any;
}

const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  stories,
  selectedStory,
  togglePopup,
  alldata,
}) => {
  const [currentIndex, setCurrentIndex] = useState(selectedStory);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const formattedStories: any[] = stories.flatMap((story, userIndex) =>
    story.stories.map((item: any) => ({
      url: item.media_url || "",
      header: {
        heading: `${story.user?.firstname || ""} ${story.user?.lastname || ""}`,
        subheading: "1 hour ago",
        profileImage: story.user?.image || "/profile-avatar-legacy-50.png",
      },
      duration: item.duration ? item.duration * 1000 : 5000,
      userIndex,
    }))
  );

  // Move to the next user or story automatically when the current story ends
  const goToNextUser = () => {
    if (currentIndex + 1 < formattedStories.length) {
      setCurrentIndex(currentIndex + 1); // Move to the next story within the same user
    } else if (currentUserIndex + 1 < alldata.length) {
      // If it's the last story of the current user, move to the next user
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentIndex(0); // Start with the first story of the next user
    } else {
      togglePopup(); // Close the popup if there are no more users
    }
  };

  // Move to the previous user or story
  const goToPreviousUser = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1); // Move to the previous story within the same user
    } else if (currentUserIndex - 1 >= 0) {
      // If it's the first story of the current user, move to the previous user
      setCurrentUserIndex(currentUserIndex - 1);
      setCurrentIndex(alldata[currentUserIndex - 1].stories.length - 1); // Start with the last story of the previous user
    } else {
      togglePopup(); // Close the popup if there are no previous users
    }
  };

  // Logic to handle when a story ends
  const onStoryEnd = (storyIndex: number) => {
    if (storyIndex + 1 >= alldata[currentUserIndex]?.stories.length) {
      goToNextUser(); // If the current user's stories are finished, go to the next user
    } else {
      setCurrentIndex(storyIndex + 1); // Otherwise, move to the next story automatically
    }
  };

  const onAllStoriesEnd = () => {
    togglePopup(); // Close the popup when all stories are finished
  };

  useEffect(() => {
    setCurrentIndex(selectedStory); // Set the selected story as the current index when it changes
  }, [selectedStory]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
      onClick={togglePopup}
    >
      <div
        className="w-full max-w-[400px] h-full flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Stories
          stories={formattedStories}
          defaultInterval={formattedStories[currentIndex]?.duration || 5000}
          currentIndex={currentIndex}
          onStoryEnd={(s: any, storyIndex: any) => onStoryEnd(storyIndex)}
          onAllStoriesEnd={onAllStoriesEnd}
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

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {/* Previous User Button */}
        <button
          onClick={goToPreviousUser}
          className="bg-white text-black px-4 py-2 rounded-full"
        >
          &lt; {/* Left arrow symbol */}
        </button>

        {/* Next User Button */}
        <button
          onClick={goToNextUser}
          className="bg-white text-black px-4 py-2 rounded-full"
        >
          &gt; {/* Right arrow symbol */}
        </button>
      </div>
    </div>
  );
};

export default StoryDetailModal;
