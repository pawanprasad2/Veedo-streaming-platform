import React from "react";
import { IconMenu2 } from "@tabler/icons-react";

const TopBar = ({ onMenuClick }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-neutral-900 shadow-lg sticky top-0 z-30">
      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-neutral-200 hover:bg-neutral-800 rounded-lg transition-colors"
        onClick={onMenuClick}
      >
        <IconMenu2 className="h-6 w-6" />
      </button>    
    </header>
  );
};

export default TopBar;