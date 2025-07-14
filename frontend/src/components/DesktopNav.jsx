import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "#e473ff",
  borderBottom: "2px solid #e473ff",
};

function DesktopNav({ navItems }) {
  return (
    <div className="hidden md:flex gap-8 text-white font-medium">
      {navItems.slice(1, 3).map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="hover:text-[#e473ff] hover:scale-105 transition-all duration-300"
        >
          {label.toUpperCase()}
        </NavLink>
      ))}
    </div>
  );
}

export default DesktopNav;
