import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Play, Users } from 'lucide-react'

const stats = [
    { icon: Users, value: '250+', label: 'Happy Clients' },
    { icon: Users, value: '500+', label: 'Projects Completed' },
    { icon: Users, value: '98%', label: 'Client Satisfaction' },
    { icon: Users, value: '10+', label: 'Years of Experience' },
]

const AboutHero = () => {
    return (
        <div className='relative bg-black pt-14 pb-32 px-4 md:px-6 overflow-hidden'>
            <div className='max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10'>
                <div>
                    <span className='inline-block border border-yellow-400/40 text-yellow-400 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-6'>
                        ABOUT US
                    </span>

                    <h1 className='text-4xl md:text-5xl font-extrabold text-white leading-tight'>
                        We're More Than Marketers. <br />
                        <span className='text-yellow-400'>We're Growth Partners.</span>
                    </h1>

                    <p className='text-gray-400 text-sm md:text-base mt-5 max-w-md'>
                        We help brands unlock their true potential with data-driven strategies, creative ideas, and technology that delivers measurable growth.
                    </p>

                    <div className='flex items-center gap-6 mt-8'>
                        <Link
                            to='/contact'
                            className='flex items-center gap-2 bg-yellow-400 text-black font-bold text-sm px-6 py-3 rounded-md shadow-md
                                transition-all duration-300 ease-out hover:bg-yellow-300 hover:-translate-y-0.5 hover:shadow-yellow-400/40 hover:shadow-xl active:scale-95'
                        >
                            Let's Work Together <ArrowRight size={16} />
                        </Link>
                        <button className='flex items-center gap-2 text-white text-sm font-semibold group'>
                            <div className='w-9 h-9 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-yellow-400 group-hover:border-yellow-400'>
                                <Play className='text-white transition-colors duration-300 group-hover:text-black' size={13} />
                            </div>
                            Watch Our Story
                        </button>
                    </div>
                </div>

                <div className='relative flex justify-center md:justify-end'>
                    <img
                        src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80'
                        alt='Our team'
                        className='rounded-2xl w-full max-w-md object-cover shadow-2xl'
                    />
                    <div className='absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-black border-2 border-yellow-400/40 flex flex-col items-center justify-center text-center'>
                        <span className='text-yellow-400 font-extrabold text-lg'>10+</span>
                        <span className='text-gray-300 text-[10px]'>Years of<br />Experience</span>
                    </div>
                </div>
            </div>

            {/* Stats bar */}
            <div className='max-w-5xl mx-auto relative z-20 -mb-20 mt-12 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl
                grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-10 py-8'>
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.label} className='text-center'>
                            <div className='w-11 h-11 rounded-full bg-white/5 border border-yellow-400/30 flex items-center justify-center mx-auto mb-3'>
                                <Icon className='text-yellow-400' size={18} />
                            </div>
                            <p className='text-white text-xl font-extrabold'>{stat.value}</p>
                            <p className='text-gray-400 text-xs mt-1'>{stat.label}</p>
                            <div className='w-6 h-0.5 bg-yellow-400 mx-auto mt-2'></div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AboutHero