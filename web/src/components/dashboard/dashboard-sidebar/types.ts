export type SideBarItemType = {
  icon: string;
  href: string;
  class: string;
  name: string;
};

export type SideBarSectionType = {
  title: string;
  items: SideBarItemType[];
};
