import React, { useState, useEffect } from 'react';

// Define TypeScript interfaces for the GIF data
interface Gif {
  media: { gif: { url: string } }[];
  title: string;
}

const GifSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('funny'); // Initial search term
  const [gifs, setGifs] = useState<Gif[]>([]); // Store fetched GIFs
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  const apiKey = 'AIzaSyD6SfBtiJhdkbVWVVDn_Fzf9-bWcqXtyDs'; // Your Tenor API key
  const apiUrl = 'https://g.tenor.com/v1/search'; // Tenor API URL

  // Fetch GIFs from Tenor using the search query
  const fetchGifs = async (searchQuery: string) => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const url = `${apiUrl}?q=${searchQuery}&key=${apiKey}&limit=8`;
      const response = await fetch(url); // Fetch data from the API
      const data = await response.json(); // Parse the response as JSON

      setGifs(data.results); // Store the fetched GIFs in state
    } catch (error) {
      console.error('Error fetching GIFs:', error); // Handle errors
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  // Trigger the search whenever the query changes
  useEffect(() => {
    fetchGifs(query);
  }, [query]);

  return (
    // <div>
    //   <h1>Search GIFs</h1>
    //   <input
    //     type="text"
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)} // Update query on change
    //     placeholder="Search for GIFs"
    //   />
    //   {loading ? (
    //    "loading"
    //   ) : (
    //     <div className="gif-container">
    //       {gifs.map((gif, index) => (
    //         <div key={index} className="gif-item">
    //           <img src={gif.media[0].gif.url} alt={gif.title} />
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <></>
  );
};

export default GifSearch;
