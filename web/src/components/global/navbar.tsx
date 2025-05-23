"use client";

import React, { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Contact, File, FileQuestion, GraduationCap, LayoutDashboard, LucideProps, MenuIcon, Newspaper, PenTool, User, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

import { LucideIcon } from "lucide-react"
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import Stairs, { height, opacity } from "./stairs";

const platform_items: { title: string; href: string; description: string, icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> }[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description:
      "Performance Tracker",
    icon: LayoutDashboard
  },
  {
    title: "Maycademy",
    href: "/academy",
    description:
      "Learning",
    icon: GraduationCap
  },
  {
    title: "Maykit",
    href: "/maykit",
    description:
      "Tracking toolkit",
    icon: PenTool
  }
]


const support_items: { title: string; href: string; description: string, icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> }[] = [
  {
    title: "Contact Us",
    href: "/contact",
    description:
      "Help desk",
    icon: Contact
  },
  {
    title: "FAQ",
    href: "/faqs",
    description:
      "Knowledge base",
    icon: FileQuestion
  }
]



const Navbar: React.FC<{ isLoggedIn: boolean }> = ({ isLoggedIn }) => {
  const [SelectedChapter, setSelectedChapter] = useState([]);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const ulRef = useRef<React.Ref<HTMLUListElement>>(null);
  const [currentCard, setCurrentCard] = useState({ name: "Chapter 1", id: 1 });
  useEffect(() => {
    if (ulRef.current) {
      const listItems = (ulRef.current as any).children;
      const selectedItem = [...listItems].find(
        (li) => li.dataset.id === SelectedChapter.toString()
      );
      if (selectedItem) {
        const itemCenter =
          selectedItem.offsetLeft + selectedItem.offsetWidth / 2;
        setBackgroundPosition(itemCenter);
      }
    }

  }, [SelectedChapter]);

  const [currentDropdown, setCurrentDropdown] = useState<string>("")
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <header className='px-4 fixed z-50 bg-black/20 backdrop-blur-xl top-0  gap-8 w-full right-0 left-0 flex items-center  border-b' id='main-navbar-na'>
      <div className="py-2 w-full max-w-5xl justify-between flex items-center mx-auto ">
        <Link href="/" className='cursor-pointer select-none flex items-center gap-2 z-50' ><img src="/new-logo.svg" className="size-8"></img><p>Tradeplex</p></Link>
        <nav className='px-1 flex items-center gap-2 lg:gap-4  mx-auto  h-12   z-50 rounded-xl'>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger onMouseEnter={() => { setCurrentDropdown('') }} className='hover:text-neutral-100 bg-transparent  duration-100  flex items-center gap-px rounded-lg'>Products</NavigationMenuTrigger>
                <NavigationMenuContent className="backdrop-2xl">

                  <ul className="grid w-[300px] gap-3 p-4 ">
                    <h1 className="text-neutral-500">Platforms</h1>
                    {platform_items.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        icon={component.icon}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="">
                <NavigationMenuTrigger onMouseEnter={() => { setCurrentDropdown('') }} className='rounded-lg hover:text-neutral-100 bg-transparent hover:bg-neutral-800/50  border-transparent  duration-100  flex items-center gap-px'>Company</NavigationMenuTrigger>
                <NavigationMenuContent className="">
                  <ul className="grid gap-3 p-4 w-[350px] ">
                    <ListItem href="/about" icon={User} title="About">
                      Learn more about our company, vision, mission, and values.
                    </ListItem>
                    <ListItem href="/careers" icon={File} title="Careers">
                      Explore opportunities to partner with us and grow together.
                    </ListItem>
                    <ListItem href="/blogs" icon={Newspaper} title="Blog">
                      Stay updated with the latest news, trends, and insights.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem className="">
                <NavigationMenuTrigger onMouseEnter={() => { setCurrentDropdown('support') }} className='hover:text-neutral-100 bg-transparent border border-transparent  duration-100  flex items-center gap-px rounded-lg'>Support</NavigationMenuTrigger>
                <NavigationMenuContent className=" relative border-transparent ">
                  <ul className="grid w-[100px] gap-3 p-4 md:w-[200px]  lg:w-[200px] ">
                    {support_items.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        icon={component.icon}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem onMouseEnter={() => { setCurrentDropdown('') }}>
                <Link href="/guide" legacyBehavior passHref>
                  <NavigationMenuLink className='hover:text-neutral-100 text-[14px] hover:bg-neutral-800/50 bg-transparent  border-transparent px-4 py-[8px] font-normal  duration-100  flex items-center gap-px rounded-lg'>
                    Guide
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem onMouseEnter={() => { setCurrentDropdown('') }}>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink className='hover:text-neutral-100  hover:bg-neutral-800/50 bg-transparent  border-transparent  px-4 py-[8px] font-normal duration-100  text-[14px] flex items-center gap-px rounded-lg'>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport className={currentDropdown == "support" ? "left-56" : ""} />
          </NavigationMenu>
        </nav>

        <AnimatePresence mode="wait">
          {open && <div
          >
            <motion.div variants={opacity} initial="initial" animate="enter" exit="exit" custom={0.5} className="fixed flex flex-col gap-2 top-14 z-[11] transition-all left-0 p-4 h-screen w-full">
              <Accordion type="single" collapsible className="w-full border-b-0">
                <AccordionItem value={"products"} className="w-full border-b-0">
                  <AccordionTrigger className="w-full font-bold hover:no-underline py-1">
                    Products
                  </AccordionTrigger>
                  <AccordionContent className="overflow-hidden pb-0 pl-3">
                    <ul>
                      {platform_items.map((component, childIndex) => (
                        <li key={childIndex}>
                          <Link href={component.href} className="block py-1">
                            {component.title}
                          </Link>
                          {<p className="text-sm text-gray-500">{component.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value={"company"} className="w-full border-b-0">
                  <AccordionTrigger className="w-full font-bold hover:no-underline py-1">
                    Company
                  </AccordionTrigger>
                  <AccordionContent className="overflow-hidden pb-0 pl-3">
                    <ul>
                      <li>
                        <Link href={"/about"} className="block py-1">
                          About
                        </Link>
                        <p className="text-sm text-gray-500">
                          Learn more about our company, vision, mission, and values.
                        </p>
                      </li>
                      <li>
                        <Link href={"/careers"} className="block py-1">
                          Careers
                        </Link>
                        <p className="text-sm text-gray-500">
                          Explore opportunities to partner with us and grow together.
                        </p>
                      </li>
                      <li>
                        <Link href={"/blogs"} className="block py-1">
                          Blog
                        </Link>
                        <p className="text-sm text-gray-500">
                          Stay updated with the latest news, trends, and insights.
                        </p>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value={"support"} className="w-full border-b-0">
                  <AccordionTrigger className="w-full hover:no-underline font-bold py-1">
                    Support
                  </AccordionTrigger>
                  <AccordionContent className="overflow-hidden pb-0 pl-3">
                    <ul>
                      {support_items.map((component, childIndex) => (
                        <li key={childIndex}>
                          <Link href={component.href} className="block py-1">
                            {component.title}
                          </Link>
                          {<p className="text-sm text-gray-500">{component.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link href="/guide" passHref className="bg-transparent text-white font-bold relative z-[11]">
                Guide
              </Link>
              <Link href="/pricing" passHref className="bg-transparent text-white font-bold relative z-[11]">
                Pricing
              </Link>
            </motion.div>

            <Stairs />
          </div>}
        </AnimatePresence>
        <div className="flex items-center gap-2 relative z-10">
          <div className='md:flex gap-2'>
            {!isLoggedIn ? <div className="flex items-center gap-2 ">
              <Link href="/login">
                <HoverBorderGradient
                  containerClassName="rounded-xl"
                  as="button"
                  className=" text-white flex items-center rounded-xl"
                >

                  <span className="text-xs">Login</span>
                </HoverBorderGradient>
              </Link>
              <Link href="/signup">
                <Button className="rounded-xl  bg-[#1F0FFF] text-white  hover:bg-[#1F0FFF]/70 p-0 text-xs   px-2  md:px-4 "><span className="text-xs">Get Started</span></Button>
              </Link></div> :
              <Link href="/dashboard">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="text-base text-white flex items-center "
                >

                  <span>Dashboard</span>
                </HoverBorderGradient>
              </Link>
            }
          </div>
          <span onClick={() => setOpen(!open)} className="p-0 block md:hidden bg-transparent text-white z-10">
            {open ? <XIcon /> : <MenuIcon />}
          </span>
        </div>

      </div>
    </header>
  )
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; icon?: LucideIcon }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex items-start gap-3 [&:hover>div:nth-child(1)]:text-black [&:hover>div:nth-child(1)]:bg-white [&:hover>div>p]:text-white select-none space-y-1 rounded-md py-1 leading-none no-underline outline-none transition-colors  hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {Icon && <div className=" border rounded p-2 relative top-1"><Icon className="w-5 h-5 " /></div>}
          <div className="flex flex-col gap-1">
            <div className=" font-bold leading-none">{title}</div>
            <p className="duration-75 line-clamp-2 text-sm font-normal leading-snug text-neutral-500">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

export default Navbar