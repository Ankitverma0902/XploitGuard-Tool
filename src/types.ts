export type VulnerabilityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface ScanResult {
  id: string;
  name: string;
  level: VulnerabilityLevel;
  description: string;
  recommendation: string;
  details?: Record<string, any>;
}

export interface PortScanResult {
  port: number;
  state: 'open' | 'closed' | 'filtered';
  service?: string;
  version?: string;
  vulnerabilities?: ScanResult[];
}

export interface ScanOptions {
  target: string;
  portScan?: boolean;
  portRange?: string;
  webScan?: boolean;
  networkScan?: boolean;
  customChecks?: string[];
}

export interface ScanHistory {
  id: string;
  timestamp: string;
  target: string;
  type: 'port' | 'web' | 'network' | 'advanced';
  vulnerabilities: ScanResult[];
  portScans?: PortScanResult[];
}