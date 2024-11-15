"use client";
import { ViewButtonProps } from "@/types/buttonInterface";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const ViewButton= ({ name, onClick, className }:ViewButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      {name}
      <FiArrowRight />
    </button>
  );
};

export default ViewButton;
