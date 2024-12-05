import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'

export default function GroupSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showClear, setShowClear] = useState(false);

    const groups = [
        'React Developers',
        'Node.js Enthusiasts',
        'JavaScript Wizards',
        'Next.js Fans',
        'Tailwind CSS Designers',
        'MongoDB Masters',
        'Express.js Experts',
        'Frontend Engineers',
        'Backend Developers',
    ];

    const filteredGroups = groups.filter((group) =>
        group.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e:any) => {
        setSearchTerm(e.target.value);
        setShowClear(e.target.value.length > 0);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setShowClear(false);
    };
    return (
        <div className="relative flex items-center justify-between mr-4">
            <FiSearch className="text-[18px] absolute left-[15px] text-[var(--lightgrey)]" />
            <input
                className="bg-gray-500/10 rounded-full p-[10px] pl-12 w-full"
                type="text"
                placeholder="Search Groups..."
                value={searchTerm}
                onChange={handleInputChange}
            />
          <MdClose
          className={`absolute right-[15px] text-[var(--lightgrey)] cursor-pointer ${searchTerm ? "opacity-1" : "opacity-0"}`}
          onClick={clearSearch}
        />

        
        </div>
    )
}
