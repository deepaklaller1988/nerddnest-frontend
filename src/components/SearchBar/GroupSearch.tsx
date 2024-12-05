import React from "react";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";

type GroupSearchProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
};

const GroupSearch: React.FC<GroupSearchProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
}) => {
  return (
    <div className="relative flex items-center justify-between w-full rounded-full">
      <FiSearch className="text-[18px] absolute left-[15px]" />
      <input
        className="bg-white/10 placeholder:text-[var(--foreground)] rounded-full p-[10px] pl-12 w-full"
        type="text"
        placeholder="Search groups..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm && (
        <MdClose
          className="absolute right-[15px] text-[var(--lightgrey)] cursor-pointer"
          onClick={onClearSearch}
        />
      )}
    </div>
  );
};

export default GroupSearch;
