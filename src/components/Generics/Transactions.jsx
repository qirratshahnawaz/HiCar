import { useState } from 'react'
import { Search, ChevronDown, MoreHorizontal, ChevronLeft,Car,Shield, ChevronRight } from 'lucide-react'

const CarBookingTable = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [carTypeFilter, setCarTypeFilter] = useState('Car Type')
  const [statusFilter, setStatusFilter] = useState('Status')
  const [resultsPerPage, setResultsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const bookings = [
    {
      id: 'BK-765435',
      customer: 'Michael Johnson',
      carName: 'Tesla Model S',
      paymentDate: 'Sep 02, 2024',
      amount: '$2038',
      paymentType: 'Paypal',
      status: 'Complete'
    },
    {
      id: 'BK-765435',
      customer: 'Michael Johnson',
      carName: 'Tesla Model S',
      paymentDate: 'Sep 02, 2024',
      amount: '$2038',
      paymentType: 'Bank',
      status: 'Cancelled'
    },
    {
      id: 'BK-765435',
      customer: 'Michael Johnson',
      carName: 'Tesla Model S',
      paymentDate: 'Sep 02, 2024',
      amount: '$2038',
      paymentType: 'Credit Card',
      status: 'Pending'
    },
    {
      id: 'BK-765435',
      customer: 'Michael Johnson',
      carName: 'Tesla Model S',
      paymentDate: 'Sep 02, 2024',
      amount: '$2038',
      paymentType: 'Credit Card',
      status: 'Complete'
    },
    {
      id: 'BK-765435',
      customer: 'Michael Johnson',
      carName: 'Tesla Model S',
      paymentDate: 'Sep 02, 2024',
      amount: '$2038',
      paymentType: 'Credit Card',
      status: 'Complete'
    },
    {
      id: 'BK-765435',
      customer: 'Michael Johnson',
      carName: 'Tesla Model S',
      paymentDate: 'Sep 02, 2024',
      amount: '$2038',
      paymentType: 'Cash',
      status: 'Complete'
    },
    {
      id: 'BK-765435',
      customer: 'Michael Johnson',
      carName: 'Tesla Model S',
      paymentDate: 'Sep 02, 2024',
      amount: '$2038',
      paymentType: 'Cash',
      status: 'Pending'
    },
    {
      id: 'BK-765435',
      customer: 'Michael Johnson',
      carName: 'Tesla Model S',
      paymentDate: 'Sep 02, 2024',
      amount: '$2038',
      paymentType: 'Credit Card',
      status: 'Pending'
    },
    {
      id: 'BK-765435',
      customer: 'Michael Johnson',
      carName: 'Tesla Model S',
      paymentDate: 'Sep 02, 2024',
      amount: '$2038',
      paymentType: 'Credit Card',
      status: 'Pending'
    },
    {
      id: 'BK-765435',
      customer: 'Michael Johnson',
      carName: 'Tesla Model S',
      paymentDate: 'Sep 02, 2024',
      amount: '$2038',
      paymentType: 'Credit Card',
      status: 'Pending'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete':
        return 'bg-green-100 text-green-700'
      case 'Pending':
        return 'bg-orange-100 text-orange-600'
      case 'Cancelled':
        return 'bg-red-100 text-red-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Complete':
        return '✓'
      case 'Pending':
        return '⏳'
      case 'Cancelled':
        return '✕'
      default:
        return ''
    }
  }

  const totalPages = Math.ceil(bookings.length / resultsPerPage)

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
  
      <div className="p-4 bg-white border-b border-gray-200">
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

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                Booking Id
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[140px]">
                Customer Name
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                Car Name
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                Payment Date
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                Amount
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">
                Payment Type
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage).map((booking, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.id}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.customer}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.carName}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.paymentDate}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {booking.amount}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.paymentType}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    <span className="text-xs">{getStatusIcon(booking.status)}</span>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
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
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-sm rounded ${
                    currentPage === page
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              {totalPages > 4 && <span className="px-2 text-gray-400">...</span>}
              {totalPages > 3 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-8 h-8 text-sm rounded ${
                    currentPage === totalPages
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
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
    </div>
  )
}

export default CarBookingTable