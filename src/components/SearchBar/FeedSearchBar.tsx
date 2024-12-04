import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";

// interface SearchResult {
//   title: string;
//   description: string;
//   author: string;
//   date: string;
// }

export default function FeedSearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [results, setResults] = useState<SearchResult[]>([]);

  // const staticData: SearchResult[] = [
  //   {
  //     title: "Introduction to React",
  //     description: "Learn the basics of React.",
  //     author: "John Doe",
  //     date: "Jan 1, 2024",
  //   },
  //   {
  //     title: "Advanced JavaScript",
  //     description: "Dive into advanced concepts of JavaScript.",
  //     author: "Jane Smith",
  //     date: "Feb 15, 2024",
  //   },
  //   {
  //     title: "CSS for Beginners",
  //     description: "Get started with CSS.",
  //     author: "Alice Brown",
  //     date: "Mar 10, 2024",
  //   },
  // ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";

    setSearchTerm(value);

    if (value) {
      // const filteredResults = staticData.filter((item) =>
      //   item.title.toLowerCase().includes(value.toLowerCase())
      // );
      // setResults(filteredResults);
    } else {
      // setResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    // setResults([]);
  };


  return (
    <div className="relative flex items-center justify-between w-[250px]">
      <FiSearch className="text-[18px] absolute left-[15px] text-[var(--lightgrey)]" />
      <input
        className="bg-[var(--bgh)] rounded-full p-[10px] pl-12 w-full placeholder:text-[var(--foreground)]"
        type="text"
        placeholder="Search feed..."
        value={searchTerm}
        onChange={handleInputChange}
      />
       <MdClose
          className={`absolute right-[15px] text-[var(--lightgrey)] cursor-pointer ${searchTerm ? "opacity-1" : "opacity-0"}`}
          onClick={handleClearSearch}
        />
    
    </div>
  );
}
