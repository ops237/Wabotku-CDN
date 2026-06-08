import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

interface UrlResultProps {
  url: string;
}

export function UrlResult({ url }: UrlResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="sharp-box p-5 bg-[#0a0a0a] border-[#00e5ff] w-full mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 glow-accent">
      <div className="flex items-center gap-2 mb-3">
        <Check className="w-4 h-4 text-[#00e5ff]" />
        <h4 className="text-xs font-mono text-[#00e5ff] uppercase tracking-widest">Upload Successful</h4>
      </div>
      
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="sharp-box bg-black p-3 flex-1 overflow-hidden border-gray-800 group relative">
          <code className="text-xs text-gray-400 truncate block font-mono">{url}</code>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 sm:flex-none sharp-box bg-black text-white hover:bg-gray-900 px-5 py-3 font-black uppercase text-xs tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:ring-1 hover:ring-[#00e5ff]"
          >
            {copied ? <Check className="w-4 h-4 text-[#00e5ff]" /> : <Copy className="w-4 h-4" />}
            {copied ? 'COPIED' : 'COPY'}
          </button>
          <a 
            href={url} 
            target="_blank" 
            rel="noreferrer"
            className="sharp-box bg-gray-900 text-white hover:bg-gray-800 px-4 py-3 flex items-center justify-center border-gray-700 transition-all duration-300"
            title="Open Image"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
