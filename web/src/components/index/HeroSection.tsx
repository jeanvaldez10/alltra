"use client";
import { ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { HoverBorderGradient } from '../ui/hover-border-gradient';

const text =
    "Your all-in-one personalized trading platform, designed to provide a seamless experience for traders at every level.";

const HeroSection = () => {
    const [currentWord, setCurrentWord] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const words = useMemo(
        () => ["Trading Journey", "Future", "Intelligence", "IDEA"],
        []
    );

    const typingSpeed = 150;
    const pauseTime = 5000;
    const deletingSpeed = 100;
    const lastWordPauseTime = 10000;
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const word = words[wordIndex];

        if (!isDeleting) {
            if (currentWord.length < word.length) {
                const typeTimeout = setTimeout(() => {
                    setCurrentWord(word.slice(0, currentWord.length + 1))
                }, typingSpeed);
                return () => clearTimeout(typeTimeout);
            } else {
                const isLastWord = wordIndex === words.length - 1;
                const pauseTimeout = setTimeout(() => {
                    setIsDeleting(true)
                }, isLastWord ? lastWordPauseTime : pauseTime);
                return () => clearTimeout(pauseTimeout);
            }
        } else {
            if (currentWord.length > 0) {
                const deleteTimeout = setTimeout(() => {
                    setCurrentWord(currentWord.slice(0, -1));
                }, deletingSpeed);
                return () => clearTimeout(deleteTimeout);
            } else {
                setIsDeleting(false);
                setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            }
        }
    }, [currentWord, isDeleting, wordIndex, words, typingSpeed, pauseTime, deletingSpeed, lastWordPauseTime]);

    return (
        <div className="mb-16 mt-16 max-w-5xl mx-auto h-full  rounded-xl flex flex-col" id='hero-section'>
            <div className="w-full h-full  rounded-2xl flex z-50 mt-60">
                <div className="flex flex-col mt-16 items-center w-full" id="hero-section-content">

                    <h1 className="text-4xl text-center w-full mx-auto justify-center md:text-5xl md:leading-[1.2] font-bold  text-white bg-opacity-50">
                        Alltra <span className='relative z-[1] ml-1 bg-gradient-to-r from-[#FFFFFF] to-[#4B4D6A] bg-clip-text text-transparent pro-shadow'>PRO</span>
                        <br />
                        <span className='font-normal'>
                            Trade Beyond Limits.
                        </span>

                    </h1>
                    <p className="animate-item-2 text-center text-2xl font-base  max-w-[660px]  mt-4 text-white">
                        {text.split("").map((letter, i) => {
                            if (letter === " ") {
                                return <span key={i}>&nbsp;</span>;
                            } else {
                                return <span key={i} style={{ animationDelay: `${i * 3}ms` }}>{letter}</span>;
                            }
                        })}
                    </p>

                    <div className="animate-item-3 gap-2 mt-4 items-center flex">

                        <Button className='glow-on-hover bg-[#1F0FFF] cursor-pointer relative hover:bg-[#1F0FFF]'>
                            Start For Free
                        </Button>
                        <HoverBorderGradient
                            containerClassName="rounded-[10px] group"
                            as="button"
                            className="text-base text-white flex h-9 items-center"
                        >
                            <span className="bg-gradient-to-r from-[#FFFFFF] to-[#bfc0c9] bg-clip-text text-transparent">
                                Explore Altra PRO
                            </span>
                            <ArrowRight className="size-3 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-1 ml-2" />

                        </HoverBorderGradient>



                    </div></div> </div>
        </div>
    )
}

export default HeroSection