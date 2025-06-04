import { useState } from 'react';
import { FiEdit2, FiMail, FiPhone, FiMapPin, FiArrowLeft } from 'react-icons/fi';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: 'Alexander James',
    email: 'alexanderjames@gmail.com',
    contact: '(123) 345-678',
    address: '7 Collins Street, Melbourne, VIC 3000'
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">My Profile</h2>
        </div>
        <button className="text-gray-600 hover:text-gray-800">
          Reset Changes
        </button>
      </div>

      <div className="relative w-32 h-32 mx-auto">
        <img
          src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
        <button className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600">
          <FiEdit2 size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <FiEdit2 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <FiMail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
          <div className="relative">
            <input
              type="tel"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <FiPhone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <div className="relative">
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <FiMapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
          Update Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;