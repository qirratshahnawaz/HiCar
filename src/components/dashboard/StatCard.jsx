import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiUsers, FiCreditCard } from 'react-icons/fi'
import { FaCar } from 'react-icons/fa'
import { CarFront } from 'lucide-react'

const StatCard = ({ title, value, icon, trend, percentage }) => {
 const getIcon = () => {
  switch (icon) {
    case 'revenue':
      return <FiDollarSign className="text-accent-500"  /> 
    case 'customers':
      return <FiUsers className="text-accent-500"  /> 
    case 'cars':
      return <CarFront className="text-accent-500"  />
    case 'income':
      return <CarFront className="text-accent-500"  /> 
    default:
      return <FiDollarSign className="text-accent-500"  /> 
  }
}

  return (
    <div className="bg-white rounded-lg shadow-card p-6 ">
      <div className="flex items-center justify-between mb-3">
        <div className="bg-accent-50 p-3 rounded-lg">
          {getIcon()}
        </div>
        <div className={`flex items-center text-sm ${
          trend === 'up' ? 'text-green-600' : 'text-orange-500'
        }`}>
          
        </div>
      </div>
      <h3 className="text-gray-700 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

export default StatCard