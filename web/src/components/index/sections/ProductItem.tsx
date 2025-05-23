import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type ProductItemProps = {
    title: string;
    description: string;
    image: string;
    page: string
};

function ProductItem({ item }: { item: ProductItemProps }) {
    const Classes = item.title === "Tracker" ? "font-normal font-orbitron" : item.title === "CHAT" ? "font-lucky font-normal" : item.title === "Optimizer" ? "font-nova" : ""
    return (
        <Card className="w-full min-h-[485px] max-h-[485px] h-full pt-14 !pb-0 bg-black border border-solid border-[#181818] rounded-xl relative">
            <CardContent className="flex flex-col items-center justify-start h-full relative">
                <div className="flex items-center justify-center">
                    <h2 className="text-[35px] leading-[53px] font-bold font-geist text-white">
                        Alltra
                        <span className={`${Classes} text-white ml-1.5`}>
                            {item.title}
                        </span>
                    </h2>
                </div>

                <p className={`text-base text-white text-center ${item.title === "Tracker" ? "max-w-[427px]" : "max-w-[351px]"} font-normal font-geist`}>
                    {item.description}
                </p>

                <div className="flex space-x-3 mt-4">
                    <Button
                        variant="default"
                        asChild
                        className="h-[30px] w-[92px] bg-white text-black text-xs rounded-lg font-geist transition-colors duration-300 ease-in-out hover:bg-white/20 hover:text-white"
                    >
                        <Link href={item.page}>
                            Explore
                        </Link>
                    </Button>


                    <Button
                        variant="outline"
                        className="h-[30px] w-[107px] border-[0.3px] border-[#373737] text-white text-xs rounded-lg font-geist transition-all duration-300 ease-in-out hover:bg-white/10 hover:border-white/50"
                    >
                        Get started
                    </Button>

                </div>

                <div className="w-full flex justify-center absolute bottom-0 left-1/2 -translate-x-1/2">
                    <img
                        className="w-[311px] h-auto object-cover"
                        alt="Trading dashboard screenshot"
                        src={item.image}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

export default ProductItem;