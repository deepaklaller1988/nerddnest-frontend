"use client";
import React, { useState, useEffect } from "react";

const GifSearch = () => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const url = process.env.NEXT_PUBLIC_GIF_API;

  useEffect(() => {
    const fetchTrendingGifs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/trending?api_key=${url}`
        );
        const gifData = await response.json();
        console.log("GIF Data :- ", gifData);
        setGifs(gifData.data);
      } catch (err: any) {
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
      {error && <div>Error: {error.err}</div>}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 ">
        {gifs.map((gif: any) => (
          <div key={gif.id} className="thumbHub w-full flex justify-center ">
            <img
            onClick={gif.title}
              src={gif.images.fixed_height.url}
              alt={gif.title}
              className="w-full max-w-[140px] md:max-w-[200px] lg:max-w-[220px] "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GifSearch;
