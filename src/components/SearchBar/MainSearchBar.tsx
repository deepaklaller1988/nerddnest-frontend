"use client"
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import ViewButton from "../Buttons/ViewButtons";
import { useSelector } from "react-redux";
import { useApi } from "@/hooks/useAPI";
import { useRouter } from "next/navigation";

export default function MainSearchBar() {
  const { API } = useApi()
  const router=useRouter()
  const userId = useSelector((state: any) => state.auth.id);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any>([]);

  useEffect(() => {
    if (searchTerm && userId) {
      getSearchData()
    }
    else {
      setResults([]); // Clear results if the search term is empty
    }
  }, [searchTerm, userId])

  const getSearchData = async () => {
    const { success, error, data } = await API.get(`friends/search?userId=${userId}6&search=${searchTerm}`);
    if (success) {
      setResults(data)
    }
    else {
      console.log(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "";
    setSearchTerm(value);
  }

  const handleClearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  const handleClick = (id:any) => {
  router.push(`/users?id=${id}`)
  setSearchTerm("");
  setResults([]);
  };

  const handleViewAll=()=>{}

  return (
    <div className="relative w-[280px]">
      <div className="relative flex items-center justify-between">
        <FiSearch className="text-[18px] absolute left-[15px] text-[var(--lightgrey)]" />
        <input
          className="bg-white/10 placeholder:text-[var(--foreground)] rounded-full p-[10px] pl-12 w-full"
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
            results.map((result:any, index:any) => (
              <section
                key={index}
                className="cursor-pointer flex gap-4 justify-between items-start p-4 border-b border-black/10 hover:bg-gray-400/10 duration-[.5s]"
              >
                <span className="min-w-12 min-h-12 w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
                  <img src={result.image || "/profile-avatar-legacy-50.png"} alt="Image"/>
                </span>
                <div className="w-full" onClick={()=>handleClick(result.id)}>
                  <b className="text-[var(--highlight)]" >{result.firstname}</b>
                  <p>{result.description}</p>
                  {/* <div className="flex flex-wrap gap-x-2 text-[13px] text-black/30">
                    <span>By {result.author}</span>
                    <span className="middot">·</span>
                    <span>{result.date}</span>
                  </div> */}
                </div>
              </section>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No results found.</div>
          )}

          <ViewButton
            onClick={handleViewAll}
            name="View All"
            className="sticky bottom-0 bg-white font-semibold w-full p-4 text-center flex gap-2 items-center justify-center text-[var(--highlight-blue)] hover:text-[--highlight]"
          />
        </div>
      )}
    </div>
  );
}
