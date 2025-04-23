import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import type { ScanResult, PortScanResult } from '../types';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20 },
  section: { marginBottom: 15 },
  heading: { fontSize: 18, marginBottom: 10 },
  item: { marginBottom: 10 },
  label: { fontSize: 12, color: '#666' },
  value: { fontSize: 14 },
});

interface ReportProps {
  target: string;
  timestamp: string;
  vulnerabilities: ScanResult[];
  portScans?: PortScanResult[];
}

const Report = ({ target, timestamp, vulnerabilities, portScans }: ReportProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Security Scan Report</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Target:</Text>
        <Text style={styles.value}>{target}</Text>
        <Text style={styles.label}>Scan Date:</Text>
        <Text style={styles.value}>{timestamp}</Text>
      </View>

      {vulnerabilities.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Vulnerabilities Found</Text>
          {vulnerabilities.map((vuln) => (
            <View key={vuln.id} style={styles.item}>
              <Text style={styles.label}>{vuln.name} - {vuln.level}</Text>
              <Text style={styles.value}>{vuln.description}</Text>
              <Text style={styles.label}>Recommendation:</Text>
              <Text style={styles.value}>{vuln.recommendation}</Text>
            </View>
          ))}
        </View>
      )}

      {portScans && portScans.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.heading}>Port Scan Results</Text>
          {portScans.map((port) => (
            <View key={port.port} style={styles.item}>
              <Text style={styles.value}>
                Port {port.port}: {port.state}
                {port.service && ` (${port.service}${port.version ? ` ${port.version}` : ''})`}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export function DownloadReport({ data }: { data: ReportProps }) {
  return (
    <PDFDownloadLink
      document={<Report {...data} />}
      fileName={`security-scan-${data.target}-${new Date().toISOString()}.pdf`}
      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      {({ loading }) =>
        loading ? 'Generating report...' : 'Download PDF Report'
      }
    </PDFDownloadLink>
  );
}