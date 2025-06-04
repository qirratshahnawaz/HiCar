import { useState } from 'react';
import { FiSearch, FiMoreVertical, FiSend, FiPaperclip, FiSmile, FiMenu } from 'react-icons/fi';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConversations, setShowConversations] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const toggleConversations = () => setShowConversations((prev) => !prev);

  const conversations = [
    { id: 1, person: { name: 'Jennifer Markus', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', online: true }, lastMessage: 'Please let me know your pickup time, and I’ll have the car ready for you.', time: 'Today • 08:56 PM', unread: 0 },
    { id: 2, person: { name: 'Ava Marie', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', online: true }, lastMessage: 'Please let me know your pickup time, and I’ll have the car ready for you.', time: 'Today • 08:30 PM', unread: 3 },
    { id: 3, person: { name: 'Emma Rose', avatar: 'https://randomuser.me/api/portraits/women/66.jpg', online: false }, lastMessage: 'Please let me know your pickup time, and I’ll have the car ready for you.', time: 'Today • 08:30 PM', unread: 0 },
    { id: 4, person: { name: 'Olivia Jane', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', online: true }, lastMessage: 'Please let me know your pickup time, and I’ll have the car ready for you.', time: 'Today • 08:30 PM', unread: 0 },
    { id: 5, person: { name: 'Daniel Scott', avatar: 'https://randomuser.me/api/portraits/men/40.jpg', online: false }, lastMessage: 'Please let me know your pickup time, and I’ll have the car ready for you.', time: 'Today • 08:30 PM', unread: 0 },
    { id: 6, person: { name: 'Lily Anne', avatar: 'https://randomuser.me/api/portraits/women/33.jpg', online: true }, lastMessage: 'Please let me know your pickup time, and I’ll have the car ready for you.', time: 'Today • 08:30 PM', unread: 0 },
    { id: 7, person: { name: 'Lucas Benjamin', avatar: 'https://randomuser.me/api/portraits/men/40.jpg', online: false }, lastMessage: 'Please let me know your pickup time, and I’ll have the car ready for you.', time: 'Today • 08:30 PM', unread: 0 },
  ];

  const chatMessages = [
    { id: 1, sender: 'Jennifer Markus', text: "Hey Alexander! Thanks for reaching out. I’m thinking about renting your Mazda CX-5 on March 28. Does that work for you?", time: '08:57 PM', isMine: false },
    { id: 2, sender: 'Me', text: "Hi Jennifer! Thanks for booking my Mazda CX-5 from March 28 to April 2. What time would you like to pick it up?", time: '08:56 PM', isMine: true },
    { id: 3, sender: 'Jennifer Markus', text: "A phone holder would be great, thanks! Also, where should we meet for pickup?", time: '09:03 PM', isMine: false },
    { id: 4, sender: 'Me', text: "That works perfectly! I’ll have the car cleaned and ready. Do you need any add ons like a phone holder or child seat?", time: '09:00 PM', isMine: true },
    { id: 5, sender: 'Jennifer Markus', text: "Let’s meet at Sydney Central Station parking lot, Level 3. I’ll send my live location before you arrive.", time: '09:03 PM', isMine: false },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      setShowConversations(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col font-sans">
      <div className="flex flex-col md:flex-row h-full">
        {/* Conversations List */}
        <div
          className={`w-full md:w-1/3 bg-white border-r border-gray-200 h-full flex flex-col md:block ${
            showConversations ? 'block' : 'hidden'
          } absolute md:static z-20`}
        >
          <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                type="text"
                className="bg-gray-100 w-full pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                placeholder="Search or start a new chat"
              />
            </div>
            <button
              className="md:hidden text-gray-600 hover:text-gray-800 ml-2"
              onClick={toggleConversations}
            >
              <FiMenu size={20} />
            </button>
          </div>

          <div className="overflow-y-auto flex-1">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100 flex items-start space-x-3 hover:bg-gray-50 ${
                  activeChat === convo.id ? 'bg-orange-50' : ''
                }`}
                onClick={() => {
                  setActiveChat(convo.id);
                  setShowConversations(false);
                }}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={convo.person.avatar}
                    alt={convo.person.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                  />
                  {convo.person.online && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{convo.person.name}</h3>
                    <span className="text-xs text-gray-500">{convo.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate mt-1">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <div className="flex-shrink-0 ml-2">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-orange-500 text-xs font-medium text-white">
                      {convo.unread}
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div
          className={`w-full md:w-2/3 h-full flex flex-col ${
            showConversations ? 'hidden' : 'block'
          } md:block bg-white`}
        >
          {/* Chat Header */}
          <div className="px-3 sm:px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button
                className="md:hidden text-gray-600 hover:text-gray-800 mr-2"
                onClick={toggleConversations}
              >
                <FiMenu size={20} />
              </button>
              <img
                src={conversations.find((c) => c.id === activeChat)?.person.avatar}
                alt={conversations.find((c) => c.id === activeChat)?.person.name}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              />
              <div>
                <h2 className="text-sm font-medium text-gray-900">
                  {conversations.find((c) => c.id === activeChat)?.person.name}
                </h2>
                <p className="text-xs text-gray-500">Booking Id: BK-765435 • Car Name: Tesla Model S</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-600 hover:text-gray-800 flex items-center gap-2"
              >
                <FiSearch size={20} />
                <FiMoreVertical size={20} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Profile</button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mute Notifications</button>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100">Delete Chat</button>
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
            <div className="space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex max-w-[70%] sm:max-w-[60%]">
                    {!msg.isMine && (
                      <img
                        src={conversations.find((c) => c.id === activeChat)?.person.avatar}
                        alt={msg.sender}
                        className="h-6 w-6 sm:h-8 sm:w-8 rounded-full mr-2 mt-1"
                      />
                    )}
                    <div>
                      <div
                        className={`rounded-lg px-3 py-2 ${
                          msg.isMine
                            ? 'bg-orange-500 rounded-xl text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-xs sm:text-sm">{msg.text}</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">{msg.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-3 sm:p-4">
            <div className="flex items-end">
              <button className="text-gray-400 hover:text-gray-600 mr-2">
                <FiPaperclip size={18} />
              </button>
              <div className="flex-1 relative">
                <textarea
                  placeholder="Type your message..."
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-xs sm:text-sm"
                  rows="1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="absolute right-2 bottom-2 text-gray-400 hover:text-gray-600">
                  <FiSmile size={18} />
                </button>
              </div>
              <button
                className="ml-2 bg-orange-500 text-white rounded-full p-2"
                onClick={handleSendMessage}
              >
                <FiSend size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;