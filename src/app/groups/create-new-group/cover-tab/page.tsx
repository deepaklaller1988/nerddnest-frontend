import React from 'react'

export default function CoverTab() {
  return (
    <div className='p-4 '>
     <div className='p-4'>
     <p className='text-sm'>
      The Cover Photo will be used to customize the header of your group.

      </p>
      <div className="bg-gray-50 p-8 rounded-xl mt-1">
          <div className="p-4 bg-gray-200 rounded-xl">
            <label
              htmlFor="file-upload1"
              className="cursor-pointer text-gray-900 py-2 px-4 rounded-md mt-2 block text-center transition-all"
            >
              Drag & Drop your file or Browser
            </label>
          </div>
        </div>
        <p className='text-sm text-white p-4 bg-green-600'>
        For best results, upload an image that is 1950px by 450px or larger.
        </p>
     </div>
    </div>
  )
}
