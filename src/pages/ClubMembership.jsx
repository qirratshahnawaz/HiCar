import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Car, User, CheckCircle, HelpCircle, Calendar, Building2, Plus, FileText, CreditCard, AlertTriangle, Info, Edit } from 'lucide-react';

const ClubMembership = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleRego, setVehicleRego] = useState('abc123');
  const [showError, setShowError] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    fullName: 'Jackson Smith',
    email: 'jacksmith234@gmail.com',
    phone: '+61456789847',
    dateOfBirth: 'May 23, 1996',
    licenseNumber: '123434Jlip99',
    address: '7 Collins Street, Melbourne, VIC 3000',
  });

  const steps = [
    { id: 1, title: 'Vehicle Info', icon: Car },
    { id: 2, title: 'Personal Detail', icon: User },
    { id: 3, title: 'Club Membership Plan', icon: CheckCircle },
    { id: 4, title: 'Summary', icon: FileText },
    { id: 5, title: 'Payment', icon: CreditCard },
  ];

  const StepIndicator = () => {
    return (
      <div className="w-full bg-white">
        <div className="overflow-x-auto">
          <div className="flex items-center justify-between min-w-max sm:min-w-0">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center flex-shrink-0 px-2 sm:px-4">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 ${
                      step.id === currentStep
                        ? 'bg-blue-500 text-white shadow-lg'
                        : step.id < currentStep
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-500'
                    }`}
                  >
                    <step.icon size={16} className="sm:w-5 sm:h-5" />
                  </button>
                  <div className="mt-2 text-center whitespace-nowrap">
                    <div className="text-xs text-gray-400 font-medium">Step {step.id}</div>
                    <div
                      className={`text-xs sm:text-sm mt-1 ${
                        step.id === currentStep
                          ? 'text-blue-600 font-semibold'
                          : step.id < currentStep
                          ? 'text-blue-500 font-medium'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 sm:mx-4 transition-colors duration-200 ${
                      step.id < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    style={{ minWidth: '40px' }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const VehicleInfoStep = ({ setStep = () => {} }) => {
    const [vehicleRego, setVehicleRego] = useState('abc123');
    const [showError, setShowError] = useState(false);

    return (
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full p-4 sm:p-6">
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900">
            Enter Vehicle Registration Number
          </h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
            Enter your Victorian rego number to fetch your car's official details securely — this helps us match the right insurance plan to your vehicle.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 mb-4 sm:mb-6 rounded-r-md">
            <div className="flex items-start">
              <AlertTriangle className="text-blue-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" size={16} />
              <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                This insurance service is only available for vehicles registered in Victoria, Australia.
              </p>
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">Vehicle Registration Number</label>
            <input
              type="text"
              value={vehicleRego}
              onChange={(e) => setVehicleRego(e.target.value)}
              className={`w-full p-3 sm:p-4 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                showError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="abc123"
            />
            {showError && (
              <p className="text-red-500 text-xs sm:text-sm mt-2">
                No results found for '{vehicleRego}'. Please check and try again.
              </p>
            )}
          </div>

          <div className="text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
            <p className="font-medium mb-2">Your registration number should:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Include a mix of letters and numbers
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Be 1 to 6 characters in length
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => {
                if (vehicleRego.toUpperCase() === 'ABC123') {
                  setShowError(true);
                } else {
                  setShowError(false);
                  setStep(2);
                }
              }}
              className="bg-gray-200 text-gray-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm sm:text-base"
            >
              Fetch Details →
            </button>
          </div>
        </div>

        <div className="w-full sm:w-80 lg:w-96 flex-shrink-0 space-y-4 sm:space-y-6">
          <div className="bg-blue-50 p-4 sm:p-5 rounded-lg shadow-md border border-blue-200">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <Info className="text-white" size={12} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Tips & Info</h3>
            </div>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                You can usually find your rego number on your vehicle registration papers or the license plate.
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Make sure the car is registered in Victoria, as this step only works with VicRoads records.
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 sm:p-5 rounded-lg border shadow-md border-blue-200">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <Info className="text-white" size={12} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Documents You'll Need (Coming Next)</h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 leading-relaxed">
              Make sure you have these ready for the next step:
            </p>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Driving License (Front & Back) - Policy Holder
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Driving License (Front & Back) - Main Driver
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Driving License (Front & Back) - Additional Driver (if any)
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Car Registration Certificate (Rego)
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Driver Accreditation Certificate
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Clear Photos of Car (All 4 sides)
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"></span>
                Odometer Photo
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-3 sm:mt-4 leading-relaxed">
              All images must be clear, well-lit, and show full document edges.
            </p>
          </div>
        </div>
      </div>
    );
  };

  const PersonalDetail = ({ setStep, details, setDetails }) => {
    const [errors, setErrors] = useState({});

    const validateForm = () => {
      const newErrors = {};
      if (!details.fullName) newErrors.fullName = 'Full Name is required';
      if (!details.email || !/\S+@\S+\.\S+/.test(details.email)) newErrors.email = 'Valid email is required';
      if (!details.phone) newErrors.phone = 'Phone Number is required';
      if (!details.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
      if (!details.licenseNumber) newErrors.licenseNumber = 'Driver License Number is required';
      if (!details.address) newErrors.address = 'Residential Address is required';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
      if (validateForm()) {
        setStep(3);
      }
    };

    return (
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full p-4 sm:p-6">
        <div className="flex-1 p-4 sm:p-6 rounded-lg shadow-md bg-white">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Add Personal Detail</h2>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Tell us a bit about yourself to begin your insurance application.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {[
              { label: 'Full Name', key: 'fullName', type: 'text', placeholder: 'Enter Full Name' },
              { label: 'Email Address', key: 'email', type: 'email', placeholder: 'Enter Email' },
              { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: 'Enter Phone Number' },
              { label: 'Date of Birth', key: 'dateOfBirth', type: 'text', placeholder: 'mm/dd/yyyy', icon: Calendar },
              { label: 'Driver License Number', key: 'licenseNumber', type: 'text', placeholder: 'Enter Driver License Number' },
              { label: 'Residential Address', key: 'address', type: 'text', placeholder: 'Enter Address' },
            ].map(({ label, key, type, placeholder, icon: Icon }) => (
              <div key={key}>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {label} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={type}
                    value={details[key]}
                    onChange={(e) => setDetails({ ...details, [key]: e.target.value })}
                    className={`w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base ${
                      errors[key] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={placeholder}
                  />
                  {Icon && (
                    <Icon
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                  )}
                </div>
                {errors[key] && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors[key]}</p>}
              </div>
            ))}
          </div>
          {[
            { title: 'Upload Driving License', fields: ['Front', 'Back'] },
            { title: 'Photos of Driving License of Policy Holder', fields: ['Front', 'Back'] },
            { title: 'Photos of Driving License of Main Driver', fields: ['Front', 'Back'] },
            { title: 'Photos of Driving License of Additional Driver', fields: ['Front', 'Back'], optional: true },
            { title: 'Vehicle Documentation', fields: ['Certificate of Registration', 'Driver Accreditation Certificate'] },
            { title: 'Car Photos - All Four Sides', fields: ['Front View', 'Back View', 'Left Side', 'Right Side'] },
            { title: 'Odometer Photo', fields: ['Odometer Photo'] },
          ].map(({ title, fields, optional }) => (
            <div key={title} className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                {title} {optional && <span className="text-gray-500 text-xs sm:text-sm">(Optional)</span>}
              </h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">
                Please upload clear and well-lit images.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {fields.map((field) => (
                  <div key={field}>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      {field} {!optional && <span className="text-red-500">*</span>}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 text-center bg-gray-50">
                      <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 text-xs sm:text-sm">
                        Choose File
                      </button>
                      <p className="text-xs text-gray-500 mt-1 sm:mt-2">No file chosen</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm sm:text-base"
          >
            Next Step →
          </button>
        </div>

        <div className="w-full sm:w-80 lg:w-96">
          <div className="bg-blue-50 border border-blue-200 p-4 sm:p-5 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <Info className="text-white" size={12} />
              </div>
              <h3 className="font-medium text-sm sm:text-base">Tips & Info</h3>
            </div>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Make sure your personal details match your official documents.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                We'll use this information to contact you and verify your eligibility.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Date of birth helps determine your insurance plan.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const InsurancePlanStep = ({ setStep }) => {
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };

    const generateCalendar = (currentDate, onDateSelect, onClose) => {
      const today = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const startDate = new Date(firstDayOfMonth);
      startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
      const days = [];
      const current = new Date(startDate);

      while (current <= lastDayOfMonth || current.getDay() !== 0) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }

      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];

      const goToPrevMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        generateCalendar(newDate, onDateSelect, onClose);
      };

      const goToNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        generateCalendar(newDate, onDateSelect, onClose);
      };

      return (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3 sm:p-4 z-50 w-64 sm:w-80">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <button
              onClick={goToPrevMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              ←
            </button>
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
              {monthNames[month]} {year}
            </h3>
            <button
              onClick={goToNextMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 p-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const isCurrentMonth = day.getMonth() === month;
              const isToday = day.toDateString() === today.toDateString();

              return (
                <button
                  key={index}
                  onClick={() => {
                    onDateSelect(day.toISOString().split('T')[0]);
                    onClose();
                  }}
                  className={`
                    p-1 sm:p-2 text-xs sm:text-sm rounded hover:bg-blue-100 transition-colors
                    ${isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}
                    ${isToday ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                  `}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end mt-3 sm:mt-4">
            <button
              onClick={onClose}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      );
    };

    return (
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full p-4 sm:p-6">
        <div className="flex-1 bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-gray-800">Choose Your Cover Plan</h2>
          <hr className="border-gray-300 mb-3 sm:mb-4" />
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Select the plan that fits your needs and budget. Comprehensive protection tailored to your needs.
          </p>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="w-full sm:w-80 lg:w-96">
              <div className="bg-white border-2 border-blue-500 rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">Comprehensive</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">Our most popular choice</p>
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="mb-3 sm:mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">$4789</span>
                    <span className="text-gray-400 line-through text-sm sm:text-base">$5180</span>
                    <span className="text-xs sm:text-sm text-gray-500 ml-auto">1 year policy</span>
                  </div>
                </div>

                <button className="w-full bg-blue-500 text-white py-2 sm:py-3 rounded-lg font-medium mb-4 sm:mb-6 hover:bg-blue-600 transition-colors text-sm sm:text-base">
                  Select Plan
                </button>

                <div>
                  <h4 className="font-medium mb-3 sm:mb-4 text-gray-800 text-sm sm:text-base">6 Benefits</h4>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      'Full Comprehensive Coverage',
                      'Road Side Assistance',
                      'Car Damages',
                      'Third Party Liabilities Cover',
                      'Zero Depreciation',
                      'Accident Cover for Passengers',
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="text-blue-500 mr-2 sm:mr-3 flex-shrink-0" size={14} />
                        <span className="text-xs sm:text-sm text-gray-700 flex-1">{benefit}</span>
                        <HelpCircle className="text-gray-400 ml-2 flex-shrink-0 cursor-pointer" size={12} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="relative">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Policy Start Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      value={formatDate(startDate)}
                      readOnly
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-sm sm:text-base"
                      onClick={() => {
                        setShowStartCalendar(!showStartCalendar);
                        setShowEndCalendar(false);
                      }}
                    />
                    <Calendar
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                      size={16}
                      onClick={() => {
                        setShowStartCalendar(!showStartCalendar);
                        setShowEndCalendar(false);
                      }}
                    />
                    {showStartCalendar &&
                      generateCalendar(new Date(), setStartDate, () => setShowStartCalendar(false))}
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Policy End Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="mm/dd/yyyy"
                      value={formatDate(endDate)}
                      readOnly
                      className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer text-sm sm:text-base"
                      onClick={() => {
                        setShowEndCalendar(!showEndCalendar);
                        setShowStartCalendar(false);
                      }}
                    />
                    <Calendar
                      className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                      size={16}
                      onClick={() => {
                        setShowEndCalendar(!showEndCalendar);
                        setShowStartCalendar(false);
                      }}
                    />
                    {showEndCalendar &&
                      generateCalendar(new Date(), setEndDate, () => setShowEndCalendar(false))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-80 lg:w-96">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6 shadow-md">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <Info className="text-white" size={12} />
              </div>
              <h3 className="font-medium text-sm sm:text-base text-gray-800">Tips & Info</h3>
            </div>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Compare plans carefully to choose the best coverage.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Ensure policy dates align with your needs.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const SummaryStep = () => {
    const vehicleRego = "ABC123";
    const personalDetails = {
      fullName: "Jackson Smith",
      email: "jackson1234@gmail.com",
      phone: "+645678947",
      dateOfBirth: "May 23, 1996",
      licenseNumber: "1234344llig89",
      address: "7 Collins Street, Melbourne, VIC 3000",
    };

    return (
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 w-full p-4 sm:p-6 bg-gray-50">
        <div className="flex-1">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Review Your Details</h1>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Select the plan that fits your needs and budget. Comprehensive protection tailored to your needs. Compare plans and find the perfect coverage for your peace of mind.
          </p>

          <div className="bg-white border shadow-md border-gray-200 rounded-lg mb-4">
            <div className="flex justify-between items-center px-4 py-3 bg-blue-100 border-b border-blue-200 rounded-t-lg">
              <h3 className="font-medium text-gray-800 text-sm sm:text-base">Vehicle Info</h3>
              <button className="flex items-center text-blue-500 text-xs sm:text-sm hover:text-blue-600">
                <Edit size={14} className="mr-1" />
                Edit
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <div className="text-gray-800 font-medium mb-1">Vehicle:</div>
                  <div className="text-gray-500">Tesla Model S</div>
                </div>
                <div>
                  <div className="text-gray-800 font-medium mb-1">Color:</div>
                  <div className="text-gray-500">White</div>
                </div>
                <div>
                  <div className="text-gray-800 font-medium mb-1">Fuel Type:</div>
                  <div className="text-gray-500">Electric</div>
                </div>
                <div>
                  <div className="text-gray-800 font-medium mb-1">Vehicle Rego#</div>
                  <div className="text-gray-500">{vehicleRego.toUpperCase()}</div>
                </div>
                <div>
                  <div className="text-gray-800 font-medium mb-1">Engine Type:</div>
                  <div className="text-gray-500">Hybrid</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="bg-white shadow-md border border-gray-200 rounded-lg flex-1">
              <div className="flex justify-between items-center px-4 py-3 bg-blue-100 border-b border-blue-200 rounded-t-lg">
                <h3 className="font-medium text-gray-800 text-sm sm:text-base">Personal Details</h3>
                <button className="flex items-center text-blue-500 text-xs sm:text-sm hover:text-blue-600">
                  <Edit size={14} className="mr-1" />
                  Edit
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 sm:gap-y-4 text-xs sm:text-sm">
                  <div>
                    <div className="text-gray-800 font-medium mb-1">Full Name:</div>
                    <div className="text-gray-500">{personalDetails.fullName}</div>
                  </div>
                  <div>
                    <div className="text-gray-800 font-medium mb-1">Email Address:</div>
                    <div className="text-gray-500">{personalDetails.email}</div>
                  </div>
                  <div>
                    <div className="text-gray-800 font-medium mb-1">Phone Number:</div>
                    <div className="text-gray-500">{personalDetails.phone}</div>
                  </div>
                  <div>
                    <div className="text-gray-800 font-medium mb-1">Date of Birth</div>
                    <div className="text-gray-500">{personalDetails.dateOfBirth}</div>
                  </div>
                  <div>
                    <div className="text-gray-800 font-medium mb-1">Driver License Number:</div>
                    <div className="text-gray-500">{personalDetails.licenseNumber}</div>
                  </div>
                  <div>
                    <div className="text-gray-800 font-medium mb-1">Residential Address:</div>
                    <div className="text-gray-500">{personalDetails.address}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md border border-gray-200 rounded-lg w-full sm:w-80 lg:w-96">
              <div className="flex justify-between items-center px-4 py-3 bg-blue-100 border-b border-blue-200 rounded-t-lg">
                <h3 className="font-medium text-gray-800 text-sm sm:text-base">Insurance Plan</h3>
                <button className="flex items-center text-blue-500 text-xs sm:text-sm hover:text-blue-600">
                  <Edit size={14} className="mr-1" />
                  Edit
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-800">Essential Plan</span>
                    <span className="text-gray-800 font-medium">$2189</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Additional Coverages</span>
                    <span className="text-gray-800 font-medium">$67</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Subtotal</span>
                    <span className="text-gray-800 font-medium">$2234</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800">Discount</span>
                    <span className="text-green-600 font-medium">-$120</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 mt-3 sm:mt-4">
                    <div className="flex justify-between font-bold text-sm sm:text-base">
                      <span className="text-gray-800">Total Amount</span>
                      <span className="text-gray-800">$2234</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border shadow-md border-gray-200 rounded-lg mb-6 sm:mb-8">
            <div className="px-4 py-3 bg-blue-100 border-b border-blue-200 rounded-t-lg">
              <h3 className="font-medium text-gray-800 text-sm sm:text-base">Policy Duration</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <div className="text-gray-800 font-medium mb-1">Policy Start Date:</div>
                  <div className="text-gray-500">05/03/2024</div>
                </div>
                <div>
                  <div className="text-gray-800 font-medium mb-1">Policy End Date:</div>
                  <div className="text-gray-500">05/03/2024</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-4 sm:pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg sm:text-xl font-semibold text-gray-800">Total Amount</span>
              <span className="text-lg sm:text-xl font-semibold text-gray-800">$2234</span>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-80 lg:w-96">
          <div className="bg-blue-50 border border-blue-200 p-4 sm:p-5 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <Info className="text-white" size={12} />
              </div>
              <h3 className="font-medium text-sm sm:text-base text-gray-800">Tips & Info</h3>
            </div>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                Make sure your personal details match your official documents.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                We'll use this information to contact you and verify your eligibility.
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                Date of birth helps determine your insurance plan.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const Payment = ({ setStep }) => {
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [selectedCard, setSelectedCard] = useState('visa');

    return (
      <div className="w-full p-4 sm:p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Payment Summary</h2>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">HiCar Insurance - 1 Year Policy</span>
                  <span className="font-medium text-gray-800">$240.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Coverage Period</span>
                  <span className="font-medium text-gray-800">12 months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Taxes & fees (8%)</span>
                  <span className="font-medium text-gray-800">$50</span>
                </div>
                <hr className="my-3 sm:my-4" />
                <div className="flex justify-between items-center text-sm sm:text-base font-semibold">
                  <span className="text-gray-800">Total Amount</span>
                  <span className="text-gray-800">$290.00</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 flex items-center text-xs sm:text-sm text-gray-500">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-2 flex items-center justify-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                Your payment is secure & encrypted
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Choose a Payment Method</h2>
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <input
                    type="radio"
                    id="card-payment"
                    name="payment-method"
                    value="card"
                    checked={selectedPayment === 'card'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label
                    htmlFor="card-payment"
                    className="ml-2 sm:ml-3 text-gray-800 font-medium text-sm sm:text-base"
                  >
                    Debit/Credit card
                  </label>
                </div>
                <div className="ml-6 sm:ml-7 mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">Accepted cards: Mastercard, VISA, Amex</p>
                  <div className="flex space-x-2 mb-3 sm:mb-4">
                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">V</span>
                    </div>
                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-red-500 rounded"></div>
                    <div className="w-6 h-4 sm:w-8 sm:h-5 bg-blue-500 rounded"></div>
                  </div>
                </div>

                {selectedPayment === 'card' && (
                  <div className="ml-6 sm:ml-7 space-y-3">
                    {[
                      { id: 'visa', name: 'Visa •••• 1234', color: 'bg-blue-600' },
                      { id: 'mastercard', name: 'MasterCard •••• 1234', color: 'bg-gradient-to-r from-red-500 to-yellow-500' },
                    ].map(({ id, name, color }) => (
                      <div
                        key={id}
                        className={`border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition-colors ${
                          selectedCard === id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedCard(id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2" />
                              <span className="font-medium text-gray-800 text-sm sm:text-base">{name}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">Exp: 12/25</p>
                          </div>
                          <div className={`w-6 h-4 sm:w-8 sm:h-5 ${color} rounded flex items-center justify-center`}>
                            {id === 'visa' && <span className="text-white text-xs font-bold">V</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 text-blue-500 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-center text-sm sm:text-base">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Card
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-6 sm:mb-8">
                <div className="flex items-center mb-2 sm:mb-3">
                  <input
                    type="radio"
                    id="bank-transfer"
                    name="payment-method"
                    value="bank"
                    checked={selectedPayment === 'bank'}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 text-blue-500"
                  />
                  <label
                    htmlFor="bank-transfer"
                    className="ml-2 sm:ml-3 text-gray-800 font-medium flex items-center text-sm sm:text-base"
                  >
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Direct Bank Transfer
                  </label>
                </div>
                <p className="ml-6 sm:ml-7 text-xs sm:text-sm text-gray-500">
                  Please contact your bank for transfer details.
                </p>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 sm:px-6 rounded-lg transition-colors text-sm sm:text-base">
                Complete Payment - $290
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <VehicleInfoStep setStep={setCurrentStep} />;
      case 2:
        return <PersonalDetail setStep={setCurrentStep} details={personalDetails} setDetails={setPersonalDetails} />;
      case 3:
        return <InsurancePlanStep setStep={setCurrentStep} />;
      case 4:
        return <SummaryStep setStep={setCurrentStep} />;
      case 5:
        return <Payment setStep={setCurrentStep} />;
      default:
        return <VehicleInfoStep setStep={setCurrentStep} />;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-200xl mx-auto p-4 sm:p-6">
        <div className="flex items-center mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
            {currentStep <= 3 ? 'Club Membership' : 'Buy Club Membership'}
          </h1>
        </div>

        <StepIndicator />
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">{renderCurrentStep()}</div>

        <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center text-gray-900 hover:text-blue-500 transition-colors text-sm sm:text-base ${
              currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep === steps.length}
            className={`text-white bg-blue-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center text-sm sm:text-base ${
              currentStep === steps.length ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next Step <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubMembership;