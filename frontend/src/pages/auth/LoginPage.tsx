import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts';
import { Button, Input, Alert } from '@/components/ui';
import { Info } from 'lucide-react';

// Test accounts for development - all use password: Password123!
const TEST_ACCOUNTS = [
  { role: 'ADMIN', email: 'admin@kbase.dev', description: 'Full system access' },
  { role: 'OWNER', email: 'john.smith@techcorp.com', description: 'Project owner access' },
  { role: 'USER', email: 'alice.taylor@techcorp.com', description: 'Regular user access' },
];

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillTestAccount = (testEmail: string) => {
    setEmail(testEmail);
    setPassword('Password123!');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Input
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
        >
          Sign in
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Test Accounts Panel */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-5 w-5 text-blue-600" />
          <h3 className="text-sm font-semibold text-blue-900">Test Accounts</h3>
        </div>
        <p className="text-xs text-blue-700 mb-3">
          Password for all accounts: <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono">Password123!</code>
        </p>
        <div className="space-y-2">
          {TEST_ACCOUNTS.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => fillTestAccount(account.email)}
              className="w-full text-left p-2 rounded-md bg-white border border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-800 mr-2">
                    {account.role}
                  </span>
                  <span className="text-sm text-gray-700">{account.email}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{account.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
