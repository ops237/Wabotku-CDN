import React, { useCallback, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export function UploadBox({ onFileSelect, disabled }: UploadBoxProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect, disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={twMerge(
        'sharp-box p-8 sm:p-12 flex flex-col items-center justify-center border-dashed border-2 cursor-pointer transition-all duration-500 relative group w-full max-w-xl mx-auto',
        isDragOver ? 'border-[#00e5ff] bg-[#00e5ff]/10 glow-accent scale-[1.02]' : 'border-gray-700 hover:border-[#00e5ff] hover:bg-[#00e5ff]/5',
        disabled ? 'opacity-50 cursor-not-allowed scale-100' : ''
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        accept="image/jpeg, image/png, image/gif, image/webp, image/svg+xml"
        onChange={handleChange}
        disabled={disabled}
      />
      <div className="bg-[#111] p-5 sharp-box mb-6 group-hover:glow-accent transition-all duration-500 animate-float">
        <UploadCloud className="w-12 h-12 text-[#00e5ff]" />
      </div>
      <h3 className="text-2xl font-bold mb-3 tracking-tight glow-text text-center">Upload Image</h3>
      <p className="text-gray-400 text-sm text-center mb-8 max-w-xs leading-relaxed">
        Drag & drop your image here<br/>or click to browse files
      </p>
      <div className="sharp-box px-8 py-3 bg-black text-white font-black uppercase text-sm tracking-widest">
        Select File
      </div>
      <p className="mt-6 text-[10px] text-gray-600 font-mono uppercase tracking-tighter">
        Max size: 4MB &bull; JPG, PNG, GIF, WEBP, SVG
      </p>
    </div>
  );
}
