import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
import Footer from "../pages/Footer";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const SIDEBAR_WIDTH = 120;
const SIDEBAR_COLLAPSED = 0;

export default function Layout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileOpen]);

  return (
    <div className="min-h-screen flex flex-col   bg-[#0d0d0f] text-white relative">
      <TopBar onMenuClick={() => setIsMobileOpen(true)} />

      {/* Sidebar (fixed for desktop, animated open/close) */}
      <div className="hidden md:block">
        <LeftSidebar
          isMobile={false}
          onOpenChange={setIsDesktopOpen}
        />
      </div>

      {/* Main Content */}
      <main
        style={{
          marginLeft: isDesktopOpen
            ? `${SIDEBAR_WIDTH}px`
            : `${SIDEBAR_COLLAPSED}px`,
          width: isDesktopOpen
            ? `calc(100% - ${SIDEBAR_WIDTH}px)`
            : `calc(100% - ${SIDEBAR_COLLAPSED}px)`,
        }}
        className="flex-1 transition-[margin-left,width] duration-300"
      >
        <div className="max-w-[92rem]   ml-0  md:ml-18 lg:ml-12">
          <Outlet />
        </div>
      </main>

      <Footer />

      {/* Mobile Sidebar with overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Overlay */}
             <div
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0  bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Sidebar */}
             <div
              className="fixed inset-y-0 left-0 w-49  bg-neutral-900 z-50 shadow-xl md:hidden"
            >
              <LeftSidebar
                onClose={() => setIsMobileOpen(false)}
                isMobile={true}
              />
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
