import { useState } from 'react';
import { AlertTriangle, Download, MoreVertical } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import avater from "../../../public/ava1.png"
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const StatCard = ({ title, value, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case 'revenue':
        return (
          <svg className="w-14 h-12 sm:w-14 sm:h-10 text-orange-500 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'customers':
        return (
          <svg className="w-14 h-12 sm:w-14 sm:h-10 text-orange-500 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'cars':
        return (
          <svg className="w-14 h-12 sm:w-14 sm:h-10 text-orange-500 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
            <path d="M7 14h.01" />
            <path d="M17 14h.01" />
            <rect width="18" height="8" x="3" y="10" rx="2" />
            <path d="M5 18v2" />
            <path d="M19 18v2" />
          </svg>
        );
      case 'expense':
        return (
          <svg className="w-14 h-12 sm:w-14 sm:h-10 text-orange-500 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 sm:w-14 sm:h-10 text-orange-500 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
    }
  };

  return (
    <div className="group bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 animate-fade-in">
      <div className="flex items-center mb-2 sm:mb-3">{getIcon()}</div>
      <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 animate-slide-up">{value}</div>
      <div className="text-xs sm:text-sm text-gray-600">{title}</div>
    </div>
  );
};

const Overview = () => {
  const [timeFilter, setTimeFilter] = useState('today');

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [15000, 12000, 25000, 15000, 10000, 20000, 18000, 22000, 24000, 36000, 32000, 30000],
        borderColor: '#f58200',
        backgroundColor: 'rgba(255, 153, 0, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHitRadius: 10,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#f58200',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
        borderWidth: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1E293B',
        bodyColor: '#1E293B',
        borderColor: '#E2E8F0',
        borderWidth: 1,
        padding: 16,
        boxPadding: 6,
        usePointStyle: true,
        displayColors: false,
        callbacks: {
          title: () => null,
          label: (context) => `$${(context.raw / 1000).toFixed(0)}k Income on ${context.label}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#64748B', font: { size: 10, family: 'Inter, sans-serif' } },
      },
      y: {
        grid: { color: '#F1F5F9', lineWidth: 1 },
        ticks: {
          color: '#64748B',
          font: { size: 10, family: 'Inter, sans-serif' },
          callback: (value) => `$${value / 1000}k`,
        },
      },
    },
    interaction: { mode: 'index', intersect: false },
    elements: {
      point: { backgroundColor: '#FF9900', borderColor: '#ffffff', borderWidth: 2 },
    },
  };

  const recentMessages = [
    {
      id: 1,
      sender: { name: 'Ava Marie', avatar: avater },
      message: "Please let me know your pickup time, and I'll have the car ready for you.",
      time: 'Today',
      timestamp: '05:30 PM',
    },
    {
      id: 2,
      sender: { name: 'Emma Rose', avatar: avater },
      message: "Please let me know your pickup time, and I'll have the car ready for you.",
      time: 'Today',
      timestamp: '05:30 PM',
    },
    {
      id: 3,
      sender: { name: 'Olivia Jane', avatar: avater },
      message: "Please let me know your pickup time, and I'll have the car ready for you.",
      time: 'Today',
      timestamp: '05:30 PM',
    },
    {
      id: 4,
      sender: { name: 'Daniel Scott', avatar: avater },
      message: "Please let me know your pickup time, and I'll have the car ready for you.",
      time: 'Today',
      timestamp: '05:30 PM',
    },

  ];

  const recentBookings = [
    {
      id: 'BK-765435',
      customerName: 'Michael Johnson',
      carName: 'Tesla Model S',
      bookingDate: 'Sep 02, 2024',
      amount: '$2038',
      startDate: 'Sep 12, 2024',
      endDate: 'Oct 22, 2024',
      status: 'Completed',
    },
    {
      id: 'BK-765436',
      customerName: 'Sarah Wilson',
      carName: 'BMW X5',
      bookingDate: 'Sep 03, 2024',
      amount: '$1850',
      startDate: 'Sep 15, 2024',
      endDate: 'Oct 20, 2024',
      status: 'Cancelled',
    },
    {
      id: 'BK-765437',
      customerName: 'David Lee',
      carName: 'Mercedes-Benz C-Class',
      bookingDate: 'Sep 04, 2024',
      amount: '$1500',
      startDate: 'Sep 10, 2024',
      endDate: 'Sep 17, 2024',
      status: 'Pending',
    },
    {
      id: 'BK-765438',
      customerName: 'Jessica Brown',
      carName: 'Toyota Camry',
      bookingDate: 'Sep 05, 2024',
      amount: '$900',
      startDate: 'Sep 18, 2024',
      endDate: 'Sep 25, 2024',
      status: 'Completed',
    },
  ];

  return (
    <div className="min-h-screen  bg-gray-50 p-2 sm:p-3 md:p-4 lg:p-2 w-full">
      <div className="mb-2 animate-fade-in">
        <div className="bg-yellow-50 border-l-4 border-orange-500 p-4 rounded-md flex flex-col sm:flex-row items-start sm:items-center shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center flex-1 mb-3 sm:mb-0">
            <AlertTriangle className="text-orange-500 mr-2 sm:mr-3 flex-shrink-0" size={18} />
            <p className="text-xs sm:text-sm md:text-base text-gray-800">
              Your car Tesla Model 3 (ABC123) registration expires in 7 days. Please renew before April 10 to avoid penalties.
            </p>
          </div>
          <button className="text-orange-500 text-lg sm:text-xl leading-none ml-auto flex-shrink-0  transition-colors duration-200">
            ×
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-5 sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 animate-slide-up">
        <div className="flex flex-wrap font-poppins items-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base">
          {['today', 'week', 'month', 'year'].map((filter) => (
            <div key={filter} className="flex items-center">
              <button
                onClick={() => setTimeFilter(filter)}
                className={`${timeFilter === filter ? 'text-orange-500 font-medium' : 'text-gray-500'
                  } transition-colors duration-200 capitalize`}
              >
                This {filter}
              </button>
              {filter !== 'year' && <span className="text-gray-300 mx-2 hidden sm:inline">|</span>}
            </div>
          ))}
        </div>
        <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-orange-500 text-white rounded-md flex items-center w-full sm:w-auto justify-center hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
          <Download className="mr-1 sm:mr-2" size={14} />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 sm:gap-6 mb-3">
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            <StatCard title="Total Revenue" value="$2801" icon="revenue" />
            <StatCard title="Total Customers" value="45" icon="customers" />
            <StatCard title="Total Cars" value="39" icon="cars" />
            <StatCard title="Total Expense" value="$867" icon="expense" />
          </div>
          <div className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold font-serif text-gray-800">Revenue Statistics</h2>
            </div>
            <div className="h-64 sm:h-80 md:h-96 w-full">
              <Line data={revenueData} options={chartOptions} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-md transition-shadow duration-300 animate-fade-in">
            <div className="flex justify-between items-center mb-4 p-4 sm:p-5">
              <h2 className="text-base sm:text-lg md:text-xl font-serif font-semibold text-gray-800">
                Messages<span className="text-gray-500 text-xs sm:text-sm ml-2">(12)</span>
              </h2>
              <button className="text-orange-500 text-xs sm:text-sm transition-colors duration-200">
                <Link to="/home/messages">View all</Link>
              </button>
            </div>
            <div className="space-y-7 p-4 sm:p-5">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="flex gap-2 sm:gap-3 pb-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 animate-slide-up"
                >
                  <img
                    src={message.sender.avatar}
                    alt={message.sender.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 object-cover"
                    onError={(e) => (e.target.src = avater)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-gray-800 text-sm sm:text-base">{message.sender.name}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 leading-relaxed line-clamp-2">
                      {message.message}
                    </p>
                    <div className="flex items-center text-xs text-gray-400">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-300 rounded-full mr-1 sm:mr-2"></div>
                      <span>{message.time} | {message.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden animate-fade-in">
        <div className="flex justify-between items-center p-4 sm:p-5 md:p-6 border-b border-gray-200">
          <h2 className="text-base sm:text-lg md:text-xl font-serif font-semibold text-gray-800">Recent Bookings</h2>
           <button className="text-orange-500 text-xs sm:text-sm transition-colors duration-200">
                <Link to="/home/bookings">View all</Link>
              </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-gray-50">
                {['Booking Id', 'Customer Name', 'Car Name', 'Booking Date', 'Amount', 'Time Duration', 'Status', 'Edit'].map((header) => (
                  <th
                    key={header}
                    className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {recentBookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-800">{booking.id}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600">{booking.customerName}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600">{booking.carName}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600">{booking.bookingDate}</td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">
                    {booking.amount}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600">
                    {booking.startDate} <span className="mx-1">to</span> {booking.endDate}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-gray-600">
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;