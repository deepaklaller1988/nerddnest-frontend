import React from "react";

export default function PopupHeader({ title, onClick, type }: any) {
  return (
    <div className={`flex items-center ${type=="group"?"justify-center":"justify-between"}  p-4 border-b`}>
      <h2 className={`text-lg font-semibold text-center block text-[var(--highlight)]`}>
        {title}
      </h2>
      {type !== "group" && (
        <button
          className="bg-gray-200 w-10 h-10 p-0 flex items-center justify-center rounded-full text-[30px] text-gray-600 hover:text-gray-800"
          onClick={onClick}
        >
          &times;
        </button>
      )}
    </div>
  );
}
