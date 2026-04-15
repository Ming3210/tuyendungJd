export const viewDocument = (url: string) => {
  if (!url) return;
  
  let finalUrl = url;
  
  // Clean URL to check extension accurately (ignoring query params)
  const cleanUrl = url.split('?')[0].toLowerCase();
  const isDoc = cleanUrl.endsWith('.doc') || cleanUrl.endsWith('.docx');
  
  if (isDoc) {
    // Use Google Docs Viewer for Word documents so they can be viewed in-browser
    finalUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
  }
  
  window.open(finalUrl, '_blank');
};
