import React, { useState, useEffect } from 'react';
import { ChevronLeft, Send,Car,CheckCircle, MapPin, Upload, AlertCircle, X, Shield, Check, Minus, CreditCard, Building2, Info, FileText, Eye, EyeOff, ArrowRight, Camera, Settings, Calendar, ChevronDown, DollarSign, User, FileCheck, Heart, Plus, ChevronRight } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const AddListCar = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('abc123');
  const [state, setState] = useState('NSW');
  const [showAdditionalModal, setShowAdditionalModal] = useState(false);
  const [vehicleDetailsFetched, setVehicleDetailsFetched] = useState(true);
  const [images, setImages] = useState(Array(5).fill(null));
  const [uploadProgress, setUploadProgress] = useState(Array(5).fill(0));
  const [uploadStatus, setUploadStatus] = useState(Array(5).fill('initial'));
  const [selectedFeatures, setSelectedFeatures] = useState([
    'Automatic Transmission',
    'Electric / Hybrid Vehicle',
    'Snow Tires',
    'Must Be 25+',
    'Smoking Policy',
    'Late Return Policy',
    'Unlimited Mileage',
    'Insurance Requirement',
  ]);
  const [description, setDescription] = useState(
    'Well-maintained and fuel-efficient, this car is perfect for city drives or long trips. Equipped with a premium sound system, GPS navigation, and a spacious interior for a comfortable ride. Enjoy smooth handling, great mileage, and a clean, smoke-free cabin. Book now for a hassle-free rental experience!'
  );
  const [weeklyPrice, setWeeklyPrice] = useState(350);
  const [halfYearDiscount, setHalfYearDiscount] = useState(10);
  const [annualDiscount, setAnnualDiscount] = useState(15);
  const [earnToBuy, setEarnToBuy] = useState(false);
  const [earnToBuyPlans, setEarnToBuyPlans] = useState([
    { sellPrice: 1200, deposit: 30, duration: '3 months' },
    { sellPrice: 850, deposit: 30, duration: '6 months' },
    { sellPrice: 500, deposit: 30, duration: '12 months' },
  ]);
  const [paymentFrequency, setPaymentFrequency] = useState('Monthly');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const steps = [
    { number: 1, label: 'Location', icon: MapPin, active: currentStep >= 1 },
    { number: 2, label: 'Eligibility', icon: FileText, active: currentStep >= 2 },
    { number: 3, label: 'Images', icon: Camera, active: currentStep >= 3 },
    { number: 4, label: 'Car Features', icon: Settings, active: currentStep >= 4 },
    { number: 5, label: 'Rental Availability', icon: Calendar, active: currentStep >= 5 },
    { number: 6, label: 'Pricing', icon: DollarSign, active: currentStep >= 6 },
    { number: 7, label: 'Tracker', icon: User, active: currentStep >= 7 },
    { number: 8, label: 'Documents', icon: FileCheck, active: currentStep >= 8 },
    { number: 9, label: 'Insurance', icon: Heart, active: currentStep >= 9 },
     { number: 10, label: 'Review Listing', icon: Heart, active: currentStep >= 10 },
  
  ];

  const handleNextStep = () => {
    if (currentStep < 10) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const AdditionalDetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[80vh] overflow-auto">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Additional Details</h3>
            <button onClick={() => setShowAdditionalModal(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {['Body Style', 'Transmission', 'Doors', 'Seats'].map((label, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  {label === 'Body Style' && <><option>Sedan</option><option>SUV</option><option>Hatchback</option><option>Coupe</option></>}
                  {label === 'Transmission' && <><option>Automatic</option><option>Manual</option></>}
                  {label === 'Doors' && <><option>4</option><option>2</option><option>5</option></>}
                  {label === 'Seats' && <><option>5</option><option>2</option><option>4</option><option>7</option></>}
                </select>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowAdditionalModal(false)}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const LocationStep = ({ address, setAddress }) => {
    const [zoom, setZoom] = useState(12);
    const [center, setCenter] = useState({
      lat: -37.8136,
      lng: 144.9631,
    });

    const containerStyle = {
      width: '100%',
      height: '256px',
    };

    const mapOptions = {
      disableDefaultUI: true,
      mapTypeId: 'roadmap',
    };

    const handleZoomIn = () => setZoom((z) => Math.min(z + 1, 20));
    const handleZoomOut = () => setZoom((z) => Math.max(z - 1, 0));

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
        <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Pickup Location</h2>

            <div className="mb-4 sm:mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm sm:text-base"
                />
                <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="relative h-64 sm:h-80 bg-gray-100 rounded-lg overflow-hidden">
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={zoom}
                  options={mapOptions}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>

              {/* Zoom buttons */}
              <div className="absolute top-2 right-2 flex flex-col space-y-2 z-10">
                <button
                  onClick={handleZoomIn}
                  className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={handleZoomOut}
                  className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 ">
          <div className="bg-orange-50 border border-orange-200 shadow-lg rounded-lg p-4 sm:p-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-base sm:text-lg">Address privacy</h3>
                <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                  <p>
                    To protect your privacy, consider using a nearby landmark instead of your exact home address. Your location details are securely encrypted and only visible to authorized users.
                  </p>
                  <p>
                    Providing a precise location increases booking chances and ensures a smooth handoff for renters. Use a landmark if needed for better clarity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const EligibilityStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Enter Vehicle Registration Number</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            Enter your vehicle registration number to automatically fetch its details from our system.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Registration Number</label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm sm:text-base"
              placeholder="Enter registration number"
            />
            <div className="mt-2 text-xs text-gray-500">
              <p>Your registration number should:</p>
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Include a mix of letters and numbers</li>
                <li>Be 3-8 characters in length</li>
              </ul>
            </div>
          </div>
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <div className="relative">
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none appearance-none text-sm sm:text-base"
              >
                {['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors text-sm sm:text-base">
            Fetch Details →
          </button>
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          {vehicleDetailsFetched && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-green-600">Vehicle Details Fetched!</span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm">
                {[
                  { label: 'Make & Model', value: 'Toyota Camry 2022' },
                  { label: 'VIN', value: '1HGBH41JXMN109186' },
                  { label: 'Color', value: 'White' },
                  { label: 'Engine Type', value: 'Hybrid' },
                  { label: 'Fuel Type', value: 'Petrol' },
                  { label: 'Registration Year', value: '2022' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-gray-600">{item.label}:</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowAdditionalModal(true)}
                className="w-full mt-4 p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:bg-gray-50 text-sm"
              >
                <span className="font-medium">Additional Details</span>
                <Plus className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}
          <div className="bg-orange-50 border border-orange-200 shadow-lg rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info className="w-3 h-3 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Vehicle Info & Tips</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>• Keeping your registration updated ensures a hassle-free driving experience.</p>
                  <p>• Double-check your registration details to avoid fines and delays.</p>
                  <p>• Regular vehicle maintenance helps extend its lifespan and performance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ImagesStep = () => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    const handleImageUpload = (index, event) => {
      const file = event.target.files[0];
      if (!file) return;

      if (!allowedFileTypes.includes(file.type)) {
        const newStatus = [...uploadStatus];
        newStatus[index] = 'unsupported';
        setUploadStatus(newStatus);
        return;
      }

      const newStatus = [...uploadStatus];
      newStatus[index] = 'uploading';
      setUploadStatus(newStatus);

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        const newProgress = [...uploadProgress];
        newProgress[index] = progress;
        setUploadProgress(newProgress);

        if (progress >= 100) {
          clearInterval(interval);
          const newImages = [...images];
          newImages[index] = URL.createObjectURL(file);
          setImages(newImages);
          newStatus[index] = 'uploaded';
          setUploadStatus(newStatus);
        }
      }, 200);
    };

    const removeImage = (index) => {
      const newImages = [...images];
      newImages[index] = null;
      setImages(newImages);
      const newStatus = [...uploadStatus];
      newStatus[index] = 'initial';
      setUploadStatus(newStatus);
      const newProgress = [...uploadProgress];
      newProgress[index] = 0;
      setUploadProgress(newProgress);
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Upload Vehicle Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  {uploadStatus[index] === 'initial' && (
                    <div className="border-2 border-dashed border-orange-300 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center h-40 sm:h-48">
                      <Camera className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 mb-2" />
                      <label className="cursor-pointer">
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm">
                          Browse
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={(e) => handleImageUpload(index, e)}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">or drag here</p>
                    </div>
                  )}
                  {uploadStatus[index] === 'uploading' && (
                    <div className="border-2 border-dashed border-orange-300 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center h-40 sm:h-48 relative">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress[index]}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Uploading... {uploadProgress[index]}%</p>
                    </div>
                  )}
                  {uploadStatus[index] === 'uploaded' && image && (
                    <div className="relative h-40 sm:h-48">
                      <img
                        src={image}
                        alt={`Uploaded vehicle ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-orange-500 text-white rounded-full w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center hover:bg-orange-600 transition-colors"
                      >
                        <X className="w-3 sm:w-4 h-3 sm:h-4" />
                      </button>
                    </div>
                  )}
                  {uploadStatus[index] === 'unsupported' && (
                    <div className="border-2 border-dashed border-orange-300 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center h-40 sm:h-48">
                      <p className="text-xs sm:text-sm text-red-500 mb-2">Unsupported file type</p>
                      <label className="cursor-pointer">
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm">
                          Try Again
                        </span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/jpeg,image/png,image/jpg"
                          onChange={(e) => handleImageUpload(index, e)}
                        />
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className=" rounded-lg shadow-md border border-orange-200 bg-orange-50 p-4 sm:p-6">
            <div className="flex items-start space-x-3">
              <div className="w-5 sm:w-6 h-5 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-base sm:text-lg">Upload with Clarity</h3>
                <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-gray-600">
                  <li>Use clear, high-resolution images.</li>
                  <li>Capture front, side, rear & interior views.</li>
                  <li>Take photos in good lighting for better visibility.</li>
                  <li>Ensure the license plate is visible. (If required)</li>
                  <li>Avoid blurry or dark images.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CarFeaturesStep = () => {
    const features = [
      'Automatic Transmission',
      'Manual Transmission',
      'Air Conditioning',
      'Bluetooth',
      'Backup Camera',
      'Snow Tires',
      'Child Seat Available',
      'All-Wheel Drive',
      'Electric / Hybrid Vehicle',
      'Toll Pass Included',
      'GPS Navigation',
      'Heated Seats',
      'Sunroof / Moonroof',
      'Unlimited Mileage',
      'Pet Friendly',
      'Fuel Policy',
      'Late Return Policy',
      'Wheelchair Platform',
      'Must Be 25+',
      'Insurance Requirement',
      'Smoking Policy',
    ];

    const toggleFeature = (feature) => {
      setSelectedFeatures((prev) =>
        prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
      );
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Customize Your Car Listing</h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
              Highlight key features and rental conditions to help renters choose your car with confidence.
            </p>
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-4">Car Features</h3>
              {selectedFeatures.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedFeatures.map((feature) => (
                      <button
                        key={feature}
                        className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 text-white rounded-full text-xs sm:text-sm font-medium hover:bg-orange-600 transition-colors"
                        onClick={() => toggleFeature(feature)}
                      >
                        {feature}
                        <X className="w-3 sm:w-4 h-3 sm:h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {features
                  .filter((feature) => !selectedFeatures.includes(feature))
                  .map((feature) => (
                    <button
                      key={feature}
                      onClick={() => toggleFeature(feature)}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 text-xs sm:text-sm font-medium transition-colors"
                    >
                      {feature}
                    </button>
                  ))}
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-4">Description</h3>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a description..."
                className="w-full h-24 sm:h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none text-xs sm:text-sm"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-2 text-right">{description.length}/500</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-orange-50 rounded-lg shadow-md border border-orange-200 p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex items-start space-x-3">
              <div className="w-5 sm:w-6 h-5 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-base sm:text-lg">Boost Bookings with Key Features</h3>
                <div className="text-xs sm:text-sm text-gray-600 space-y-3">
                  <p>Boost your bookings by highlighting key features renters love, such as GPS, heated seats, or a premium sound system.</p>
                  <p>The more details you provide, the more confident renters feel about choosing your car!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TrackerStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="mb-4 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Add Tracker Information</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Ensure your vehicle is secure by linking it to a tracker service.
            </p>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tracker Company</label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none text-sm sm:text-base"
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                >
                  <option value="">Select a Tracker company</option>
                  <option value="gps-tracker">GPS Tracker Co.</option>
                  <option value="vehicle-track">Vehicle Track Pro</option>
                  <option value="secure-track">Secure Track Systems</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-12 text-sm sm:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className=" rounded-lg shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-5 sm:w-6 h-5 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Why Add a Tracker?</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-700">
              A tracker helps improve security and allows renters to feel more confident.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="w-5 sm:w-6 h-5 sm:h-6  bg-orange-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-xs font-bold">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">Privacy & Security</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-700">
              Your credentials will be encrypted and securely stored while ensuring seamless integration with verified tracking providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const PricingStep = () => {
    const platformFee = 0.1;
    const calculateNetEarnings = (price, discount, months) => {
      const weeklyEarnings = price * (1 - discount / 100);
      const totalEarnings = weeklyEarnings * 4 * months;
      const netEarnings = totalEarnings * (1 - platformFee);
      return Math.round(netEarnings);
    };

    const netMonthlyEarnings = calculateNetEarnings(weeklyPrice, 0, 1);
    const netHalfYearEarnings = calculateNetEarnings(weeklyPrice, halfYearDiscount, 6);
    const netYearlyEarnings = calculateNetEarnings(weeklyPrice, annualDiscount, 12);

    const handleApplySuggestedPrice = () => {
      setWeeklyPrice(350);
      setSuggestedPriceApplied(true);
    };

    const addEarnToBuyPlan = () => {
      setEarnToBuyPlans([...earnToBuyPlans, { sellPrice: 0, deposit: 30, duration: '3 months' }]);
    };

    const removeEarnToBuyPlan = (index) => {
      setEarnToBuyPlans(earnToBuyPlans.filter((_, i) => i !== index));
    };

    const updateEarnToBuyPlan = (index, field, value) => {
      const updatedPlans = earnToBuyPlans.map((plan, i) =>
        i === index ? { ...plan, [field]: value } : plan
      );
      setEarnToBuyPlans(updatedPlans);
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Customize Your Pricing</h2>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
              We've suggested competitive rates based on top-performing owners in your area.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 sm:mb-6">
              <div className="flex items-center mb-2">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  We've suggested this price based on market trends and similar listings in your area.
                </p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  <span className="text-xs sm:text-sm font-medium mr-2">Suggested Price:</span>
                  <button
                    onClick={handleApplySuggestedPrice}
                    className="px-3 py-1 bg-orange-500 text-white text-xs sm:text-sm rounded hover:bg-orange-600 transition-colors"
                  >
                    $350/week
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {[
                { label: 'Weekly Price', value: weeklyPrice, setter: setWeeklyPrice, earnings: netMonthlyEarnings, earningsLabel: 'Net Monthly Earnings' },
                { label: 'Half-Year Discount', value: halfYearDiscount, setter: setHalfYearDiscount, earnings: netHalfYearEarnings, earningsLabel: 'Net 6 Month Earnings', max: 100, unit: '%' },
                { label: 'Annual Discount', value: annualDiscount, setter: setAnnualDiscount, earnings: netYearlyEarnings, earningsLabel: 'Net Yearly Earnings', max: 100, unit: '%' },
              ].map((item, idx) => (
                <div key={idx} className="mb-4 sm:mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{item.label}</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <div className="flex">
                      <div className="flex items-center bg-gray-50 px-3 sm:px-4 py-3 border-r border-gray-300">
                        <span className="text-gray-500 font-medium">{item.unit || '$'}</span>
                      </div>
                      <input
                        type="number"
                        value={item.value}
                        onChange={(e) => item.setter(Math.min(item.max || Infinity, Math.max(0, e.target.value)))}
                        className="flex-1 px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none border-0 text-sm sm:text-base"
                        min="0"
                        max={item.max}
                      />
                      <div className="flex items-center bg-gray-50 px-3 sm:px-4 py-3 border-l border-gray-300">
                        <div className="text-right">
                          <div className="text-xs sm:text-sm text-gray-600">{item.earningsLabel}:</div>
                          <div className="text-base sm:text-lg font-semibold text-gray-800">${item.earnings.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 sm:mt-6">
              <div className="flex items-center mb-4 sm:mb-6">
                <button
                  onClick={() => setEarnToBuy(!earnToBuy)}
                  className={`w-10 sm:w-12 h-5 sm:h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${earnToBuy ? 'bg-orange-500' : 'bg-gray-300'}`}
                >
                  <div
                    className={`w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full shadow-md transform transition-transform ${earnToBuy ? 'translate-x-5 sm:translate-x-6' : ''}`}
                  />
                </button>
                <span className="ml-3 text-xs sm:text-sm font-medium text-gray-800">Earn to Buy</span>
              </div>
              {earnToBuy && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm font-medium text-gray-700 mb-4">
                    <div>Set Price:</div>
                    <div>Initial Deposit:</div>
                    <div>Duration:</div>
                    <div></div>
                  </div>
                  {earnToBuyPlans.map((plan, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 sm:gap-4 items-center">
                      <div className="relative">
                        <span className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm">$</span>
                        <input
                          type="text"
                          value={plan.sellPrice}
                          onChange={(e) => updateEarnToBuyPlan(index, 'sellPrice', e.target.value)}
                          className="w-full pl-6 sm:pl-8 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-xs sm:text-sm"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="relative">
                        <select
                          value={plan.deposit}
                          onChange={(e) => updateEarnToBuyPlan(index, 'deposit', e.target.value)}
                          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-xs sm:text-sm appearance-none bg-white"
                        >
                          {[10, 15, 20, 25, 30].map((val) => (
                            <option key={val} value={val}>{val}%</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={plan.duration}
                          onChange={(e) => updateEarnToBuyPlan(index, 'duration', e.target.value)}
                          className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-xs sm:text-sm"
                        />
                      </div>
                      <button
                        onClick={() => removeEarnToBuyPlan(index)}
                        className="w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 sm:w-4 h-3 sm:h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={addEarnToBuyPlan}
                    className="text-orange-500 text-xs sm:text-sm font-medium hover:text-orange-600 transition-colors"
                  >
                    + Add Custom Duration
                  </button>
                  <div className="mt-4 sm:mt-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Payment Frequency</label>
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="relative">
                        <select
                          value={paymentFrequency}
                          onChange={(e) => setPaymentFrequency(e.target.value)}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-xs sm:text-sm appearance-none bg-white pr-8 sm:pr-10"
                        >
                          <option>Monthly</option>
                          <option>Weekly</option>
                          <option>Bi-weekly</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                      <button className="px-4 sm:px-6 py-1.5 sm:py-2 bg-orange-500 text-white text-xs sm:text-sm rounded-md hover:bg-orange-600 transition-colors font-medium">
                        Calculate
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-orange-50 border border-orange-200 rounded-lg shadow-md p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className=" rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 sm:w-6 h-5 sm:h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 text-base sm:text-lg">Set Competitive Price</h3>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
                    <li>• Adjust your weekly rate to maximize long-term earnings.</li>
                    <li>• Providing lower half-year or yearly rates attracts more renters.</li>
                    <li>• Adjust rates based on seasonal demand.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RentalAvailability = () => {
    const [startDate, setStartDate] = useState('08/01/2025');
    const [endDate, setEndDate] = useState('08/20/2025');
    const [noticeDropdownOpen, setNoticeDropdownOpen] = useState(false);
    const [noticePeriod, setNoticePeriod] = useState('3 Months');
    const [coolingOffDays, setCoolingOffDays] = useState('15');
    const [travelRestriction, setTravelRestriction] = useState('within-state');
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [activeCalendar, setActiveCalendar] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7));
    const [selectedDates, setSelectedDates] = useState([10, 17]);
    const [focusedInput, setFocusedInput] = useState(null);

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(currentMonth);
      const firstDay = getFirstDayOfMonth(currentMonth);
      const days = [];

      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="w-8 h-8 md:w-10 md:h-10"></div>);
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = selectedDates.includes(day);
        days.push(
          <button
            key={day}
            onClick={() => {
              if (selectedDates.includes(day)) {
                setSelectedDates(selectedDates.filter(d => d !== day));
              } else {
                setSelectedDates([...selectedDates, day]);
              }
            }}
            className={`w-8 h-8 md:w-10 md:h-10 text-sm rounded-full hover:bg-orange-100 transition-colors flex items-center justify-center ${isSelected ? 'bg-orange-500 text-white font-semibold' : 'text-gray-700'
              }`}
          >
            {day}
          </button>
        );
      }

      return days;
    };

    const navigateMonth = (direction) => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction));
    };

    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-6">Set Car Rental Availability</h1>
              <p className="text-gray-600 mb-8">
                Select the date your car will be available for bookings. Set the advance notice period for rental bookings
                (e.g., 3 months to 1 year).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      onClick={() => {
                        setCalendarOpen(true);
                        setActiveCalendar('start');
                        setFocusedInput('start');
                      }}
                      onFocus={() => setFocusedInput('start')}
                      onBlur={() => setFocusedInput(null)}
                      className={`w-full px-4 py-3 border rounded-lg transition-colors cursor-pointer ${focusedInput === 'start' || (calendarOpen && activeCalendar === 'start')
                        ? 'border-orange-500 ring-2 ring-orange-500'
                        : 'border-gray-300 hover:border-gray-400'
                        }`}
                      placeholder="mm/dd/yyyy"
                      readOnly
                    />
                    <Calendar className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      onClick={() => {
                        setCalendarOpen(true);
                        setActiveCalendar('end');
                        setFocusedInput('end');
                      }}
                      onFocus={() => setFocusedInput('end')}
                      onBlur={() => setFocusedInput(null)}
                      className={`w-full px-4 py-3 border rounded-lg transition-colors cursor-pointer ${focusedInput === 'end' || (calendarOpen && activeCalendar === 'end')
                        ? 'border-orange-500 ring-2 ring-orange-500'
                        : 'border-gray-300 hover:border-gray-400'
                        }`}
                      placeholder="mm/dd/yyyy"
                      readOnly
                    />
                    <Calendar className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {calendarOpen && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white w-full sm:w-[280px] md:w-[336px] lg:w-[392px]">
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-gray-100 rounded">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                      {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-gray-100 rounded">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-center text-xs md:text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {renderCalendar()}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setCalendarOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setCalendarOpen(false)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Set Notice Period for Bookings</h2>
                <p className="text-gray-600 mb-4">
                  Set the advance notice period for rental bookings (e.g., 3 months to 1 year). How much advance notice
                  would you like before a booking can be made?
                </p>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Set Notice Period</label>
                  <button
                    onClick={() => setNoticeDropdownOpen(!noticeDropdownOpen)}
                    className="w-full md:w-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-left flex items-center justify-between"
                  >
                    {noticePeriod}
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </button>
                  {noticeDropdownOpen && (
                    <div className="absolute z-10 w-full md:w-96 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {['1 Month', '2 Months', '3 Months', '6 Months', '1 Year'].map((period) => (
                        <button
                          key={period}
                          onClick={() => {
                            setNoticePeriod(period);
                            setNoticeDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Cooling-Off Period (Days)</h2>
                <p className="text-gray-600 mb-4">
                  Specify the number of days for the cooling-off period after a booking is made. The customer can cancel
                  or modify the reservation during this period without penalty.
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number Input</label>
                  <input
                    type="number"
                    value={coolingOffDays}
                    onChange={(e) => setCoolingOffDays(e.target.value)}
                    className="w-full md:w-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter number of days"
                  />
                </div>
              </div>

              <div className="max-w-2xl mx-auto p-6 bg-white">
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Allowed Travel Range</h2>
                  <p className="text-gray-600 mb-6">Set where driver are allowed</p>

                  <div className="space-y-4">
                    {/* Within State Only Option */}
                    <div className="relative">
                      <label className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${travelRestriction === 'within-state'
                        ? 'border-orange-300 bg-orange-50'
                        : 'border-gray-300 hover:bg-gray-50'
                        }`}>
                        <input
                          type="radio"
                          name="travel"
                          value="within-state"
                          checked={travelRestriction === 'within-state'}
                          onChange={(e) => setTravelRestriction(e.target.value)}
                          className="mt-1 w-4 h-4 text-orange-500 border-orange-300 focus:ring-orange-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">Within state Only</span>
                            <Info className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="text-sm text-gray-600 mt-1">Vehicle must stay within state borders.</div>
                        </div>
                        {travelRestriction === 'within-state' && (
                          <ChevronDown className="h-5 w-5 text-orange-500 mt-1" />
                        )}
                      </label>

                      {/* Tooltip/Info Box - Only show when selected */}
                      {travelRestriction === 'within-state' && (
                        <div className="absolute top-2 right-16 bg-white border border-gray-200 rounded-lg p-3 shadow-lg max-w-xs z-10">
                          <div className="flex items-start space-x-2">
                            <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-700 leading-relaxed">
                              The vehicle can be driven across state borders without any prior approval. This offers maximum flexibility for renters planning longer trips or road trips.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Interstate Travel Allowed Option */}
                    <label className="flex items-start space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="travel"
                        value="interstate"
                        checked={travelRestriction === 'interstate'}
                        onChange={(e) => setTravelRestriction(e.target.value)}
                        className="mt-1 w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">Interstate Travel Allowed</span>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="text-sm text-gray-600 mt-1">NO restrictions on crossing state lines.</div>
                      </div>
                      <Send className="h-5 w-5 text-gray-400 mt-1 transform rotate-45" />
                    </label>
                  </div>
                </div>
              </div>


            </div>

            <div className="space-y-6">
              <div className="bg-orange-50 rounded-lg border border-orange-200 shadow-md p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">Boost Bookings with Key Features</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Boost your bookings by highlighting key features renters love, such as GPS, heated seats, or a premium sound system. Vehicles with added conveniences stand out and attract more interest. The more details you provide, the more confident renters feel about choosing your car!
                </p>
              </div>

              <div className="bg-orange-50 rounded-lg shadow-md  border border-orange-200 p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">Tips to get more bookings</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tell guests what makes your car unique and why they'll love driving it. A well-written car description helps renters understand what makes your vehicle special. Highlight its condition, unique features, and any extras you provide. Clear and engaging details can increase trust and drive more bookings!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Documents = () => {
  const [selectedDates, setSelectedDates] = useState({
    insurance: null,
    registration: null,
    roadworthy: null,
  });
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5)); // June 2025
  const [activeCalendar, setActiveCalendar] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({
    insurance: null,
    registration: null,
    roadworthy: null,
  });
  const [previewUrls, setPreviewUrls] = useState({
    insurance: null,
    registration: null,
    roadworthy: null,
  });
  const [noDocumentChecked, setNoDocumentChecked] = useState({
    insurance: false,
    registration: false,
    roadworthy: false,
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date) => {
    if (!date) return 'mm/dd/yyyy';
    return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDates(prev => ({
      ...prev,
      [activeCalendar]: newDate
    }));
  };

  const handleApplyDate = () => {
    setActiveCalendar(null);
  };

  const handleFileUpload = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [type]: file
      }));

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrls(prev => ({
            ...prev,
            [type]: e.target.result
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrls(prev => ({
          ...prev,
          [type]: null
        }));
      }
    }
  };

  const handleNoDocumentCheck = (type, checked) => {
    setNoDocumentChecked(prev => ({
      ...prev,
      [type]: checked
    }));
    if (checked) {
      setSelectedDates(prev => ({
        ...prev,
        [type]: null
      }));
      setUploadedFiles(prev => ({
        ...prev,
        [type]: null
      }));
      setPreviewUrls(prev => ({
        ...prev,
        [type]: null
      }));
    }
  };

  const renderCalendar = () => {
    if (!activeCalendar) return null;

    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="w-10 h-10 text-sm text-gray-300 flex items-center justify-center">
          {getDaysInMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)) - i}
        </div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDates[activeCalendar]?.getDate() === day &&
        selectedDates[activeCalendar]?.getMonth() === currentMonth.getMonth() &&
        selectedDates[activeCalendar]?.getFullYear() === currentMonth.getFullYear();
      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`w-10 h-10 text-sm rounded-full flex items-center justify-center transition-colors font-medium
              ${isSelected ? 'bg-orange-500 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
        >
          {day}
        </button>
      );
    }

    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - firstDay - daysInMonth;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="w-10 h-10 text-sm text-gray-300 flex items-center justify-center">
          {day}
        </div>
      );
    }

    return (
      <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-4 z-50 w-72 sm:w-80">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <div className="w-5 h-5 text-gray-600">‹</div>
          </button>
          <h3 className="font-semibold text-gray-900 text-sm">
            {months[currentMonth.getMonth()].toUpperCase()} {currentMonth.getFullYear()}
          </h3>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <div className="w-5 h-5 text-gray-600">›</div>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="w-7 h-8 text-xs text-gray-600 flex items-center justify-center font-medium">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {days}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setActiveCalendar(null)}
            className="px-4 py-1.5 text-gray-600 hover:bg-gray-100 rounded text-xs"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyDate}
            className="px-4 py-1.5 bg-orange-500 text-white rounded hover:bg-orange-600 text-xs font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    );
  };

  const DocumentUploadSection = ({ type, title, isOptional = false, isRequired = false }) => {
    const isChecked = noDocumentChecked[type];
    const hasFile = uploadedFiles[type];
    const previewUrl = previewUrls[type];
    const selectedDate = selectedDates[type];

    return (
      <div className="flex flex-col   lg:flex-row gap-8 mb-8">
        <div className="flex-1">
          <h3 className="text-gray-800 font-normal text-base mb-6">
            {title}
            {isOptional && <span className="text-gray-400 text-sm"> (Optional)</span>}
            {isRequired && <span className="text-red-500">*</span>}
          </h3>

          <div className={`border-2 border-dashed rounded-lg p-8 text-center relative h-48 flex flex-col justify-center
              ${isChecked ? 'border-gray-200 bg-gray-50' : 'border-orange-300 bg-orange-50'}`}>
            
            {!hasFile && !isChecked && (
              <>
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-6 h-6 text-gray-600" />
                </div>
                <button
                  onClick={() => document.getElementById(`file-${type}`).click()}
                  className="mb-3 px-6 py-2 bg-orange-500 text-white rounded text-sm font-medium hover:bg-orange-600"
                >
                  Upload File
                </button>
                <p className="text-sm text-gray-500">or drag here</p>
              </>
            )}

            {hasFile && !isChecked && (
              <div className="relative w-full h-full">
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={previewUrl}
                      alt={`${title} preview`}
                      className="w-full h-full object-cover rounded border"
                    />
                    <button
                      onClick={() => {
                        setUploadedFiles(prev => ({ ...prev, [type]: null }));
                        setPreviewUrls(prev => ({ ...prev, [type]: null }));
                      }}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 text-sm font-bold"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Upload className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-sm text-green-600 font-medium">✓ {hasFile.name}</p>
                    <button
                      onClick={() => {
                        setUploadedFiles(prev => ({ ...prev, [type]: null }));
                        setPreviewUrls(prev => ({ ...prev, [type]: null }));
                      }}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 text-sm font-bold"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            )}

            {isChecked && (
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
                <Plus className="w-6 h-6 text-gray-500" />
              </div>
            )}

            <input
              id={`file-${type}`}
              type="file"
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(type, e)}
              disabled={isChecked}
            />
          </div>

          <div className="mt-4">
            <label className="flex items-start text-sm text-gray-600">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => handleNoDocumentCheck(type, e.target.checked)}
                className="mt-0.5 mr-2 rounded"
              />
              <span>I don't have this document right now.</span>
            </label>
          </div>
        </div>

        <div className="w-full lg:w-64">
          <h4 className="text-gray-800 font-normal mb-6 text-base">Expiration Date</h4>
          <div className="relative">
            <div
              onClick={() => !isChecked && setActiveCalendar(activeCalendar === type ? null : type)}
              className={`border rounded px-3 py-2 text-sm cursor-pointer flex items-center h-10
                  ${isChecked ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200' : 'border-gray-300 hover:border-orange-400 bg-white'}`}
            >
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span className="text-gray-500">{selectedDate ? formatDate(selectedDate) : 'mm/dd/yyyy'}</span>
            </div>
            {activeCalendar === type && renderCalendar()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen  bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white shadow-md p-8 rounded-lg">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Upload Required Documents</h1>
            <p className="text-gray-600 mb-8 text-sm leading-relaxed">
              Ensure your car meets rental requirements by uploading essential documents. Add expiration dates or select
              "No Document" if unavailable.
            </p>

            <DocumentUploadSection
              type="insurance"
              title="Insurance Card"
              isOptional={true}
            />

            <hr className="my-8 border-gray-200" />

            <DocumentUploadSection
              type="registration"
              title="Vehicle Registration"
              isRequired={true}
            />

            <hr className="my-8 border-gray-200" />

            <DocumentUploadSection
              type="roadworthy"
              title="Roadworthy Certificate"
              isRequired={true}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 shadow-md">
              <div className="flex items-start">
                <div className="bg-orange-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Proof of Insurance</h3>
                  <ul className="text-sm text-gray-700 space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1 flex-shrink-0">•</span>
                      <span>Ensure the policy is active and not expired.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1 flex-shrink-0">•</span>
                      <span>Upload a clear image showing policy number & validity.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1 flex-shrink-0">•</span>
                      <span>Match the name with the vehicle owner's details.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>The insurance card</strong> confirms that your vehicle is covered against damages and liabilities.
                    It's required to protect both owners and renters during the rental period.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 shadow-md">
              <div className="flex items-start">
                <div className="bg-orange-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Vehicle Registration Details</h3>
                  <ul className="text-sm text-gray-700 space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1 flex-shrink-0">•</span>
                      <span>Make sure the registration is valid and up to date.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1 flex-shrink-0">•</span>
                      <span>Upload both front and back if required.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1 flex-shrink-0">•</span>
                      <span>Ensure details like VIN and plate number are visible.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>Vehicle registration</strong> verifies that your car is legally approved for road use.
                    It proves ownership and is essential for listing your car for rent.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 shadow-md">
              <div className="flex items-start">
                <div className="bg-orange-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Ensure a Smooth Listing with a Valid RWC</h3>
                  <ul className="text-sm text-gray-700 space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1 flex-shrink-0">•</span>
                      <span>Ensure your certificate is up to date before uploading to avoid last-minute hassles.</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong>A Roadworthy Certificate (RWC)</strong> is essential for listing your car. It proves your vehicle meets
                    safety standards and is fit for the road. Without it, your listing may be delayed or rejected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };

  const Insurance = () => {
    const [currentView, setCurrentView] = useState('main'); 
    const [showModal, setShowModal] = useState(false);
    const [insuranceOption, setInsuranceOption] = useState('yes');
    const [paymentOption, setPaymentOption] = useState('one-time');
    const [selectedCard, setSelectedCard] = useState('visa');

    const handleProceedToPayment = () => setShowModal(true);

    const handleSwitchAndSave = () => {
      setShowModal(false);
      setCurrentView('payment');
    };

    const handleBackToListing = () => {
      setCurrentView('main');
      setShowModal(false);
    };

    const MainView = () => (
      <div className="max-w-7xl mx-auto p-4 md:p-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          
          <div className="lg:col-span-2 ">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Add Insurance</h1>
            <p className="text-gray-600 mb-6">
              Protect your vehicle with a 1-year insurance policy offering comprehensive coverage tailored for rental cars.
              Enjoy peace of mind with flexible payment options.
            </p>

            <div className="mb-6">
              <p className="text-gray-900 font-medium mb-4">Do you want to purchase insurance from HiCar?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${insuranceOption === 'yes' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                  }`}>
                  <input
                    type="radio"
                    name="insurance"
                    value="yes"
                    checked={insuranceOption === 'yes'}
                    onChange={(e) => setInsuranceOption(e.target.value)}
                    className="w-4 h-4 text-orange-500"
                  />
                  <span className="ml-3 text-gray-900">Yes, add insurance</span>
                </label>
                <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${insuranceOption === 'no' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                  }`}>
                  <input
                    type="radio"
                    name="insurance"
                    value="no"
                    checked={insuranceOption === 'no'}
                    onChange={(e) => setInsuranceOption(e.target.value)}
                    className="w-4 h-4 text-orange-500"
                  />
                  <span className="ml-3 text-gray-900">No, skip insurance</span>
                </label>
              </div>
            </div>

            {insuranceOption === 'yes' && (
              <>
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <Shield className="w-5 h-5 text-gray-700 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Insurance Coverage</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-orange-500 mr-2" />
                      <span className="text-sm text-gray-700">Collision damage up to $50,000</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-orange-500 mr-2" />
                      <span className="text-sm text-gray-700">Theft protection with $0 deductible</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-orange-500 mr-2" />
                      <span className="text-sm text-gray-700">Third-party liability ($100,000)</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-orange-500 mr-2" />
                      <span className="text-sm text-gray-700">24/7 Roadside assistance included</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">1-Year Insurance Policy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`p-4 border-2 rounded-lg cursor-pointer ${paymentOption === 'one-time' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                      }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            value="one-time"
                            checked={paymentOption === 'one-time'}
                            onChange={(e) => setPaymentOption(e.target.value)}
                            className="w-4 h-4 text-orange-500"
                          />
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">One-Time Payment</div>
                            <div className="text-sm text-gray-500">Pay once for full year coverage</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-gray-900">$240</div>
                      </div>
                    </label>
                    <label className={`p-4 border-2 rounded-lg cursor-pointer ${paymentOption === 'monthly' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                      }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="payment"
                            value="monthly"
                            checked={paymentOption === 'monthly'}
                            onChange={(e) => setPaymentOption(e.target.value)}
                            className="w-4 h-4 text-orange-500"
                          />
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">Monthly Payment</div>
                            <div className="text-sm text-gray-500">Smaller recurring payments</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-gray-900">$20/mo</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    {paymentOption === 'one-time' ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Cost:</span>
                          <span className="text-gray-900">$240</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">One-time payment at checkout</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Valid for 12 months</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monthly Cost:</span>
                          <span className="text-gray-900">$20/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total over 12 months:</span>
                          <span className="text-gray-900">$240</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Auto-debit from linked payment method</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Proceed to Payment
                </button>
              </>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 shadow-md p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">!</div>
                <h3 className="font-medium text-gray-900">Why Add Insurance?</h3>
              </div>
              <p className="text-sm text-gray-700">
                Car insurance protects your vehicle and ensures hassle-free rentals. Selecting a trusted provider can improve security and reduce risks.
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-200 shadow-md p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">!</div>
                <h3 className="font-medium text-gray-900">How to Choose the Right Insurance?</h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Compare multiple providers based on coverage & pricing.</li>
                <li>• Choose a plan that includes theft and accident protection.</li>
                <li>• Ensure monthly fees are within budget.</li>
              </ul>
            </div>
            <div className="bg-orange-50 shadow-md border border-orange-200 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">!</div>
                <h3 className="font-medium text-gray-900">Impact on Net Earnings</h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Monthly insurance fees will be deducted from total earnings.</li>
                <li>• Consider adjusting rental rates to cover insurance costs.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );

    const PaymentView = () => (
      <div className="max-w-4xl mx-auto p-4 md:p-6 border border-orange-500">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackToListing}
            className="text-gray-600 hover:text-gray-900 mr-4"
          >
            ←
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Buy Insurance</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Summary */}
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-6">Payment Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">HiCar Insurance - 1 Year Policy</span>
                <span className="text-gray-900 font-medium">$240.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coverage Period</span>
                <span className="text-gray-900">12 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & fees (8%)</span>
                <span className="text-gray-900">$50</span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-900">Total Amount</span>
                <span className="text-gray-900">$290.00</span>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Shield className="w-4 h-4 mr-2" />
              Your payment is secure & encrypted
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-6">Choose a Payment Method</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center mb-4">
                  <input type="radio" name="paymentMethod" defaultChecked className="w-4 h-4 text-orange-500" />
                  <span className="ml-3 font-medium text-gray-900">Debit/Credit card</span>
                  <div className="ml-auto flex space-x-2">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 24'%3E%3Crect width='40' height='24' rx='4' fill='%23005faa'/%3E%3Ctext x='20' y='15' text-anchor='middle' fill='white' font-family='Arial' font-size='8'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" className="w-8 h-5" />
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 24'%3E%3Crect width='40' height='24' rx='4' fill='%23eb001b'/%3E%3Ccircle cx='15' cy='12' r='7' fill='%23eb001b'/%3E%3Ccircle cx='25' cy='12' r='7' fill='%23ff5f00'/%3E%3C/svg%3E" alt="Mastercard" className="w-8 h-5" />
                  </div>
                </label>
                <div className="space-y-3">
                  <label className={`block p-4 border-2 rounded-lg cursor-pointer ${selectedCard === 'visa' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                    }`}>
                    <input
                      type="radio"
                      name="card"
                      value="visa"
                      checked={selectedCard === 'visa'}
                      onChange={(e) => setSelectedCard(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">Visa •••• 1234</div>
                        <div className="text-sm text-gray-500">Exp: 12/29</div>
                      </div>
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 24'%3E%3Crect width='40' height='24' rx='4' fill='%23005faa'/%3E%3Ctext x='20' y='15' text-anchor='middle' fill='white' font-family='Arial' font-size='8'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" className="w-8 h-5" />
                    </div>
                  </label>
                  <label className={`block p-4 border-2 rounded-lg cursor-pointer ${selectedCard === 'mastercard' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                    }`}>
                    <input
                      type="radio"
                      name="card"
                      value="mastercard"
                      checked={selectedCard === 'mastercard'}
                      onChange={(e) => setSelectedCard(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">MasterCard •••• 1234</div>
                        <div className="text-sm text-gray-500">Exp: 12/25</div>
                      </div>
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 24'%3E%3Crect width='40' height='24' rx='4' fill='%23eb001b'/%3E%3Ccircle cx='15' cy='12' r='7' fill='%23eb001b'/%3E%3Ccircle cx='25' cy='12' r='7' fill='%23ff5f00'/%3E%3C/svg%3E" alt="Mastercard" className="w-8 h-5" />
                    </div>
                  </label>
                </div>
                <button className="mt-3 text-orange-500 text-sm font-medium">+ Add New Card</button>
              </div>
              <div className="pt-4">
                <label className="flex items-center">
                  <input type="radio" name="paymentMethod" className="w-4 h-4 text-orange-500" />
                  <Building2 className="w-5 h-5 ml-3 mr-2 text-gray-600" />
                  <div>
                    <span className="font-medium text-gray-900">Direct Bank Transfer</span>
                    <div className="text-sm text-gray-500">Some detail about bank transfer.</div>
                  </div>
                </label>
              </div>
            </div>
            <button className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Complete Payment - $290
            </button>
            <button
              onClick={handleBackToListing}
              className="w-full mt-3 text-orange-500 font-medium py-2"
            >
              Back to Listing
            </button>
          </div>
        </div>
      </div>
    );

    const Modal = () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-lg flex items-center justify-center text-orange-500 hover:bg-gray-50 shadow-md"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-8 md:p-12">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <div className="w-8 h-8 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-lg">i</span>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Protect Your Journey</h2>
              <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">Get 10%</div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-lg">Financial protection against accidents</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-lg">Legal compliance in all states</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-lg">Peace of mind on every trip</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-8 py-3 border-2 border-orange-500 rounded-lg text-orange-500 hover:bg-orange-50 font-medium text-lg transition-colors"
                >
                  Not Now
                </button>
                <button
                  onClick={handleSwitchAndSave}
                  className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium text-lg transition-colors"
                >
                  Get Insured Now
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <img
                src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Orange sports car"
                className="w-full h-full object-cover min-h-[300px] md:min-h-[500px]"
              />
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-gray-50">
        {currentView === 'main' && <MainView />}
        {currentView === 'payment' && <PaymentView />}
        {showModal && <Modal />}
      </div>
    );
  };

const ReviewListing = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
 const sections = [
    { id: 'location', title: 'Location', component: LocationStep },
    { id: 'edibility', title: 'Edibility', component:EligibilityStep   },
    { id: 'images', title: 'Images', component: ImagesStep },
    { id: 'carFeatures', title: 'Car Features', component: CarFeaturesStep },
    { id: 'pricing', title: 'Pricing', component: PricingStep },
    { id: 'addTracker', title: 'Add Tracker', component: TrackerStep },
    { id: 'documents', title: 'Documents', component: Documents },
    { id: 'addInsurance', title: 'Add Insurance', component: Insurance },
  ];

 

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleBack = () => {
    console.log('Going back...');
  };

  const handleSubmit = () => {
    if (isAgreed) {
      setIsSubmitted(true);
    }
  };

  const handleBackToHome = () => {
    setIsSubmitted(false);
    console.log('Navigating to home...');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 shadow-lg flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-10 h-10 text-orange-500" />
              </div>
              <div className="absolute -top-2 -right-8 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white fill-current" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Your Car Listed Successfully!
          </h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
            Your listing has been successfully submitted. Renters can now view and book your car.
          </p>
          <button
            onClick={handleBackToHome}
            className="bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors text-lg"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Review Your Listing Details
              </h1>
              <p className="text-gray-500 mb-8 border-b border-gray-200 pb-4">
                Check all details before submitting. You can update any step if needed
              </p>
              <div className="space-y-3">
                {sections.map((section) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-700">{section.title}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-orange-500 transition-transform ${
                          expandedSections[section.id] ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedSections[section.id] && <section.component />}
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-orange-500 hover:underline">
                      Terms & Conditions
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-orange-500 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
              </div>
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
               
                <button
                  onClick={handleSubmit}
                  disabled={!isAgreed}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isAgreed
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Submit List
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-orange-50 shadow-md border border-orange-200 rounded-lg p-6 sticky top-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <h3 className="font-semibold text-gray-800">
                  Ensure Accuracy Before Submission
                </h3>
              </div>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <p>
                    Carefully review all the details before submitting. Double-check pricing, vehicle details, and rental conditions to ensure everything is correct.
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gray-400 mt-1">•</span>
                  <p>
                    Before submitting, make sure you understand the platform's policies, including cancellation rules, insurance requirements, and pricing guidelines.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Once submitted, your listing will go live or may undergo a quick review process. You can always return to edit details later if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};






  return (
    <div className="min-h-screen ">
      <div className=" border-b py-4 sm:py-6">
        <div className="max-w-200xl mx-auto px-2 sm:px-6">
          <div className="flex overflow-x-auto md:grid md:grid-cols-10 gap-2 sm:gap-4 snap-x snap-mandatory scrollbar-custom">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = step.number === currentStep;
              const isCompleted = step.number < currentStep;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.number} className="flex flex-col items-center relative min-w-[80px] sm:min-w-[100px] snap-center">
                  <div
                    className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center ${isActive || isCompleted ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'
                      } transition-all duration-300`}
                  >
                    <IconComponent className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                  <span
                    className={`text-xs mt-2 text-center ${isActive ? 'text-orange-500 font-medium' : 'text-gray-600'
                      } transition-colors duration-300`}
                  >
                    {step.label}
                  </span>
                  {!isLast && (
                    <div
                      className={`absolute top-4 sm:top-5 left-1/2 w-1/2 h-0.5 md:w-full ${isCompleted ? 'bg-orange-500' : 'bg-gray-300'
                        } transition-all duration-300`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 py-6 sm:py-8">
        {currentStep === 1 && <LocationStep />}
        {currentStep === 2 && <EligibilityStep />}
        {currentStep === 3 && <ImagesStep />}
        {currentStep === 4 && <CarFeaturesStep />}
        {currentStep === 5 && <RentalAvailability />}
        {currentStep === 6 && <PricingStep />}
        {currentStep === 7 && <TrackerStep />}
        {currentStep === 8 && <Documents />}
        {currentStep === 9 && <Insurance />}
        {currentStep === 10 && <ReviewListing />}

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 gap-4">
          <button
            onClick={handleBack}
            className="flex items-center px-4 sm:px-6 py-2 sm:py-3 text-black-900 hover:text-orange-500 transition-colors duration-300 disabled:opacity-50 w-full sm:w-auto"
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-6 h-6 mr-1" />
            Back
          </button>
          <button
            onClick={handleNextStep}
            className="px-4 sm:px-6 py-2 sm:py-3  hover:bg-orange-500 border-2  border-orange-500 text-black font-2xl rounded-lg transition-colors duration-300 disabled:opacity-50 w-full sm:w-auto"
            disabled={currentStep === 10}
          >
            Next Step <ArrowRight className="w-5 h-5 ml-1 inline" />
          </button>
        </div>
      </div>

      {showAdditionalModal && <AdditionalDetailsModal />}
    </div>
  );
};

const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
  .scrollbar-custom::-webkit-scrollbar {
    height: 8px;
  }
  .scrollbar-custom::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  .scrollbar-custom::-webkit-scrollbar-thumb {
    background: #f97316;
    border-radius: 4px;
  }
  .scrollbar-custom::-webkit-scrollbar-thumb:hover {
    background: #ea580c;
  }
  @media (min-width: 768px) {
    .scrollbar-custom {
      overflow-x: hidden;
    }
  }
`;

export default AddListCar;
