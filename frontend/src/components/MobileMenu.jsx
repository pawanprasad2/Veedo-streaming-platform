import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

export default function MobileMenu({ navItems, user, onLogout, onClose, innerRef }) {
  return (
    <div
      ref={innerRef}
      className="absolute top-full left-0 right-0 bg-gradient-to-b from-[#0d0d0f] to-[#1a1a1c] border-t border-gray-700 shadow-2xl md:hidden z-30"
    >
      <div className="px-4 py-6 space-y-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-[#e473ff] text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-[#e473ff]"
              }`
            }
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}

        <div className="border-t border-gray-700 pt-4 mt-4">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 text-gray-300">
                <AiOutlineUser size={20} />
                <span>Hello, {user.firstname}</span>
              </div>
              <button
                onClick={onLogout}
                className="w-full bg-[#d60c73] p-3 rounded-lg hover:bg-[#eb6dae] text-white font-medium transition-colors text-left"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={onClose}
                className="block w-full p-3 text-gray-300 hover:bg-gray-800 hover:text-[#e473ff] rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={onClose}
                className="block w-full bg-[#e473ff] p-3 rounded-lg hover:bg-[#eb6dae] text-white font-medium transition-colors text-center"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
