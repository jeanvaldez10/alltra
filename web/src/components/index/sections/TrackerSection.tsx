import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const TrackerSection = (): React.JSX.Element => {
  return (
    <Card className="w-full max-w-[550px] h-auto bg-black border border-solid border-[#181818] rounded-none">
      <CardContent className="flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Alltra Learn</h2>
        <p className="w-full max-w-[351px] text-center text-white text-base font-normal mb-6 font-['Geist',Helvetica]">
          Learn to trade and simply navigate your personalized Alltra platform.
        </p>

        <div className="flex gap-3 mb-6">
          <Button
            variant="outline"
            className="h-[30px] w-[92px] bg-white text-black hover:bg-gray-100 hover:text-black rounded-sm text-xs font-normal font-['Geist',Helvetica]"
          >
            Explore
          </Button>

          <Button className="h-[30px] w-[107px] bg-transparent border border-white text-white hover:bg-white/10 rounded-sm text-xs font-normal font-['Geist',Helvetica]">
            Get started
          </Button>
        </div>

        <div className="w-full flex justify-center">
          <img
            className="w-[311px] h-[227px] object-cover"
            alt="Screenshot of Alltra platform"
           src="/iconhome1.png"
          />
        </div>
      </CardContent>
    </Card>
  );
};
