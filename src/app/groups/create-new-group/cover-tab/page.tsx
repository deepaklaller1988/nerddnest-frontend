import React from 'react'

export default function CoverTab() {
  return (
    <div className='p-6'>
      <h2 className=" text-white mb-4 font-bold text-[20px]">Cover Photo</h2>
     <div className=''>
     <p className="font-semibold text-sm mb-2">
      The Cover Photo will be used to customize the header of your group.

      </p>
      <div className="bg-white/5 border border-white/5 rounded-xl mt-1 mb-4">
          <div className="p-4">
            <label
              htmlFor="file-upload1"
              className="cursor-pointer text-white py-2 px-4 rounded-md mt-2 block text-center transition-all"
            >
              Drag & Drop your file or Browser
            </label>
          </div>
        </div>
        <p className='text-sm text-green-900 p-4 bg-green-100 rounded-lg text-center'>
        For best results, upload an image that is 1950px by 450px or larger.
        </p>
     </div>
    </div>
  )
}
