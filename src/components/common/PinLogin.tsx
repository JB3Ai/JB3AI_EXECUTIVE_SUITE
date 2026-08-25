import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export const PinLogin: React.FC = () => {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check if user is already authenticated
  useEffect(() => {
    const storedAuth = localStorage.getItem('pin_authenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePinChange = (value: string) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value);
      if (error) setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation - PIN is 2323
    if (pin === '2323') {
      localStorage.setItem('pin_authenticated', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid PIN. Please try again.');
      setPin('');
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as any);
    }
  };

  const clearPin = () => {
    setPin('');
    setError('');
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto bg-amber-500/10 border border-amber-500/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-amber-500" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">JB3AI Executive Suite</h1>
            <p className="text-neutral-400">Enter PIN to access dashboard</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex justify-center space-x-2 mb-4">
                {[...Array(4)].map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl font-mono ${
                      index < pin.length 
                        ? 'border-amber-500 bg-amber-500/10 text-amber-500' 
                        : 'border-neutral-700 text-neutral-400'
                    }`}
                  >
                    {index < pin.length ? pin[index] : ''}
                  </div>
                ))}
              </div>
              
              {error && (
                <div className="text-red-400 text-sm text-center mb-4">{error}</div>
              )}
              
              <input
                type="password"
                value={pin}
                onChange={(e) => handlePinChange(e.target.value)}
                onKeyPress={handleKeyPress}
                className="sr-only"
                aria-label="PIN input"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handlePinChange(pin + num.toString())}
                  className="h-16 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl flex items-center justify-center text-xl font-medium text-white transition-colors active:scale-95"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={clearPin}
                className="h-16 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl flex items-center justify-center text-xl font-medium text-white transition-colors active:scale-95"
              >
                Clear
              </button>
              <button
                key={0}
                type="button"
                onClick={() => handlePinChange(pin + '0')}
                className="h-16 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl flex items-center justify-center text-xl font-medium text-white transition-colors active:scale-95"
              >
                0
              </button>
              <button
                type="submit"
                disabled={isLoading || pin.length !== 4}
                className={`h-16 rounded-xl flex items-center justify-center text-xl font-medium transition-colors active:scale-95 ${
                  isLoading || pin.length !== 4
                    ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-600 text-black'
                }`}
              >
                {isLoading ? 'Verifying...' : 'Enter'}
              </button>
            </div>
          </form>

          <div className="text-center text-xs text-neutral-500 mt-6">
            <p>For security, PIN is stored locally in your browser</p>
          </div>
        </div>
      </div>
    </div>
  );
};