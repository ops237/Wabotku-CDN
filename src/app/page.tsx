"use client";

import React, { useState, useEffect } from 'react';
import { UploadBox } from '@/components/UploadBox';
import { ImagePreview } from '@/components/ImagePreview';
import { UrlResult } from '@/components/UrlResult';
import { HistoryGrid } from '@/components/HistoryGrid';
import { uploadToGitHub } from '@/utils/githubUpload';

interface HistoryItem {
  url: string;
  timestamp: number;
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wabotku_history');
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveToHistory = (url: string) => {
    const newItem = { url, timestamp: Date.now() };
    const newHistory = [newItem, ...history].slice(0, 18); 
    setHistory(newHistory);
    try {
      localStorage.setItem('wabotku_history', JSON.stringify(newHistory));
    } catch (e) {}
  };

  const handleFileSelect = (selectedFile: File) => {
    setError(null);
    setResultUrl(null);
    
    if (selectedFile.size > 4 * 1024 * 1024) {
      setError('Maksimal ukuran file 4 MB');
      return;
    }

    setFile(selectedFile);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);

    startUpload(selectedFile);
  };

  const startUpload = async (fileToUpload: File) => {
    setIsUploading(true);
    setProgress(0);

    const result = await uploadToGitHub(fileToUpload, "", (p) => setProgress(p));
    
    setIsUploading(false);
    setProgress(100);

    if (result.success && result.url) {
      setResultUrl(result.url);
      saveToHistory(result.url);
    } else {
      setError(result.error || 'Upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#00e5ff] selection:text-black flex flex-col font-sans overflow-x-hidden">
      {/* Header */}
      <header className="p-6 border-b border-gray-900 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-[#00e5ff] sharp-box glow-accent flex items-center justify-center text-white font-black text-2xl transition-transform group-hover:rotate-12 logo-glow">W</div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tighter uppercase group-hover:glow-text transition-all">
            Wabotku <span className="text-[#00e5ff] font-light">CDN</span>
          </h1>
        </div>
        <div className="hidden sm:flex text-[10px] font-mono text-gray-600 uppercase tracking-widest gap-6">
          <span className="flex items-center gap-2"><span className="w-1 h-1 bg-green-500 rounded-full"></span> Server: Online</span>
          <span>Max: 4MB</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 sm:p-12 relative">
        
        {/* Ambient Background */}
        <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#00e5ff]/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 sm:mt-16 relative z-10 items-start">
          
          {/* Left Column: Upload */}
          <div className="flex flex-col gap-6 w-full max-w-xl mx-auto lg:mx-0">
            <UploadBox onFileSelect={handleFileSelect} disabled={isUploading} />
            
            {error && (
              <div className="sharp-box bg-red-950/30 border-red-600 text-red-400 p-4 font-mono text-xs flex items-center gap-3 animate-in shake duration-300">
                <span className="bg-red-600 text-white px-2 py-0.5 font-bold">ERR</span> {error}
              </div>
            )}
          </div>

          {/* Right Column: Preview & Result */}
          <div className="flex flex-col gap-6 w-full max-w-xl mx-auto lg:mx-0">
            <ImagePreview 
              file={file} 
              previewUrl={previewUrl} 
              progress={progress} 
              isUploading={isUploading} 
            />
            {resultUrl && !isUploading && <UrlResult url={resultUrl} />}
            {!file && !resultUrl && !isUploading && (
              <div className="sharp-box p-8 text-center border-gray-800 opacity-30">
                <p className="text-sm font-mono text-gray-600 uppercase tracking-widest">Waiting for file...</p>
              </div>
            )}
          </div>
        </div>

        {/* History Section */}
        <HistoryGrid items={history} />
      </main>

      {/* Footer */}
      <footer className="p-8 border-t border-gray-900 text-center text-[11px] text-gray-600 font-mono uppercase tracking-widest z-10 relative bg-black">
        <p>Wabotku CDN &copy; {new Date().getFullYear()} &bull; High Performance Image Hosting</p>
      </footer>
    </div>
  );
}
