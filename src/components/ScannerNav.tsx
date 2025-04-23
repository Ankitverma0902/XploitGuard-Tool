import React from 'react';
import { NavLink } from 'react-router-dom';
import { Radar, Network, Globe, Shield, FileText } from 'lucide-react';

const navItems = [
  { to: '/scanner/port', icon: Radar, label: 'Port Scanner' },
  { to: '/scanner/web', icon: Globe, label: 'Web Vulnerabilities' },
  { to: '/scanner/network', icon: Network, label: 'Network Security' },
  { to: '/scanner/advanced', icon: Shield, label: 'Advanced Checks' },
  { to: '/scanner/reports', icon: FileText, label: 'Reports' },
];

export function ScannerNav() {
  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center px-3 py-4 text-sm font-medium ${
                  isActive
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`
              }
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}