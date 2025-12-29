import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Users,
  Settings,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  roles?: string[];
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Users', href: '/users', icon: Users, roles: ['ADMIN'] },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const filteredNavigation = navigation.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  const NavContent = () => (
    <nav className="flex-1 space-y-1 px-2 py-4">
      {filteredNavigation.map((item) => {
        const isActive = location.pathname === item.href || 
          (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
        
        return (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onClose}
            className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon
              className={`mr-3 h-5 w-5 flex-shrink-0 ${
                isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
              }`}
            />
            {item.name}
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${isOpen ? '' : 'pointer-events-none'}`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-gray-600 transition-opacity duration-300 ease-linear ${
            isOpen ? 'opacity-75' : 'opacity-0'
          }`}
          onClick={onClose}
        />

        {/* Sidebar panel */}
        <div
          className={`relative flex w-full max-w-xs flex-1 transform flex-col bg-white transition duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Close button */}
          <div className="absolute right-0 top-0 -mr-12 pt-2">
            <button
              type="button"
              className={`ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ${
                isOpen ? '' : 'hidden'
              }`}
              onClick={onClose}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex h-16 flex-shrink-0 items-center px-4 border-b border-gray-200">
            <span className="text-xl font-bold text-gray-900">KBase</span>
          </div>

          <div className="flex-1 h-0 overflow-y-auto">
            <NavContent />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex h-16 flex-shrink-0 items-center px-4 border-b border-gray-200">
            <span className="text-xl font-bold text-gray-900">KBase</span>
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <NavContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
