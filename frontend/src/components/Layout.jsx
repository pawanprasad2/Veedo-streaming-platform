import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
import Footer from "../pages/Footer";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SIDEBAR_WIDTH = 200;
const SIDEBAR_COLLAPSED = 70;

export default function Layout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0f] text-white relative">
      <TopBar onMenuClick={() => setIsMobileOpen(true)} />

      {/* Sidebar (fixed for desktop, animated open/close) */}
      <div className="hidden md:block">
        <LeftSidebar
          isMobile={false}
          onOpenChange={setIsDesktopOpen}
        />
      </div>

      {/* Main Content */}
      <motion.main
        animate={{
          marginLeft: isDesktopOpen 
            ? `${SIDEBAR_WIDTH}px` 
            : `${SIDEBAR_COLLAPSED}px`,
          width: isDesktopOpen
            ? `calc(100% - ${SIDEBAR_WIDTH}px)`
            : `calc(100% - ${SIDEBAR_COLLAPSED}px)`
        }}
        transition={{ duration: 0.3 }}
        className="flex-1 overflow-x-hidden min-w-0 p-1 md:p-6 md:ml-[70px]"
        style={{
          marginLeft: window.innerWidth < 768 ? '0' : undefined,
          width: window.innerWidth < 768 ? '100%' : undefined
        }}
      >
        <div className="max-w-7xl mx-auto px-1 md:px-4">
          <Outlet />
        </div>
      </motion.main>

      <Footer />

      {/* Mobile Sidebar with overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Overlay */}
             <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Sidebar */}
             <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 left-0 w-72 bg-neutral-900 z-50 shadow-xl md:hidden"
            >
              <LeftSidebar
                onClose={() => setIsMobileOpen(false)}
                isMobile={true}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
