'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SideBarItemType } from './types';
import Image from 'next/image';

const SideBarItem = ({
  item,
  isExpanded,
}: {
  item: SideBarItemType;
  isExpanded: boolean;
}) => {
  const pathname = usePathname();
  const { href, icon, name, class: className } = item;

  const selected = href === pathname;

  return (
    <Link
      href={href}
      className={`${!selected ? 'text-grey-400' : 'bg-grey-800'} ${
        isExpanded ? 'p-1.5' : 'p-0'
      }  flex items-center gap-2 rounded-xl text-sm duration-200 hover:bg-grey-800 hover:text-white select-none cursor-pointer transition-all duration-300`}
    >
      <Image
        alt="dashboard sidebar icon"
        src={icon}
        width={38}
        height={38}
        className={`p-[9px] rounded-xl text-white object-contain hover:opacity-50 ${className}`}
      />

      <AnimatePresence>
        {isExpanded && (
          <motion.p
            key="item-title"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="text-sm font-semibold select-none relative font-medium whitespace-nowrap"
          >
            {name}
          </motion.p>
        )}
      </AnimatePresence>
    </Link>
  );
};

export default SideBarItem;
