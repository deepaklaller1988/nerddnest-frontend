import { useRouter } from "next/navigation";
import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface ConfirmationTextProps {
  heading?: string;
  text: string;
  buttontext?: string;
  type?: string;
  error?: string
}

export default function Confirmationtext({
  type,
  heading,
  text,
  buttontext,
  error
}: ConfirmationTextProps) {
  const router = useRouter();
  return (
    <div>
      {heading && <p className="text-white text-3xl text-center">{heading}</p>}
      <div className="rounded-2xl flex flex-row items-center gap-4 mt-10 border border-blue-500 overflow-hidden">
        <div className="py-8 bg-blue-500 px-2 rounded">
          <IoMdInformationCircleOutline size={40} fill="white" />
        </div>
        <div>
          <p className="text-white text-xl">{text}</p>
        </div>
      </div>
      <div className="text-center justify-center items-center ">

        {type === "activation" && !error && (
          <button
            className="bg-blue-500 text-white rounded-xl p-4 mt-6"
            onClick={() => router.push("/home")}
          >
            {buttontext}
          </button>
        )}
      </div>
    </div>
  );
}
