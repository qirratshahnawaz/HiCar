import React from 'react';
import { ChevronLeft, Bell, Wrench, FileText, AlertTriangle, Car, Search } from 'lucide-react';

const NotificationItem = ({ iconType, title, description, time, buttonText, onButtonClick }) => {
  const getIcon = () => {
    switch (iconType) {
      case 'bell':
        return <Bell size={20} className="text-orange-500" />;
      case 'wrench':
        return <Wrench size={20} className="text-orange-500" />;
      case 'file':
        return <FileText size={20} className="text-orange-500" />;
      case 'alert':
        return <AlertTriangle size={20} className="text-orange-500" />;
      case 'car':
        return <Car size={20} className="text-orange-500" />;
      default:
        return <FileText size={20} className="text-orange-500" />; // Default icon
    }
  };

  return (
    <div className="flex items-start p-4 bg-white rounded-lg shadow-sm border border-gray-100 mb-3 sm:mb-4">
      <div className="flex-shrink-0 mr-4 p-2 bg-orange-50 rounded-full">
        {getIcon()}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{title}</h3>
          <span className="text-sm text-gray-500 ml-4 flex-shrink-0">{time}</span>
        </div>
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{description}</p>
        {buttonText && (
          <button
            onClick={onButtonClick}
            className="px-4 py-2 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

const Notifications = () => {
  const notifications = {
    new: [
      {
        id: 1,
        iconType: 'bell',
        title: 'New Booking Request',
        description: 'You have a new booking request for your Tesla Model 3. The request expires in 24 hours.',
        time: 'Just now',
        buttonText: 'View Booking',
      },
      {
        id: 2,
        iconType: 'wrench',
        title: 'New Service Request',
        description: 'Driver John has requested an oil change.',
        time: '1h ago',
        buttonText: 'View Request',
      },
      {
        id: 3,
        iconType: 'file',
        title: 'Payment Received',
        description: 'You received payment from driver Sarah.',
        time: '2h ago',
        buttonText: null, // No button for this notification
      },
    ],
    earlier: [
      {
        id: 4,
        iconType: 'file',
        title: 'Document Verified',
        description: 'All documents successfully verified.',
        time: '6 days ago',
        buttonText: null,
      },
      {
        id: 5,
        iconType: 'alert',
        title: 'Fine Assigned',
        description: 'A fine was added to booking id: BK-765435',
        time: '8 days ago',
        buttonText: null,
      },
      {
        id: 6,
        iconType: 'alert',
        title: 'Rego Expiring Soon',
        description: 'Your car Tesla Model 3 (ABC123) registration expires in 7 days. Please renew before April 10 to avoid penalties.',
        time: '1 week ago',
        buttonText: null,
      },
      {
        id: 7,
        iconType: 'car',
        title: 'New Car Listed',
        description: 'You listed a new car for rental.',
        time: '2 weeks ago',
        buttonText: null,
      },
    ],
  };

  const handleButtonClick = (notificationId, buttonText) => {
    console.log(`Button "${buttonText}" clicked for notification ID: ${notificationId}`);

  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">

      <div className="flex items-center mb-6">
        <button className="text-gray-600 hover:text-gray-800 mr-3">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">All Notifications</h1>
      </div>
      <div className="relative w-full sm:w-96">
        <input
          type="text"
          placeholder="Search customer, car name etc"
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
        />
        <Search className="absolute left-3 top-2.5 w-4 sm:w-5 h-4 sm:h-5 text-orange-500" aria-hidden="true" />
      </div>

      <h2 className="text-lg font-semibold text-gray-800 mb-4 mt-6">New</h2>
      <div className="space-y-3 sm:space-y-4 shadow-md">
        {notifications.new.map((notification) => (
          <NotificationItem
            key={notification.id}
            iconType={notification.iconType}
            title={notification.title}
            description={notification.description}
            time={notification.time}
            buttonText={notification.buttonText}
            onButtonClick={() => handleButtonClick(notification.id, notification.buttonText)}
          />
        ))}
      </div>

      <h2 className="text-lg font-semibold text-gray-800  mb-4 mt-8">Earlier</h2>
      <div className="space-y-3 sm:space-y-4 shadow-md">
        {notifications.earlier.map((notification) => (
          <NotificationItem
            key={notification.id}
            iconType={notification.iconType}
            title={notification.title}
            description={notification.description}
            time={notification.time}
            buttonText={notification.buttonText}
            onButtonClick={() => handleButtonClick(notification.id, notification.buttonText)}
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
