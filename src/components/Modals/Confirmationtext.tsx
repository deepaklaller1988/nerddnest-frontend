import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface ConfirmationTextProps {
  heading?: string; 
  text: string;
}

export default function Confirmationtext({ heading, text }: ConfirmationTextProps) {
  return (
    <div>
      {heading && <p className="text-black text-3xl text-center">{heading}</p>}
      <div className="rounded-2xl flex flex-row items-center gap-4 mt-10 border border-blue-500 overflow-hidden">
        <div className="py-8 bg-blue-500 px-2 rounded">
          <IoMdInformationCircleOutline size={40} fill="white" />
        </div>
        <div>
          <p className="text-black text-xl">{text}</p>
        </div>
      </div>
    </div>
  );
}
