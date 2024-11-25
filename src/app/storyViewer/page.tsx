"use client";
import React, { useEffect, useState } from "react";
import Stories, { WithSeeMore } from "react-insta-stories";

interface Story {
  content: ({ action, isPaused }: { action: any, isPaused: boolean }) => JSX.Element;
  seeMoreCollapsed?: ({ toggleMore, action }: { toggleMore: (value: boolean) => void, action: any }) => JSX.Element;
  seeMore?: ({ close }: { close: () => void }) => JSX.Element;
  duration?: number;
}

const App = () => {
  const [stories, setStories] = useState<Story[]>([]); 
   const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      const fetchedStories: Story[] = [
        {
          content: ({ action, isPaused }) => (
            <div style={contentStyle} onClick={handleStoryClick}>
              <img
                style={image}
                src="https://i.ibb.co/fY1DmQW/8aacdef9ba37db60c7a96271877cfbb5.jpg"
                alt="Example"
              />
            </div>
          ),
        },
        {
          content: ({ action, story }:any) => (
            <WithSeeMore story={story} action={action}>
            </WithSeeMore>
          ),
          seeMoreCollapsed: ({ toggleMore, action }) => (
            <p onClick={() => toggleMore(true)}>Click to see more →</p>
          ),
          seeMore: ({ close }) => (
            <div style={{ maxWidth: "100%", height: "100%", padding: 40, background: "white" }}>
              <h2>More details about the dynamic story.</h2>
              <p style={{ textDecoration: "underline" }} onClick={close}>Close</p>
            </div>
          ),
          duration: 1000,
        },
      ];

      setStories(fetchedStories);
    };

    fetchStories();
  }, []);
  const handleStoryClick = () => {
    // Increment the current index to go to the next story
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  if (!stories || stories.length === 0) {
    return <div>Loading stories...</div>;
  }

  return (
    <div className="App">
      <div className="stories">
        <Stories
          loop
          keyboardNavigation
          defaultInterval={10000}
          stories={stories}
          currentIndex={currentIndex}
        />
      </div>
    </div>
  );
};

const contentStyle = {
  background: "salmon",
  width: "100%",
  padding: 20,
  color: "white",
};

const image = {
  display: "block",
  maxWidth: "100%",
  borderRadius: 4,
};

export default App;
