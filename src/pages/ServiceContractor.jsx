import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, X, MapPin, Car, Shield } from 'lucide-react';

const ServiceContractor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    mechanicName: '',
    contactNumber: '',
    location: 'Sydney, Australia',
    serviceTypes: [],
    coordinates: { lat: -33.8688, lng: 151.2093 } 
  });
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const serviceOptions = [
    'Engine Repair',
    'Oil Change', 
    'Tire Replacement',
    'Battery Replacement',
    'AC & Heating Service',
    'Car Wash & Detailing'
  ];

  useEffect(() => {
    if (isModalOpen && !window.L) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(cssLink);

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else if (isModalOpen && window.L) {
      setTimeout(initializeMap, 100); // Small delay to ensure DOM is ready
    }
  }, [isModalOpen]);

  const initializeMap = () => {
    if (mapRef.current && window.L && !mapInstanceRef.current) {
      try {
        const map = window.L.map(mapRef.current, {
          center: [formData.coordinates.lat, formData.coordinates.lng],
          zoom: 13,
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
          dragging: true,
          touchZoom: true
        });

        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);

        const marker = window.L.marker([formData.coordinates.lat, formData.coordinates.lng], {
          draggable: true
        }).addTo(map);

        marker.on('dragend', async (e) => {
          const position = e.target.getLatLng();
          const newCoords = { lat: position.lat, lng: position.lng };
          
          setFormData(prev => ({
            ...prev,
            coordinates: newCoords
          }));

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}&zoom=16&addressdetails=1`
            );
            const data = await response.json();
            if (data.display_name) {
              setFormData(prev => ({
                ...prev,
                location: data.display_name
              }));
            }
          } catch (error) {
            console.log('Geocoding error:', error);
          }
        });

        map.on('click', async (e) => {
          const { lat, lng } = e.latlng;
          const newCoords = { lat, lng };
          
          marker.setLatLng([lat, lng]);
          setFormData(prev => ({
            ...prev,
            coordinates: newCoords
          }));

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`
            );
            const data = await response.json();
            if (data.display_name) {
              setFormData(prev => ({
                ...prev,
                location: data.display_name
              }));
            }
          } catch (error) {
            console.log('Geocoding error:', error);
          }
        });

        mapInstanceRef.current = map;
        markerRef.current = marker;

        setTimeout(() => {
          map.invalidateSize();
        }, 250);

      } catch (error) {
        console.error('Map initialization error:', error);
      }
    }
  };

  const handleInputChange = async (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'location' && value.length > 3) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=1&addressdetails=1`
        );
        const data = await response.json();
        
        if (data.length > 0) {
          const newPosition = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon)
          };
          
          setFormData(prev => ({
            ...prev,
            coordinates: newPosition
          }));

          if (mapInstanceRef.current && markerRef.current && window.L) {
            mapInstanceRef.current.setView([newPosition.lat, newPosition.lng], 13);
            markerRef.current.setLatLng([newPosition.lat, newPosition.lng]);
          }
        }
      } catch (error) {
        console.log('Geocoding error:', error);
      }
    }
  };

  const handleServiceTypeToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(service)
        ? prev.serviceTypes.filter(s => s !== service)
        : [...prev.serviceTypes, service]
    }));
  };

  const handleSave = () => {
    console.log('Saving mechanic:', formData);
    setIsModalOpen(false);
   
    setFormData({
      mechanicName: '',
      contactNumber: '',
      location: 'Sydney, Australia',
      serviceTypes: [],
      coordinates: { lat: -33.8688, lng: 151.2093 }
    });
    
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    markerRef.current = null;
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    markerRef.current = null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="bg-white border-b border-gray-200  px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 truncate">
              Service Contractor List
            </h1>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-2 sm:px-3 lg:px-4 py-2 rounded-lg font-medium flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm lg:text-base transition-colors"
          >
            <span className="text-lg sm:text-base">+</span>
            <span className="hidden sm:inline">Add Mechanic</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

       <div className="flex flex-col sm:flex-row items-center justify-between mb-4 mt-5 sm:mb-6">
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

      <div className="flex-1 flex items-center justify-center px-3 sm:px-4 lg:px-6 py-8 sm:py-12 lg:py-16">
        <div className="text-center text-gray-500">
          <div className="mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <p className="text-xs sm:text-sm lg:text-base mb-1">No mechanics added yet. Click the</p>
          <p className="text-xs sm:text-sm lg:text-base">"+ Add Mechanic" button to add.</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg max-h-[95vh] overflow-y-auto">
            
            <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">Add Mechanic</h2>
              <button 
                onClick={handleModalClose}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

            <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6">
              
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Mechanic Name
                </label>
                <input
                  type="text"
                  placeholder="Enter mechanic name"
                  value={formData.mechanicName}
                  onChange={(e) => handleInputChange('mechanicName', e.target.value)}
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-sm lg:text-base"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  placeholder="Enter contact number"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-sm lg:text-base"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter address or click on map"
                    className="w-full px-3 py-2 sm:py-2.5 pr-8 sm:pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-xs sm:text-sm lg:text-base"
                  />
                  <MapPin className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />
                </div>
                
                <div className="mt-2 sm:mt-3 h-40 sm:h-48 lg:h-56 bg-gray-200 rounded-lg overflow-hidden relative">
                  <div 
                    ref={mapRef}
                    className="w-full h-full"
                    style={{ 
                      minHeight: '160px',
                      zIndex: 1
                    }}
                  />
                  {!window.L && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 z-10">
                      <div className="text-center p-4">
                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                        <div className="text-gray-600 text-xs sm:text-sm font-medium">Loading Map...</div>
                        <div className="text-gray-500 text-xs mt-1">
                          Free OpenStreetMap - No API key required
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-1 sm:mt-2 text-xs text-gray-500">
                  💡 Click on the map or drag the red marker to set precise location
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Service Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent flex items-center justify-between text-xs sm:text-sm lg:text-base"
                  >
                    <span className="text-gray-500 truncate pr-2">
                      {formData.serviceTypes.length > 0 
                        ? formData.serviceTypes.join(', ')
                        : 'Choose service type'
                      }
                    </span>
                    <ChevronDown className={`w-3 sm:w-4 h-3 sm:h-4 text-gray-400 transition-transform flex-shrink-0 ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isServiceDropdownOpen && (
                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 sm:max-h-48 overflow-y-auto">
                      <div className="py-1 sm:py-2">
                        {serviceOptions.map((service) => (
                          <label key={service} className="flex items-center px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.serviceTypes.includes(service)}
                              onChange={() => handleServiceTypeToggle(service)}
                              className="w-3 sm:w-4 h-3 sm:h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 flex-shrink-0"
                            />
                            <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-700">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 lg:p-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="w-full bg-orange-500 text-white py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-xs sm:text-sm lg:text-base"
              >
                Save Mechanic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceContractor;