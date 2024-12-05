import React from "react";
import Image from "next/image";
export default function Upload() {
  return (
    <div className="w-full p-6">
      <h2 className=" text-white mb-4 font-bold text-[20px]">Upload File Information</h2>
      <div className="flex justify-center mt-4 border border-white/5 bg-white/5 rounded-lg">
        <Image
          src="/group-avatar-buddyboss.png"
          width={100}
          height={100}
          alt="Image"
        />
      </div>
      <div className="py-5">
        <p className="">
          Upload a photo that represents this group. The image will be shown on
          the main group page, and in search results. <br />
        </p>
        <p className="font-semibold text-sm mt-2 text-white">
          To skip the group photo upload process select Next Step.
        </p>

        <div className="bg-white/5 border border-white/5 mt-6 rounded-xl">
          <div className="p-4">
            <label
              htmlFor="file-upload1"
              className="cursor-pointer text-white py-2 px-4 rounded-md mt-2 block text-center transition-all"
            >
              Drag & Drop your file or Browser
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
