"use client";

import React, { useState, useEffect } from "react";

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedTime = `${hours % 12 || 12}:${minutes
        .toString()
        .padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
      setCurrentTime(formattedTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000); // Update time every second

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return <p className="text-sm select-none">{currentTime}</p>;
};

export default TimeDisplay;
