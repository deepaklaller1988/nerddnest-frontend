"use client"
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import CreateStoryModal from "../../Modals/CreateStoryModal";
import Image from "next/image";
import { useApi } from "@/hooks/useAPI";
import { useSelector } from "react-redux";
import StoryDetailModal from "../../Modals/StoryDetailModal";
import { selectStoryData } from '../../../redux/slices/data.slice';
import { capitalizeName } from "@/utils/capitalizeName";
import { toasterError, toasterSuccess } from "../Toaster";

export default function AddStory() {
  const { API } = useApi()
  const userId = useSelector((state: any) => state.auth.id);
  const image = useSelector((state: any) => state.auth.image)
  const storyData = useSelector(selectStoryData);

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isStoryPopupOpen, setIsStoryPopupOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [stories, setStories] = useState<any>([]);
  const [userImage, setUserImage] = useState("")

  useEffect(() => {
    setUserImage(image)
    if (userId)
      getStoriesData()
  }, [userId, storyData, image])

  const toggleCreatePopup = () => {
    setIsCreatePopupOpen(!isCreatePopupOpen);
  };

  const toggleStoryPopup = () => {
    setIsStoryPopupOpen(!isStoryPopupOpen);
  };

  const getStoriesData = async () => {
    if (userId) {
      const { success, error, data } = await API.get(`story/get-stories?userId=${userId}`);
      if (success) {
        setStories(data)
      }
      else {
        console.log(error);
      }
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    arrows: stories.length >= 4,
  };

  const handleStoryClick = (story: any, index: any) => {
    setSelectedStory({ story, index });
    toggleStoryPopup();
  };

  const handleDeleteStories = async (deleteItemId: any) => {
    try {
      const response = await API.delete(`story/delete-story-covers`, { id: deleteItemId, userId });
      if (response.success) {
        toasterSuccess("Story has been deleted successfully");
        getStoriesData()
      } else {
        toasterError("Failed to delete the post");
      }
    } catch (error) {
      toasterError("An error occurred while deleting the post");
    }
  };

  return (
    <section className="flex flex-col gap-5 w-full">
      <div className="w-full">
        <Slider {...settings}>
          <div
            className="relative h-[160px] rounded-[12px] overflow-hidden"
            onClick={toggleCreatePopup}
          >
            <Image
              // height={60}
              // width={60}
              layout="fill"
              className="w-full object-cover min-h-[100px]"
              src={userImage ? userImage : "/profile-avatar-legacy-50.png"}
              alt="dp"
              quality={100}
              priority
            />
            <button className="absolute bg-[var(--highlght-hover)] left-0 bottom-0 pt-6 py-3 w-full text-center">
              <span className="absolute text-black/80 w-10 h-10 bg-[#8cefe9] text-[30px] font-normal -top-5 left-1/2 -ml-5 rounded-full flex items-center justify-center">
                +
              </span>
              <b className="text-white font-semibold text-[12px]">
                Create Story
              </b>
            </button>
          </div>
          {stories && stories.map((story: any, index: any) => (
            <div
              key={story.id}
              className="relative h-[160px] rounded-[12px] overflow-hidden"
              onClick={() => handleStoryClick(story.id, index)}
            >
              <Image
                // height={50}
                // width={50}
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-cover"
                src={story.media_url || null}
                quality={100}
                alt={"Image"}
                priority

              />
              <span className="absolute left-2 top-2 min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                <Image
                  // height={50}
                  layout="fill"
                  // width={50}
                  quality={100}
                  objectFit="cover"
                  className="relative top-[-1px] left-[-1px] min-w-[33px] block min-h-[34px] rounded-full overflow-hidden object-cover"
                  src={story.user?.image || "/profile-avatar-legacy-50.png"}
                  alt="logo"
                />
              </span>
              <div className="absolute gradient left-0 bottom-0 pt-6 py-3 w-full">
                <b className="text-white font-semibold text-[12px] namellipse">
                  {story.user.id === userId ? "You" : capitalizeName(story.user.firstname) + " " + capitalizeName(story.user.lastname)}
                </b>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {isCreatePopupOpen && <CreateStoryModal togglePopup={toggleCreatePopup} handleDeleteStories={handleDeleteStories} />}
      {isStoryPopupOpen && selectedStory !== null && (
        <StoryDetailModal
          stories={[stories.find((story: any) => story.id === selectedStory.story)]}
          selectedStory={selectedStory}
          alldata={stories}
          togglePopup={toggleStoryPopup}
        />
      )}

    </section>
  );
}
