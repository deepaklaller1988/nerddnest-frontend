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

    const handleDelete = () => {
        console.log("Delete conversations");
    };

    return (
        <>
            <BsThreeDots onClick={handleButtonPopup} size={26} className="cursor-pointer relative" />
            {options && (
                <div
                    className="absolute mt-[225px] right-5 !z-10 bg-[var(--bgh)] shadow-[0_-5px_25px_-15px_rgba(0,0,0,0.3)]"
                    style={{ marginTop, right, left, width }}
                >
                    <div className="flex flex-col px-2 py-2">
                        <button className="flex justify-start gap-3 items-center mt-2 text-white" onClick={toggleVisibility}>
                            <span className="cursor-pointer">{visible ? <FaRegEye /> : <FaRegEyeSlash />}</span>Mark as unread
                        </button>
                        <button className="flex justify-start gap-3 items-center mt-2 text-white">
                            <span><PiDownloadSimpleThin /></span>Archive
                        </button>
                        <button className="flex justify-start gap-3 items-center mt-2 text-white" onClick={()=>handleOnclick("block")}>
                            <span><MdBlockFlipped /></span>Block member
                        </button>
                        <button className="flex justify-start gap-3 items-center mt-2 text-white"  onClick={()=>handleOnclick("report")}>
                            <span><FiFlag /></span>Report member
                        </button>
                        <button className="flex justify-start gap-3 items-center mt-2 text-white">
                            <span><RiDeleteBinLine /></span>Delete your messages
                        </button>
                        <button className="flex justify-start gap-3 items-center mt-2 text-white">
                            <span><RiDeleteBinLine /></span>Delete conversation
                        </button>
                    </div>
                </div>
            )}

            {isPopupOpen && (
                <PopupBlockReport 
                    handlePopup={() => setIsPopupOpen(false)}
                    handleDelete={handleDelete}
                    type={type}
                />
            )}
            {/* {report && (
                <PopupBlockReport
                    message="Report Member"
                    handlePopup={() => setReport(false)}
                    handleDelete={handleDelete}
                    messagebutton='Report'
                />
            )} */}
        </>
    );
};

export default ButtonFunction;
