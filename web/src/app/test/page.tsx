"use client";
import { motion } from 'framer-motion'
import {AuroraBackground} from '../../components/ui/aurora-background'
import React from 'react'

const page = () => {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold  text-center">
          Background Test Shining
        </div>
        <div className="font-extralight text-base md:text-4xl  py-4">
          
        </div>
        <button className="bg-black  rounded-full w-fit text-white  px-4 py-2">
          test
        </button>
      </motion.div>
    </AuroraBackground>
  )
}

export default page