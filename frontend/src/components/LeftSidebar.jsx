import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconX,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

const SIDEBAR_WIDTH = 200;
const SIDEBAR_COLLAPSED = 70;

const links = [
  { label: "Dashboard", href: "/", icon: <IconBrandTabler className="h-5 w-5" /> },
  { label: "Profile", href: "/profile", icon: <IconUserBolt className="h-5 w-5" /> },
  { label: "Settings", href: "/settings", icon: <IconSettings className="h-5 w-5" /> },
  { label: "Logout", href: "/logout", icon: <IconArrowLeft className="h-5 w-5" /> },
];

export default function LeftSidebar({ onClose, isMobile, onOpenChange }) {
  const [open, setOpen] = useState(isMobile); // default true if mobile

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
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      className={`fixed top-0 left-0 h-screen flex flex-col
        bg-neutral-900 border-r border-neutral-800 shadow-xl z-50`}
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

      {/* Logo */}
      <div className="p-4 border-b border-neutral-800">
        {(open || isMobile) ? <Logo /> : <LogoIcon />}
      </div>

      {/* Links */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        {links.map(link => (
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
        `flex items-center gap-3 rounded-lg p-2.5 mb-1 transition-all duration-200
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
          className="font-medium whitespace-nowrap"
        >
          {link.label}
        </motion.span>
      )}
    </NavLink>
  );
}

function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-3">
      <div className="h-8 w-8 rounded bg-white/90 shadow-lg" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-xl text-white"
      >
        Veedo
      </motion.span>
    </NavLink>
  );
}

function LogoIcon() {
  return (
    <NavLink to="/" className="flex items-center justify-center">
      <div className="h-8 w-8 rounded bg-white/90 shadow-lg" />
    </NavLink>
  );
}
