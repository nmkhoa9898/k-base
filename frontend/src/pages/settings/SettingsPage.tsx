import React from 'react';
import { Card, CardContent } from '@/components/ui';

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500 text-center py-8">
            Settings page coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
