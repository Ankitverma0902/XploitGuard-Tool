import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Target, AlertTriangle, Download } from 'lucide-react';
import { DownloadReport } from '../components/PDFReport';
import type { ScanResult, PortScanResult } from '../types';

interface ScanHistory {
  id: string;
  timestamp: string;
  target: string;
  type: 'port' | 'web' | 'network' | 'advanced';
  vulnerabilities: ScanResult[];
  portScans?: PortScanResult[];
}

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'day' | 'week' | 'month'>('all');
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([]);
  const [selectedScan, setSelectedScan] = useState<ScanHistory | null>(null);

  useEffect(() => {
    // Load scan history from localStorage
    const loadScanHistory = () => {
      const history = localStorage.getItem('scanHistory');
      if (history) {
        const parsed = JSON.parse(history);
        setScanHistory(parsed);
      }
    };

    loadScanHistory();
    // Set up event listener for storage changes
    window.addEventListener('scanHistoryUpdated', loadScanHistory);
    return () => window.removeEventListener('scanHistoryUpdated', loadScanHistory);
  }, []);

  const filterScans = (scans: ScanHistory[]) => {
    const now = new Date();
    switch (selectedPeriod) {
      case 'day':
        return scans.filter(scan => {
          const scanDate = new Date(scan.timestamp);
          return now.getTime() - scanDate.getTime() < 24 * 60 * 60 * 1000;
        });
      case 'week':
        return scans.filter(scan => {
          const scanDate = new Date(scan.timestamp);
          return now.getTime() - scanDate.getTime() < 7 * 24 * 60 * 60 * 1000;
        });
      case 'month':
        return scans.filter(scan => {
          const scanDate = new Date(scan.timestamp);
          return now.getTime() - scanDate.getTime() < 30 * 24 * 60 * 60 * 1000;
        });
      default:
        return scans;
    }
  };

  const getSeverityCount = (vulnerabilities: ScanResult[]) => {
    return {
      critical: vulnerabilities.filter(v => v.level === 'Critical').length,
      high: vulnerabilities.filter(v => v.level === 'High').length,
      medium: vulnerabilities.filter(v => v.level === 'Medium').length,
      low: vulnerabilities.filter(v => v.level === 'Low').length,
    };
  };

  const filteredScans = filterScans(scanHistory);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-indigo-600" />
          <h2 className="text-2xl font-bold">Scan History</h2>
        </div>

        {/* Filter Controls */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
          <div className="flex gap-2">
            {(['all', 'day', 'week', 'month'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg ${
                  selectedPeriod === period
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period === 'all' ? 'All Time' : `Last ${period}`}
              </button>
            ))}
          </div>
        </div>

        {/* Scan History */}
        <div className="space-y-4">
          {filteredScans.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No scan reports found for the selected period.
            </div>
          ) : (
            filteredScans.map((scan) => (
              <div
                key={scan.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedScan?.id === scan.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
                onClick={() => setSelectedScan(scan)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{scan.target}</span>
                      <span className="text-sm text-gray-500 capitalize">({scan.type} Scan)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(scan.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium">
                        {scan.vulnerabilities.length} vulnerabilities
                      </span>
                    </div>
                    <DownloadReport data={scan} />
                  </div>
                </div>

                {selectedScan?.id === scan.id && (
                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      {Object.entries(getSeverityCount(scan.vulnerabilities)).map(([level, count]) => (
                        <div
                          key={level}
                          className="bg-white rounded-lg border border-gray-200 p-3"
                        >
                          <div className="text-sm text-gray-500 capitalize">{level}</div>
                          <div className="text-2xl font-bold mt-1">{count}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {scan.vulnerabilities.map((vuln) => (
                        <div
                          key={vuln.id}
                          className="bg-white rounded-lg border border-gray-200 p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{vuln.name}</h4>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                vuln.level === 'Critical'
                                  ? 'text-red-700 bg-red-50'
                                  : vuln.level === 'High'
                                  ? 'text-orange-700 bg-orange-50'
                                  : 'text-yellow-700 bg-yellow-50'
                              }`}
                            >
                              {vuln.level}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{vuln.description}</p>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">
                              Recommendation:
                            </span>
                            <p className="text-sm text-gray-600">{vuln.recommendation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}