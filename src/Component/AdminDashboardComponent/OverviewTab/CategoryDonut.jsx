import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const CategoryDonut = ({ data, total }) => {
    return (
        <div className='bg-white border border-gray-100 rounded-2xl p-5 shadow-sm'>
            <h3 className='font-extrabold text-gray-900 mb-4'>Service Requests by Category</h3>
            <div className='flex flex-col sm:flex-row items-center gap-6'>
                <div className='relative w-40 h-40 shrink-0'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <PieChart>
                            <Pie data={data} dataKey='value' innerRadius={50} outerRadius={70} paddingAngle={2}>
                                {data.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className='absolute inset-0 flex flex-col items-center justify-center'>
                        <p className='text-2xl font-extrabold text-gray-900'>{total}</p>
                        <p className='text-gray-400 text-xs'>Total</p>
                    </div>
                </div>
                <div className='flex-1 flex flex-col gap-2.5'>
                    {data.map((item) => (
                        <div key={item.name} className='flex items-center justify-between text-sm'>
                            <div className='flex items-center gap-2'>
                                <span className='w-2.5 h-2.5 rounded-full shrink-0' style={{ backgroundColor: item.color }}></span>
                                <span className='text-gray-700'>{item.name}</span>
                            </div>
                            <span className='text-gray-500 text-xs'>{item.value} ({item.percent}%)</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryDonut