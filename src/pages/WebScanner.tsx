import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import type { ScanResult } from '../types';
import { DownloadReport } from '../components/PDFReport';

export function WebScanner() {
  const [target, setTarget] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);

    // Simulate web vulnerability scanning
    setTimeout(() => {
      setResults([
        {
          id: '1',
          name: 'SQL Injection Vulnerability',
          level: 'Critical',
          description: 'Found potential SQL injection point in login form',
          recommendation: 'Use parameterized queries and input validation',
        },
        {
          id: '2',
          name: 'Cross-Site Scripting (XSS)',
          level: 'High',
          description: 'Reflected XSS vulnerability in search parameter',
          recommendation: 'Implement proper output encoding and CSP headers',
        },
        {
          id: '3',
          name: 'Insecure Direct Object References',
          level: 'Medium',
          description: 'User IDs exposed in API endpoints',
          recommendation: 'Implement proper access controls and use indirect references',
        },
      ]);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold">Web Vulnerability Scanner</h2>
        </div>

        <form onSubmit={handleScan} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target URL
            </label>
            <input
              type="url"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isScanning}
            className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isScanning ? 'Scanning for Vulnerabilities...' : 'Start Web Scan'}
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