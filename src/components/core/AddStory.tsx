"use client"
import React, { useState } from "react";
import Slider from "react-slick";
import CreateStoryModal from "../Modals/CreateStoryModal";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddStory() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [stories, setStories] = useState<any>([
    {
      id: 1,
      title: "Story 1",
      image: "/bg1.jpg",
      logo: "/dp.jpg",
    },
    {
      id: 2,
      title: "Story 2",
      image: "/bg.jpg",
      logo: "/dp.jpg",
    },
    {
      id: 3,
      title: "Story 3",
      image: "/bg1.jpg",
      logo: "/dp.jpg",
    },
    {
      id: 4,
      title: "Story 4",
      image: "/dp.jpg",
      logo: "/dp.jpg",
    },
  ]);
  
  const router = useRouter();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleAddStory = (newStory: any) => {
    setStories((prevStories: any) => [...prevStories, newStory]);
    togglePopup();
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    arrows: true,
  };

  const handleStoryClick = (storyId: number) => {
    router.push(`/storyviewer?id=${storyId}&stories=${JSON.stringify(stories)}`);
  };

  return (
    <section className="flex flex-col gap-5 w-full">
      <div className="w-full">
        <Slider {...settings}>
          <div
            className="relative h-[160px] rounded-[12px] overflow-hidden"
            onClick={togglePopup}
          >
            <Image
              height={50}
              width={50}
              className="w-full h-full object-cover"
              src="/dp.jpg"
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
          {stories.map((story: any) => (
            <div
              key={story.id}
              className="relative h-[160px] rounded-[12px] overflow-hidden"
              onClick={() => handleStoryClick(story.id)}
            >
              <Image
                height={50}
                width={50}
                className="w-full h-full object-cover"
                src={story.image|| null}
                alt={story.title}
              />
              <span className="absolute left-2 top-2 min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
                <Image
                  height={50}
                  width={50}
                  className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                  src={story.logo || null}
                  alt="logo"
                />
              </span>
              <div className="absolute gradient left-0 bottom-0 pt-6 py-3 w-full">
                <b className="text-white font-semibold text-[12px] namellipse">
                  {story.title}
                </b>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {isPopupOpen && <CreateStoryModal togglePopup={togglePopup} onAddStory={handleAddStory} />}
    </section>
  );
}
