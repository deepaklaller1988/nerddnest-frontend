import React from 'react';

interface DeletePopupProps {
  message: string; 
  onDelete: () => void;
  onCancel: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ message, onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
        <div className="flex justify-between">
          <button
            onClick={onDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
