"use client";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const ViewButton= ({ name, onClick, className }:any) => {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      {name}
      <FiArrowRight/>
    </button>
  );
};

export default ViewButton;
