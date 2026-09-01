import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye, Play } from 'lucide-react'

const OurStory = () => {
    return (
        <div className='bg-neutral-50 pt-28 pb-20 px-4 md:px-6'>
            <div className='max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start'>

                {/* Left text */}
                <div>
                    <span className='inline-flex items-center gap-2 text-yellow-500 text-xs font-bold tracking-widest mb-4'>
                        <span className='w-1.5 h-1.5 rounded-full bg-yellow-500'></span>
                        OUR STORY
                        <span className='w-6 h-px bg-yellow-300'></span>
                    </span>
                    <h2 className='text-3xl font-extrabold text-gray-900 leading-tight'>
                        Built on Passion. <br />
                        Driven by <span className='text-yellow-500'>Results.</span>
                    </h2>
                    <p className='text-gray-500 text-sm mt-4'>
                        We started with a simple belief – that every brand has a unique story to tell. Our mission is to amplify that story and deliver measurable growth.
                    </p>
                    <p className='text-gray-500 text-sm mt-3'>
                        From strategy to execution, we work closely with our clients as a true partner, not just a service provider.
                    </p>
                    <Link
                        to='/about'
                        className='inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-sm px-6 py-3 rounded-md mt-6
                            transition-all duration-300 ease-out hover:bg-gray-800 hover:-translate-y-0.5 active:scale-95'
                    >
                        Know More About Us <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Mission/Vision cards */}
                <div className='flex flex-col gap-4'>
                    <div className='bg-black rounded-2xl p-6'>
                        <div className='w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4'>
                            <Target className='text-yellow-400' size={18} />
                        </div>
                        <h3 className='text-white font-bold text-lg mb-2'>Mission</h3>
                        <p className='text-gray-400 text-sm'>
                            To empower businesses with innovative digital strategies that drive real growth.
                        </p>
                    </div>
                    <div className='bg-yellow-400 rounded-2xl p-6'>
                        <div className='w-10 h-10 rounded-lg bg-black/10 flex items-center justify-center mb-4'>
                            <Eye className='text-black' size={18} />
                        </div>
                        <h3 className='text-black font-bold text-lg mb-2'>Vision</h3>
                        <p className='text-black/70 text-sm'>
                            To be a global digital partner known for creativity, transparency, and results.
                        </p>
                    </div>
                </div>

                {/* Image */}
                <div className='relative'>
                    <img
                        src='https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&q=80'
                        alt='Our journey'
                        className='rounded-2xl w-full h-full object-cover'
                    />
                    <button className='absolute inset-0 flex items-center justify-center group'>
                        <div className='w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-xl
                            transition-transform duration-300 group-hover:scale-110'>
                            <Play className='text-black' size={20} fill='black' />
                        </div>
                    </button>
                    <span className='absolute bottom-3 right-4 text-white text-sm italic' style={{ fontFamily: 'cursive' }}>
                        Our Journey
                    </span>
                </div>
            </div>
        </div>
    )
}

export default OurStory