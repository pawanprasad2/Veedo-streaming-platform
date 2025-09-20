import React, { useState } from "react";
import { motion } from "framer-motion";
import veedologo from "../assets/veedoLogo.png";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconX,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

const SIDEBAR_WIDTH = 220;     // width when expanded
const SIDEBAR_COLLAPSED = 70;  // width when collapsed

const links = [
  { label: "Dashboard", href: "/",      icon: <IconBrandTabler className="h-7 w-7 text-pink-500" /> },
  { label: "Profile",   href: "/profile", icon: <IconUserBolt className="h-7 w-7 text-pink-500" /> },
  { label: "Settings",  href: "/settings", icon: <IconSettings className="h-7 w-7 text-pink-500" /> },
  { label: "Logout",    href: "/logout",   icon: <IconArrowLeft className="h-7 w-7 text-pink-500" /> },
];

export default function LeftSidebar({ onClose, isMobile, onOpenChange }) {
  const [open, setOpen] = useState(isMobile);

  const handleMouseEvents = !isMobile
    ? {
        onMouseEnter: () => {
          setOpen(true);
          onOpenChange?.(true);
        },
        onMouseLeave: () => {
          setOpen(false);
          onOpenChange?.(false);
        },
      }
    : {};

  return (
    <motion.div
      {...handleMouseEvents}
      animate={{ width: open || isMobile ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED }}
      transition={{ duration: 0.3, type: "tween" }}
      className="fixed top-0 left-0 h-screen flex flex-col
                 bg-[#0d0d0f] border-r border-neutral-800 shadow-xl z-50"
    >
      {/* Mobile close button */}
      {isMobile && (
        <button
          onClick={onClose}
          aria-label="Close Sidebar"
          className="absolute right-2 top-2 p-2 rounded-lg hover:bg-neutral-800/50 text-neutral-400 z-50"
        >
          <IconX className="h-5 w-5" />
        </button>
      )}

      {/* ✅ BIG fixed logo */}
      <div className="p-4 border-b border-neutral-800 flex justify-center">
        <Logo /> {/* only image, no text */}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {links.map((link) => (
          <SidebarLink
            key={link.label}
            link={link}
            open={open || isMobile}
            onClose={isMobile ? onClose : undefined}
          />
        ))}
      </nav>
    </motion.div>
  );
}

function SidebarLink({ link, open, onClose }) {
  return (
    <NavLink
      to={link.href}
      onClick={onClose}
      className={({ isActive }) =>
        `flex items-center rounded-lg p-2.5 mb-4 transition-all duration-200
         ${isActive
           ? "bg-neutral-800 text-white"
           : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50"}`
      }
    >
      {link.icon}
      {open && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="ml-2 font-medium whitespace-nowrap"
        >
          {link.label}
        </motion.span>
      )}
    </NavLink>
  );
}

/* ✅ Logo – fixed large image only */
function Logo() {
  return (
    <img
      src={veedologo}
      alt="Veedo Logo"
      className="object-cover w-[90px] h-[90px] transition-all duration-300" // increased from 40px to 60px
    />
  );
}
