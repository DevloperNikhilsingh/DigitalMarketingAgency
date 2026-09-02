import React from 'react'
import { Search, Briefcase, Share2, Target } from 'lucide-react'

const icons = [
    { icon: Search, bg: 'bg-amber-50', color: 'text-amber-500' },
    { icon: Briefcase, bg: 'bg-blue-50', color: 'text-blue-500' },
    { icon: Share2, bg: 'bg-orange-50', color: 'text-orange-500' },
    { icon: Target, bg: 'bg-green-50', color: 'text-green-500' },
]

const TopServices = ({ services }) => {
    return (
        <div className='bg-white border border-gray-100 rounded-2xl p-5 shadow-sm'>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='font-extrabold text-gray-900'>Top Requested Services</h3>
                <button className='text-xs font-semibold border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 transition-colors duration-300'>
                    View All
                </button>
            </div>
            <div className='flex flex-col gap-5'>
                {services.map((service, i) => {
                    const { icon: Icon, bg, color } = icons[i]
                    const pct = (service.count / service.max) * 100
                    return (
                        <div key={service.name} className='flex items-center gap-3'>
                            <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                                <Icon className={color} size={16} />
                            </div>
                            <div className='flex-1'>
                                <p className='text-gray-900 text-sm font-bold mb-1.5'>{service.name}</p>
                                <div className='w-full h-1.5 bg-gray-100 rounded-full overflow-hidden'>
                                    <div className='h-full bg-yellow-400 rounded-full transition-all duration-700' style={{ width: `${pct}%` }}></div>
                                </div>
                            </div>
                            <span className='text-gray-900 text-sm font-bold shrink-0'>{service.count}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TopServices