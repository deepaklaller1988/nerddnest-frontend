import React from 'react';
import { RxCross2 } from 'react-icons/rx';

interface DeletePopupProps {
    type: string;
    handlePopup: () => void;
}

const PopupBlockReport: React.FC<DeletePopupProps> = ({ handlePopup, type }) => {
    const reportOptions = [
        { label: "Harassment", description: "Harassment or bullying behavior" },
        { label: "Inappropriate", description: "Contains mature or sensitive content" },
        { label: "Misinformation", description: "Contains misleading or false information" },
        { label: "Offensive", description: "Contains abusive or derogatory content" },
        { label: "Other", description: "Please Specify" },
        { label: "Suspicious", description: "Contains spam, fake content or potential malware" },
    ];
    
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 transition-opacity duration-300">
                <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-sm transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 opacity-100">
                    <div className="flex justify-between items-center px-5 py-5">
                        <h1 className='text-green-600'>{type === "block" && "Block Member ?" || type === "report" && "Report Member" || type === "deleteMessage" && "Delete Messages" || type === "deleteConverstion" && "Delete conversation"}</h1>
                        <button onClick={handlePopup}><RxCross2 size={20} /></button>
                    </div>
                    {type === "block" &&
                        <>
                            <div className="items-center px-5 py-5 ">
                                <p className='text-black'>Please confirm you want to block this member.</p>
                                <ul className="mt-3 text-black">
                                    You will no longer be able to:
                                    <li className="mt-3 text-black">See blocked members posts</li>
                                    <li className='text-black'>Mention this member in posts</li>
                                    <li className='text-black'>Invite this member to groups</li>
                                    <li className='text-black'>Message this member</li>
                                    <li className='text-black'>Add this member as a connection</li>
                                </ul>
                                <p className="mt-3 text-black"><strong className='text-black'>Please note:</strong> This action will also remove this member from your connections and send a report to the site admin. Please allow a few minutes for this process to complete.</p>
                            </div></>}
                    {type === "report" &&
                        <div className="px-5 py-5">
                            {reportOptions.map((option, index) => (
                                <div key={index}>
                                    <div className="flex gap-4">
                                        <input type="radio" name="reportOption" id={`reportOption-${index}`} />
                                        <strong className='text-green-600'>{option.label}</strong>
                                    </div>
                                    <p className='text-black'>{option.description}</p>
                                </div>
                            ))}
                        </div>
                    }
                    {
                        type === "deleteMessage" && <><div>
                            <p className='text-black'>Are you sure you want to permanently delete all of your messages from this conversation? This cannot be undone.</p>
                        </div>
                        </>
                    }

                    {
                        type === "deleteConverstion" && <>
                            <div>
                                <p className='text-black'>As a site admin you are able to delete conversations. Are you sure you want to permanently delete this conversation and all of its messages? This cannot be undone.</p>
                            </div>
                        </>
                    }
                    <div className="flex justify-between mt-8 gap-4">
                        <button
                            type="button"
                            onClick={handlePopup}
                            className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            {type === "block" && "Confirm" || type === "report" && "Report" || type === "deleteMessage" && "Delete Messages" || type === "deleteConverstion" && "Delete Conversation"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupBlockReport;