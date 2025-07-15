import React from "react";
import { NavLink } from "react-router-dom";

// Desktop navigation for main pages
function DesktopNav({ navItems }) {
  // Only show the second and third nav items (index 1 and 2)
  return (
    <div className="hidden md:flex gap-8 text-white font-medium">
      {navItems.slice(1, 3).map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `hover:text-[#e473ff] transition-all${isActive ? ' text-[#e473ff] border-b-2 border-[#e473ff]' : ''}`
          }
        >
          {label.toUpperCase()}
        </NavLink>
      ))}
    </div>
  );
}

export default DesktopNav;