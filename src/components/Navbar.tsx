'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Upload, Terminal } from 'lucide-react';

export type TabId = 'uploader' | 'api-endpoints';

interface NavbarProps {
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const navItems = [
    { id: 'uploader', label: 'Uploader', icon: Upload },
    { id: 'api-endpoints', label: 'API Endpoints', icon: Terminal },
  ] as const;

  return (
    <nav className="flex justify-center mb-8 sticky top-[80px] z-40 px-4">
      <div className="sharp-box bg-[#050505]/80 backdrop-blur-md border-gray-800 flex p-1 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={twMerge(
                "flex items-center gap-2 px-6 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 relative group",
                isActive 
                  ? "text-black bg-[#00e5ff] font-black" 
                  : "text-gray-500 hover:text-white hover:bg-gray-900"
              )}
            >
              <Icon className={twMerge("w-3.5 h-3.5", isActive ? "text-black" : "text-gray-500 group-hover:text-[#00e5ff]")} />
              {item.label}
              {isActive && (
                <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white opacity-50" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
