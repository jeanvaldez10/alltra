import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const ChatSection = (): React.JSX.Element => {
  return (
    <section className="w-full relative bg-black border border-solid border-[#181818] shadow-[0px_4px_4px_#00000040]">
      <div className="relative pt-[65px] bg-[url(/untitled-design-58-1.png)] bg-cover bg-center min-h-[1025px]">
        <div className="flex flex-col items-center justify-center">
          <Card className="w-[875px] h-[545px] mx-auto mt-[299px] bg-[#000000e6] border border-solid border-[#181818] backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)] rounded-none">
            <CardContent className="p-0 relative h-full">
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[333px] h-[51px] bg-[#000000e6] rounded-lg border border-solid border-[#181818] backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]" />
            </CardContent>
          </Card>

          <div className="w-[427px] mt-8 mx-auto text-center font-['Geist',Helvetica] text-base">
            <span className="font-bold text-white">Alltra Tracker. </span>
            <span className="text-[#939393]">
              Your trading dashboard—seamlessly integrating your trades, stats,
              journal, trackers, tools, and more!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};