"use client";

import React from "react";
import TabsHeader from "./MayTradeOverviewTabs"; // Adjust the import path



const ParentComponentTabs: React.FC = () => {
    const [selectedTab, setSelectedTab] = React.useState(1);
    const [currentTab, setCurrentTab] = React.useState({ name: "Events", id: 1 });
    const [backgroundPosition, setBackgroundPosition] = React.useState(0);
    const ulRef = React.useRef<HTMLUListElement>(null); // This is correct

    React.useEffect(() => {
        const ul = ulRef.current;
        if (ul) {
            const selectedLi = ul.querySelector(`[data-id="${selectedTab}"]`) as any;
            if (selectedLi) {
                setBackgroundPosition(selectedLi.offsetLeft + selectedLi.offsetWidth / 2);
            }
        }
    }, [selectedTab]);

    const tabData = [
        { name: "Events", id: 1 },
        { name: "Updates", id: 2 },
        { name: "News", id: 3 },
    ];

    return (
        <TabsHeader
            ulRef={ulRef as any}
            data={tabData}
            setCurrentTab={setCurrentTab}
            selectedTab={selectedTab}
            backgroundPosition={backgroundPosition}
            setSelectedTab={setSelectedTab}
        />
    );
};

export default ParentComponentTabs;