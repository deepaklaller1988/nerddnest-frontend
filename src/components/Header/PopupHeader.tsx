import React from "react";

export default function PopupHeader({ title, onClick, type }: any) {
  return (
    <div className={`flex items-center ${type=="group"?"justify-center":"justify-between"}  p-4 border-b border-white/5`}>
      <h2 className={` uppercase font-semibold text-center block text-white`}>
        {title}
      </h2>
      {type !== "group" && (
        <button
          className="w-7 h-7 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-white"
          onClick={onClick}
        >
          &times;
        </button>
      )}
    </div>
  );
}
