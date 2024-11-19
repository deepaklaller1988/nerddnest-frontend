"use client";
import React, { useState } from "react";
import TabContent from "./Tabcontent";

const Groups = () => {
  const [activeTab, setActiveTab] = useState<"Newest" | "Active" | "Popular">("Newest");

  const handleTabSwitch = (tab: string) => { 
    setActiveTab(tab as "Newest" | "Active" | "Popular"); 
  };

  return (
    <TabContent
      title="GROUPS"
      items={[]} 
      isLoading={false} 
      noItemsMessage="There are no groups currently available."
      tabs={[
        { label: "Newest", count: 0, tabName: "Newest" },
        { label: "Active", count: 0, tabName: "Active" },
        { label: "Popular", count: 0, tabName: "Popular" },
      ]}
      onTabSwitch={handleTabSwitch}
      activeTab={activeTab}
      renderItem={(group:any) => (
        <section key={group.name} className="cursor-pointer flex items-center gap-2">
          <span className="relative min-w-10 min-h-10 max-w-10 max-h-10 rounded-full block border border-2 border-black/5 border-white">
            <img
              className="w-full block h-full bg-cover bg-center overflow-hidden rounded-full"
              src="/logo.png"
              alt="group logo"
            />
          </span>
          <span>
            <h6 className="text-[var(--highlight)]">{group.name}</h6>
            <p className="text-[13px] text-gray-500/50">active 3 days ago</p>
          </span>
        </section>
      )}
      viewAllText="View All"
    />
  );
};

export default Groups;