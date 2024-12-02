"use client";
import React, { useEffect, useState } from "react";
import Stories, { WithSeeMore } from "react-insta-stories";

interface Story {
  content: ({ action, isPaused }: { action: any, isPaused: boolean }) => JSX.Element;
  seeMoreCollapsed?: ({ toggleMore, action }: { toggleMore: (value: boolean) => void, action: any }) => JSX.Element;
  seeMore?: ({ close }: { close: () => void }) => JSX.Element;
  duration?: number;
  description?: string;
  viewerInfo?: {
    name: string;
    avatar: string;
    viewCount: number;
  };
}

const App = () => {
  const [stories, setStories] = useState<Story[]>([]); 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const staticStories: Story[] = [
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
        description: "This is a beautiful sunset scene.",
        viewerInfo: {
          name: "John Doe",
          avatar: "https://i.pravatar.cc/100",
          viewCount: 45,
        },
      },
      {
        content: ({ action, story }: any) => (
          <WithSeeMore story={story} action={action}>
            <div style={contentStyle} onClick={handleStoryClick}>
              <p>Story with see more feature.</p>
            </div>
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
        duration: 5000,
        description: "A dynamic story with interactive elements.",
        viewerInfo: {
          name: "Jane Smith",
          avatar: "https://i.pravatar.cc/101",
          viewCount: 120,
        },
      },
    ];

    setStories(staticStories);
  }, []);

  const handleStoryClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  };

  if (!stories || stories.length === 0) {
    return <div>Loading stories...</div>;
  }

  return (
    <div className="App">
      <div className="viewer-info">
        <img
          src={stories[currentIndex]?.viewerInfo?.avatar}
          alt="Viewer Avatar"
          style={avatarStyle}
        />
        <h3>{stories[currentIndex]?.viewerInfo?.name}</h3>
        <p>{stories[currentIndex]?.description}</p>
        <p>{`Views: ${stories[currentIndex]?.viewerInfo?.viewCount}`}</p>
      </div>
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

const avatarStyle = {
  borderRadius: "50%",
  width: 50,
  height: 50,
};

export default App;
