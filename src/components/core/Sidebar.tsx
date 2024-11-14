"use client";
import React, { useState } from "react";
import MenuItems from "./MenuItems";
import Image from "next/image";

interface SidebarProps {
  type: string; 
}

export default function Sidebar({ type }: SidebarProps) { 
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      {type === "home" ? (
        <div className="min-w-[280px] max-w-[280px] rounded-[12px] bg-white">
          <h2 className="text-[var(--highlight)] font-semibold p-4">
            WELCOME TO ACCOUNT
          </h2>
          <MenuItems toggleSection={toggleSection} openSections={openSections} />
        </div>
      ) : (
        <div className="w-full min-w-[280px] overflow-y-auto overflow-x-hidden rounded-lg bg-white absolute right-0 mt-1 max-h-[500px]">
          <section className="sticky top-0 bg-white cursor-pointer flex gap-4 justify-between items-center p-4 border-b border-b-1 border-black/10 hover:bg-gray-400/10 duration-[.5s]">
            <span className="min-w-10 min-h-10 max-w-10 max-h-10 rounded-full overflow-hidden block">
              <Image height={100} width={100} className="w-full block h-full" src="/logo.png" alt="logo" />
            </span>
            <div className="w-full">
              <b className="text-[var(--highlight)]">Ambros Marcos</b>
            </div>
          </section>
          <MenuItems toggleSection={toggleSection} openSections={openSections} />
        </div>
      )}
    </>
  );
}
