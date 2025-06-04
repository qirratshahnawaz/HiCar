import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const SignupPage = () => {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [userType, setUserType] = useState(() => searchParams.get('type') || 'driver')
  const [showPassword, setShowPassword] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneEmail, setPhoneEmail] = useState('')
  const [password, setPassword] = useState('')

  const [termsAgreed, setTermsAgreed] = useState(false)
  const [promotionsAgreed, setPromotionsAgreed] = useState(false)

  const handleSocialSignup = (provider) => {
    if (!termsAgreed) {
      alert('You must agree to the Terms & Conditions')
      return
    }

    signup({
      name: 'Social User',
      email: 'social@example.com',
      userType,
      provider
    })

    navigate('/home')
  }

  const handleEmailSignup = (e) => {
    e.preventDefault()

    if (!firstName || !lastName || !phoneEmail || !password) {
      alert('Please fill in all required fields')
      return
    }

    if (!termsAgreed) {
      alert('You must agree to the Terms & Conditions')
      return
    }

    signup({
      name: `${firstName} ${lastName}`,
      email: phoneEmail,
      userType,
      hasPromoConsent: promotionsAgreed
    })

    navigate('/home')
  }

  const accentColor = userType === 'owner' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-primary-600 hover:bg-primary-700'
  const bgClass = userType === 'owner' ? 'bg-[url("/bg2.jpeg")] bg-cover' : 'ocean-bg'

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <div className="container mx-auto px-4">
        <nav className="py-6 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-1">
            <span className=" text-2xl text-white">Hi<span className="text-white">Car</span></span>
          </Link>
          <Link
            to="/login"
            className={`${accentColor} text-white font-medium py-2 px-6 rounded-full transition-all duration-200`}
          >
            Login
          </Link>
        </nav>

        <div className="flex justify-center items-center min-h-[80vh] py-8">
          <motion.div
            className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

            <div className="flex mb-6">
              <button
                className={`flex-1 py-3 px-4 text-center rounded-l-lg transition-all ${userType === 'driver'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={() => setUserType('driver')}
              >
                Driver
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center rounded-r-lg transition-all ${userType === 'owner'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                onClick={() => setUserType('owner')}
              >
                Owner
              </button>
            </div>

            <form onSubmit={handleEmailSignup}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <input
                type="text"
                placeholder="Phone or Email"
                className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                value={phoneEmail}
                onChange={(e) => setPhoneEmail(e.target.value)}
              />

              <div className="mb-6 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff className="text-gray-500" /> : <FiEye className="text-gray-500" />}
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <button onClick={() => handleSocialSignup('google')} className="w-full flex items-center justify-center border border-gray-300 py-3 px-4 rounded-md mb-4 hover:bg-gray-50 transition-all">
                <FcGoogle className="text-xl mr-2" />
                <span>Sign Up with Google</span>
              </button>

              <button onClick={() => handleSocialSignup('apple')} className="w-full flex items-center justify-center border border-gray-300 py-3 px-4 rounded-md mb-4 hover:bg-gray-50 transition-all">
                <FaApple className="text-xl mr-2" />
                <span>Sign Up with Apple</span>
              </button>

              <button onClick={() => handleSocialSignup('facebook')} className="w-full flex items-center justify-center border border-gray-300 py-3 px-4 rounded-md mb-6 hover:bg-gray-50 transition-all">
                <FaFacebook className="text-xl mr-2 text-[#1877F2]" />
                <span>Sign Up with Facebook</span>
              </button>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 text-accent-500 focus:ring-accent-500 border-gray-300 rounded"
                    checked={termsAgreed}
                    onChange={() => setTermsAgreed(!termsAgreed)}
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <Link to="/terms" className={`${userType === 'owner' ? 'text-orange-500' : 'text-primary-600'}`}>Terms & Conditions</Link>
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="promotions"
                    className="h-4 w-4 text-accent-500 focus:ring-accent-500 border-gray-300 rounded"
                    checked={promotionsAgreed}
                    onChange={() => setPromotionsAgreed(!promotionsAgreed)}
                  />
                  <label htmlFor="promotions" className="ml-2 block text-sm text-gray-700">
                    I want to receive promotional messages
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full ${accentColor} text-white font-medium py-3 px-4 rounded-md transition-all duration-200`}
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account? <Link to="/login" className={`${userType === 'owner' ? 'text-orange-500' : 'text-primary-600'} font-medium`}>Login</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
