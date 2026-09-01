import React from 'react'
import { LineChart, Users, Rocket } from 'lucide-react'

const highlights = [
    { icon: LineChart, title: 'Smart Strategy', desc: 'Data-driven planning for real growth.' },
    { icon: Users, title: 'Targeted Reach', desc: 'Reach the right audience at the right time.' },
    { icon: Rocket, title: 'Real Results', desc: 'Turning engagement into loyal customers.' },
]

const ServiceHero = ({ badge, titleLine1, titleLine2, tagline }) => {
    return (
        <div className='relative bg-black pt-20 pb-24 px-4 md:px-6 overflow-hidden rounded-b-[3rem]'>
            <div className='max-w-3xl mx-auto text-center relative z-10'>
                <span className='inline-flex items-center gap-2 border border-yellow-400/40 text-yellow-400 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-6'>
                    <span className='w-1.5 h-1.5 rounded-full bg-yellow-400'></span>
                    {badge}
                    <span className='w-1.5 h-1.5 rounded-full bg-yellow-400'></span>
                </span>

                <h1 className='text-4xl md:text-6xl font-extrabold text-white leading-tight'>
                    {titleLine1} <br />
                    <span className='text-yellow-400'>{titleLine2}</span>
                </h1>

                <p className='text-gray-400 text-sm md:text-base mt-5 max-w-xl mx-auto'>
                    {tagline}
                </p>

                <div className='w-10 h-0.5 bg-yellow-400 mt-8 mb-10 mx-auto'></div>

                <div className='flex flex-wrap justify-center gap-8'>
                    {highlights.map((h) => {
                        const Icon = h.icon
                        return (
                            <div key={h.title} className='flex items-start gap-3 max-w-45 text-left'>
                                <div className='shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center'>
                                    <Icon className='text-yellow-400' size={16} />
                                </div>
                                <div>
                                    <p className='text-white text-xs font-bold'>{h.title}</p>
                                    <p className='text-gray-500 text-xs mt-0.5'>{h.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ServiceHero