import React from "react";
import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { LuHistory } from "react-icons/lu";
import { MdPlaylistAdd } from "react-icons/md";

const activeStyle = {
  color: "#e473ff",
  borderLeft: "3px solid #e473ff",
};

const sidebarItems = [
  { path: "/", icon: GoHome },
  { path: "/like", icon: FiHeart },
  { path: "/history", icon: LuHistory },
  { path: "/mylist", icon: MdPlaylistAdd },
];

function LeftSidebar() {
  return (
    <div className="flex flex-col items-center w-full h-full pt-8">
      <div className="text-white flex flex-col items-center gap-6">
        {sidebarItems.map(({ path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-3 border-l-3 border-transparent hover:text-[#e473ff] hover:border-[#e473ff] transition-all duration-300"
          >
            <Icon size={28} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default LeftSidebar;