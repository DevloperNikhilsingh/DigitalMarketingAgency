import React from 'react'
import { ArrowRight, TrendingUp } from 'lucide-react'

const PortfolioCard = ({ item }) => {
    const Icon = item.icon

    return (
        <div className='block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group
        transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl'
        >
            {/* Image */}
            <div className='relative h-56 overflow-hidden'>
                <img
                    src={item.image}
                    alt={item.title}
                    className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
                />
                <div className={`absolute bottom-4 left-4 w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center shadow-md`}>
                    <Icon className='text-white' size={20} />
                </div>
            </div>

            {/* Content */}
            <div className='p-6'>
                <h3 className='text-lg font-extrabold text-gray-900 mb-2'>
                    {item.title}
                </h3>
                <p className='text-gray-500 text-sm mb-5'>
                    {item.desc}
                </p>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1.5 text-sm font-bold'>
                        <TrendingUp className='text-green-500' size={16} />
                        <span className='text-green-500'>{item.stat}</span>
                        <span className='text-gray-500 font-medium'>{item.statLabel}</span>
                    </div>
                    {/* <div className={`w-9 h-9 rounded-full ${item.arrowBg} flex items-center justify-center
                        transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-rotate-45`}>
                        <ArrowRight className={item.arrowColor} size={16} />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default PortfolioCard