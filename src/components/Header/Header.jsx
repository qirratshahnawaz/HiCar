import { useState, useRef, useEffect } from 'react';
import { FiBell, FiSearch, FiChevronDown, FiMenu, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useLocation, Link } from 'react-router-dom';

const Header = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const location = useLocation();

  const routeTitles = {
    '/home': 'Dashboard',
    '/home/listings': 'My Listing',
    '/home/bookings': 'Bookings',
    '/home/transactions': 'Transaction',
    '/home/integration': 'Integration',
    '/home/messages': 'Messages',
    '/home/notifications': 'Notification',
    // '/home/settings': 'Settings',
    '/home/profile': 'Settings',
    '/home/support': 'Settings',
    '/home/security': 'Settings',
    '/home/addListcar': 'Add List Car',
    '/home/ClubMembership': 'Club Membership',
    '/home/service-contractor': 'Service Contractor',
    '/home/service-request': 'Service Request',
    '/home/accounting': 'Accounting',
    '/home/xero': 'Xero',
    '/home/myob': 'MYOB',
  };

  const currentPath = location.pathname;
  const pageTitle = routeTitles[currentPath] || 'Dashboard';

  const notifications = [
    { id: 1, message: 'Your car Tesla Model 3 booking was confirmed', time: '2 hours ago', read: false },
    { id: 2, message: 'Payment for your recent trip was successful', time: '1 day ago', read: true },
    { id: 3, message: 'Your account details were updated successfully', time: '3 days ago', read: true },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setShowDropdown(false);
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setShowNotifications(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSpecialPage = currentPath === '/home/addListcar' || currentPath === '/home/ClubMembership';

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between animate-slide-down-header">
      <div className="flex items-center space-x-4">
        {isSpecialPage ? (
          <Link to="/home" className="flex items-center space-x-2 animate-fade-in">
            <FiArrowLeft size={24} className="text-gray-500 hover:text-gray-700 transition-colors duration-200 transform hover:scale-110 hover:rotate-12" />
            <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
          </Link>
        ) : (
          <>
            <button
              onClick={onToggleSidebar}
              className="text-gray-500 hover:text-gray-700 focus:outline-none transform hover:scale-110 hover:rotate-12 transition-transform duration-200"
            >
              <FiMenu size={24} className="animate-pulse" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 animate-bounce">{pageTitle}</h1>
          </>
        )}
      </div>

      {!isSpecialPage && (
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none transform hover:scale-110 hover:rotate-12 transition-transform duration-200"
            >
              <FiSearch size={20} className="animate-pulse" />
            </button>
            {showSearch && (
              <div className="lg:hidden absolute left-0 mt-2 w-64 animate-fade-in">
                <input
                  type="text"
                  className="w-full pl-10 pr-16 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 bg-white shadow-sm transform transition-transform duration-200 hover:scale-105"
                  placeholder="Search here..."
                />
              </div>
            )}
            <div className="hidden lg:block">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400 animate-pulse" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-16 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 bg-white shadow-sm transition-all duration-200 hover:scale-105"
                  placeholder="Search here..."
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-xs font-semibold animate-pulse">⌘K</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-gray-500 hover:text-gray-700 focus:outline-none transform hover:scale-110 hover:rotate-12 transition-transform duration-200"
            >
              <FiBell size={22} className="animate-bounce" />
              <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                2
              </span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-dropdown z-10 py-2 overflow-hidden animate-slide-down">
                <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center animate-fade-in">
                  <h3 className="font-semibold text-gray-700">Notifications</h3>
                  <span className="text-xs text-primary-400 cursor-pointer transform hover:scale-105 transition-transform duration-200">
                    Mark all as read
                  </span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer ${
                        !notification.read ? 'bg-primary-50' : ''
                      } transition-colors duration-200 transform hover:scale-102`}
                    >
                      <div className="flex items-start">
                        {!notification.read && (
                          <div className="h-2 w-2 mt-1.5 mr-2 rounded-full bg-primary-400 flex-shrink-0 animate-pulse"></div>
                        )}
                        <div className={!notification.read ? 'ml-0' : 'ml-4'}>
                          <p className="text-sm text-gray-800">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-200 text-center">
                  <a href="">
                    <button className="text-sm text-primary-600 hover:text-primary-700 transition-colors duration-200 transform hover:scale-105">
                      View All Notifications
                    </button>
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 focus:outline-none transform hover:scale-110 hover:rotate-12 transition-transform duration-200"
            >
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium animate-bounce">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <FiChevronDown
                className={`transition-transform duration-200 ${showDropdown ? 'transform rotate-180' : ''} animate-pulse`}
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-dropdown z-10 animate-slide-down">
                <div className="px-4 py-3 border-b border-gray-200 animate-fade-in">
                  <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                </div>
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 transform hover:scale-102">
                    Your Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 transform hover:scale-102">
                    Settings
                  </button>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200 transform hover:scale-102"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;