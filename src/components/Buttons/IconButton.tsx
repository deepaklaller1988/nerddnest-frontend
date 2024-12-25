import React from "react";

const IconButton = ({ icon, className, onClick }: any) => {
  return (
    <button onClick={onClick} className={className}>
      {icon}
    </button>
  );
};

export default IconButton;
