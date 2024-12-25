"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ViewButton from "../Buttons/ViewButtons";

export default function HeaderModal({ type, closePopup }: any) {
  const router = useRouter();

  const handleRoute = () => {
    closePopup();
    if (type === "message") {
      router.push("/messages");
    } else {
      router.push("/notifications");
    }
  };
  return (
    <>
      <div className="w-full min-w-[280px] overflow-y-auto overflow-x-hidden rounded-lg bg-[var(--bgh)] absolute right-0 mt-1 max-h-[500px]">
        <section className="bg-black/20 sticky top-0 p-4 border-b border-b-1 border-black/10 hover:bg-gray-400/10">
          <h6 className="text-white text-[16px] font-semibold">
            {type == "message" ? "Messages" : "Notifications"}
          </h6>
        </section>
        <section className="bg-black/10 p-4">
          You have no {type == "message" ? "messages" : "notifications"} right
          now.
        </section>
        <section className="cursor-pointer flex gap-4 justify-between items-start p-4 border-b border-b-1 border-black/10 hover:bg-gray-400/10 duration-[.5s]">
          <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
            <img className="w-full block h-full" src="/logo.png" alt="logo" />
          </span>
          <div className="w-full">
            <b className="text-white">Ambros Marcos</b>
            <p>
              Need help or have questions? Our Support team at Nerdd Nest is
              here for you! Reach out anytime.
            </p>
          </div>
        </section>

        <ViewButton
          onClick={handleRoute}
          className="sticky bottom-0 bg-black/20 font-semibold w-full p-4 text-center flex gap-2 items-center justify-center text-[var(--highlight-blue)] hover:text-[--highlight] buttonSet"
          name={type == "message" ? "View Inbox" : "View Notifications"}
        />
      </div>
    </>
  );
}
