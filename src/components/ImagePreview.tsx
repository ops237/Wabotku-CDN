import React from 'react';
import { Loader2 } from 'lucide-react';

interface ImagePreviewProps {
  file: File | null;
  previewUrl: string | null;
  progress: number;
  isUploading: boolean;
}

export function ImagePreview({ file, previewUrl, progress, isUploading }: ImagePreviewProps) {
  if (!file && !previewUrl) return null;

  return (
    <div className="sharp-box p-4 bg-[#0a0a0a] border-gray-800 w-full animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-2">
        <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Image Preview</h4>
        {isUploading && <span className="text-[10px] font-mono text-[#00e5ff] glow-text animate-pulse">Uploading...</span>}
      </div>
      
      <div className="relative w-full aspect-square sm:aspect-video bg-black flex items-center justify-center overflow-hidden sharp-box border-gray-800 group">
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          <div className="text-gray-700 font-mono text-sm">NO_IMAGE_FOUND</div>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-md p-6">
            <Loader2 className="w-10 h-10 text-[#00e5ff] animate-spin mb-6" />
            <div className="w-full max-w-[200px] sharp-box bg-gray-900 h-1.5 overflow-hidden border border-gray-700">
              <div 
                className="h-full bg-[#00e5ff] transition-all duration-300 shadow-[0_0_10px_#00e5ff]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="mt-3 text-xs font-mono text-[#00e5ff] glow-text tracking-widest">{progress}%</span>
          </div>
        )}
      </div>
      
      {file && (
        <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-gray-600 uppercase tracking-tighter">
          <span className="truncate max-w-[60%]">{file.name}</span>
          <span className="bg-gray-900 px-2 py-1 border border-gray-800">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
        </div>
      )}
    </div>
  );
}
