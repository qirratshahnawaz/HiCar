import React, { useState } from 'react';
import { Search,Shield,Car, ChevronDown,MessageSquareDiff, X, Check } from 'lucide-react';

const ServiceRequest = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [assignedMechanic, setAssignedMechanic] = useState('');
  const [billPayer, setBillPayer] = useState('Owner');
  const [expenseReport, setExpenseReport] = useState(0);
  const [approvedRequests, setApprovedRequests] = useState(new Set());

  const serviceRequests = [
    {
      id: 1,
      name: "Jennifer Markus",
      bookingId: "BK-765435",
      carModel: "Tesla Model S",
      date: "Fri, May 23, 2025",
      time: "10:12 am",
      services: [
        { name: "Oil changing", price: 12 },
        { name: "Brake Repair", price: 18 },
        { name: "Suspension Repair", price: 10 }
      ],
      total: 40,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Daniel Scott",
      bookingId: "BK-765567",
      carModel: "Tesla Model S",
      date: "Mon, May 24, 2025",
      time: "11:12 am",
      services: [
        { name: "Oil changing", price: 50 },
        { name: "Brake Repair", price: 20 },
        { name: "Suspension Repair", price: 20 }
      ],
      total: 90,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Lucas Benjamin",
      bookingId: "BK-765578",
      carModel: "Tesla Model S",
      date: "Mon, May 24, 2025",
      time: "12:12 pm",
      services: [
        { name: "Oil changing", price: 20 },
        { name: "Brake Repair", price: 30 },
        { name: "Suspension Repair", price: 50 }
      ],
      total: 100,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const handleApproveClick = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedRequest(null);
    setAssignedMechanic('');
    setBillPayer('Owner');
    setExpenseReport(0);
  };

  const handleApproveAndAssign = () => {
    if (selectedRequest && assignedMechanic) {
      setApprovedRequests(prev => new Set([...prev, selectedRequest.id]));
      handleModalClose();
    }
  };

  const ServiceCard = ({ request }) => {
    const isApproved = approvedRequests.has(request.id);
    
    return (
      <div className="bg-white rounded-2xl shadow-lg border-0 p-6 w-full max-w-full mx-auto">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <img 
                src={request.avatar} 
                alt={request.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm" style={{display: 'none'}}>
                {request.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 text-lg leading-tight">{request.name}</h3>
              <p className="text-gray-400 text-sm mt-1">
                {request.bookingId} | {request.carModel}
              </p>
            </div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageSquareDiff className="w-5 h-5 text-gray-900" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <span className="text-gray-700 font-medium text-base">{request.date}</span>
          <span className="text-gray-500 text-base">{request.time}</span>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Services</h4>
            <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Charges</h4>
          </div>
          <div className="space-y-4">
            {request.services.map((service, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-800 font-medium text-base">{service.name}</span>
                <span className="text-gray-800 font-medium text-base">${service.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 pb-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-semibold text-lg">Total Charges</span>
            <span className="text-gray-900 font-semibold text-lg">${request.total}</span>
          </div>
        </div>

        {isApproved ? (
          <div className="bg-green-50  border border-green-200 rounded-xl p-4 flex items-center justify-center space-x-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">Request Approved</span>
          </div>
        ) : (
          <div className="flex space-x-3">
            <button className="flex-1 px-1 py-2 border-2 border-red-300 text-red-500 rounded-xl font-medium text-base hover:bg-red-50 transition-colors">
              Reject
            </button>
            <button 
              onClick={() => handleApproveClick(request)}
              className="flex-1 px-1 py-2 bg-orange-500 text-white rounded-xl font-medium text-base  transition-colors"
            >
              Approve Request
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 shadow-md">
      <div className="max-w-200xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-96">
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

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Service Requests</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {serviceRequests.map((request) => (
            <ServiceCard key={request.id} request={request} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceRequests.map((request) => (
            <ServiceCard key={`row2-${request.id}`} request={{...request, id: request.id + 100}} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Service Request</h3>
              <button 
                onClick={handleModalClose}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Car & Service Info</h4>
              <div className="bg-gray-100 rounded-lg p-3">
                <span className="text-gray-900 font-medium">
                  {selectedRequest.carModel} - Oil Changing
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Assign Mechanic</h4>
              <div className="relative">
                <select 
                  value={assignedMechanic}
                  onChange={(e) => setAssignedMechanic(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
                >
                  <option value="">Select mechanic</option>
                  <option value="John Smith">AutoPro Services</option>
                  <option value="Mike Johnson">QuickFix Auto Repair</option>
                  <option value="David Brown">FastFix Mechanics</option>
                   <option value="David Brown">CarCare experts</option>
                    <option value="David Brown">Speedy Garage</option>
                     <option value="David Brown">Other</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Who Pays the Bill?</h4>
              <div className="relative">
                <select 
                  value={billPayer}
                  onChange={(e) => setBillPayer(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
                >
                  <option value="Owner">Owner</option>
                  <option value="Company">Driver</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">Add to Expense Report?</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">$</span>
                  <input
                    type="number"
                    value={expenseReport}
                    onChange={(e) => setExpenseReport(e.target.value)}
                    className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-center"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={handleApproveAndAssign}
              disabled={!assignedMechanic}
              className="w-full px-6 py-3 bg-orange-500 text-white rounded-xl font-medium text-base hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Approve & Assign
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequest;













// import React, { useState } from 'react';
// import { Search, ChevronDown,MessageSquareDiff, X, Check } from 'lucide-react';

// const ServiceRequest = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [assignedMechanic, setAssignedMechanic] = useState('');
//   const [billPayer, setBillPayer] = useState('Owner');
//   const [expenseReport, setExpenseReport] = useState(0);
//   const [approvedRequests, setApprovedRequests] = useState(new Set());

//   const serviceRequests = [
//     {
//       id: 1,
//       name: "Jennifer Markus",
//       bookingId: "BK-765435",
//       carModel: "Tesla Model S",
//       date: "Fri, May 23, 2025",
//       time: "10:12 am",
//       services: [
//         { name: "Oil changing", price: 12 },
//         { name: "Brake Repair", price: 18 },
//         { name: "Suspension Repair", price: 10 }
//       ],
//       total: 40,
//       avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face"
//     },
//     {
//       id: 2,
//       name: "Daniel Scott",
//       bookingId: "BK-765567",
//       carModel: "Tesla Model S",
//       date: "Mon, May 24, 2025",
//       time: "11:12 am",
//       services: [
//         { name: "Oil changing", price: 50 },
//         { name: "Brake Repair", price: 20 },
//         { name: "Suspension Repair", price: 20 }
//       ],
//       total: 90,
//       avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
//     },
//     {
//       id: 3,
//       name: "Lucas Benjamin",
//       bookingId: "BK-765578",
//       carModel: "Tesla Model S",
//       date: "Mon, May 24, 2025",
//       time: "12:12 pm",
//       services: [
//         { name: "Oil changing", price: 20 },
//         { name: "Brake Repair", price: 30 },
//         { name: "Suspension Repair", price: 50 }
//       ],
//       total: 100,
//       avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
//     }
//   ];

//   const handleApproveClick = (request) => {
//     setSelectedRequest(request);
//     setShowModal(true);
//   };

//   const handleModalClose = () => {
//     setShowModal(false);
//     setSelectedRequest(null);
//     setAssignedMechanic('');
//     setBillPayer('Owner');
//     setExpenseReport(0);
//   };

//   const handleApproveAndAssign = () => {
//     if (selectedRequest && assignedMechanic) {
//       setApprovedRequests(prev => new Set([...prev, selectedRequest.id]));
//       handleModalClose();
//     }
//   };

//   const ServiceCard = ({ request }) => {
//     const isApproved = approvedRequests.has(request.id);
    
//     return (
//       <div className="bg-white rounded-2xl shadow-sm border-0 p-6 w-full max-w-full mx-auto">
        
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-3">
//             <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
//               <img 
//                 src={request.avatar} 
//                 alt={request.name}
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   e.target.nextSibling.style.display = 'flex';
//                 }}
//               />
//               <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm" style={{display: 'none'}}>
//                 {request.name.split(' ').map(n => n[0]).join('')}
//               </div>
//             </div>
//             <div className="min-w-0 flex-1">
//               <h3 className="font-semibold text-gray-900 text-lg leading-tight">{request.name}</h3>
//               <p className="text-gray-400 text-sm mt-1">
//                 {request.bookingId} | {request.carModel}
//               </p>
//             </div>
//           </div>
//           <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
//             <MessageSquareDiff className="w-5 h-5 text-gray-900" />
//           </div>
//         </div>

//         <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
//           <span className="text-gray-700 font-medium text-base">{request.date}</span>
//           <span className="text-gray-500 text-base">{request.time}</span>
//         </div>

//         <div className="mb-8">
//           <div className="flex justify-between mb-4">
//             <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Services</h4>
//             <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Charges</h4>
//           </div>
//           <div className="space-y-4">
//             {request.services.map((service, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <span className="text-gray-800 font-medium text-base">{service.name}</span>
//                 <span className="text-gray-800 font-medium text-base">${service.price}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mb-6 pb-6 border-b border-gray-100">
//           <div className="flex justify-between items-center">
//             <span className="text-gray-900 font-semibold text-lg">Total Charges</span>
//             <span className="text-gray-900 font-semibold text-lg">${request.total}</span>
//           </div>
//         </div>

//         {isApproved ? (
//           <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-center space-x-2">
//             <Check className="w-5 h-5 text-green-600" />
//             <span className="text-green-700 font-medium">Request Approved</span>
//           </div>
//         ) : (
//           <div className="flex space-x-3">
//             <button className="flex-1 px-1 py-2 border-2 border-red-300 text-red-500 rounded-xl font-medium text-base hover:bg-red-50 transition-colors">
//               Reject
//             </button>
//             <button 
//               onClick={() => handleApproveClick(request)}
//               className="flex-1 px-1 py-2 bg-orange-500 text-white rounded-xl font-medium text-base hover:bg-orange-600 transition-colors"
//             >
//               Approve Request
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search customer, car name etc"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base placeholder-gray-400 bg-white"
//               />
//             </div>
//             <div className="flex gap-4">
//               <div className="relative">
//                 <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base min-w-[140px]">
//                   <option value="">Car Type</option>
//                   <option value="tesla">Tesla</option>
//                   <option value="bmw">BMW</option>
//                 </select>
//                 <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               </div>
//               <div className="relative">
//                 <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base min-w-[120px]">
//                   <option value="">Status</option>
//                   <option value="pending">Pending</option>
//                   <option value="approved">Approved</option>
//                 </select>
//                 <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-2xl font-semibold text-gray-900">Service Requests</h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//           {serviceRequests.map((request) => (
//             <ServiceCard key={request.id} request={request} />
//           ))}
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {serviceRequests.map((request) => (
//             <ServiceCard key={`row2-${request.id}`} request={{...request, id: request.id + 100}} />
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && selectedRequest && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-semibold text-gray-900">Service Request</h3>
//               <button 
//                 onClick={handleModalClose}
//                 className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
//               >
//                 <X className="w-4 h-4 text-gray-600" />
//               </button>
//             </div>

//             <div className="mb-6">
//               <h4 className="text-sm font-medium text-gray-700 mb-3">Car & Service Info</h4>
//               <div className="bg-gray-100 rounded-lg p-3">
//                 <span className="text-gray-900 font-medium">
//                   {selectedRequest.carModel} - Oil Changing
//                 </span>
//               </div>
//             </div>

//             <div className="mb-6">
//               <h4 className="text-sm font-medium text-gray-700 mb-3">Assign Mechanic</h4>
//               <div className="relative">
//                 <select 
//                   value={assignedMechanic}
//                   onChange={(e) => setAssignedMechanic(e.target.value)}
//                   className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
//                 >
//                   <option value="">Select mechanic</option>
//                   <option value="John Smith">AutoPro Services</option>
//                   <option value="Mike Johnson">QuickFix Auto Repair</option>
//                   <option value="David Brown">FastFix Mechanics</option>
//                    <option value="David Brown">CarCare experts</option>
//                     <option value="David Brown">Speedy Garage</option>
//                      <option value="David Brown">Other</option>
//                 </select>
//                 <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               </div>
//             </div>

//             <div className="mb-6">
//               <h4 className="text-sm font-medium text-gray-700 mb-3">Who Pays the Bill?</h4>
//               <div className="relative">
//                 <select 
//                   value={billPayer}
//                   onChange={(e) => setBillPayer(e.target.value)}
//                   className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
//                 >
//                   <option value="Owner">Owner</option>
//                   <option value="Company">Driver</option>
//                 </select>
//                 <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//               </div>
//             </div>

//             <div className="mb-8">
//               <div className="flex items-center justify-between">
//                 <h4 className="text-sm font-medium text-gray-700">Add to Expense Report?</h4>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-gray-500">$</span>
//                   <input
//                     type="number"
//                     value={expenseReport}
//                     onChange={(e) => setExpenseReport(e.target.value)}
//                     className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-center"
//                   />
//                 </div>
//               </div>
//             </div>

//             <button 
//               onClick={handleApproveAndAssign}
//               disabled={!assignedMechanic}
//               className="w-full px-6 py-3 bg-orange-500 text-white rounded-xl font-medium text-base hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
//             >
//               Approve & Assign
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ServiceRequest;