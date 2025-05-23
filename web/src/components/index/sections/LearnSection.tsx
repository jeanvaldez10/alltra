import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const LearnSection = (): React.JSX.Element => {
  return (
    <Card className="w-full max-w-[529px] h-[461px] bg-black border border-solid border-[#181818]">
      <CardContent className="flex flex-col items-center justify-center h-full p-6">
        <h2 className="text-xl font-semibold text-white mb-2">Altra Chat</h2>

        <p className="w-[305px] text-center text-white text-base font-normal [font-family:'Geist',Helvetica] mb-8">
          Trade. Connect. Share. Your central hub for trading communication.
        </p>

        <div className="flex space-x-4 mb-6">
          <Button
            variant="outline"
            className="w-[92px] h-[30px] bg-white text-black text-xs font-normal rounded-sm"
          >
            Explore
          </Button>

          <Button className="w-[107px] h-[30px] bg-transparent border border-white text-white text-xs font-normal rounded-sm">
            Get started
          </Button>
        </div>

        <img
          className="w-[259px] h-[233px] object-cover"
          alt="Screenshot"
          src="/alltra_tracker.png"
        />
      </CardContent>
    </Card>
  );
};
