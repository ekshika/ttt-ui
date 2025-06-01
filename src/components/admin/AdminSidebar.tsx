import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Briefcase,
  Settings,
  X,
} from 'lucide-react';

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Events', href: '/admin/events', icon: Calendar },
    { name: 'Careers', href: '/admin/careers', icon: Briefcase },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="h-full bg-white border-r border-gray-200 pt-5 flex flex-col">
      <div className="px-4 flex items-center justify-between">
        <span className="text-xl font-bold text-primary">Admin Panel</span>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      <nav className="mt-8 flex-1 px-2 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-8"
              src="/vite.svg"
              alt="Teeny Tech Trek"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Teeny Tech Trek</p>
            <p className="text-xs text-gray-500">Admin Dashboard v1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;