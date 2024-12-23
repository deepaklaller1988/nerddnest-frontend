import { FaEye, FaEyeSlash, FaFontAwesomeFlag } from "react-icons/fa";
import { MdOutlineFileDownload, MdBlock, MdOutlineDelete } from "react-icons/md";
import { HiMiniArrowUpTray } from "react-icons/hi2";

export const MessageActionsMenu = ({
    toggleReadUnread,
    toggleArchieveUnArc,
    isMarkedRead,
    isArchieve,
    postId,
    openBlockModal,
    openReportModal,
}: {
    isMarkedRead: boolean;
    isArchieve: boolean;
    toggleReadUnread: () => void;
    toggleArchieveUnArc: () => void;
    postId: any;
    openBlockModal: (id: any) => void;
    openReportModal: (id: any) => void;
}) => {
    const actions = [
        {
            onClick: toggleReadUnread,
            icon: isMarkedRead ? <FaEye /> : <FaEyeSlash />,
            label: isMarkedRead ? "Mark as Read" : "Mark as UnRead",
        },
        {
            onClick: toggleArchieveUnArc,
            icon: isArchieve ? <MdOutlineFileDownload /> : <HiMiniArrowUpTray />,
            label: isArchieve ? "Archive" : "Unarchive",
        },
        { onClick: () => openBlockModal(postId), icon: <MdBlock />, label: "Block Member" },
        { onClick: () => openReportModal(postId), icon: <FaFontAwesomeFlag />, label: "Report Member" },
        { onClick: undefined, icon: <MdOutlineDelete />, label: "Delete your messages" },
        { onClick: undefined, icon: <MdOutlineDelete />, label: "Delete Conversation" },
    ];

    return actions;
};
