'use client';

import { Icons } from '@/components/global/icons';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import SidebarSection from './SidebarSection';

const homeItems = [
  {
    icon: '/home.svg',
    name: 'Home',
    class: 'bg-[#1F1F1F]',
    href: '/dashboard',
  },
  {
    icon: '/message.svg',
    name: 'Messages',
    class: 'bg-[#1F1F1F]',
    href: '/dashboard/direct',
  },
  {
    icon: '/mail.svg',
    name: 'Inbox',
    class: 'bg-[#1F1F1F]',
    href: '/dashboard/mailbox',
  },
  {
    icon: '/store.svg',
    name: 'Store',
    class: 'bg-[#1F1F1F]',
    href: '/store',
  },
];
const favoriteItems = [
  {
    icon: '/graph.svg',
    name: 'Statistics',
    class: 'bg-gradient-to-t p-[10px] from-[#3B82F6] to-[#2768D2]',
    href: '/dashboard/statistics',
  },

  {
    icon: '/radar-1.svg',
    name: 'Monitors',
    class: 'bg-gradient-to-t from-[#AF65F0] to-[#8B42CA]',
    href: '/dashboard/monitors',
  },
  {
    icon: '/candlestick.svg',
    name: 'Trade Reports',
    class: 'bg-gradient-to-t from-[#FF6164] to-[#FF3237]',
    href: '/dashboard/reports',
  },
  {
    icon: '/journal.svg',
    name: 'Journal',
    class: 'bg-gradient-to-t from-[#FF8900] to-[#B75B02]',
    href: '/dashboard/journal',
  },
];

const DashboardSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const iconButtonSize = isExpanded ? 'w-[30px] h-[30px]' : 'w-[38px] h-[38px]';

  return (
    <motion.div
      initial={{ width: 330 }}
      animate={{ width: isExpanded ? 330 : 84 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`flex flex-col h-full  gap-9 py-5 px-5 bg-background border-r border-r-stroke relative backdrop-blur-2xl overflow-y-auto no-scrollbar`}
    >
      <SidebarSection
        title="Home"
        items={homeItems}
        isExpanded={isExpanded}
        icon={
          <div
            className={clsx(
              'bg-primary hover:bg-primary/80 cursor-pointer flex items-center justify-center shrink-0 rounded-full',
              'transition-all duration-300',
              iconButtonSize
            )}
            onClick={toggleExpand}
          >
            <Icons.chevronLeft
              className={clsx(
                `h-3 w-2 transition-transform duration-300 rotate-0`,
                {
                  'rotate-180': !isExpanded,
                }
              )}
            />
          </div>
        }
      />
      <SidebarSection
        title="Favorites"
        items={favoriteItems}
        isExpanded={isExpanded}
        icon={
          <div
            className={clsx(
              'bg-grey-800 hover:bg-grey-800/80 cursor-pointer flex items-center justify-center rounded-full',
              'transition-all duration-300',
              iconButtonSize
            )}
          >
            <Icons.plus className="text-white/60" />
          </div>
        }
      />
    </motion.div>
  );
};

export default DashboardSidebar;
