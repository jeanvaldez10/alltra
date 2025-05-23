"use client";

import React, { useState, useEffect } from "react";

const DateDisplay = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const formatDate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short", // Must be "short", "long", or "narrow"
        month: "short",   // Must be "short", "long", or "narrow"
        day: "numeric",   // Must be "numeric" or "2-digit"
      };
      const formattedDate = now.toLocaleDateString("en-US", options);
      setCurrentDate(formattedDate);
    };
    formatDate();
  }, []);

  return <p className="text-sm mr-2 select-none">{currentDate}</p>;
};

export default DateDisplay;