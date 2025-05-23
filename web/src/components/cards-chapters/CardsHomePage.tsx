"use client";

import React, { useState, useEffect, useRef } from 'react'

import { ChevronRight } from "lucide-react";
import CardsHeader from './CardsHeader';

const ChaptersCardData = [
    { name: "Chapter 1", id: 1 },
    { name: "Chapter 2", id: 2 },
    { name: "Chapter 3", id: 3 },
    { name: "Chapter 4", id: 4 },
]


const CardsHomePage = () => {
    const [SelectedChapter, setSelectedChapter] = useState(ChaptersCardData[0]?.id);
    const [backgroundPosition, setBackgroundPosition] = useState(0);
    const ulRef = useRef<React.Ref<HTMLUListElement>>(null);
    const [currentCard, setCurrentCard] = useState({ name: "Chapter 1", id: 1 });
    useEffect(() => {
        if (ulRef.current) {
            const listItems = (ulRef.current as any).children;
            const selectedItem = [...listItems].find(
                (li) => li.dataset.id === SelectedChapter.toString()
            );
            if (selectedItem) {
                const itemCenter =
                    selectedItem.offsetLeft + selectedItem.offsetWidth / 2;
                setBackgroundPosition(itemCenter);
            }
        }

    }, [SelectedChapter]);

    return (
        <div className="w-full max-w-6xl mx-auto mt-32">
            <CardsHeader data={ChaptersCardData} setSelectedCard={setSelectedChapter} SelectedChapter={SelectedChapter} setCurrentCard={setCurrentCard} ulRef={ulRef} backgroundPosition={backgroundPosition} />
            <div className="mt-16 mb-32" id="content-cards">
                <div className="flex gap-3">
                    {/* Animated card */}
                    {currentCard.id == 1 && (
                        <div className="flex gap-5">
                            <div

                                className="h-96 w-72 rounded-2xl border border-neutral-700 p-4 card-1 transition-all   ease-in-out transform opacity-0 animate-FadeIn"
                            >
                                <div className="flex items-center justify-between" id="card-header">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-9 h-9 shadow-lg bg-gradient-to-tr from-neutral-700/50 to-zinc-900/50 border border-neutral-600 rounded-lg"></div>
                                        <h1>{currentCard.name}</h1>
                                    </div>
                                    <div className="bg-gradient-to-tr from-zinc-700/20 to-zinc-500/20 border border-neutral-700 px-1.5 rounded  py-1.5">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            <div

                                className="h-96 w-72 rounded-2xl border border-neutral-700 p-4 card-1 transition-all delay-100   ease-in-out transform opacity-0 animate-FadeIn"
                            >
                                <div className="flex items-center justify-between" id="card-header">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-9 h-9 shadow-lg bg-gradient-to-tr from-neutral-700/50 to-zinc-900/50 border border-neutral-600 rounded-lg"></div>
                                        <h1>{currentCard.name}</h1>
                                    </div>
                                    <div className="bg-gradient-to-tr from-zinc-700/20 to-zinc-500/20 border border-neutral-700 px-1.5 rounded  py-1.5">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            <div

                                className="h-96 w-72 rounded-2xl border border-neutral-700 p-4 card-1 transition-all delay-150  ease-in-out transform opacity-0 animate-FadeIn"
                            >
                                <div className="flex items-center justify-between" id="card-header">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-9 h-9 shadow-lg bg-gradient-to-tr from-neutral-700/50 to-zinc-900/50 border border-neutral-600 rounded-lg"></div>
                                        <h1>{currentCard.name}</h1>
                                    </div>
                                    <div className="bg-gradient-to-tr from-zinc-700/20 to-zinc-500/20 border border-neutral-700 px-1.5 rounded  py-1.5">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                    {currentCard.id == 2 && (
                        <div className="flex gap-5">
                            <div

                                className="h-96 w-72 rounded-2xl border border-neutral-700 p-4 card-1 transition-all   ease-in-out transform opacity-0 animate-FadeIn"
                            >
                                <div className="flex items-center justify-between" id="card-header">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-9 h-9 shadow-lg bg-gradient-to-tr from-neutral-700/50 to-zinc-900/50 border border-neutral-600 rounded-lg"></div>
                                        <h1>{currentCard.name}</h1>
                                    </div>
                                    <div className="bg-gradient-to-tr from-zinc-700/20 to-zinc-500/20 border border-neutral-700 px-1.5 rounded  py-1.5">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            <div

                                className="h-96 w-72 rounded-2xl border border-neutral-700 p-4 card-1 transition-all delay-100   ease-in-out transform opacity-0 animate-FadeIn"
                            >
                                <div className="flex items-center justify-between" id="card-header">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-9 h-9 shadow-lg bg-gradient-to-tr from-neutral-700/50 to-zinc-900/50 border border-neutral-600 rounded-lg"></div>
                                        <h1>{currentCard.name}</h1>
                                    </div>
                                    <div className="bg-gradient-to-tr from-zinc-700/20 to-zinc-500/20 border border-neutral-700 px-1.5 rounded  py-1.5">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            <div

                                className="h-96 w-72 rounded-2xl border border-neutral-700 p-4 card-1 transition-all delay-150  ease-in-out transform opacity-0 animate-FadeIn"
                            >
                                <div className="flex items-center justify-between" id="card-header">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-9 h-9 shadow-lg bg-gradient-to-tr from-neutral-700/50 to-zinc-900/50 border border-neutral-600 rounded-lg"></div>
                                        <h1>{currentCard.name}</h1>
                                    </div>
                                    <div className="bg-gradient-to-tr from-zinc-700/20 to-zinc-500/20 border border-neutral-700 px-1.5 rounded  py-1.5">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                    {currentCard.id == 3 && (
                        <div className="flex gap-5">
                            <div

                                className="h-96 w-72 rounded-2xl border border-neutral-700 p-4 card-1 transition-all   ease-in-out transform opacity-0 animate-FadeIn"
                            >
                                <div className="flex items-center justify-between" id="card-header">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-9 h-9 shadow-lg bg-gradient-to-tr from-neutral-700/50 to-zinc-900/50 border border-neutral-600 rounded-lg"></div>
                                        <h1>{currentCard.name}</h1>
                                    </div>
                                    <div className="bg-gradient-to-tr from-zinc-700/20 to-zinc-500/20 border border-neutral-700 px-1.5 rounded  py-1.5">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            <div

                                className="h-96 w-72 rounded-2xl border border-neutral-700 p-4 card-1 transition-all delay-100   ease-in-out transform opacity-0 animate-FadeIn"
                            >
                                <div className="flex items-center justify-between" id="card-header">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-9 h-9 shadow-lg bg-gradient-to-tr from-neutral-700/50 to-zinc-900/50 border border-neutral-600 rounded-lg"></div>
                                        <h1>{currentCard.name}</h1>
                                    </div>
                                    <div className="bg-gradient-to-tr from-zinc-700/20 to-zinc-500/20 border border-neutral-700 px-1.5 rounded  py-1.5">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            <div

                                className="h-96 w-72 rounded-2xl border border-neutral-700 p-4 card-1 transition-all delay-150  ease-in-out transform opacity-0 animate-FadeIn"
                            >
                                <div className="flex items-center justify-between" id="card-header">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-9 h-9 shadow-lg bg-gradient-to-tr from-neutral-700/50 to-zinc-900/50 border border-neutral-600 rounded-lg"></div>
                                        <h1>{currentCard.name}</h1>
                                    </div>
                                    <div className="bg-gradient-to-tr from-zinc-700/20 to-zinc-500/20 border border-neutral-700 px-1.5 rounded  py-1.5">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                    {currentCard.id == 4 && (
                        <div className="flex gap-5">
                            <div

                                className="h-96 w-72 rounded-2xl border border-neutral-700 p-4 card-1 transition-all   ease-in-out transform opacity-0 animate-FadeIn"
                            >
                                <div className="flex items-center justify-between" id="card-header">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-9 h-9 shadow-lg bg-gradient-to-tr from-neutral-700/50 to-zinc-900/50 border border-neutral-600 rounded-lg"></div>
                                        <h1>{currentCard.name}</h1>
                                    </div>
                                    <div className="bg-gradient-to-tr from-zinc-700/20 to-zinc-500/20 border border-neutral-700 px-1.5 rounded  py-1.5">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            <div

                                className="h-96 w-72 rounded-2xl border border-neutral-700 p-4 card-1 transition-all delay-100   ease-in-out transform opacity-0 animate-FadeIn"
                            >
                                <div className="flex items-center justify-between" id="card-header">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-9 h-9 shadow-lg bg-gradient-to-tr from-neutral-700/50 to-zinc-900/50 border border-neutral-600 rounded-lg"></div>
                                        <h1>{currentCard.name}</h1>
                                    </div>
                                    <div className="bg-gradient-to-tr from-zinc-700/20 to-zinc-500/20 border border-neutral-700 px-1.5 rounded  py-1.5">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                            <div

                                className="h-96 w-72 rounded-2xl border border-neutral-700 p-4 card-1 transition-all delay-150  ease-in-out transform opacity-0 animate-FadeIn"
                            >
                                <div className="flex items-center justify-between" id="card-header">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-9 h-9 shadow-lg bg-gradient-to-tr from-neutral-700/50 to-zinc-900/50 border border-neutral-600 rounded-lg"></div>
                                        <h1>{currentCard.name}</h1>
                                    </div>
                                    <div className="bg-gradient-to-tr from-zinc-700/20 to-zinc-500/20 border border-neutral-700 px-1.5 rounded  py-1.5">
                                        <ChevronRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </div>
    )
}

export default CardsHomePage