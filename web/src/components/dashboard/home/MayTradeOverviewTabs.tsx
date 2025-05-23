"use client";

import React, { useEffect } from "react";

const TabsHeader: React.FC<{
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  ulRef: React.RefObject<HTMLUListElement>;
  backgroundPosition: number;
  selectedTab: number;
  data: { name: string; id: number }[];
  setCurrentTab: React.Dispatch<React.SetStateAction<{ name: string; id: number }>>;
}> = ({ ulRef, data, setCurrentTab, selectedTab, backgroundPosition, setSelectedTab }) => {
  // State to manage the width of the animated background
  const [backgroundWidth, setBackgroundWidth] = React.useState(0);

  // Update the current tab data when selectedTab changes
  useEffect(() => {
    const selectedTabData = data.find((item) => item.id === selectedTab);
    setCurrentTab(selectedTabData || { name: "Events", id: 1 });
  }, [selectedTab, setCurrentTab]);

  // Calculate the position and width of the animated background
  useEffect(() => {
    if (ulRef.current) {
      const selectedLi = ulRef.current.querySelector(
        `[data-id="${selectedTab}"]`
      ) as HTMLLIElement;
      if (selectedLi) {
        const { offsetLeft, offsetWidth } = selectedLi;
        // Set the background width to match the selected tab's width
        setBackgroundWidth(offsetWidth);
        // Update backgroundPosition to center the background under the tab
        // This assumes backgroundPosition is managed externally; otherwise, calculate it here
      }
    }
  }, [selectedTab, ulRef]);

  return (
    <div className="bg-neutral-900/50 rounded-xl py-2 px-2 flex items-center gap-4">
      <ul
        ref={ulRef}
        className="relative flex items-center gap-2 [&>li]:px-2 [&>li]:py-1 [&>li]:rounded-lg [&>li]:text-sm"
      >
        <div
          className="absolute top-0 h-full bg-neutral-800/50 shadow-md shadow-neutral-950 rounded-lg transition-all duration-300 ease-in-out"
          style={{
            width: `${backgroundWidth}px`, // Dynamically set the width
            transform: `translateX(${backgroundPosition - backgroundWidth / 2}px)`, // Center the background
          }}
        ></div>

        {data.map((item) => (
          <li
            key={item.id}
            data-id={item.id}
            className={`relative z-10 select-none cursor-pointer duration-150 text-center ${selectedTab === item.id
              ? "text-white font-semibold"
              : "text-neutral-400 hover:text-white"
              }`}
            onClick={() => setSelectedTab(item.id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabsHeader;