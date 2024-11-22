"use client";
import React, { useEffect, useState } from "react";
import Stories, { WithSeeMore } from "react-insta-stories";

const App = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      const fetchedStories :any= [
        {
          content: ({ action, isPaused }:any) => (
            <div style={contentStyle}>
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
          seeMoreCollapsed: ({ toggleMore, action }:any) => (
            <p onClick={() => toggleMore(true)}>Click to see more →</p>
          ),
          seeMore: ({ close }:any) => (
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
