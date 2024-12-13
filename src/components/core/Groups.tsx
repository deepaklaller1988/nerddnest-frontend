"use client";
import React, { useState } from "react";
import TabContent from "./Tabcontent";
import Image from "next/image";

type Group = {
  name: string;
  activeSince: string;
};

const Groups = () => {
  const [activeTab, setActiveTab] = useState<"Newest" | "Active" | "Popular">("Newest");

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab as "Newest" | "Active" | "Popular");
  };

  const items: Group[] = [
    { name: "React Developers", activeSince: "3 days ago" },
    { name: "Node.js Enthusiasts", activeSince: "5 days ago" },
  ];
  
  return (
    <TabContent
      title="GROUPS"
      items={items}
      isLoading={false}
      noItemsMessage="There are no groups currently available."
      tabs={[
        { label: "Newest", count: 0, tabName: "Newest" },
        { label: "Active", count: 0, tabName: "Active" },
        { label: "Popular", count: 0, tabName: "Popular" },
      ]}
      onTabSwitch={handleTabSwitch}
      activeTab={activeTab}
      renderItem={(group: Group) => (
        <section key={group.name} className="cursor-pointer flex items-center gap-2">
          <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
            <Image
              height={50}
              width={50}
              className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
              src="/group-avatar-buddyboss.png"
              alt="group logo"
            />
          </span>
          <span>
            <h6 className="text-white font-semibold">{group.name}</h6>
            <p className="text-[13px] text-gray-500/50">active 3 days ago</p>
          </span>
        </section>
      )}
      viewAllText={"View All"}
    />
  );
};

export default Groups;