import React, { ReactNode } from 'react';

const SidebarContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-full">
      {children}
    </div>
  );
};

export default SidebarContainer;
