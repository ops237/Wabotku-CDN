'use client';

import React from 'react';
import { ApiDocs, Snippets } from './ApiDocs';

export function ApiEndpointsSection() {
  const toolsSnippets: Snippets = {
    Bash: `curl -X POST \\
  -F "file=@/path/to/your/image.png" \\
  https://cdn.wabotku.com/api/upload`,
    
    'Node.js': `const fs = require('fs');

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

  const canvaSnippets: Snippets = {
    Bash: `curl -X GET "https://cdn.wabotku.com/api/canva/group?bgUrl=https://example.com/bg.jpg&groupName=Wabotku%20Grup&memberCount=100&mode=welcome&profileUrl=https://example.com/avatar.jpg" -o result.jpg`,
    
    'Node.js': `async function generateWelcome() {
  const params = new URLSearchParams({
    bgUrl: 'https://example.com/bg.jpg',
    groupName: 'Wabotku Grup',
    memberCount: '100',
    mode: 'welcome',
    profileUrl: 'https://example.com/avatar.jpg'
  });

  const response = await fetch(\`https://cdn.wabotku.com/api/canva/group?\${params}\`);
  const blob = await response.blob();
  // Do something with blob
}`,

    Python: `import requests

url = 'https://cdn.wabotku.com/api/canva/group'
params = {
    'bgUrl': 'https://example.com/bg.jpg',
    'groupName': 'Wabotku Grup',
    'memberCount': 100,
    'mode': 'welcome',
    'profileUrl': 'https://example.com/avatar.jpg'
}

response = requests.get(url, params=params)
with open('welcome.jpg', 'wb') as f:
    f.write(response.content)`,

    Golang: `// Use net/http to make GET request with query params`
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 space-y-24 px-4">
      <div className="space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="px-3 py-1 bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] text-[10px] font-mono uppercase tracking-[0.3em]">Collection</div>
          <h3 className="text-3xl font-black uppercase tracking-tighter">Tools <span className="text-[#00e5ff] font-light">Suite</span></h3>
          <p className="text-gray-500 text-sm max-w-md font-mono">Simple & powerful image hosting utility API.</p>
        </div>
        <ApiDocs 
          title="Image Upload Endpoint" 
          snippets={toolsSnippets} 
          responseExample='{ "success": true, "url": "https://..." }'
        />
      </div>

      <div className="space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="px-3 py-1 bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] text-[10px] font-mono uppercase tracking-[0.3em]">Collection</div>
          <h3 className="text-3xl font-black uppercase tracking-tighter">Canva <span className="text-[#00e5ff] font-light">Engine</span></h3>
          <p className="text-gray-500 text-sm max-w-md font-mono">Dynamic image generation for welcome/goodbye events.</p>
        </div>
        <ApiDocs 
          title="Group Banner Generator" 
          snippets={canvaSnippets} 
          responseExample="Returns binary image/jpeg directly."
        />
      </div>
    </div>
  );
}
