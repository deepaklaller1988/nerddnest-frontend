import React from 'react';

interface DeletePopupProps {
  message: string; 
  onDelete: () => void;
  onCancel: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ message, onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 transition-opacity duration-300">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-sm transform transition-all duration-300 ease-in-out scale-95 opacity-0 hover:scale-100 opacity-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{message}</h2>
        <div className="flex justify-between mt-8  gap-4">
          <button
            onClick={onDelete}
            className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
