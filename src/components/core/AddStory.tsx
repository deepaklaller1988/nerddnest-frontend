"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import CreateStoryModal from "../Modals/CreateStoryModal";
export default function AddStory() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4.5,
    slidesToScroll: 1,
  };
  return (
    <section className="flex flex-col gap-5 w-full">
      <div className="w-full">
        <Slider {...settings}>
          <div className="relative h-[160px] rounded-[12px] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/dp.jpg"
              alt="dp"
            />
            <button
              onClick={togglePopup}
              className="absolute bg-[var(--highlght-hover)] left-0 bottom-0 pt-6 py-3 w-full text-center"
            >
              <span className="absolute text-black/80 w-10 h-10 bg-[#8cefe9] text-[30px] font-normal -top-5 left-1/2 -ml-5 rounded-full flex items-center justify-center">
                +
              </span>
              <b className="text-white font-semibold text-[12px]">
                Create Story
              </b>
            </button>
          </div>
          <div className="relative h-[160px] rounded-[12px] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/dp.jpg"
              alt="dp"
            />
            <span className="absolute left-2 top-2 min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
              <img
                className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                src="/logo.png"
                alt="logo"
              />
            </span>
            <div className="absolute gradient left-0 bottom-0 pt-6 py-3 w-full">
              <b className="text-white font-semibold text-[12px] namellipse">
                Alvin Marcos
              </b>
            </div>
          </div>
          <div className="relative h-[160px] rounded-[12px] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/dp.jpg"
              alt="dp"
            />
            <span className="absolute left-2 top-2 min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
              <img
                className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                src="/logo.png"
                alt="logo"
              />
            </span>
            <div className="absolute gradient left-0 bottom-0 pt-6 py-3 w-full">
              <b className="text-white font-semibold text-[12px] namellipse">
                Alvin Marcos
              </b>
            </div>
          </div>
          <div className="relative h-[160px] rounded-[12px] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/dp.jpg"
              alt="dp"
            />
            <span className="absolute left-2 top-2 min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
              <img
                className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                src="/logo.png"
                alt="logo"
              />
            </span>
            <div className="absolute gradient left-0 bottom-0 pt-6 py-3 w-full">
              <b className="text-white font-semibold text-[12px] namellipse">
                Alvin Marcos
              </b>
            </div>
          </div>
          <div className="relative h-[160px] rounded-[12px] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/dp.jpg"
              alt="dp"
            />
            <span className="absolute left-2 top-2 min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
              <img
                className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                src="/logo.png"
                alt="logo"
              />
            </span>
            <div className="absolute gradient left-0 bottom-0 pt-6 py-3 w-full">
              <b className="text-white font-semibold text-[12px] namellipse">
                Alvin Marcos
              </b>
            </div>
          </div>
          <div className="relative h-[160px] rounded-[12px] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="/dp.jpg"
              alt="dp"
            />
            <span className="absolute left-2 top-2 min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
              <img
                className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
                src="/logo.png"
                alt="logo"
              />
            </span>
            <div className="absolute gradient left-0 bottom-0 pt-6 py-3 w-full">
              <b className="text-white font-semibold text-[12px] namellipse">
                Alvin Marcos
              </b>
            </div>
          </div>
        </Slider>
      </div>
      {isPopupOpen && (
       <CreateStoryModal togglePopup={togglePopup}/>
      )}
    </section>
  );
}
