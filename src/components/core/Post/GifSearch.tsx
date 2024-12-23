import React, { useState, useEffect } from "react";

const GifSearch = () => {
  const [gifs, setGifs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("funny");  // Default search term
  const [loading, setLoading] = useState<boolean>(false);

  const apiKey = "N3W7Xpoy6m4tIMg93ZppbrWRBcvAKInl"; // Your Giphy API key
  https://codesandbox.io/p/sandbox/react-giphy-searchbox-l8dxc
  // Fetch GIFs based on the search term
  useEffect(() => {
    const fetchGifs = async () => {
      setLoading(true);
      try {
        const response:any = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=10`
        );
        setGifs(response.data.data);
      } catch (error) {
        console.error("Error fetching GIFs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGifs();
  }, [searchTerm]); // This will trigger the effect whenever the search term changes

  return (
    <div>
      <h1>Search for GIFs</h1>
      <input
        type="text"
        placeholder="Search GIFs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="gif-gallery">
          {gifs.length > 0 ? (
            gifs.map((gif: any) => (
              <div key={gif.id}>
                <img
                  src={gif.images.fixed_height.url}
                  alt={gif.title}
                  className="gif"
                />
              </div>
            ))
          ) : (
            <p>No GIFs found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GifSearch;
