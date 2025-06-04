import React, { useState } from 'react';
import {
  ChevronDown,
  MoreHorizontal,
  Star,
  X,
  Check,
  Car,
  DollarSign,
  Calendar,
  Search,
  FileText,
  Edit,
  Trash2,
  Eye,
  User,
  Phone,
  Mail,
  MapPin,
  Users,
  Settings,
  Fuel,
  Shield,
  ChevronLeft,
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import tesla from "../../public/tesla.jpeg";
import avater from "../../public/ava1.png";
import car1 from "../../public/car1.jpg"
import fortuner from "../../public/car1.jpg"

const CarDetail = ({ onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Details');

  const carImages = [
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  ];

  const maintenanceHistory = [
    { task: 'Oil Change', date: 'Sep 02, 2024', status: 'Complete' },
    { task: 'Tire Replacement', date: 'Sep 02, 2024', status: 'Complete' },
    { task: 'Tire Replacement', date: 'Sep 02, 2024', status: 'Complete' },
    { task: 'Tire Replacement', date: 'May 30, 2024', status: 'Upcoming' },
  ];

  const reviews = [
    {
      id: 1,
      name: 'JackD',
      date: 'May 15, 2025',
      rating: 4.0,
      title: 'Smooth Experience',
      comment: 'Rented a car for a weekend trip and couldn\'t be happier. The booking process was easy, the car was clean and in great condition, and pickup was quick.',
      price: '$980',
    },
    {
      id: 2,
      name: 'JackD',
      date: 'May 15, 2025',
      rating: 4.0,
      title: 'Smooth Experience',
      comment: 'Rented a car for a weekend trip and couldn\'t be happier. The booking process was easy, the car was clean and in great condition, and pickup was quick.',
      price: '$980',
    },
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? carImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === carImages.length - 1 ? 0 : prev + 1));
  };

  const tabs = ['Details', 'History', 'Rating'];

  return (
    <div className="min-h-screen bg-white">

      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600"
        >
          <ChevronLeft className="w-6 h-6 mr-1" />
          <span className="text-2xl font-bold text-black">View Detail</span>
        </button>
        <button className="text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="relative">
        <img
          src={carImages[currentImageIndex]}
          alt="BMW i7"
          className="w-full h-80 object-cover"
        />

        <button
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carImages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-orange-500' : 'bg-gray-300'
                }`}
            />
          ))}
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            Rent a Car/Can to Buy
          </span>
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-1xl font-serif font-medium border-b-2 ${activeTab === tab
              ? 'border-orange-500 text-orange-500'
              : 'border-transparent text-black-900'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4">
        {activeTab === 'Details' && (
          <div className="space-y-6">

            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">BMW i7</h1>
                  <p className="text-sm text-gray-500">Sedan . 2024</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-orange-500 text-orange-500 mr-1" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>

              <div className="bg-orange-50 px-3 py-1 rounded-full inline-block mb-4">
                <span className="text-orange-500 text-1xl font-medium">Verified Listing/Crew</span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially...
                <span className="text-orange-500">Show More</span>
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif  font-bold text-gray-900 mb-3">Rental Detail</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-sans font-medium">Car Registration Number</span>
                  <span className="text-sm text-gray-900">ABC123</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-sans font-medium">Car Brand</span>
                  <span className="text-sm text-gray-900">BMW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-sans font-medium">Car Model</span>
                  <span className="text-sm text-gray-900">BMW i7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-sans font-medium">Transmission</span>
                  <span className="text-sm text-gray-900">Automatic</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-sans font-medium">Mileage</span>
                  <span className="text-sm text-gray-900">1,100 Miles</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-sans font-medium">Fuel Type</span>
                  <span className="text-sm text-gray-900">Electric</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-sans font-medium">Color</span>
                  <span className="text-sm text-gray-900">Blue</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-serif text-gray-900 mb-3 mt-2 ">Car Features</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-orange-500 text-white  text-xs font-medium px-4 py-4 rounded-full">
                  Automatic Transmission
                </span>
                <span className="bg-orange-500 text-white text-xs font-medium px-4 py-4 rounded-full">
                  Electric/Hybrid Vehicle
                </span>
                <span className="bg-orange-500 text-white text-xs font-medium px-4 py-4 rounded-full">
                  Cruise Control
                </span>
                <span className="bg-orange-500 text-white text-xs font-medium px-4 py-4 rounded-full">
                  Parking Sensors
                </span>
                <span className="bg-orange-500 text-white text-xs font-medium px-4 py-4 rounded-full">
                  Late Return Policy
                </span>
                <span className="bg-orange-500 text-white text-xs font-medium px-4 py-4 rounded-full">
                  Insurance Requirements
                </span>
              </div>
            </div>

            <div className="bg-orange-100 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                🚗 <strong className='text-orange-500'>State Restriction:</strong> This car can only be driven within California. Crossing state borders is not permitted.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Availability Status</span>
                  <span className="text-sm text-green-600 font-medium">🟢 Active (10 days left)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Posting Status</span>
                  <span className="text-sm text-green-600 font-medium">🟢 Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">All Documents</span>
                  <span className="text-sm text-green-600 font-medium">🟢 Uploaded</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">GPS Tracking Device</span>
                  <span className="text-sm text-green-600 font-medium">🟢 Enabled</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'History' && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-serif font-medium text-gray-800 mb-4">Maintenance History</h3>
            <div className="space-y-3">
              {maintenanceHistory.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    {item.status === 'Complete' ? (
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.task}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'Complete'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                      }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Rating' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-orange-50 p-4 border border-orange-200 shadow-md rounded-lg">
                <p className="text-xs text-black-900 mb-1">Total Trip</p>
                <p className="text-xl font-semibold text-gray-900">10</p>
              </div>
              <div className="bg-orange-50 p-4 border border-orange-200  shadow-md rounded-lg">
                <p className="text-xs text-black-900 mb-1">Earnings</p>
                <p className="text-xl font-semibold text-gray-900">$980</p>
              </div>
              <div className="bg-orange-50 p-4 border border-orange-200  shadow-md  rounded-lg">
                <p className="text-xs text-black-900 mb-1">Rating</p>
                <div className="flex items-center justify-center">
                  <p className="text-xl font-semibold text-gray-900 mr-1">4.8</p>
                  <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-4 font-serif">Reviews</h3>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white border border-gray-200 shadow-md rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3 ">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white mr-3">
                          <span className="text-sm font-medium">{review.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{review.name}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">{review.price}</p>
                        <div className="flex items-center mt-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(review.rating) ? 'fill-orange-500 text-orange-500' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="ml-1 text-xs text-gray-600">{review.rating}</span>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-sm font-medium text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{review.comment}</p>

                    <div className="w-40 h-30 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={car1}
                        alt="Car interior"
                        className="w-40 h-30 "
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Listings = () => {
  const [currentPage, setCurrentPage] = useState('cars');
  const [selectedCar, setSelectedCar] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showOfferAccepted, setShowOfferAccepted] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showOfferDeclined, setShowOfferDeclined] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [message, setMessage] = useState('');
  const [rejectReason, setRejectReason] = useState('');

  const cars = [
    {
      id: 1,
      name: 'BMW i7',
      year: 2024,
      price: 650,
      fuel: 'Electric',
      transmission: 'Automatic',
      seats: 4,
      image: tesla,
    },
    {
      id: 2,
      name: 'Tesla Model S',
      year: 2024,
      price: 650,
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 4,
      image: fortuner
    },
    {
      id: 3,
      name: 'Tesla Model S',
      year: 2024,
      price: 650,
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 4,
      image: tesla
    },
    {
      id: 4,
      name: 'Tesla Model S',
      year: 2024,
      price: 650,
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 4,
      image: fortuner
    },
    {
      id: 5,
      name: 'Tesla Model S',
      year: 2024,
      price: 650,
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 4,
      image: tesla
    },
    {
      id: 6,
      name: 'Tesla Model S',
      year: 2024,
      price: 650,
      fuel: 'Petrol',
      transmission: 'Automatic',
      seats: 4,
      image: fortuner
    }
  ];

  const offers = [
    {
      id: 1,
      name: 'Jennifer Markus',
      date: 'Mar 25, 2025',
      price: 200,
      rating: 4.5,
      avatar: avater
    },
    {
      id: 2,
      name: 'David Warner',
      date: 'Mar 25, 2025',
      price: 250,
      rating: 4.0,
      avatar: avater
    },
    {
      id: 3,
      name: 'Olivia Thomas',
      date: 'Mar 25, 2025',
      price: 270,
      rating: 4.8,
      avatar: avater
    },
    {
      id: 4,
      name: 'Ethan Rogers',
      date: 'Mar 25, 2025',
      price: 300,
      rating: 4.2,
      avatar: avater
    },
    {
      id: 5,
      name: 'Sophie Miller',
      date: 'Mar 25, 2025',
      price: 300,
      rating: 3.8,
      avatar: avater
    },
    {
      id: 6,
      name: 'Sophie Miller',
      date: 'Mar 25, 2025',
      price: 350,
      rating: 4.0,
      avatar: avater
    },
    {
      id: 7,
      name: 'Sophie Miller',
      date: 'Mar 25, 2025',
      price: 350,
      rating: 4.6,
      avatar: avater
    }
  ];

  const driverProfile = {
    name: 'Jennifer Markus',
    rating: 4.5,
    avatar: avater,
    rentalDuration: '3 Months',
    offeredPrice: '$200/Week',
    offeredDate: 'Mar 25, 2025',
    fullName: 'Jennifer Markus',
    age: 29,
    phone: '123-456-7890',
    email: 'jennifer@example.com',
    preferredCommunication: 'Phone',
    location: 'Sydney, Australia',
    preferredCarType: 'Luxury',
    specialRequirements: 'Automatic Transmission',
    yearsOfDriving: 8,
    license: 'XYZ-12345',
    drivingHistory: 'Clean Record',
    backgroundCheck: 'Passed',
    rentalHistory: [
      {
        carName: 'Toyota Corolla',
        duration: '3 Months',
        startDate: 'Jan 01, 2024',
        endDate: 'Mar 01, 2024',
        tollsPaid: 'GPS Tracker',
        finesIncurred: '$50',
        rating: 4.8
      },
      {
        carName: 'Ford Focus',
        duration: '2 Weeks',
        startDate: 'Mar 01, 2023',
        endDate: 'Mar 24, 2024',
        tollsPaid: 'None',
        finesIncurred: '$0',
        rating: 4.5
      },
      {
        carName: 'Nissan Altima',
        duration: '6 Months',
        startDate: 'Aug 01, 2023',
        endDate: 'Feb 01, 2024',
        tollsPaid: 'Dashcam',
        finesIncurred: '$100',
        rating: 4.3
      },
      {
        carName: 'Toyota Corolla',
        duration: '3 Months',
        startDate: 'Jan 01, 2024',
        endDate: 'Mar 01, 2024',
        tollsPaid: 'GPS Tracker',
        finesIncurred: '$50',
        rating: 4.8
      }
    ]
  };

  const handleDropdownClick = (carId, action) => {
    setShowDropdown(null);
    const car = cars.find(c => c.id === carId);
    if (action === 'detail') {
      setSelectedCar(car);
      setCurrentPage('car-detail');
    } else if (action === 'update') {
      // Handle update
    } else if (action === 'remove') {
      setSelectedCar(carId);
      setShowRemoveModal(true);
    } else if (action === 'offers') {
      setSelectedCar(carId);
      setCurrentPage('offers');
    }
  };

  const handleRemoveCar = () => {
    setShowRemoveModal(false);
    setShowRemoveSuccess(true);
  };

  const handleAcceptOffer = (offer) => {
    setSelectedOffer(offer);
    setShowAcceptModal(true);
  };

  const handleRejectOffer = (offer) => {
    setSelectedOffer(offer);
    setShowRejectModal(true);
  };

  const handleOfferAccept = () => {
    setShowAcceptModal(false);
    setShowOfferAccepted(true);
  };

  const handleOfferReject = () => {
    setShowRejectModal(false);
    setShowOfferDeclined(true);
  };

  const handleDriverProfile = (offer) => {
    setSelectedDriver(offer);
    setCurrentPage('driver-profile');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500 inline-block mr-1" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-orange-500 text-orange-500 inline-block mr-1" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
    }
    return (
      <div className="flex items-center justify-center">
        {stars}
        <span className="text-gray-900 ml-1 text-sm sm:text-base">{rating}</span>
      </div>
    );
  };

  if (currentPage === 'car-detail' && selectedCar) {
    return <CarDetail car={selectedCar} onBack={() => setCurrentPage('cars')} />;
  }

  if (currentPage === 'offers') {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        <div className="max-w-200xl mx-auto">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <button className="text-black text-2xl font-bold hover:text-gray-800 flex items-center">
                <ChevronLeft  onClick={() => setCurrentPage('cars')} className="w-7 h-7 mr-1" />
                View Offers
              </button>
            </div>

            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">
                Tesla Model S
              </h1>

              <button className="text-gray-600 hover:text-gray-800 flex items-center border border-gray-300 rounded-md px-3 py-2">
                <Settings className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <img
                      src={offer.avatar}
                      alt={offer.name}
                      className="w-8 sm:w-10 h-8 sm:h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base">{offer.name}</h3>
                      {renderStars(offer.rating)}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                    <span className="text-sm text-gray-600">{offer.date}</span>
                    <span className="text-base sm:text-lg font-semibold text-gray-900">
                      ${offer.price}<span className="text-sm text-gray-600">/Week</span>
                    </span>
                    <button
                      onClick={() => handleDriverProfile(offer)}
                      className="text-orange-500 text-sm font-medium flex items-center"
                    >
                      <User className="w-4 h-4 mr-1" />
                      Driver Profile
                    </button>
                    <button
                      onClick={() => handleRejectOffer(offer)}
                      className="px-4 py-2 border border-orange-500 text-orange-500 rounded-md hover:bg-red-50 text-sm w-full sm:w-auto"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAcceptOffer(offer)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm w-full sm:w-auto"
                    >
                      Accept
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showAcceptModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md shadow-lg">
              <div className="flex items-center justify-between mb-4 sm:mb-6 border-b pb-2">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Accept Offer</h2>
                <button
                  onClick={() => setShowAcceptModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                <img
                  src={selectedOffer?.avatar}
                  alt={selectedOffer?.name}
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{selectedOffer?.name}</h3>
                  {renderStars(selectedOffer?.rating || 0)}
                </div>
              </div>

              <div className="space-y-4 mb-4 sm:mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 text-orange-500 mr-2" />
                    Offer Amount
                  </span>
                  <span className="font-medium text-gray-900">${selectedOffer?.price}/Week</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 text-orange-500 mr-2" />
                    Request Date
                  </span>
                  <span className="font-medium text-gray-900">Apr 10, 2025 | 10:00 AM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-gray-600">
                    <Car className="w-4 h-4 text-orange-500 mr-2" />
                    Vehicle
                  </span>
                  <span className="font-medium text-gray-900">Tesla Model S</span>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a message (optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a custom message..."
                  className="w-full p-3 border border-gray-300 rounded-md resize-none h-20 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="mb-4 sm:mb-6 text-sm text-gray-600 space-y-2">
                <p>Great! Your offer is accepted.</p>
                <p>Deal! Your rental request is approved.</p>
                <p>Accepted! Contact me for key pickup details.</p>
              </div>
              <button
                onClick={handleOfferAccept}
                className="w-full bg-orange-500 text-white py-2 sm:py-3 rounded-md hover:bg-orange-600 font-medium text-sm"
              >
                Accept Offer
              </button>
            </div>
          </div>
        )}

        {showOfferAccepted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 sm:w-8 h-6 sm:h-8 text-orange-500" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold mb-2">Offer Accepted!</h2>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">This driver will be notified of your acceptance.</p>
              <p className="text-sm text-gray-600 mb-4 sm:mb-6">
                <span className="font-medium">Your Message:</span><br />
                Great! Your offer is accepted.
              </p>
              <button
                onClick={() => setShowOfferAccepted(false)}
                className="w-full bg-orange-500 text-white py-2 sm:py-3 rounded-md hover:bg-orange-600 font-medium"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {showRejectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md shadow-xl">
              <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Reject Offer</h2>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-4 sm:w-5 h-4 sm:h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                <img
                  src={selectedOffer?.avatar}
                  alt={selectedOffer?.name}
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full object-cover border-2 border-red-100"
                />
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-gray-900">{selectedOffer?.name}</h3>
                  {renderStars(selectedOffer?.rating || 0)}
                </div>
              </div>

              <div className="space-y-4 mb-4 sm:mb-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 text-red-500 mr-2" />
                    Offer Amount
                  </span>
                  <span className="font-medium text-gray-900">${selectedOffer?.price}/Week</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 text-red-500 mr-2" />
                    Request Date
                  </span>
                  <span className="font-medium text-gray-900">Apr 10, 2025 | 10:00 AM</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center text-gray-600">
                    <Car className="w-4 h-4 text-red-500 mr-2" />
                    Vehicle
                  </span>
                  <span className="font-medium text-gray-900">Tesla Model S</span>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provide a reason (optional)
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Write a custom message..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                />
              </div>

              <div className="mb-4 sm:mb-6 text-sm text-gray-600 space-y-2">
                <p className="cursor-pointer hover:text-red-500 transition-colors">
                  Sorry, I need a higher rate.
                </p>
                <p className="cursor-pointer hover:text-red-500 transition-colors">
                  I cannot accept this offer at the moment.
                </p>
                <p className="cursor-pointer hover:text-red-500 transition-colors">
                  This rate is below my minimum, please consider a higher offer.
                </p>
              </div>

              <button
                onClick={handleOfferReject}
                className="w-full bg-red-500 text-white py-2 sm:py-3 rounded-lg hover:bg-red-600 font-medium text-sm transition-colors"
              >
                Reject Offer
              </button>
            </div>
          </div>
        )}

        {showOfferDeclined && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-6 sm:w-8 h-6 sm:h-8 text-red-500" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold mb-2">Offer Declined!</h2>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">This driver will be notified that you declined their offer.</p>
              <p className="text-sm text-gray-600 mb-4 sm:mb-6">
                <span className="font-medium">Your Message:</span><br />
                I cannot accept this offer at the moment.
              </p>
              <button
                onClick={() => setShowOfferDeclined(false)}
                className="w-full bg-red-500 text-white py-2 sm:py-3 rounded-md hover:bg-red-600 font-medium"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentPage === 'driver-profile') {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 ">
        <div className="max-w-200xl mx-auto shadow-md">
          <div className="flex items-center mb-4 sm:mb-6">
           <button className="text-black text-1xl font-bold hover:text-gray-800 flex items-center">
                <ChevronLeft  onClick={() => setCurrentPage('cars')} className="w-7 h-7 mr-1" />
                View Offers
              </button>
            <span className="text-gray-800 text-lg sm:text-base ml-2">Driver Profile</span>
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 sm:p-6 text-center border-b">
              <img
                src={driverProfile.avatar}
                alt={driverProfile.name}
                className="w-20 sm:w-24 h-20 sm:h-24 rounded-full object-cover mx-auto mb-4"
              />
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">{driverProfile.name}</h1>
              {renderStars(driverProfile.rating)}
              <div className="flex justify-center space-x-4 mt-4">
                <button className="px-4 sm:px-6 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 text-sm sm:text-base">
                  Reject
                </button>
                <button className="px-4 sm:px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm sm:text-base">
                  Accept
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 bg-gray-100 p-2 rounded text-sm sm:text-base">Offer Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Rental Duration:</span>
                      <span className="text-gray-900">{driverProfile.rentalDuration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <DollarSign className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Offered Price:</span>
                      <span className="text-gray-900">{driverProfile.offeredPrice}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Offered Date:</span>
                      <span className="text-gray-900">{driverProfile.offeredDate}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 bg-gray-100 p-2 rounded text-sm sm:text-base">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <User className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Full Name:</span>
                      <span className="text-gray-900">{driverProfile.fullName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <User className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Age:</span>
                      <span className="text-gray-900">{driverProfile.age}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 bg-gray-100 p-2 rounded text-sm sm:text-base">Background Check</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">License:</span>
                      <span className="text-gray-900">{driverProfile.license}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Background Check:</span>
                      <span className="text-green-600">{driverProfile.backgroundCheck}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 bg-gray-100 p-2 rounded text-sm sm:text-base">Vehicle Preferences</h3>
                  <div className="space-y-2 text-sm ">
                    <div className="flex justify-between  items-center">
                      <Car className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Preferred Car Type:</span>
                      <span className="text-gray-900">{driverProfile.preferredCarType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Settings className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Special Requirements:</span>
                      <span className="text-gray-900">{driverProfile.specialRequirements}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 bg-gray-100 p-2 rounded text-sm sm:text-base">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Phone:</span>
                      <span className="text-gray-900">{driverProfile.phone}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Email:</span>
                      <span className="text-gray-900">{driverProfile.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Preferred Communication:</span>
                      <span className="text-gray-900">{driverProfile.preferredCommunication}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 bg-gray-100 p-2 rounded text-sm sm:text-base">Location</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Location:</span>
                      <span className="text-gray-900">{driverProfile.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 bg-gray-100 p-2 rounded text-sm sm:text-base">Driver's Experience</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <Car className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Years of Driving:</span>
                      <span className="text-gray-900">{driverProfile.yearsOfDriving} years</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">License:</span>
                      <span className="text-gray-900">{driverProfile.license}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                      <span className="text-gray-600">Driving History:</span>
                      <span className="text-green-600">{driverProfile.drivingHistory}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-4 bg-gray-100 p-2 rounded text-sm sm:text-base">Rental History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-2 text-gray-600 font-medium">Car Name</th>
                      <th className="pb-2 text-gray-600 font-medium hidden sm:table-cell">Rental Duration</th>
                      <th className="pb-2 text-gray-600 font-medium hidden md:table-cell">Start Date</th>
                      <th className="pb-2 text-gray-600 font-medium hidden md:table-cell">End Date</th>
                      <th className="pb-2 text-gray-600 font-medium hidden lg:table-cell">Tolls Paid</th>
                      <th className="pb-2 text-gray-600 font-medium hidden lg:table-cell">Fines Incurred</th>
                      <th className="pb-2 text-gray-600 font-medium">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {driverProfile.rentalHistory.map((rental, index) => (
                      <tr key={index} className="border-b flex flex-col sm:table-row">
                        <td className="py-2 sm:py-3 text-gray-900">{rental.carName}</td>
                        <td className="py-2 sm:py-3 text-gray-600 hidden sm:table-cell">{rental.duration}</td>
                        <td className="py-2 sm:py-3 text-gray-600 hidden md:table-cell">{rental.startDate}</td>
                        <td className="py-2 sm:py-3 text-gray-600 hidden md:table-cell">{rental.endDate}</td>
                        <td className="py-2 sm:py-3 text-gray-600 hidden lg:table-cell">{rental.tollsPaid}</td>
                        <td className="py-2 sm:py-3 text-gray-600 hidden lg:table-cell">{rental.finesIncurred}</td>
                        <td className="py-2 sm:py-3">
                          <div className="flex items-center">
                            <Star className="w-3 sm:w-4 h-3 sm:h-4 fill-orange-500 text-orange-500 mr-1" />
                            <span className="text-gray-900">{rental.rating}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-200xl mx-auto">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md border overflow-hidden">
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-40 sm:h-48 object-cover bg-gray-200"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    Rent a Car/Can to Buy
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="relative">
                    <button
                      onClick={() => setShowDropdown(showDropdown === car.id ? null : car.id)}
                      className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
                    >
                      <MoreHorizontal className="w-4 h-4 text-orange-500" />
                    </button>
                    {showDropdown === car.id && (
                      <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg py-2 w-40 z-10">
                        <button
                          onClick={() => handleDropdownClick(car.id, 'detail')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <FileText className="w-4 h-4 text-orange-500 mr-2" />
                          Car Detail
                        </button>
                        <button
                          onClick={() => handleDropdownClick(car.id, 'update')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <Edit className="w-4 h-4 text-orange-500 mr-2" />
                          Update
                        </button>
                        <button
                          onClick={() => handleDropdownClick(car.id, 'remove')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <Trash2 className="w-4 h-4 text-orange-500 mr-2" />
                          Remove
                        </button>
                        <button
                          onClick={() => handleDropdownClick(car.id, 'offers')}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                        >
                          <Eye className="w-4 h-4 text-orange-500 mr-2" />
                          View Offers
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-gray-600">Sedan · {car.year}</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-900">
                    ${car.price}<span className="text-xs sm:text-sm text-gray-600">/week</span>
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">{car.name}</h3>
                <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center">
                    <Fuel className="w-3 sm:w-4 h-3 sm:h-4 text-orange-500 mr-1" />
                    {car.fuel}
                  </div>
                  <div className="flex items-center">
                    <Settings className="w-3 sm:w-4 h-3 sm:h-4 text-orange-500 mr-1" />
                    {car.transmission}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-3 sm:w-4 h-3 sm:h-4 text-orange-500 mr-1" />
                    {car.seats} Seats
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-2 flex-wrap">
          <button className="text-black  font-bold hover:text-gray-800 flex items-center">
                <ChevronLeft  onClick={() => setCurrentPage('cars')} className="w-4 h-4 mr-1" />
                Prev
              </button>
          <button className="w-8 h-8 bg-orange-500 text-white rounded flex items-center justify-center text-sm">
            1
          </button>
          <button className="w-8 h-8 text-gray-600 hover:text-gray-800 rounded flex items-center justify-center text-sm">
            2
          </button>
          <button className="w-8 h-8 text-gray-600 hover:text-gray-800 rounded flex items-center justify-center text-sm">
            3
          </button>
          <span className="text-gray-400 text-sm">...</span>
          <button className="w-8 h-8 text-gray-600 hover:text-gray-800 rounded flex items-center justify-center text-sm">
            12
          </button>
         <button className="text-black  font-bold hover:text-gray-800 flex items-center">
                Next <ChevronRight  onClick={() => setCurrentPage('cars')} className="w-4 h-4 mr-1" />
               
              </button>
        </div>

        {showRemoveModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-6 sm:w-8 h-6 sm:h-8 text-orange-500" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold mb-2">Confirm Car Removal?</h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                Are you sure you want to remove Tesla Model S from listing?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowRemoveModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemoveCar}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

        {showRemoveSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm text-center">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 sm:w-8 h-6 sm:h-8 text-green-500" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold mb-2">Car Successfully Removed!</h2>
              <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                You've successfully removed Tesla Model S.
              </p>
              <button
                onClick={() => setShowRemoveSuccess(false)}
                className="w-full bg-orange-500 text-white py-2 sm:py-3 rounded-md hover:bg-orange-600 font-medium text-sm"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;