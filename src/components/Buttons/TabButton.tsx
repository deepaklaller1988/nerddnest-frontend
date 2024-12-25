import React from 'react';

const TabButton: React.FC<any> = ({ label, count, isActive, onClick }) => {
  return (
    <button
      className={`py-2 relative bottom-[-1px] ${isActive ? 'activeFriends' : ''}`}
      onClick={onClick}
    >
      {label} <b className="font-normal">{count}</b>
    </button>
  );
};

export default TabButton;
