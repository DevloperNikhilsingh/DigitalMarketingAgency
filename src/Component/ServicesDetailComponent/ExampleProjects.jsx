import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const ExampleProjects = ({ examples }) => {
    return (
        <div className='max-w-5xl mx-auto px-4 md:px-6 py-16'>
            <div className='text-center mb-10'>
                <span className='inline-flex items-center gap-2 text-amber-500 text-xs font-bold tracking-widest mb-4'>
                    <span className='w-6 h-px bg-black'></span>
                    OUR WORK
                    <span className='w-6 h-px bg-black'></span>
                </span>
                <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900'>
                    Examples of <span className='text-amber-500'>our work</span>
                </h2>
                <p className='text-gray-400 text-sm mt-2'>
                    Creative strategies. <span className='text-yellow-500 font-semibold'>Real results.</span> Happy clients.
                </p>
            </div>

            <div className='grid md:grid-cols-3 gap-6'>
                {examples.map((ex) => (
                    <div key={ex.name} className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
                        <img src={ex.image} alt={ex.name} className='w-full h-40 object-cover' />
                        <div className='p-5'>
                            <h3 className='font-extrabold text-gray-900 text-base'>{ex.name}</h3>
                            <p className='text-gray-400 text-xs mt-1'>{ex.desc}</p>
                            <div className='flex items-center justify-between mt-4'>
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${ex.badgeBg} ${ex.badgeText}`}>
                                    {ex.result}
                                </span>
                                <div className={`w-8 h-8 rounded-full ${ex.arrowBg} flex items-center justify-center`}>
                                    <ArrowUpRight className={ex.arrowColor} size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExampleProjects