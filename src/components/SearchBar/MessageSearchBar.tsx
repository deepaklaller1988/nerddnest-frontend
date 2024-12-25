import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function MessageSearchBar() {
    return (
        <div className="w-full bg-white/10 border-b border-white/5 px-4 py-2 relative">
            <input
                type="text"
                className="w-full bg-white/0 py-2 placeholder:font-semibold placeholder:text-[var(--foreground)] pr-5"
                placeholder="Search here..."
            />
            <button className="absolute right-7 top-5"><FaSearch /></button>
        </div>
        )
}
