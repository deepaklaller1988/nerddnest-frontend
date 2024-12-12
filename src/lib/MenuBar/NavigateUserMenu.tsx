import React from 'react';

const NavigationUserMenu = ({
  menuItems,
  activeTab,
  onTabClick,
  memberCount,
  additionalClasses = '',
}:any) => {
  return (
    <div className={`w-full border-t border-white/5 p-8 py-0 flex gap-6 items-center ${additionalClasses}`}>
      {/* Members Button */}
      {memberCount !== undefined && (
        <div className="mr-4">
          <button className="flex gap-2 items-center font-semibold text-white">
            Members
            <b className="text-[12px] px-2 rounded-full text-white bg-black/50 min-w-[30px]">
              {memberCount}
            </b>
          </button>
        </div>
      )}

      {menuItems.map((item:any) => (
        <button
          key={item.id}
          className={`py-4 border-b ${activeTab === item.id ? 'border-white text-white' : 'border-white/0 hover:border-white hover:text-white'}`}
          onClick={() => onTabClick(item.id)}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default React.memo(NavigationUserMenu);
