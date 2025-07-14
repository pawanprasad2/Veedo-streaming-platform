import { GoHome } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { LuHistory } from "react-icons/lu";
import { MdPlaylistAdd } from "react-icons/md";

function LeftSidebar() {
  const activeStyle = {
    color: "#e473ff",
    borderLeft: "3px solid #e473ff",
  };

  return (
    <div className="flex flex-col items-center w-full h-full pt-8">
      <div className="text-white flex flex-col items-center gap-6">
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="p-3 border-l-3 border-transparent hover:text-[#e473ff] hover:border-[#e473ff] transition-all duration-300"
        >
          <GoHome size={28} />
        </NavLink>

        <NavLink
          to="/like"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="p-3 border-l-3 border-transparent hover:text-[#e473ff] hover:border-[#e473ff] transition-all duration-300"
        >
          <FiHeart size={28} />
        </NavLink>

        <NavLink
          to="/history"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="p-3 border-l-3 border-transparent hover:text-[#e473ff] hover:border-[#e473ff] transition-all duration-300"
        >
          <LuHistory size={28} />
        </NavLink>

        <NavLink
          to="/mylist"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          className="p-3 border-l-3 border-transparent hover:text-[#e473ff] hover:border-[#e473ff] transition-all duration-300"
        >
          <MdPlaylistAdd size={28} />
        </NavLink>
      </div>
    </div>
  );
}

export default LeftSidebar;