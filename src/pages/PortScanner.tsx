import React, { useState } from 'react';
import { Radar, AlertTriangle } from 'lucide-react';
import type { PortScanResult } from '../types';
import { DownloadReport } from '../components/PDFReport';

export function PortScanner() {
  const [target, setTarget] = useState('');
  const [portRange, setPortRange] = useState('1-1000');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<PortScanResult[]>([]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);

    // Simulate port scanning
    setTimeout(() => {
      setResults([
        { port: 21, state: 'open', service: 'FTP', version: 'vsftpd 3.0.3' },
        { port: 22, state: 'open', service: 'SSH', version: 'OpenSSH 8.2p1' },
        { port: 80, state: 'open', service: 'HTTP', version: 'nginx 1.18.0' },
        { port: 443, state: 'open', service: 'HTTPS', version: 'nginx 1.18.0' },
        { port: 3306, state: 'filtered', service: 'MySQL' },
      ]);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Radar className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold">Port Scanner</h2>
        </div>

        <form onSubmit={handleScan} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target IP or Domain
            </label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="e.g., 192.168.1.1 or example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Port Range
            </label>
            <input
              type="text"
              value={portRange}
              onChange={(e) => setPortRange(e.target.value)}
              placeholder="e.g., 1-1000 or 80,443,3306"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isScanning}
            className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isScanning ? 'Scanning Ports...' : 'Start Port Scan'}
          </button>
        </form>

        {results.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Scan Results</h3>
              <DownloadReport
                data={{
                  target,
                  timestamp: new Date().toISOString(),
                  vulnerabilities: [],
                  portScans: results,
                }}
              />
            </div>
            <div className="space-y-4">
              {results.map((result) => (
                <div
                  key={result.port}
                  className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        result.state === 'open'
                          ? 'bg-green-500'
                          : result.state === 'filtered'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <div>
                      <h4 className="font-medium">Port {result.port}</h4>
                      {result.service && (
                        <p className="text-sm text-gray-600">
                          {result.service} {result.version}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      result.state === 'open'
                        ? 'text-green-700 bg-green-50'
                        : result.state === 'filtered'
                        ? 'text-yellow-700 bg-yellow-50'
                        : 'text-red-700 bg-red-50'
                    }`}
                  >
                    {result.state}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}