"use client";
import { useState, useEffect } from "react";

function useScrollY() {
    const [scrollY, setScrollY] = useState<number>(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scrollY;
}

export default useScrollY;