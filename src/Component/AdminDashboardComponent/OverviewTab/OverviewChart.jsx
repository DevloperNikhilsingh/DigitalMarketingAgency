import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
        <div className='bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg'>
            <p className='font-semibold'>{label}, 2025</p>
            <p className='flex items-center gap-1 mt-1'>
                <span className='w-1.5 h-1.5 rounded-full bg-yellow-400'></span>
                {payload[0].value} Requests
            </p>
        </div>
    )
}

const OverviewChart = ({ data }) => {
    return (
        <div className='bg-white border border-gray-100 rounded-2xl p-5 shadow-sm'>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='font-extrabold text-gray-900'>Overview</h3>
                <select className='text-xs font-semibold text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 outline-none'>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                </select>
            </div>
            <div className='h-72'>
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id='colorRequests' x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='0%' stopColor='#facc15' stopOpacity={0.35} />
                                <stop offset='100%' stopColor='#facc15' stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#f3f4f6' />
                        <XAxis dataKey='date' tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type='monotone' dataKey='requests' stroke='#facc15' strokeWidth={2.5} fill='url(#colorRequests)' />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default OverviewChart