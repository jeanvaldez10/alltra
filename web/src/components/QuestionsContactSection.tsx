import React from 'react'
import { Users, Newspaper, Video, FileQuestionIcon } from 'lucide-react'
const data = [
    {
        title: "Guide - Getting started",
        description: `Looking for a starting point? Discover
how our ecosystem is designed to work
for you.`,
        icon: Users,
        image: "https://images.pexels.com/photos/7862675/pexels-photo-7862675.jpeg"
    },
    {
        image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg",
        title: "FAQ's",
        description: `Need answers? Browse our FAQ and
find exactly what you're looking for.`,
        icon: FileQuestionIcon
    },
    {
        image: "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg",
        title: "Careers",
        description: `We invite you to unlock your potential—
explore career opportunities that excite
and inspire.`,
        icon: Video
    },
]

const QuestionsContactSection = () => {
    return (
        <div className=' max-w-5xl mx-auto mt-16 overflow-hidden'>
            <div className='bg-neutral-950 p-6 flex rounded-lg items-center'>
                <div className='w-full'>
                    <h1 className='text-xl'>Navigation Center</h1>
                    <p className='text-neutral-400'>Can't find the question that you are looking for? Check out our Center Help!</p>
                </div>
                <div>
                    <button className='w-max text-sm bg-neutral-900 px-3 py-2 rounded border border-neutral-800 hover:bg-white hover:text-black duration-100'>Learn More</button>
                </div>
            </div>
            <div className='flex gap-6 my-16'>
                {data.map((item, i) => {
                    return (
                        <div key={i}
                            style={{
                                backgroundImage: `url("${item.image}")`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                            className="w-96 h-96  rounded-lg cursor-pointer relative group overflow-hidden"
                        >
                            <div className="w-full h-full flex flex-col-reverse bg-gradient-to-b from-black/50 to-black rounded-md border border-neutral-900 transition-all duration-300 group-hover:backdrop-blur-sm">
                                {/* Text Content */}
                                <div className="p-4 transition-all duration-300 group-hover:translate-y-[-60px]">
                                    <div className="bg-neutral-800/50 duration-150 w-max p-2 rounded-lg text-neutral-400 border border-neutral-800 backdrop-blur">
                                        <item.icon className="size-5" />
                                    </div>
                                    <div className="mt-2 duration-150">
                                        <h1 className="text-lg">{item.title}</h1>
                                        <p className="text-sm text-neutral-400">{item.description}</p>
                                    </div>

                                    <div className="flex">
                                        <button className="-bottom-[40px] hover:bg-white hover:text-black text-sm -mt-10 absolute text-neutral-400 border border-neutral-800 transition-transform duration-300 bg-neutral-800/50  px-4 py-2 rounded-lg">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    );
                })}

            </div>
        </div>
    )
}

export default QuestionsContactSection