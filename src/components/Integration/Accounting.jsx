import React, { useState } from 'react';
import { ChevronLeft, X, ChevronDown } from 'lucide-react';

const Accounting = () => {
  const [currentView, setCurrentView] = useState('initial'); 
  const [formData, setFormData] = useState({
    accountNumber: '',
    bankName: '',
    bsbNumber: '',
    authorized: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  const renderInitialView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Bank Account</h1>
          </div>
          <button 
            onClick={() => setCurrentView('dropdown')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            + Bank Account Setup
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-6 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search customer, car name etc"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            No Payments Set Up Yet. Click the<br />
            '+ Create Payment' button to create.
          </p>
        </div>
      </div>
    </div>
  );

  const renderDropdownView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentView('initial')}
              className="text-gray-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Bank Account</h1>
          </div>
          <div className="relative">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
              <span>+ Create Payment</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
              <div className="py-1">
                <button
                  onClick={() => setCurrentView('directDebit')}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                >
                  <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Direct Debit
                </button>
                <button
                  onClick={() => setCurrentView('bankTransfer')}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                >
                  <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Bank
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-6 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search customer, car name etc"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            No Payments Set Up Yet. Click the<br />
            '+ Create Payment' button to create.
          </p>
        </div>
      </div>
    </div>
  );

  const renderDirectDebitModal = () => (
    <Modal title="Create Direct Debit" onClose={() => setCurrentView('dropdown')}>
      <div className="p-6 space-y-4">
        {/* Account Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Number
          </label>
          <input
            type="text"
            placeholder="e.g., 1234 5678 9012 3456"
            value={formData.accountNumber}
            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Bank Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Name
          </label>
          <div className="relative">
            <select 
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
            >
              <option value="">Select bank</option>
              <option value="bank1">Bank 1</option>
              <option value="bank2">Bank 2</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* BSB Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            BSB Number <span className="text-gray-400 text-xs">(6 digits Routing number)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., 062000"
            value={formData.bsbNumber}
            onChange={(e) => handleInputChange('bsbNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Authorization Checkbox */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="authorize"
            checked={formData.authorized}
            onChange={(e) => handleInputChange('authorized', e.target.checked)}
            className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="authorize" className="text-sm text-gray-700">
            I authorize HiCar to debit the above bank account for recurring payments.
          </label>
        </div>

        {/* Confirm Button */}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium mt-6">
          Confirm Direct Debit
        </button>
      </div>
    </Modal>
  );

  const renderBankTransferModal = () => (
    <Modal title="Bank Transfer" onClose={() => setCurrentView('dropdown')}>
      <div className="p-6 space-y-4">
        {/* Account Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Number
          </label>
          <input
            type="text"
            placeholder="e.g., 1234 5678 9012 3456"
            value={formData.accountNumber}
            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Bank Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Name
          </label>
          <div className="relative">
            <select 
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none"
            >
              <option value="">Select bank</option>
              <option value="bank1">Bank 1</option>
              <option value="bank2">Bank 2</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* BSB Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            BSB Number <span className="text-gray-400 text-xs">(6 digits Routing number)</span>
          </label>
          <input
            type="text"
            placeholder="e.g., 062000"
            value={formData.bsbNumber}
            onChange={(e) => handleInputChange('bsbNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        {/* Authorization Checkbox */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="authorize-transfer"
            checked={formData.authorized}
            onChange={(e) => handleInputChange('authorized', e.target.checked)}
            className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="authorize-transfer" className="text-sm text-gray-700">
            I authorize HiCar to debit the above bank account for recurring payments.
          </label>
        </div>

        {/* Confirm Button */}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md font-medium mt-6">
          Confirm Bank Transfer
        </button>
      </div>
    </Modal>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'initial' && renderInitialView()}
      {currentView === 'dropdown' && renderDropdownView()}
      {currentView === 'directDebit' && (
        <>
          {renderDropdownView()}
          {renderDirectDebitModal()}
        </>
      )}
      {currentView === 'bankTransfer' && (
        <>
          {renderDropdownView()}
          {renderBankTransferModal()}
        </>
      )}
    </div>
  );
};

export default Accounting;