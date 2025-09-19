import React from 'react'
import { IconMenu2 } from "@tabler/icons-react"

function TopBar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 bg-neutral-900 border-b border-neutral-800">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Logo for mobile */}
        <div className="md:hidden flex items-center gap-3">
          <div className="h-8 w-8 rounded bg-white/90 shadow-lg" />
          <span className="font-bold text-xl text-white">Veedo</span>
        </div>

        {/* Hamburger menu for mobile */}
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-neutral-800/50 text-neutral-400"
          aria-label="Open menu"
        >
          <IconMenu2 className="h-6 w-6" />
        </button>
      </div>
    </header>
  )
}

export default TopBar