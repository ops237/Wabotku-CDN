'use client';

import React, { useState } from 'react';
import { Terminal, Code2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export interface Snippets {
  Bash: string;
  'Node.js': string;
  Python: string;
  Golang: string;
}

interface ApiDocsProps {
  snippets: Snippets;
  title?: string;
  responseExample?: string;
}

type Tab = keyof Snippets;

export function ApiDocs({ snippets, title = "API Documentation", responseExample }: ApiDocsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Bash');
  const tabs: Tab[] = ['Bash', 'Node.js', 'Python', 'Golang'];

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 animate-in fade-in duration-700">
      <div className="flex items-center gap-3 mb-6">
        <Terminal className="w-5 h-5 text-[#00e5ff]" />
        <h2 className="text-sm font-black uppercase tracking-widest text-white glow-text">{title}</h2>
        <div className="h-px flex-1 bg-gray-800 ml-4"></div>
      </div>

      <div className="sharp-box bg-[#0a0a0a] border-gray-800 overflow-hidden flex flex-col">
        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-800 bg-black scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={twMerge(
                'px-6 py-4 font-mono text-[10px] uppercase tracking-widest whitespace-nowrap transition-colors border-r border-gray-800 outline-none',
                activeTab === tab 
                  ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-b-2 border-b-[#00e5ff]' 
                  : 'text-gray-500 hover:text-white hover:bg-gray-900 border-b-2 border-b-transparent'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="relative group">
          <pre className="p-6 overflow-x-auto text-[11px] text-gray-300 font-mono leading-relaxed bg-[#050505]">
            <code>{snippets[activeTab]}</code>
          </pre>
          
          <button 
            onClick={handleCopy}
            className="absolute top-4 right-4 sharp-box bg-gray-800 hover:bg-[#00e5ff] hover:text-black text-gray-400 p-2 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Copy snippet"
          >
            <Code2 className="w-4 h-4" />
          </button>
        </div>
        
        {/* Response Info */}
        {responseExample && (
          <div className="border-t border-gray-800 bg-black p-4">
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Success Response</div>
            <code className="text-xs text-[#00e5ff]">
              {responseExample}
            </code>
          </div>
        )}
      </div>
    </div>
  );
}
