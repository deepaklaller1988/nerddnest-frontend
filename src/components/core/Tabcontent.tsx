import React from 'react';
import { TabContentProps } from '@/types/sidebarInterfaces';
import ViewButton from '../Buttons/ViewButtons';

const TabContent = <T extends string, Item>({
  title,
  items,
  isLoading,
  noItemsMessage,
  tabs,
  onTabSwitch,
  activeTab,
  renderItem,
}: TabContentProps<T, Item>) => {
  
  const handleClick = () => {
    // handle view all button click
  };

  return (
    <div className="min-w-[280px] max-w-[280px] rounded-[12px] bg-white p-4">
      <h2 className="text-[var(--highlight)] font-semibold pb-4">{title}</h2>
      
      <div className="w-full">
        <section className="border-b border-gray-500/50 flex gap-4 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.tabName}
              onClick={() => onTabSwitch(tab.tabName)}
              className={`py-2 relative bottom-[-1px] ${tab.tabName === activeTab ? 'activeFriends' : ''}`}
            >
              {tab.label}
              {title === "FRIENDS" && <b className="font-normal ml-2">{tab.count}</b>}
            </button>
          ))}
        </section>
        
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : items.length === 0 ? (
            <p>{noItemsMessage}</p>
          ) : (
            <div className="w-full flex flex-col gap-3">
              {items.map(renderItem)}
            </div>
          )}
        </div>
        
        {title === "GROUPS" && (
          <ViewButton
            onClick={handleClick}
            className="sticky bottom-0 bg-white font-semibold w-full p-4 text-center flex gap-2 items-center justify-center text-[var(--highlight-blue)] hover:text-[--highlight] buttonSet"
            name={"View All"}
          />
        )}
      </div>
    </div>
  );
};

export default TabContent;
