// Layout.js
import React, { useContext } from 'react';
import TopBar from "./TopBar";
import LeftSideBar from "./LeftSidebar";
import Footer from "../pages/Footer";
import { Outlet } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

const Layout = () => {
  const { loading } = useContext(UserDataContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Veedo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0f] text-white">
      <TopBar />
      <div className="flex flex-1 pt-16 md:pt-20">
        {/* Desktop Sidebar Only */}
        <aside className="hidden md:block w-20 lg:w-24 flex-shrink-0 sticky top-16 lg:top-20 h-[calc(100vh-80px)] overflow-y-auto">
          <LeftSideBar />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden min-w-0">
          <div className="container mx-auto px-4 py-6 w-full">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
