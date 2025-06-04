import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiList,
  FiCalendar,
  FiDollarSign,
  FiMessageSquare,
  FiSettings,
  FiPlusCircle,
  FiTruck,
  FiMenu,
  FiCreditCard,
  FiLogOut,
  FiBell,
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiHelpCircle,
  FiLock,
  FiBriefcase,
  FiBox
} from 'react-icons/fi';
import { FaCar, FaMoneyCheckAlt } from 'react-icons/fa';
import { GoSidebarExpand, GoSidebarCollapse } from 'react-icons/go';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ userType = 'driver', isOpen, onToggle, onClose }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
  const [isIntegrationDropdownOpen, setIsIntegrationDropdownOpen] = useState(false);
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSettingsDropdown = () => setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
  const toggleIntegrationDropdown = () => setIsIntegrationDropdownOpen(!isIntegrationDropdownOpen);
  const togglePaymentDropdown = () => setIsPaymentDropdownOpen(!isPaymentDropdownOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const menuSections = [
    {
      title: 'Main Menu',
      items: [
        { label: 'Dashboard', icon: <FiHome size={20} />, path: '/home', showFor: ['driver', 'owner'] },
        { label: 'My Listing', icon: <FiList size={20} />, path: '/home/listings', showFor: ['driver', 'owner'] },
        { label: 'Bookings', icon: <FiCalendar size={20} />, path: '/home/bookings', showFor: ['driver', 'owner'] },
        { label: 'Transaction', icon: <FiDollarSign size={20} />, path: '/home/transactions', showFor: ['driver', 'owner'] },
        {
          label: 'Integration',
          icon: <FiBriefcase size={20} />,
          path: '/home/accounting',
          showFor: ['driver', 'owner'],
          isDropdown: true,
          dropdownItems: [
            { label: 'Accounting', icon: <FiDollarSign size={18} />, path: '/home/accounting' },
            {
              label: 'Payment',
              icon: <FaMoneyCheckAlt size={18} />,
              path: '/home/payment',
              isNestedDropdown: true,
              nestedDropdownItems: [
                { label: 'Xero', icon: <FiBox size={16} />, path: '/home/xero' },
                { label: 'MYOB', icon: <FiBox size={16} />, path: '/home/myob' },
              ],
            },
          ],
        },
        { label: 'Service Request', icon: <FiTruck size={20} />, path: '/home/service-request', showFor: ['driver', 'owner'] },
        { label: 'Service Contractor', icon: <FiTruck size={20} />, path: '/home/service-contractor', showFor: ['driver', 'owner'] },
         ],
    },
    {
      title: 'General',
      items: [
        { label: 'Messages', icon: <FiMessageSquare size={20} />, path: '/home/messages', showFor: ['driver', 'owner'] },
        { label: 'Notification', icon: <FiBell size={20} />, path: '/home/notifications', showFor: ['driver', 'owner'] },
        {
          label: 'Settings',
          icon: <FiSettings size={20} />,
          path: '/home/settings',
          showFor: ['driver', 'owner'],
          isDropdown: true,
          dropdownItems: [
            { label: 'Profile', icon: <FiUser size={18} />, path: '/home/profile' },
            { label: 'Support', icon: <FiHelpCircle size={18} />, path: '/home/support' },
            { label: 'Security', icon: <FiLock size={18} />, path: '/home/security' },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {isOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 flex flex-col transition-all duration-300 ease-in-out ${
          isOpen ? (isCollapsed ? 'w-16' : 'w-64') : 'w-0'
        } lg:sticky lg:top-0 animate-slide-in overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`} // Added scrollbar classes
      >
        {(isOpen || window.innerWidth >= 1024) && (
          <div className="flex flex-col min-h-screen"> 
            <div className="py-4 px-3 border-b border-gray-200 flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-1">
                <span className={`text-xl lg:text-2xl text-orange-500 ${isCollapsed ? 'hidden' : 'block'} transition-opacity duration-200`}>Hi<span className="text-orange-500">Car</span></span>
              </Link>
              <button
                onClick={toggleCollapse}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 transform hover:scale-110"
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? <GoSidebarExpand className="text-orange-500" size={20} /> : <GoSidebarCollapse className="text-orange-500" size={20} />}
              </button>
            </div>

            <div className="p-3 space-y-2">
              <Link
                to="/home/addListcar"
                className={`flex items-center w-full gap-2 ${isCollapsed ? 'justify-center' : ''} bg-orange-500 text-white font-medium px-3 py-2 rounded-md transition-all duration-200 transform hover:scale-105 text-sm`}
              >
                <FaCar className="text-base" />
                {!isCollapsed && <span>List a Car</span>}
              </Link>

              <Link
                to="/home/ClubMembership"
                className={`flex items-center w-full gap-2 ${isCollapsed ? 'justify-center' : ''} bg-primary-950 text-white font-medium px-3 py-2 rounded-md transition-all duration-200 hover:bg-primary-900 transform hover:scale-105 text-sm`}
              >
                <FaCar className="text-base" />
                {!isCollapsed && <span>Club Membership</span>}
              </Link>
            </div>

            <nav className="flex-1">
              {menuSections.map((section, idx) => (
                <div key={idx}>
                  <p className={`text-gray-500 text-xs font-semibold px-3 py-2 ${isCollapsed ? 'hidden' : 'block'} transition-opacity duration-200`}>{section.title}</p>
                  <ul className="space-y-1">
                    {section.items
                      .filter((item) => item.showFor.includes(userType))
                      .map((item, i) => {
                        const isActive = currentPath === item.path || currentPath.startsWith(item.path);

                        if (item.isDropdown) {
                          return (
                            <li key={i}>
                              <button
                                onClick={item.label === 'Integration' ? toggleIntegrationDropdown : toggleSettingsDropdown}
                                className={`flex items-center justify-between w-full ${isCollapsed ? 'justify-center' : 'space-x-2'} px-3 py-2 rounded-md transition-all duration-200 text-sm ${
                                  isActive ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
                                } transform hover:scale-105`}
                              >
                                <div className="flex items-center">
                                  {item.icon}
                                  {!isCollapsed && <span className="ml-2">{item.label}</span>}
                                </div>
                                {!isCollapsed && (
                                  (item.label === 'Integration' ? isIntegrationDropdownOpen : isSettingsDropdownOpen) ? (
                                    <FiChevronUp size={14} />
                                  ) : (
                                    <FiChevronDown size={14} />
                                  )
                                )}
                              </button>
                              {!isCollapsed && (item.label === 'Integration' ? isIntegrationDropdownOpen : isSettingsDropdownOpen) && (
                                <ul className="ml-4 mt-1 space-y-1 border-l border-gray-200 animate-fade-in">
                                  {item.dropdownItems.map((dropdownItem, dIdx) => {
                                    const isDropdownItemActive = currentPath === dropdownItem.path || currentPath.startsWith(dropdownItem.path);
                                    return (
                                      <li key={dIdx}>
                                        {dropdownItem.isNestedDropdown ? (
                                          <>
                                            <button
                                              onClick={togglePaymentDropdown}
                                              className={`flex items-center justify-between w-full ${isCollapsed ? 'justify-center' : 'space-x-2'} px-3 py-2 rounded-md transition-all duration-200 text-xs ${
                                                isDropdownItemActive ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
                                              } transform hover:scale-105`}
                                            >
                                              <div className="flex items-center">
                                                {dropdownItem.icon}
                                                {!isCollapsed && <span className="ml-2">{dropdownItem.label}</span>}
                                              </div>
                                              {!isCollapsed && (isPaymentDropdownOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />)}
                                            </button>
                                            {!isCollapsed && isPaymentDropdownOpen && (
                                              <ul className="ml-4 mt-1 space-y-1 border-l border-gray-200 animate-fade-in">
                                                {dropdownItem.nestedDropdownItems.map((nestedItem, nIdx) => {
                                                  const isNestedItemActive = currentPath === nestedItem.path || currentPath.startsWith(nestedItem.path);
                                                  return (
                                                    <li key={nIdx}>
                                                      <Link
                                                        to={nestedItem.path}
                                                        className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'} px-3 py-2 rounded-md transition-all duration-200 text-xs ${
                                                          isNestedItemActive ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
                                                        } transform hover:scale-105`}
                                                      >
                                                        {nestedItem.icon}
                                                        {!isCollapsed && <span>{nestedItem.label}</span>}
                                                      </Link>
                                                    </li>
                                                  );
                                                })}
                                              </ul>
                                            )}
                                          </>
                                        ) : (
                                          <Link
                                            to={dropdownItem.path}
                                            className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'} px-3 py-2 rounded-md transition-all duration-200 text-xs ${
                                              isDropdownItemActive ? 'bg-orange-50 text-orange-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
                                            } transform hover:scale-105`}
                                          >
                                            {dropdownItem.icon}
                                            {!isCollapsed && <span>{dropdownItem.label}</span>}
                                          </Link>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </li>
                          );
                        }

                        return (
                          <li key={i}>
                            <Link
                              to={item.path}
                              className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'} px-3 py-2 rounded-md transition-all duration-200 text-sm ${
                                isActive ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-100'
                              } transform hover:scale-105`}
                            >
                              {item.icon}
                              {!isCollapsed && <span>{item.label}</span>}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="p-3 border-t border-gray-200">
              <button
                onClick={logout}
                className={`w-full ${isCollapsed ? 'flex items-center justify-center' : 'flex items-center space-x-2'} px-3 py-2 text-gray-600 hover:bg-gray-100 font-medium rounded-md transition-all duration-200 text-sm transform hover:scale-105`}
              >
                <FiLogOut size={18} />
                {!isCollapsed && <span>Logout</span>}
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;