export async function uploadToGitHub(
  file: File,
  base64Data: string,
  onProgress?: (progress: number) => void
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // In a real app, you might want to do the upload from the client to your API route,
    // and let the API route talk to GitHub to keep the token secure.
    // The instructions say "File yang diupload akan dikirim ke API backend... yang kemudian mengupload... ke GitHub".
    // So this utility should call our OWN api route, not GitHub directly!
    
    const formData = new FormData();
    formData.append('file', file);
    
    // Simulate upload progress
    if (onProgress) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 90) onProgress(progress);
      }, 200);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(interval);
      onProgress(100);
      
      const data = await response.json();
      return data;
    } else {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      return await response.json();
    }
  } catch (error: any) {
    return { success: false, error: error.message || 'Upload failed' };
  }
}
