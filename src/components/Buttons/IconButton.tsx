import React from "react";
import IconButtonProps from "@/types/iconInterface";

const IconButton = ({ icon, className, onClick }: IconButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      {icon}
    </button>
  );
};

export default IconButton;
