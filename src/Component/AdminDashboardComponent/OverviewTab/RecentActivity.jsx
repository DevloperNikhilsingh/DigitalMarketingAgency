import React from 'react'
import { Layers, MessageCircle, Briefcase, DollarSign } from 'lucide-react'

const iconMap = {
    request: { icon: Layers, bg: 'bg-amber-50', color: 'text-amber-500' },
    enquiry: { icon: MessageCircle, bg: 'bg-green-50', color: 'text-green-500' },
    employer: { icon: Briefcase, bg: 'bg-indigo-50', color: 'text-indigo-500' },
    payment: { icon: DollarSign, bg: 'bg-emerald-50', color: 'text-emerald-500' },
}

const RecentActivity = ({ activity }) => {
    return (
        <div className='bg-white border border-gray-100 rounded-2xl p-5 shadow-sm'>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='font-extrabold text-gray-900'>Recent Activity</h3>
                <button className='text-xs font-semibold border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 transition-colors duration-300'>
                    View All
                </button>
            </div>
            <div className='flex flex-col divide-y divide-gray-50'>
                {activity.map((item, i) => {
                    const { icon: Icon, bg, color } = iconMap[item.type]
                    return (
                        <div key={i} className='flex items-center justify-between py-3'>
                            <div className='flex items-center gap-3'>
                                <div className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                                    <Icon className={color} size={16} />
                                </div>
                                <div>
                                    <p className='text-gray-900 text-sm font-bold'>{item.title}</p>
                                    <p className='text-gray-400 text-xs'>{item.desc}</p>
                                </div>
                            </div>
                            <span className='text-gray-400 text-xs shrink-0'>{item.time}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RecentActivity