import React, { useState } from "react";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
import Footer from "../pages/Footer";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Layout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0f] text-white">
      <TopBar onMenuClick={() => setIsMobileOpen(true)} />

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden border border-2-red-400 md:block">
          <LeftSidebar isMobile={false} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden min-w-0 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 left-0 w-72 bg-neutral-900 z-50 shadow-xl"
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
};

export default Layout;