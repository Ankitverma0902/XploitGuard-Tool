import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Shield, Search, Clock, Bell, Server, Lock, ChevronRight, FileText } from 'lucide-react';
import { ScannerNav } from './components/ScannerNav';
import { PortScanner } from './pages/PortScanner';
import { WebScanner } from './pages/WebScanner';
import { NetworkScanner } from './pages/NetworkScanner';
import { AdvancedScanner } from './pages/AdvancedScanner';
import { Reports } from './pages/Reports';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-indigo-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ScannerLayout() {
  return (
    <div className="py-8">
      <ScannerNav />
      <Routes>
        <Route path="port" element={<PortScanner />} />
        <Route path="web" element={<WebScanner />} />
        <Route path="network" element={<NetworkScanner />} />
        <Route path="advanced" element={<AdvancedScanner />} />
        <Route path="reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="port" replace />} />
      </Routes>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();

  const handleStartScanning = () => {
    navigate('/scanner/port');
  };

  return (
    <>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Advanced Vulnerability Scanning
            <br />
            Made <span className="text-indigo-600">Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Protect your applications with continuous security scanning. Detect vulnerabilities before they become threats.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleStartScanning}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
            >
              Start Scanning <ChevronRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="features">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Security Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform provides enterprise-grade security scanning with an easy-to-use interface.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Search}
            title="Deep Scanning"
            description="Advanced vulnerability detection across your entire infrastructure"
          />
          <FeatureCard
            icon={Clock}
            title="Continuous Monitoring"
            description="24/7 automated scanning with real-time alerts"
          />
          <FeatureCard
            icon={Bell}
            title="Instant Alerts"
            description="Get notified immediately when new vulnerabilities are detected"
          />
          <FeatureCard
            icon={Server}
            title="API Integration"
            description="Seamlessly integrate with your existing development workflow"
          />
          <FeatureCard
            icon={Lock}
            title="Compliance Ready"
            description="Meet security compliance requirements with detailed reporting"
          />
          <FeatureCard
            icon={Shield}
            title="Zero False Positives"
            description="AI-powered scanning ensures accurate vulnerability detection"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Start Securing Your Applications Today
            </h2>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of companies that trust XploitGuard for their security needs.
            </p>
            <button 
              onClick={handleStartScanning}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">XploitGuard</span>
              </div>
              <div className="flex items-center space-x-4">
                <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
                <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                <a href="/scanner" className="text-gray-600 hover:text-gray-900">Scanner</a>
                <a href="/reports" className="text-gray-600 hover:text-gray-900">Reports</a>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/scanner/*" element={<ScannerLayout />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/" element={<HomePage />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Product</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Security</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Resources</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">API Reference</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8">
              <p className="text-gray-400">&copy; 2024 XploitGuard. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;