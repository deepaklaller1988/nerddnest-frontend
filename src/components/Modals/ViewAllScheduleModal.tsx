import React from "react";

type ViewAllScheduleModalProps = {
    isViewPopupOpen: any
    onClose: () => void;
};

const ViewAllScheduleModal = ({ onClose }: ViewAllScheduleModalProps) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-[var(--sections)] w-[500px] rounded-[12px] shadow-lg p-6">
                <h2 className="text-white text-xl mb-4">Scheduled Posts</h2>
                <p className="text-white mb-4">Here are your scheduled posts.</p>
                <button
                    onClick={onClose}
                    className="text-white bg-red-500 rounded-full px-4 py-2"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ViewAllScheduleModal;
