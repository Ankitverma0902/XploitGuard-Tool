// Add to the end of the file

// Save scan results to localStorage
export function saveScanResults(scanType: string, target: string, results: any) {
  try {
    const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
    const newScan = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      target,
      type: scanType,
      vulnerabilities: results.vulnerabilities || results,
      portScans: results.portScans,
    };
    
    history.unshift(newScan);
    localStorage.setItem('scanHistory', JSON.stringify(history.slice(0, 50))); // Keep last 50 scans
    
    // Dispatch event to notify components of the update
    window.dispatchEvent(new Event('scanHistoryUpdated'));
  } catch (error) {
    console.error('Error saving scan results:', error);
  }
}