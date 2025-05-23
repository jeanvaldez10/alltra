import Footer from "@/components/global/footer";
import getUser from "@/components/global/getUser";
import Navbar from "@/components/global/navbar";
import HeroSection from "@/components/index/HeroSection";
import { MarketsSection } from "@/components/index/sections/MarketsSection";
import ProductSection from "@/components/index/sections/ProductSection";
import PreviewNav from "@/components/macos-preview/PreviewNav";

const FrameScreen = async () => {
  // Footer links data for mapping
  const supportLinks = [
    { title: "Contact us", href: "#" },
    { title: "FAQ", href: "#" },
    { title: "Emergency", href: "#" },
    { title: "Community", href: "#" },
  ];

  const disclosureLinks = [
    { title: "Terms & Conditions", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "Risk Disclaimer", href: "#" },
    { title: "Cookies policy", href: "#" },
  ];

  // Affiliate cards data
  const affiliateCards = [
    {
      title: "Alltra Affiliate",
      description:
        "Earn 30% for every referral you make. No limits, just rewards.",
      isNew: true,
    },
    {
      title: "Alltra Integrations",
      description:
        "Your favorite trading platforms and Alltra platforms in one.",
      isNew: false,
    },
    {
      title: "Alltra Highlights",
      description: "Get the latest updates and Alltra exciting highlights.",
      isNew: false,
    },
  ];


  const user = await getUser()

  return (
    <div className="bg-black flex flex-row justify-center w-full">
      <div className="bg-black w-full  relative" >
        {/* Header Section */}
        <section className="w-full relative">
          <Navbar isLoggedIn={!!user} />
        </section>
        <div className="max-w-[1920px] mx-auto px-3 lg:px-6">
          {/* Chat Section */}
          <div >
            <div className="relative isolate px-3  lg:px-8" >
              <div style={{
                backgroundImage: "url('/shooting.png')",
                backgroundPosition: "center",
                backgroundSize: "cover"
              }}
                className="  border-x relative">
                <HeroSection />
                <img src="/myhome.png" className="w-full h-full object-contain rounded-t-3xl relative top-20 px-20 pb-10" />
              </div>

            </div>


          </div>


          {/* Optimizer and Highlights Sections and Tracker and Learn Sections */}
          <ProductSection />

          {/* Coming soon Section */}
          <MarketsSection />
        </div>

        {/* Footer */}
        <div className="border-t w-full mt-16" >
          <Footer className="" />
        </div>
      </div>
    </div>
  );
};

export default FrameScreen;