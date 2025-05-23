import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const OptimizerSection = (): React.JSX.Element => {
  return (
    <Card className="w-full max-w-[529px] h-auto py-8 bg-black border border-solid border-[#181818] rounded-none">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-8">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-bold text-white">
            Alitra <span className="text-green-500">Optimizer</span>
          </h2>
        </div>

        <p className="text-base text-white text-center max-w-[351px] font-normal font-['Geist',Helvetica]">
          Refine your trading strategies with backtesting for peak performance.
        </p>

        <div className="flex space-x-3">
          <Button
            variant="default"
            className="h-[30px] w-[92px] bg-white hover:bg-gray-200 text-black text-xs rounded-sm font-['Geist',Helvetica]"
          >
            Explore
          </Button>

          <Button
            variant="outline"
            className="h-[30px] w-[107px] border-white text-white hover:bg-gray-900 text-xs rounded-sm font-['Geist',Helvetica]"
          >
            Get started
          </Button>
        </div>

        <div className="w-full flex justify-center">
          <img
            className="w-[311px] h-auto object-cover"
            alt="Trading dashboard screenshot"
            src="/iconhome1.png"
          />
        </div>
      </CardContent>
    </Card>
  );
};
