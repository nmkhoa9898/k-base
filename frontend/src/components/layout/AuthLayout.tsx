import React from 'react';
import { Outlet } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 flex-col justify-center items-center p-12">
        <div className="max-w-md text-center">
          <BookOpen className="h-20 w-20 text-white mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">KBase</h1>
          <p className="text-xl text-blue-100">
            Your team's knowledge, organized and accessible.
          </p>
          <p className="mt-6 text-blue-200">
            Store, manage, and share project documents, guides, and resources all in one place.
          </p>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <BookOpen className="h-10 w-10 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">KBase</span>
          </div>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
