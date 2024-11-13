import React from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { FiArrowRight } from "react-icons/fi";

export default function MainSearchBar() {
  return (
    <div className="relative w-[280px]">
      <div className="relative flex items-center justify-between">
        <FiSearch className="text-[18px] absolute left-[15px] text-[var(--lightgrey)]" />
        <input
          className="bg-white rounded-full p-[10px] pl-12 w-full"
          type="text"
          placeholder="Search..."
        />
        <MdClose className="absolute right-[15px] text-[var(--lightgrey)] cursor-pointer opacity-0" />
        {/* replace opacity-0 with opacity-1 after fill text in field and on click cross field should be empty */}
      </div>
      <div className="hidden w-full overflow-y-auto overflow-x-hidden rounded-lg bg-white absolute mt-1 max-h-[500px]">
        <section className="cursor-pointer flex gap-4 justify-between items-start p-4 border-b border-b-1 border-black/10 hover:bg-gray-400/10 duration-[.5s]">
          <span className="min-w-12 min-h-12 w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
            <IoDocumentText className="text-black/50 w-6 h-6" />
          </span>
          <div className="w-full">
            <b className="text-[var(--highlight)]">Terms of Service</b>
            <p>
              "Need help or have questions? Our Support team at Nerdd Nest is
              here for you!
            </p>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-black/30 text-[13px]">By Lord Lexy</span>
              <span className="middot text-black/30 text-[13px]">·</span>
              <span className="text-black/30 text-[13px]">
                October 23, 2024
              </span>
            </div>
          </div>
        </section>
        <section className="cursor-pointer flex gap-4 justify-between items-start p-4 border-b border-b-1 border-black/10 hover:bg-gray-400/10 duration-[.5s]">
          <span className="min-w-12 min-h-12 w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
            <IoDocumentText className="text-black/50 w-6 h-6" />
          </span>
          <div className="w-full">
            <b className="text-[var(--highlight)]">Terms of Service</b>
            <p>
              "Need help or have questions? Our Support team at Nerdd Nest is
              here for you!
            </p>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-black/30 text-[13px]">By Lord Lexy</span>
              <span className="middot text-black/30 text-[13px]">·</span>
              <span className="text-black/30 text-[13px]">
                October 23, 2024
              </span>
            </div>
          </div>
        </section>
        <section className="cursor-pointer flex gap-4 justify-between items-start p-4 border-b border-b-1 border-black/10 hover:bg-gray-400/10 duration-[.5s]">
          <span className="min-w-12 min-h-12 w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
            <IoDocumentText className="text-black/50 w-6 h-6" />
          </span>
          <div className="w-full">
            <b className="text-[var(--highlight)]">Terms of Service</b>
            <p>
              "Need help or have questions? Our Support team at Nerdd Nest is
              here for you!
            </p>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-black/30 text-[13px]">By Lord Lexy</span>
              <span className="middot text-black/30 text-[13px]">·</span>
              <span className="text-black/30 text-[13px]">
                October 23, 2024
              </span>
            </div>
          </div>
        </section>
        <section className="cursor-pointer flex gap-4 justify-between items-start p-4 border-b border-b-1 border-black/10 hover:bg-gray-400/10 duration-[.5s]">
          <span className="min-w-12 min-h-12 w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
            <IoDocumentText className="text-black/50 w-6 h-6" />
          </span>
          <div className="w-full">
            <b className="text-[var(--highlight)]">Terms of Service</b>
            <p>
              "Need help or have questions? Our Support team at Nerdd Nest is
              here for you!
            </p>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-black/30 text-[13px]">By Lord Lexy</span>
              <span className="middot text-black/30 text-[13px]">·</span>
              <span className="text-black/30 text-[13px]">
                October 23, 2024
              </span>
            </div>
          </div>
        </section>
        <section className="cursor-pointer flex gap-4 justify-between items-start p-4 border-b border-b-1 border-black/10 hover:bg-gray-400/10 duration-[.5s]">
          <span className="min-w-12 min-h-12 w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
            <IoDocumentText className="text-black/50 w-6 h-6" />
          </span>
          <div className="w-full">
            <b className="text-[var(--highlight)]">Terms of Service</b>
            <p>
              "Need help or have questions? Our Support team at Nerdd Nest is
              here for you!
            </p>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-black/30 text-[13px]">By Lord Lexy</span>
              <span className="middot text-black/30 text-[13px]">·</span>
              <span className="text-black/30 text-[13px]">
                October 23, 2024
              </span>
            </div>
          </div>
        </section>
        <section className="cursor-pointer flex gap-4 justify-between items-start p-4 border-b border-b-1 border-black/10 hover:bg-gray-400/10 duration-[.5s]">
          <span className="min-w-12 min-h-12 w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
            <IoDocumentText className="text-black/50 w-6 h-6" />
          </span>
          <div className="w-full">
            <b className="text-[var(--highlight)]">Terms of Service</b>
            <p>
              "Need help or have questions? Our Support team at Nerdd Nest is
              here for you!
            </p>
            <div className="flex flex-wrap gap-x-2">
              <span className="text-black/30 text-[13px]">By Lord Lexy</span>
              <span className="middot text-black/30 text-[13px]">·</span>
              <span className="text-black/30 text-[13px]">
                October 23, 2024
              </span>
            </div>
          </div>
        </section>
        <button className="sticky bottom-0 bg-white font-semibold w-full p-4 text-center flex gap-2 items-center justify-center text-[var(--highlight-blue)] hover:text-[--highlight] buttonSet">
          View All <FiArrowRight />
        </button>
      </div>
    </div>
  );
}
