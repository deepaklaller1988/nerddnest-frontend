"use client";
import React, { useState, useEffect } from "react";

const GifSearch = () => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingGifs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.giphy.com/v1/gifs/trending?api_key=QV1Ct5jaIOieqWjObXgVOue3QQQuj6LR"
        );
        const data = await response.json();
        setGifs(data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingGifs();
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div className="gif-container">
        {gifs.map((gif) => (
          <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
        ))}
      </div>
    </div>
  );
};

export default GifSearch;
