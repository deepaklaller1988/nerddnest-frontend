import React from 'react';

interface PollModalProps {
  onClose: () => void;
}

export default function PollModal({ onClose }: PollModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Poll Creation</h2>
        {/* Add your poll creation form or content here */}
        <p className="mb-4">Here you can create a poll for your users.</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}
