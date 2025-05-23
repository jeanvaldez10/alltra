'use client'
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

export const MarketsSection = (): React.JSX.Element => {
  return (
    <motion.section
      className="w-full mt-[17px] border border-solid border-[#181818] rounded-xl shadow-[0px_4px_4px_#00000040]"
      initial={{ opacity: 0, y: 30 }} // Starts hidden and slightly lower
      whileInView={{ opacity: 1, y: 0 }} // Fades in and moves up
      viewport={{ once: true, amount: 0.2 }} // Triggers when 20% is in view
      transition={{ duration: 0.6, ease: "easeOut" }} // Smooth effect
    >
      <Card className="w-full py-[136px] px-4 flex flex-col items-center justify-center text-center bg-transparent rounded-xl border-transparent">
        <Button className="rounded-full bg-transparent hover:bg-black/20 transition-colors duration-200 border-[0.3px] border-[#454545]  w-[185px] h-[34px] text-white text-[10px] font-geist">
          Coming soon!
        </Button>

        <CardContent className="p-0 flex flex-col items-center mt-4 bg-transparent">
          <h2 className="text-2xl font-medium text-white mb-4">
            A New Experience with {" "}
            <span className="bg-gradient-to-r from-[#FFDCB4] to-[#FF9A0D] bg-clip-text text-transparent">
              Alltra Markets
            </span>
          </h2>

          <p className="text-base text-white max-w-[552px] mb-8">
            Join the Alltra Markets Waitlist and be among the first to experience
            the future of Ultra-powered market charts.
          </p>

          <div className="flex gap-4">
            <Button
              variant="default"
              className="h-[30px] w-[92px] bg-white text-black text-xs rounded-lg font-geist transition-colors duration-300 ease-in-out hover:bg-white/20 hover:text-white"
            >
              Join waitlist
            </Button>

            <Button
              variant="ghost"
              className="h-[30px] group px-4 rounded-lg border-[0.3px] border-[#373737] hover:border-white/20 bg-black hover:bg-black/20 transition-colors duration-200"
            >
              <span className="bg-gradient-to-r from-[#FFDCB4] to-[#FF9A0D] bg-clip-text text-transparent text-xs">
                Explore Alltra Markets
              </span>
              <ArrowRightIcon className="size-3 text-[#FF9A0D] transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};
