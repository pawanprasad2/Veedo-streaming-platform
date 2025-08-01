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
    <div className="flex flex-col  justify-center w-full h-full  ">
      <div className="text-white   flex p-4  flex-col  gap-6">
        {sidebarItems.map(({ path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            className="p-3 border-l-3 border-transparent hover:text-[#e473ff]  transition-all duration-300"
          >
            <Icon size={30} />
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default LeftSidebar;
