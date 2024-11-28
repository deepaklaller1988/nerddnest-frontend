import React from "react";
import Image from "next/image";
export default function Upload() {
  return (
    <div className="">
      <div className="flex justify-center mt-4">
        <Image
          src="/group-avatar-buddyboss.png"
          width={100}
          height={100}
          alt="Image"
        />
      </div>
      <div className="p-5">
        <p className="flex justify-center text-sm">
          Upload a photo that represents this group. The image will be shown on
          the main group page, and in search results. <br />
        </p>
        <p className="flex justify-center text-sm mt-2">
          To skip the group photo upload process select "Next Step".
        </p>

        <div className="bg-gray-50 p-8 rounded-xl">
          <div className="p-4 bg-gray-200 rounded-xl">
            <label
              htmlFor="file-upload1"
              className="cursor-pointer text-gray-900 py-2 px-4 rounded-md mt-2 block text-center transition-all"
            >
              Drag & Drop your file or Browser
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
