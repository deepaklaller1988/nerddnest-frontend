
import React from "react";
import IconButtonProps from "@/types/iconInterface";

const IconButton = ({ icon,className }:IconButtonProps) => {
  return (
    <button
      className={className}
    >
      {icon}
    </button>
  );
};

export default IconButton;
