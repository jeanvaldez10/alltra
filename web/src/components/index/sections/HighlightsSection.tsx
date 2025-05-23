import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const HighlightsSection = (): React.JSX.Element => {
    return (
        <Card className="w-full border border-solid border-[#181818] bg-black rounded-none">
            <CardContent className="flex flex-col items-center justify-center p-6">
                <h2 className="text-white text-xl font-semibold mb-4">Alltra Learn</h2>

                <p className="text-white text-base text-center mb-6 max-w-[351px] font-normal [font-family:'Geist',Helvetica]">
                    Learn to trade and simply navigate your personalized Alltra platform.
                </p>

                <div className="flex gap-3 mb-6">
                    <Button
                        variant="outline"
                        className="h-[30px] w-[92px] bg-white text-black text-xs rounded-sm hover:bg-gray-100 hover:text-black"
                    >
                        Explore
                    </Button>

                    <Button className="h-[30px] w-[107px] bg-transparent border border-white text-white text-xs rounded-sm hover:bg-white/10">
                        Get started
                    </Button>
                </div>

                <div className="w-full flex justify-center">
                    <img
                        className="w-[311px] h-[227px] object-cover"
                        alt="Screenshot of Alltra platform"
                        src="/alltra_tracker.png"
                    />
                </div>
            </CardContent>
        </Card>
    );
};
