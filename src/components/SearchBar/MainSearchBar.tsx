"use client"
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import ViewButton from "../Buttons/ViewButtons";

// Define the type for the search result item
interface SearchResult {
  title: string;
  description: string;
  author: string;
  date: string;
}

export default function MainSearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  
  // Static data with type annotations
  const staticData: SearchResult[] = [
    { title: "Introduction to React", description: "Learn the basics of React.", author: "John Doe", date: "Jan 1, 2024" },
    { title: "Advanced JavaScript", description: "Dive into advanced concepts of JavaScript.", author: "Jane Smith", date: "Feb 15, 2024" },
    { title: "CSS for Beginners", description: "Get started with CSS.", author: "Alice Brown", date: "Mar 10, 2024" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    
    setSearchTerm(value);

    if (value) {
      const filteredResults = staticData.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  const handleonClick = () => {
    // Implement the functionality for the View All button click
  };

  return (
    <div className="relative w-[280px]">
      <div className="relative flex items-center justify-between">
        <FiSearch className="text-[18px] absolute left-[15px] text-[var(--lightgrey)]" />
        <input
          className="bg-white rounded-full p-[10px] pl-12 w-full"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <MdClose
          className={`absolute right-[15px] text-[var(--lightgrey)] cursor-pointer ${searchTerm ? "opacity-1" : "opacity-0"}`}
          onClick={handleClearSearch}
        />
      </div>

      {searchTerm && (
        <div className="w-full overflow-y-auto overflow-x-hidden rounded-lg bg-white absolute mt-1 max-h-[500px]">
          {results.length > 0 ? (
            results.map((result, index) => (
              <section
                key={index}
                className="cursor-pointer flex gap-4 justify-between items-start p-4 border-b border-black/10 hover:bg-gray-400/10 duration-[.5s]"
              >
                <span className="min-w-12 min-h-12 w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
                  <IoDocumentText className="text-black/50 w-6 h-6" />
                </span>
                <div className="w-full">
                  <b className="text-[var(--highlight)]">{result.title}</b>
                  <p>{result.description}</p>
                  <div className="flex flex-wrap gap-x-2 text-[13px] text-black/30">
                    <span>By {result.author}</span>
                    <span className="middot">·</span>
                    <span>{result.date}</span>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No results found.</div>
          )}

          <ViewButton
            onClick={handleonClick}
            name="View All"
            className="sticky bottom-0 bg-white font-semibold w-full p-4 text-center flex gap-2 items-center justify-center text-[var(--highlight-blue)] hover:text-[--highlight]"
          />
        </div>
      )}
    </div>
  );
}
