"use client"
import { motion } from "framer-motion"

export default function index() {
    return (

        <div className={"top-0 left-0 fixed z-[2] h-screen flex transition-all cursor-none "}>

            {

                [...Array(5)].map((_, index) => {

                    return <Stair key={index} index={index} />

                })

            }
            <Background />

        </div>

    )
}
const Background = () => {

    return <motion.div

        variants={background}

        {...mountAnim}

        className={'w-full h-full absolute bg-black'}>

    </motion.div>

}
const Stair = ({ index }: { index: number }) => {

    return <motion.div

        variants={height}

        {...mountAnim}

        custom={4 - index}

        className={'w-[20vw] h-full bg-black'}>
    </motion.div>

}

export const mountAnim = { 'initial': 'initial', 'animate': 'enter', 'exit': 'exit' }

export const height = {
    initial: {
        height: 0
    },
    enter: (i: number) => ({
        height: "100%",
        transition: { duration: 0.5, delay: 0.05 * i, ease: [0.33, 1, 0.68, 1] }
    }),
    exit: (i: number) => ({
        height: 0,
        transition: { duration: 0.3, delay: 0.05 * i, ease: [0.33, 1, 0.68, 1] }
    })
}

export const background = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 0.5,
        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
    }
}
export const opacity = {
    initial: {
        opacity: 0
    },
    enter: (i: number) => ({
        opacity: 1,
        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: i }
    }),
    exit: {
        opacity: 0,
        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
    }
}