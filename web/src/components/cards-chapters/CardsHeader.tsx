"use client";

import React from 'react'

const CardsHeader: React.FC<{setSelectedCard: React.Dispatch<React.SetStateAction<number>>, ulRef: React.RefObject<React.Ref<HTMLUListElement>>,backgroundPosition: number, SelectedChapter: number, data: {name: string, id: number}[], setCurrentCard: React.Dispatch<React.SetStateAction<{name: string, id: number}>>}> = ({ulRef, data, setCurrentCard, SelectedChapter, backgroundPosition, setSelectedCard}) => {
    React.useEffect(() => {
        const selectedChapterData = data.find(
            (item) => item.id === SelectedChapter
        );
        setCurrentCard(selectedChapterData || { name: "Chapter 1", id: 1 });


    }, [SelectedChapter, data]);

  return (
    <div className="flex justify-between px-4" id="top-header-cards">
    <div className="flex flex-col">
        <h1 className="text-lg ">There’s an extension for that.</h1>
        <h1 className="text-lg text-neutral-500">Use your favorite tools without even opening them.</h1>

    </div>
    <div className="relative flex items-center bg-zinc-900/50 px-1.5 rounded-full h-full py-1.5 border-t-[2px] border-neutral-900">
        <ul
            ref={ulRef as any}
            className="relative flex items-center gap-2 [&>li]:px-3 [&>li]:rounded-full [&>li]:py-2 [&>li]:text-sm"
        >
            {/* Animated background */}
            <div
                className="absolute top-0 h-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 rounded-full transition-all duration-300 ease-in-out"
                style={{
                    width: "80px", // Adjust this width to match the size of your `li` elements
                    transform: `translateX(${backgroundPosition - 40}px)`,
                }}
            ></div>

            {data.map((item) => (
                <li
                    key={item.id}
                    data-id={item.id}
                    className={`relative z-10 select-none cursor-pointer duration-150 text-center ${SelectedChapter === item.id
                        ? "text-white"
                        : "text-neutral-400 hover:text-white"
                        }`}
                    onClick={() => setSelectedCard(item.id)}
                >
                    {item.name}
                </li>
            ))}
        </ul>
    </div>
</div>
  )
}

export default CardsHeader