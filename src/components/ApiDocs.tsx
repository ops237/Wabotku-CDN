'use client';

import React, { useState } from 'react';
import { Terminal, Code2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const SNIPPETS = {
  Bash: `curl -X POST \\
  -F "file=@/path/to/your/image.png" \\
  https://cdn.wabotku.com/api/upload`,
  
  'Node.js': `const fs = require('fs');
// If using older Node.js, you might need form-data package
// const FormData = require('form-data');

async function uploadImage() {
  const formData = new FormData();
  formData.append('file', new Blob([fs.readFileSync('./image.png')]));

  const response = await fetch('https://cdn.wabotku.com/api/upload', {
    method: 'POST',
    body: formData,
  });
  
  const data = await response.json();
  console.log(data);
}

uploadImage();`,

  Python: `import requests

url = 'https://cdn.wabotku.com/api/upload'
files = {'file': open('image.png', 'rb')}

response = requests.post(url, files=files)
print(response.json())`,

  Golang: `package main

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	url := "https://cdn.wabotku.com/api/upload"
	filePath := "./image.png"

	file, _ := os.Open(filePath)
	defer file.Close()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, _ := writer.CreateFormFile("file", filepath.Base(file.Name()))
	io.Copy(part, file)
	writer.Close()

	req, _ := http.NewRequest("POST", url, body)
	req.Header.Set("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)
	fmt.Println(string(respBody))
}`
};

type Tab = keyof typeof SNIPPETS;

export function ApiDocs() {
  const [activeTab, setActiveTab] = useState<Tab>('Bash');
  const tabs: Tab[] = ['Bash', 'Node.js', 'Python', 'Golang'];

  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPETS[activeTab]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 mb-12 px-4 animate-in fade-in duration-700">
      <div className="flex items-center gap-3 mb-6">
        <Terminal className="w-5 h-5 text-[#00e5ff]" />
        <h2 className="text-lg font-black uppercase tracking-widest text-white glow-text">API Documentation</h2>
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
                'px-6 py-4 font-mono text-xs uppercase tracking-widest whitespace-nowrap transition-colors border-r border-gray-800 outline-none',
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
          <pre className="p-6 overflow-x-auto text-xs sm:text-sm text-gray-300 font-mono leading-relaxed bg-[#050505]">
            <code>{SNIPPETS[activeTab]}</code>
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
        <div className="border-t border-gray-800 bg-black p-4">
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Success Response</div>
          <code className="text-xs text-[#00e5ff]">
            {'{ "success": true, "url": "https://raw.githubusercontent.com/..." }'}
          </code>
        </div>
      </div>
    </div>
  );
}
