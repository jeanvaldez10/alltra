'use client';

import AnimatedSectionTitle from './AnimatedTitle';
import SideBarItem from './SidebarItem';
import { SideBarItemType } from './types';

const SidebarSection = ({
  title,
  items,
  isExpanded,
  icon,
}: {
  title: string;
  items: SideBarItemType[];
  isExpanded: boolean;
  icon?: React.ReactNode;
}) => {
  return (
    <div className={'flex flex-col gap-6'}>
      <div className="flex flex-row items-center justify-between">
        <AnimatedSectionTitle isVisible={isExpanded}>Home</AnimatedSectionTitle>
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        {items.map((i, index) => (
          <SideBarItem
            item={i}
            key={index.toString()}
            isExpanded={isExpanded}
          />
        ))}
      </div>
    </div>
  );
};

export default SidebarSection;
