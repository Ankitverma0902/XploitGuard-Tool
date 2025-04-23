import React, { useState } from 'react';
import { Network } from 'lucide-react';
import type { ScanResult } from '../types';
import { DownloadReport } from '../components/PDFReport';

export function NetworkScanner() {
  const [target, setTarget] = useState('');
  const [subnet, setSubnet] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);

    // Simulate network scanning
    setTimeout(() => {
      setResults([
        {
          id: '1',
          name: 'Weak Network Encryption',
          level: 'High',
          description: 'WEP encryption detected on wireless network',
          recommendation: 'Upgrade to WPA3 encryption for wireless networks',
        },
        {
          id: '2',
          name: 'Open SMB Shares',
          level: 'Critical',
          description: 'Multiple SMB shares accessible without authentication',
          recommendation: 'Disable anonymous SMB access and require authentication',
        },
        {
          id: '3',
          name: 'SNMP Default Community Strings',
          level: 'Medium',
          description: 'Default SNMP community strings in use',
          recommendation: 'Change default SNMP community strings and upgrade to SNMPv3',
        },
      ]);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Network className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold">Network Security Scanner</h2>
        </div>

        <form onSubmit={handleScan} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target IP
            </label>
            <input
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="192.168.1.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subnet (CIDR)
            </label>
            <input
              type="text"
              value={subnet}
              onChange={(e) => setSubnet(e.target.value)}
              placeholder="e.g., /24"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isScanning}
            className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isScanning ? 'Scanning Network...' : 'Start Network Scan'}
          </button>
        </form>

        {results.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Scan Results</h3>
              <DownloadReport
                data={{
                  target: `${target}${subnet}`,
                  timestamp: new Date().toISOString(),
                  vulnerabilities: results,
                }}
              />
            </div>
            <div className="space-y-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{result.name}</h4>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        result.level === 'Critical'
                          ? 'text-red-700 bg-red-50'
                          : result.level === 'High'
                          ? 'text-orange-700 bg-orange-50'
                          : 'text-yellow-700 bg-yellow-50'
                      }`}
                    >
                      {result.level}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{result.description}</p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Recommendation:</span>
                    <p className="text-sm text-gray-600">{result.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}