"use client";

import React, { useMemo, useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSectionV2 = () => {
    const [currentWord, setCurrentWord] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const words = useMemo(
        () => ["Trading Journey", "Systemical Quantum", "Intelligence", "Trading World"],
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
        <div className="relative isolate px-6  lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a55ff5] to-[#493cf8] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm/6 text-neutral-400 ring-1 ring-neutral-100/10 hover:ring-neutral-300/20">
                        Announcing our new platforms.{' '}
                        <a href="#" className="font-semibold text-blue-600">
                            <span aria-hidden="true" className="absolute inset-0" />
                            Read more
                        </a>
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-balance text-5xl font-bold tracking-tight  sm:text-7xl">
                        Start your <div className='h-20 text-transparent  bg-clip-text bg-gradient-to-l from-blue-500 via-blue-200 to-white'> {currentWord}</div>
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-neutral-400 sm:text-xl/8">
                        A complete trading toolkit and platform, built to empower traders with everything they need to achieve real results.
                    </p>
                    <div className="animate-item-3 justify-center gap-2 mt-4 items-center flex">
                        <Button className="">Begin journey</Button>

                        <div>
                            <button className=" [&>span]:tex-sm backdrop-blur duration-150  bg-gradient-to-tr from-zinc-900/40 to-blue-600/20 py-1.5  px-4 rounded-md border border-blue-800/50 flex items-center gap-1  hover:border-blue-600 hover:shadow-blue-700/50  intro-button-hero">
                                <span className="text-sm font-extrathin mr-1">Introducing Systematical Intelligence</span>
                                <ArrowRight className="w-4 relative -mr-1 text-neutral-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80dbff] to-[#4d41f3] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                />
            </div>
        </div>
    )
}

export default HeroSectionV2