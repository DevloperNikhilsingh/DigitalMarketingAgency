import React from 'react'
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react'

const TestimonialStrip = () => {
    return (
        <div className='bg-neutral-50 px-4 md:px-6 pb-6'>
            <div className='max-w-5xl mx-auto bg-black rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6'>
                <Quote className='text-yellow-400 flex-shrink-0' size={32} fill='currentColor' />
                <p className='text-white text-sm md:text-base flex-1'>
                    They didn't just run campaigns, they understood our brand and helped us grow it.
                </p>
                <div className='flex items-center gap-3 flex-shrink-0'>
                    <img
                        src='https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80'
                        alt='Rohan Malhotra'
                        className='w-9 h-9 rounded-full object-cover'
                    />
                    <div>
                        <p className='text-white text-xs font-bold'>Rohan Malhotra</p>
                        <p className='text-gray-500 text-xs'>CEO, InnovateX</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 flex-shrink-0'>
                    <button className='w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10'>
                        <ArrowLeft size={14} />
                    </button>
                    <button className='w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black hover:bg-yellow-300'>
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TestimonialStrip