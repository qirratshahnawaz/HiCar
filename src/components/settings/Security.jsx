import { useState } from 'react';
import { FiArrowLeft, FiEye, FiEyeOff, FiMoreVertical } from 'react-icons/fi';

const Security = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const activeSessions = [
    {
      id: '67543456',
      device: 'Desktop',
      location: 'Sydney, Australia',
      browser: 'Chrome',
      lastUsed: 'used right now'
    },
    {
      id: '78786B5H',
      device: 'Desktop',
      location: 'Sydney, Australia',
      browser: 'Chrome',
      lastUsed: '08/11/2024'
    },
    {
      id: '78786B5H2',
      device: 'Desktop',
      location: 'Sydney, Australia',
      browser: 'Chrome',
      lastUsed: '02/30/2024'
    }
  ];

  const handleDropdownToggle = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleLogout = (id) => {
    console.log("Logging out device:", id);
    setOpenDropdownId(null);
  };

  const handleRemoveDevice = (id) => {
    console.log("Removing device:", id);
    setOpenDropdownId(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <FiArrowLeft className="text-gray-600" />
        <h2 className="text-xl font-semibold">Security</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">User Authentication</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sign in Email</span>
              <span className="text-gray-800">alexanderjames@gmail.com</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Two step verification</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={twoFactor}
                  onChange={() => setTwoFactor(!twoFactor)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-Enter Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Total Active Logins ({activeSessions.length})</h3>
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg relative">
                <div>
                  <p className="text-sm text-gray-800">
                    {session.device} - {session.id} {session.location}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session.browser} - {session.lastUsed}
                  </p>
                </div>

                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(session.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FiMoreVertical />
                  </button>

                  {openDropdownId === session.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-10">
                      <button
                        onClick={() => handleLogout(session.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700"
                      >
                        Logout
                      </button>
                      <button
                        onClick={() => handleRemoveDevice(session.id)}
                        className="block w-full text-left px-4 py-2 text-sm text-orange-500 "
                      >
                        Remove device
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button className="text-orange-500 text-sm">
              Remove device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
