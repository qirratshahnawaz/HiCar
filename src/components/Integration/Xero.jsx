import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';

export default function Xero() {
  const [formData, setFormData] = useState({
    clientId: '',
    clientSecret: '',
    redirectUri: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConnect = () => {
    console.log('Connecting to MYOB with:', formData);
    
  };

  const isFormValid = formData.clientId && formData.clientSecret && formData.redirectUri;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-200xl mx-auto">
        
        <div className="mb-6">
         <div className="relative w-full sm:w-96">
                       <input
                         type="text"
                         placeholder="Search customer, car name etc"
                         className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                       />
                       <Search className="absolute left-3 top-2.5 w-4 sm:w-5 h-4 sm:h-5 text-orange-500" aria-hidden="true" />
                     </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              
              <h1 className="text-lg font-semibold text-gray-900">Connect to Xero</h1>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Client ID */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Client ID
              </label>
              <input
                type="text"
                placeholder="e.g., 0pa8abcd12345Xyz7b5"
                value={formData.clientId}
                onChange={(e) => handleInputChange('clientId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm placeholder-gray-400"
              />
            </div>

            {/* Client Secret */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Client Secret
              </label>
              <input
                type="password"
                placeholder="e.g., s3cr3tK3yX8VnQwErTy"
                value={formData.clientSecret}
                onChange={(e) => handleInputChange('clientSecret', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm placeholder-gray-400"
              />
            </div>

            {/* Redirect URI */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Redirect URI
              </label>
              <input
                type="url"
                placeholder="e.g., https://yourapp.com"
                value={formData.redirectUri}
                onChange={(e) => handleInputChange('redirectUri', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm placeholder-gray-400"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleConnect}
                disabled={!isFormValid}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isFormValid
                    ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-md'
                    : 'bg-orange-500 text-black cursor-not-allowed'
                }`}
              >
                Connect to MYOB
              </button>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}