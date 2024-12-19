import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { PiDownloadSimpleThin } from 'react-icons/pi';
import { MdBlockFlipped } from 'react-icons/md';
import { FiFlag } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import PopupBlockReport from './PopupBlockReport';

interface ButtonFunctionProps {
    width: string;
    height: string;
    marginTop: string;
    right: string;
    left: string;
}

const ButtonFunction: React.FC<ButtonFunctionProps> = ({ marginTop, right, left, width }) => {
    const [options, setOptions] = useState<boolean>(false);
    const [type, setType] = useState<string>("");
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const [visible, setVisible] = useState<boolean>(false);

    const handleButtonPopup = () => {
        setOptions(!options);
    };

    const toggleVisibility = () => {
        setVisible((prevState) => !prevState);
    };

    const handleOnclick = (type:any) => {
        setIsPopupOpen(!isPopupOpen)
        setOptions(false)
        setType(type)
    };

    return (
        <>
            <BsThreeDots onClick={handleButtonPopup} size={26} className="cursor-pointer relative" />
            {options && (
                <div
                    className="absolute mt-[225px] right-5 !z-10 bg-[var(--bgh)] shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)]"
                    style={{ marginTop, right, left, width }}
                >
                    <div className="!z-10 shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)] w-full min-w-[210px] py-2 rounded-lg bg-[var(--bgh)] absolute mt-0 right-0">
                        <button className={`flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-gray-500/10 focus:outline-none hover:drop`} onClick={toggleVisibility}>
                            <span className="cursor-pointer">{visible ? <FaRegEye /> : <FaRegEyeSlash />}</span>Mark as unread
                        </button>
                        <button className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-gray-500/10 focus:outline-none hover:drop">
                            <span><PiDownloadSimpleThin /></span>Archive
                        </button>
                        <button className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-gray-500/10 focus:outline-none hover:drop" onClick={()=>handleOnclick("block")}>
                            <span><MdBlockFlipped /></span>Block member
                        </button>
                        <button className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-gray-500/10 focus:outline-none hover:drop"  onClick={()=>handleOnclick("report")}>
                            <span><FiFlag /></span>Report member
                        </button>
                        <button className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-gray-500/10 focus:outline-none hover:drop"onClick={()=>handleOnclick("deleteMessage")}>
                            <span><RiDeleteBinLine /></span>Delete your messages
                        </button>
                        <button className="flex gap-2 items-center px-4 py-2 w-full text-left hover:bg-gray-500/10 focus:outline-none hover:drop"onClick={()=>handleOnclick("deleteConverstion")}>
                            <span><RiDeleteBinLine /></span>Delete conversation
                        </button>
                    </div>
                </div>
            )}
            {isPopupOpen && (
                <PopupBlockReport 
                    handlePopup={() => setIsPopupOpen(false)}
                    type={type}
                />
            )}
        </>
    );
};

export default ButtonFunction;
