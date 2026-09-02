import React from 'react'
import { Layers, MessageCircle, Users, IndianRupee, TrendingUp } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

const icons = { requests: Layers, enquiries: MessageCircle, employers: Users, revenue: IndianRupee }

const StatCard = ({ statKey, label, value, change, trend }) => {
    const Icon = icons[statKey]
    const chartData = trend.map((v, i) => ({ i, v }))

    return (
        <div className='bg-white border border-gray-100 rounded-2xl p-5 shadow-sm'>
            <div className='flex items-center gap-3 mb-3'>
                <div className='w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center shrink-0'>
                    <Icon className='text-amber-500' size={20} />
                </div>
                <div>
                    <p className='text-2xl font-extrabold text-gray-900'>{value}</p>
                    <p className='text-gray-500 text-xs'>{label}</p>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <span className='flex items-center gap-1 text-green-500 text-xs font-semibold'>
                    <TrendingUp size={12} /> {change}
                </span>
                <div className='w-16 h-6'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart data={chartData}>
                            <Line type='monotone' dataKey='v' stroke='#facc15' strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default StatCard