import React from 'react';

interface HistoryItem {
  url: string;
  timestamp: number;
}

interface HistoryGridProps {
  items: HistoryItem[];
}

export function HistoryGrid({ items }: HistoryGridProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-20 w-full max-w-6xl mx-auto animate-in fade-in duration-700 px-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gray-800"></div>
        <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-gray-500 whitespace-nowrap">Recent Archive</h3>
        <div className="h-px flex-1 bg-gray-800"></div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="sharp-box group relative aspect-square bg-[#0a0a0a] overflow-hidden border-gray-800 hover:border-[#00e5ff] transition-all duration-500"
          >
            <img 
              src={item.url} 
              alt={`Upload ${index}`} 
              className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md p-2 text-[9px] text-gray-500 font-mono truncate border-t border-gray-800 group-hover:border-[#00e5ff] transition-colors">
              {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
