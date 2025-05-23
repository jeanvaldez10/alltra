'use client';

import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import Image from 'next/image';

interface ItemProps {
  link: {
    title: string;
    label?: string;
    icon: string;
    class: string;
    href: string;
  };
}

export const SideBarItem = ({ link }: ItemProps) => {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link href={link.href} className={'flex flex-row rounded-xl'}>
          <Image
            alt="platform sidebar icon"
            width={44}
            height={44}
            src={link.icon}
            className={`${link.class} rounded-xl object-contain p-2`}
          />
          <span className="sr-only">{link.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {link.title}
        {link.label && (
          <span className="ml-auto text-muted-foreground">{link.label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
