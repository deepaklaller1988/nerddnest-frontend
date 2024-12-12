
import { CiFlag1 } from "react-icons/ci";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { LuMessageCircle } from "react-icons/lu";

export const UserProfileActionsMenu = ({
  isFollow,
  toggleCommenting,
  postId,
  openEditModal
}: {
  isFollow: boolean;
  toggleCommenting: () => void;
  postId: any
  openEditModal: any

}) => {

  const actions = [
    { onClick: () => openEditModal(postId), icon: <LuMessageCircle />, label: "Send Message" },
    {
      onClick: toggleCommenting,
      icon: isFollow ? <HiOutlineSpeakerphone /> : <HiOutlineSpeakerphone />,
      label: isFollow ? "Unfollow" : "Follow",
    },
    {
      // onClick: toggleCommenting,
      icon: isFollow ? <HiOutlineSpeakerphone /> : <HiOutlineSpeakerphone />,
      label: 'View As',
    },
    {
      // onClick: toggleCommenting,
      icon: isFollow ? <HiOutlineSpeakerphone /> : <HiOutlineSpeakerphone />,
      label: 'Block',
    },
    {
      // onClick: toggleCommenting,
      icon: isFollow ? <CiFlag1 /> : <CiFlag1 />,
      label: 'Report Member',
    },
  
  ];

  return actions;
};
