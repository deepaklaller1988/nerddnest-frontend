"use client"
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import CreateStoryModal from "../Modals/CreateStoryModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useAPI";
import { useSelector } from "react-redux";
import StoryDetailModal from "../Modals/StoryDetailModal";
import { selectStoryData } from '../../redux/slices/data.slice';


export default function AddStory() {
  const { API } = useApi()
  const userId = useSelector((state: any) => state.auth.id);
  const storyData = useSelector(selectStoryData);

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isStoryPopupOpen, setIsStoryPopupOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [stories, setStories] = useState<any>([]);

  useEffect(() => {
    if (userId)
      getStoriesData()
  }, [userId,storyData])

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
    arrows: true,
  };

  const handleStoryClick = (story: any) => {
    setSelectedStory(story);
    toggleStoryPopup();
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
              height={50}
              width={50}
              className="w-full object-contain"
              src={"/profile-avatar-legacy-50.png"}
              alt="dp"
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
          {stories && stories.map((story: any) => (
            <div
              key={story.id}
              className="relative h-[160px] rounded-[12px] overflow-hidden"
              onClick={() => handleStoryClick(story.id)}
            >
              <Image
                height={50}
                width={50}
                className="w-full h-full object-cover"
                src={story.media_url || null}
                alt={"Image"}
              />
              <span className="absolute left-2 top-2 min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                <Image
                  height={50}
                  width={50}
                  quality={100}
                  className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                  src={story.user?.image || "/profile-avatar-legacy-50.png"}
                  alt="logo"
                />
              </span>
              <div className="absolute gradient left-0 bottom-0 pt-6 py-3 w-full">
                <b className="text-white font-semibold text-[12px] namellipse">
                  {story.user.id === userId ? "You" : story.user.firstname + " " + story.user.lastname}
                </b>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {isCreatePopupOpen && <CreateStoryModal togglePopup={toggleCreatePopup} />}
      {isStoryPopupOpen && selectedStory !== null && (
        <StoryDetailModal
          stories={[stories.find((story: any) => story.id === selectedStory)]}
          selectedStory={0}
          alldata={stories}
          togglePopup={toggleStoryPopup}
        />
      )}

    </section>
  );
}
