import React, { useState } from 'react';
import { Search, ChevronDown,  Calendar, MoreHorizontal, Star, ChevronLeft, Car, Shield, Check, AlertCircle, ChevronRight, ArrowLeft, X, CheckCircle } from 'lucide-react';
import tesla from "../../../public/tesla.jpeg"
import avater from "../../../public/ava.png"
import { motion, AnimatePresence } from 'framer-motion';
const Booking = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // Fixed typo: isConfirmationModalOpenn -> isConfirmationModalOpen
  const [searchTerm, setSearchTerm] = useState('');
  const [driverRating, setDriverRating] = useState(0);
  const [carTypeFilter, setCarTypeFilter] = useState('Car Type');
  const [statusFilter, setStatusFilter] = useState('Status');
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [view, setView] = useState('bookings');
  const [isTollModalOpen, setIsTollModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isFineModalOpen, setIsFineModalOpen] = useState(false);
  const [tollData, setTollData] = useState({ description: '', amount: '', date: '', file: null });
  const [tolls, setTolls] = useState([]);
  const [expenseData, setExpenseData] = useState({ type: 'Select type', description: '', amount: '', date: '', file: null });
  const [expenses, setExpenses] = useState([]);
  const [fineData, setFineData] = useState({ description: '', amount: '', date: '', file: null });
  const [fines, setFines] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const handleCompleteBookingg = () => {
    console.log('Booking completed with rating:', driverRating, 'reason:', selectedReason, 'note:', completionNote);
    setIsConfirmationModalOpen(false);
  };
  const [selectedReason, setSelectedReason] = useState('');
  const [completionNote, setCompletionNote] = useState('');
  const selectedBookingg = {
    customer: 'Jennifer Markus',
    id: 'RNT-48295',
    carName: 'BMW i7',
    pickupDate: 'Wed, May 7, 2025 10:00 AM',
    returnDate: 'Thu, Apr 10, 2025 10:00 AM',
    pickupLocation: 'San Francisco International Airport (SFO) 780 McDonnell Road, San Francisco, CA 94128',
    amount: '$28,790',
    initialDeposit: '20% ($24,000)',
    totalEarnings: '$800/mo',
    installments: [
      { date: 'Sep 02, 2024', amount: '$800', type: 'Bank', status: 'Complete' },
      { date: 'Sep 02, 2024', amount: '$450', type: 'Credit Card', status: 'Complete' },
      { date: 'Sep 02, 2024', amount: '$340', type: '...', status: 'Upcoming' },
    ],
  };

  const [bookings, setBookings] = useState([
    { id: 'BK-765435', customer: 'Michael Johnson', carName: 'Tesla Model S', paymentDate: 'Sep 02, 2024', amount: '$2038', paymentType: 'Paypal', status: 'Complete' },
    { id: 'BK-765436', customer: 'Michael Johnson', carName: 'Tesla Model S', paymentDate: 'Sep 02, 2024', amount: '$2038', paymentType: 'Bank', status: 'Pending' },
    { id: 'BK-765437', customer: 'Michael Johnson', carName: 'Tesla Model S', paymentDate: 'Sep 02, 2024', amount: '$2038', paymentType: 'Credit Card', status: 'Ongoing' },
    { id: 'BK-765438', customer: 'Jennifer Markus', carName: 'BMW i7', paymentDate: 'May 7, 2025', amount: '$28,730', paymentType: 'Bank', status: 'Pending', pickupDate: 'Wed, May 7, 2025 | 10:00 AM', returnDate: 'Thu, Apr 10, 2025 | 10:00 AM', pickupLocation: 'San Francisco International Airport (SFO)', returnLocation: '780 McDonnell Road, San Francisco, CA 94128', initialDeposit: '$24,000', monthlyPayment: '$1,576.67', totalEarnings: '$8,000/mo' },
    { id: 'BK-765439', customer: 'Michael Johnson', carName: 'Tesla Model S', paymentDate: 'Sep 02, 2024', amount: '$2038', paymentType: 'Credit Card', status: 'Pending' },
    { id: 'BK-765440', customer: 'Michael Johnson', carName: 'Tesla Model S', paymentDate: 'Sep 02, 2024', amount: '$2038', paymentType: 'Paypal', status: 'Ongoing' },
    { id: 'BK-765441', customer: 'Michael Johnson', carName: 'Tesla Model S', paymentDate: 'Sep 02, 2024', amount: '$2038', paymentType: 'Bank', status: 'Complete' },
    { id: 'BK-765442', customer: 'Michael Johnson', carName: 'Tesla Model S', paymentDate: 'Sep 02, 2024', amount: '$2038', paymentType: 'Cash', status: 'Pending' },
    { id: 'BK-765443', customer: 'Michael Johnson', carName: 'Tesla Model S', paymentDate: 'Sep 02, 2024', amount: '$2038', paymentType: 'Credit Card', status: 'Ongoing' },
    { id: 'BK-765444', customer: 'Michael Johnson', carName: 'Tesla Model S', paymentDate: 'Sep 02, 2024', amount: '$2038', paymentType: 'Paypal', status: 'Complete' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-orange-100 text-orange-600';
      case 'Ongoing': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Complete': return '✓';
      case 'Pending': return '⏳';
      case 'Ongoing': return '⏩';
      default: return '';
    }
  };

  const handleTollFileChange = (e) => {
    setTollData({ ...tollData, file: e.target.files[0] });
  };

  const handleExpenseFileChange = (e) => {
    setExpenseData({ ...expenseData, file: e.target.files[0] });
  };

  const handleFineFileChange = (e) => {
    setFineData({ ...fineData, file: e.target.files[0] });
  };

  const handleDeleteFine = (id) => {
    setFines(fines.filter((fine) => fine.id !== id));
  };

  const handleSaveToll = () => {
    if (!tollData.description || !tollData.date) {
      setErrorMessage('Description and Date are required for tolls.');
      return;
    }
    const newToll = {
      id: `TOLL-${tolls.length + 1}`,
      description: tollData.description,
      amount: tollData.amount || 'N/A',
      date: tollData.date,
      fileName: tollData.file ? tollData.file.name : 'No file',
    };
    setTolls([...tolls, newToll]);
    setIsTollModalOpen(false);
    setTollData({ description: '', amount: '', date: '', file: null });
    setErrorMessage('');
  };

  const handleSaveExpense = () => {
    if (expenseData.type === 'Select type' || !expenseData.date) {
      setErrorMessage('Expense Type and Date are required.');
      return;
    }
    const newExpense = {
      id: `EXP-${expenses.length + 1}`,
      type: expenseData.type,
      description: expenseData.description,
      amount: expenseData.amount || 'N/A',
      date: expenseData.date,
      fileName: expenseData.file ? expenseData.file.name : 'No file',
    };
    setExpenses([...expenses, newExpense]);
    setIsExpenseModalOpen(false);
    setExpenseData({ type: 'Select type', description: '', amount: '', date: '', file: null });
    setErrorMessage('');
  };

  const handleSaveFine = () => {
    if (!fineData.description || !fineData.date) {
      setErrorMessage('Description and Date are required for fines.');
      return;
    }
    const newFine = {
      id: `FINE-${fines.length + 1}`,
      description: fineData.description,
      amount: fineData.amount || 'N/A',
      date: fineData.date,
      fileName: fineData.file ? fineData.file.name : 'No file',
    };
    setFines([...fines, newFine]);
    setIsFineModalOpen(false);
    setFineData({ description: '', amount: '', date: '', file: null });
    setErrorMessage('');
  };

  const handleCompleteBooking = (booking) => {
    const updatedBookings = bookings.map((b) =>
      b.id === booking.id ? { ...b, status: 'Complete', paymentType: booking.paymentType || 'Bank' } : b
    );
    setBookings(updatedBookings);
    setView('completeDetails');
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

const totalPages = Math.ceil(filteredBookings.length / resultsPerPage);

if (view === 'tollCharges') {
  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button onClick={() => setView('bookings')} className="text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Toll Charges</h2>
        </div>
        <button
          onClick={() => {
            setIsTollModalOpen(true);
            setIsExpenseModalOpen(false);
            setIsFineModalOpen(false);
            setTollData({ description: '', amount: '', date: '', file: null });
          }}
          className="bg-orange-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-orange-600 hover:scale-105 hover:shadow-md transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
        >
          <span>+</span> Add Toll
        </button>
      </div>

      <div className="relative mb-6">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search customer, car name etc"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-orange-500 hover:scale-110 transition-transform duration-200" aria-hidden="true" />
        </div>
      </div>

      {tolls.length === 0 ? (
        <div className="flex items-center justify-center h-64 sm:h-96 text-gray-500 text-sm sm:text-base">
          <p>No toll recorded for this booking. Click the "+ Add Toll" button to add.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[120px]">Toll ID</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px] sm:min-w-[140px]">Description</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px] sm:min-w-[100px]">Amount</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[120px]">Date</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[120px]">Receipt</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tolls
                .filter((toll) => toll.description.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((toll, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{toll.id}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{toll.description}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{toll.amount}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{toll.date}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{toll.fileName}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {isTollModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-[95vw] sm:max-w-md mx-2 sm:mx-0 my-4 sm:my-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Add Toll Charge</h3>
                <button onClick={() => setIsTollModalOpen(false)} className="text-gray-600 hover:text-gray-800 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {errorMessage && <div className="mb-4 text-xs sm:text-sm text-red-600">{errorMessage}</div>}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="Enter toll description"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    value={tollData.description}
                    onChange={(e) => setTollData({ ...tollData, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Amount ($) (Optional)</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    value={tollData.amount}
                    onChange={(e) => setTollData({ ...tollData, amount: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                      value={tollData.date}
                      onChange={(e) => setTollData({ ...tollData, date: e.target.value })}
                    />
                    <Calendar className="absolute left-3 top-2.5 w-4 sm:w-5 h-4 sm:h-5 text-blue-500 hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Upload Receipt</label>
                  <input
                    type="file"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    onChange={handleTollFileChange}
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{tollData.file ? tollData.file.name : 'No file chosen'}</p>
                </div>
              </div>
              <button
                onClick={handleSaveToll}
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 hover:scale-105 hover:shadow-md transition-all duration-200 mt-4 text-sm sm:text-base"
              >
                Save
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

if (view === 'carExpense') {
  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button onClick={() => setView('bookings')} className="text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Car Expense</h2>
        </div>
        <button
          onClick={() => {
            setIsExpenseModalOpen(true);
            setIsTollModalOpen(false);
            setIsFineModalOpen(false);
            setExpenseData({ type: 'Select type', description: '', amount: '', date: '', file: null });
          }}
          className="bg-orange-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-orange-600 hover:scale-105 hover:shadow-md transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
        >
          <span>+</span> Add Expense
        </button>
      </div>

      <div className="relative mb-6">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search customer, car name etc"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-orange-500 hover:scale-110 transition-transform duration-200" aria-hidden="true" />
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="flex items-center justify-center h-64 sm:h-96 text-gray-500 text-sm sm:text-base">
          <p>No car expense recorded for this booking. Click the "+ Add Expense" button to add.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[120px]">Expense Type</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px] sm:min-w-[140px]">Description</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px] sm:min-w-[100px]">Amount</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[120px]">Date</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[120px]">Receipt</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12 sm:w-16">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses
                .filter((expense) => expense.description.toLowerCase().includes(searchTerm.toLowerCase()) || expense.type.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((expense, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{expense.type}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{expense.description}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{expense.amount}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{expense.date}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{expense.fileName}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">
                      <span className="text-gray-400">...</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {isExpenseModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-[95vw] sm:max-w-md mx-2 sm:mx-0 my-4 sm:my-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Add Car Expense</h3>
                <button onClick={() => setIsExpenseModalOpen(false)} className="text-gray-600 hover:text-gray-800 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {errorMessage && <div className="mb-4 text-xs sm:text-sm text-red-600">{errorMessage}</div>}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Expense Type</label>
                  <select
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    value={expenseData.type}
                    onChange={(e) => setExpenseData({ ...expenseData, type: e.target.value })}
                  >
                    <option>Select type</option>
                    <option>Fuel</option>
                    <option>Maintenance</option>
                    <option>Toll</option>
                    <option>Fine</option>
                    <option>Insurance</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g., Oil Change"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    value={expenseData.description}
                    onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Amount ($) (Optional)</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    value={expenseData.amount}
                    onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Date of Expense</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                      value={expenseData.date}
                      onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
                    />
                    <Calendar className="absolute left-3 top-2.5 w-4 sm:w-5 h-4 sm:h-5 text-blue-500 hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Upload Receipt (Optional)</label>
                  <input
                    type="file"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    onChange={handleExpenseFileChange}
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{expenseData.file ? expenseData.file.name : 'No file chosen'}</p>
                </div>
              </div>
              <button
                onClick={handleSaveExpense}
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 hover:scale-105 hover:shadow-md transition-all duration-200 mt-4 text-sm sm:text-base"
              >
                Save
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

if (view === 'fineCharges') {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button onClick={() => setView('bookings')} className="text-gray-600 hover:text-gray-800 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Fine Charges</h2>
        </div>
        <button
          onClick={() => {
            setIsFineModalOpen(true);
            setIsTollModalOpen(false);
            setIsExpenseModalOpen(false);
            setFineData({ description: '', amount: '', date: '', file: null });
          }}
          className="bg-orange-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-orange-600 hover:scale-105 hover:shadow-md transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
        >
          <span>+</span> Add Fine
        </button>
      </div>

      <div className="relative mb-6">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search customer, car name etc"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-orange-500 hover:scale-110 transition-transform duration-200" aria-hidden="true" />
        </div>
      </div>

      {fines.length === 0 ? (
        <div className="flex items-center justify-center h-64 sm:h-96 text-gray-500 text-sm sm:text-base">
          <p>No fine recorded for this booking. Click the "+ Add Fine" button to add.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px] sm:min-w-[140px]">Description</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px] sm:min-w-[100px]">Amount</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[120px]">Date</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sm:min-w-[120px]">Receipt</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12 sm:w-16">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fines
                .filter((fine) => fine.description.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((fine, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{fine.description}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{fine.amount}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{fine.date}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{fine.fileName}</td>
                    <td className="px-2 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">
                      <button onClick={() => handleDeleteFine(fine.id)} className="text-red-500 hover:text-red-700 hover:scale-105 transition-all duration-200">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {isFineModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start sm:items-center justify-center z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-[95vw] sm:max-w-md mx-2 sm:mx-0 my-4 sm:my-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">Add Fine Charge</h3>
                <button onClick={() => setIsFineModalOpen(false)} className="text-gray-600 hover:text-gray-800 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {errorMessage && <div className="mb-4 text-xs sm:text-sm text-red-600">{errorMessage}</div>}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="Enter fine description"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    value={fineData.description}
                    onChange={(e) => setFineData({ ...fineData, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Amount ($) (Optional)</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    value={fineData.amount}
                    onChange={(e) => setFineData({ ...fineData, amount: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                      value={fineData.date}
                      onChange={(e) => setFineData({ ...fineData, date: e.target.value })}
                    />
                    <Calendar className="absolute left-3 top-2.5 w-4 sm:w-5 h-4 sm:h-5 text-blue-500 hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Upload Proof (Optional)</label>
                  <input
                    type="file"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    onChange={handleFineFileChange}
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{fineData.file ? fineData.file.name : 'No file chosen'}</p>
                </div>
              </div>
              <button
                onClick={handleSaveFine}
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 hover:scale-105 hover:shadow-md transition-all duration-200 mt-4 text-sm sm:text-base"
              >
                Save
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
  const renderStars = (rating, interactive = false, size = 'w-5 h-5') => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${star <= (interactive ? driverRating : rating)
                ? 'text-orange-500 fill-orange-500'
                : 'text-gray-300'
              } ${interactive ? 'cursor-pointer' : ''}`}
            onClick={interactive ? () => setDriverRating(star) : undefined}
          />
        ))}
      </div>
    );
  };
  if (view === 'completeDetails') {
    return (
      <div className="min-h-screen bg-gray-50 p-4 shadow-md">
        <div className="max-w-200xl mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <span className="text-green-700 font-medium">Booking successfully completed!</span>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setView('bookings')}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-semibold text-gray-800">Booking Details</h2>
              </div>
            </div>

            <div className="p-6 space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={avater}
                    alt="Customer Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {selectedBookingg.customer}
                      </h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                        <span className="text-sm text-gray-600">
                          {selectedBookingg.rating} ({selectedBookingg.totalTrips} trips)
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <Check className="w-4 h-4" />
                        <span>ID Verified</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-600">
                        <Check className="w-4 h-4" />
                        <span>Driver's License Verified</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Member since {selectedBookingg.memberSince}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    Contact Driver
                  </button>
                  <button
                    onClick={() => setIsConfirmationModalOpen(true)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm flex items-center gap-2 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Booking Complete
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Vehicle Information</h3>

                <p className="text-sm text-gray-500 mb-4">Booking ID: {selectedBookingg.id}</p>

                <div className="flex items-center gap-4 mb-8">
                  <img
                    src={tesla}
                    alt="BMW i7"
                    className="w-40 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">{selectedBookingg.carName}</h4>
                    <p className="text-sm text-gray-500">Reg#: {selectedBookingg.regNumber}</p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Pickup Date */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                      </div>
                      <span className="font-medium text-gray-900">Pickup Date</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-10">{selectedBookingg.pickupDate}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                      </div>
                      <span className="font-medium text-gray-900">Return Date</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-10">{selectedBookingg.returnDate}</p>
                  </div>

                  {/* Pickup & Drop Location */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                      </div>
                      <span className="font-medium text-gray-900">Pickup & Drop Location</span>
                    </div>
                    <div className="text-sm text-gray-600 ml-10">
                      <p>San Francisco International Airport (SFO)</p>
                      <p>780 McDonnell Road, San Francisco, CA 94128</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Pickup & Drop Location</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-line">{selectedBookingg.pickupLocation}</p>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">3 Months Rental Plan</span>
                    <span className="font-semibold text-gray-900">{selectedBookingg.amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Initial Deposit</span>
                    <span className="font-semibold text-gray-900">{selectedBookingg.initialDeposit}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Frequency</span>
                    <span className="font-semibold text-gray-900">Monthly</span>
                  </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-gray-900">Total Earnings</h4>
                  <span className="text-xl font-bold text-gray-900">{selectedBookingg.totalEarnings}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Installments</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedBookingg.installments.map((installment, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{installment.date}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{installment.amount}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{installment.type}</td>
                          <td className="px-4 py-3 text-sm">
                            {installment.status === 'Complete' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                <Check className="w-3 h-3" />
                                {installment.status}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                ⏳ {installment.status}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>


            </div>
          </div>

          {isConfirmationModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800">Complete Booking</h3>
                  <button
                    onClick={() => setIsConfirmationModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="p-6 space-y-6">

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Rate the Driver</h4>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={avater}
                        alt="Driver"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{selectedBookingg.customer}</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-orange-500" />
                          <span className="text-sm text-gray-600">{selectedBookingg.rating}</span>
                        </div>
                      </div>
                    </div>
                    {renderStars(driverRating, true)}
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Reason for Completion</h4>
                    <textarea
                      value={completionNote}
                      onChange={(e) => setCompletionNote(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Write the reason here..."
                      rows="3"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      'Rental Period Ended',
                      'Early Termination',
                      'Vehicle Issue',
                      'Mutual Agreement',
                      'Other'
                    ].map((reason) => (
                      <span
                        key={reason}
                        onClick={() => setSelectedReason(reason)}
                        className={`px-3 py-2 text-sm rounded-lg cursor-pointer transition-colors ${selectedReason === reason
                            ? 'bg-orange-100 text-orange-500 border border-orange-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {reason}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={handleCompleteBooking}
                    className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg font-medium transition-colors"
                  >
                    Complete Booking
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search customer, car name etc"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
                />
                <Search className="absolute left-3 top-2.5 w-4 sm:w-5 h-4 sm:h-5 text-orange-500" aria-hidden="true" />
              </div>
              <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
                <Car className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600 text-sm sm:text-base">Car Type</span>
                <ChevronDown className="w-4 h-4 text-orange-500" />
              </div>
              <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
                <Shield className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600 text-sm sm:text-base">Status</span>
                <ChevronDown className="w-4 h-4 text-orange-500" />
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="overflow-x-auto shadow-md">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Booking Id</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">Customer Name</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Car Name</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Payment Date</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Amount</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Payment Type</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Edit</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage).map((booking, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.id}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.customer}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.carName}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.paymentDate}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.amount}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.paymentType}</td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    <span className="text-xs">{getStatusIcon(booking.status)}</span>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                  <button
                    onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                  {dropdownOpen === index && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <ul className="py-1">
                        <li>
                          <button
                            onClick={() => {
                              handleCompleteBooking(booking);
                              setIsTollModalOpen(false);
                              setIsExpenseModalOpen(false);
                              setIsFineModalOpen(false);
                              setDropdownOpen(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Details
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setView('tollCharges');
                              setDropdownOpen(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Toll
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setView('carExpense');
                              setDropdownOpen(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Car Expense
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              setView('fineCharges');
                              setDropdownOpen(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Fine Charges
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 sm:px-6 py-4 bg-white border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Result per page</span>
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                value={resultsPerPage}
                onChange={(e) => setResultsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </button>
            <span className="text-sm text-gray-600 mx-2">Prev</span>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-sm rounded ${currentPage === page ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {page}
                </button>
              ))}
              {totalPages > 4 && <span className="px-2 text-gray-400">...</span>}
              {totalPages > 3 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-8 h-8 text-sm rounded ${currentPage === totalPages ? 'bg-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  {totalPages}
                </button>
              )}
            </div>
            <span className="text-sm text-gray-600 mx-2">Next</span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
      </div>

      {isConfirmationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Booking completed successfully!</h3>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  setIsConfirmationModalOpen(false);
                  setView('bookings');
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg "
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;