import React from 'react'
import { Lightbulb, ShieldCheck, TrendingUp, Users, Heart } from 'lucide-react'

const values = [
    { icon: Lightbulb, title: 'Creativity', desc: 'Fresh ideas that make brands stand out.' },
    { icon: ShieldCheck, title: 'Transparency', desc: 'Honest communication at every step.' },
    { icon: TrendingUp, title: 'Results', desc: 'Focused on measurable growth and ROI.' },
    { icon: Users, title: 'Collaboration', desc: 'We grow together with our clients.' },
    { icon: Heart, title: 'Integrity', desc: "We do what's right, always." },
]

const OurValues = () => {
    return (
        <div className='bg-black py-20 px-4 md:px-6'>
            <div className='max-w-5xl mx-auto text-center'>
                <span className='inline-flex items-center gap-2 text-yellow-400 text-xs font-bold tracking-widest mb-4'>
                    <span className='w-1.5 h-1.5 rounded-full bg-yellow-400'></span>
                    OUR VALUES
                </span>
                <h2 className='text-3xl md:text-4xl font-extrabold text-white mb-14'>
                    The Principles That <span className='text-yellow-400'>Drive Us</span>
                </h2>

                <div className='flex flex-wrap justify-center gap-10'>
                    {values.map((value) => {
                        const Icon = value.icon
                        return (
                            <div key={value.title} className='flex flex-col items-center max-w-37.5 group'>
                                <div className='w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4
                                    transition-all duration-300 group-hover:bg-yellow-400 group-hover:border-yellow-400'>
                                    <Icon className='text-yellow-400 transition-colors duration-300 group-hover:text-black' size={22} />
                                </div>
                                <h3 className='text-white font-bold text-sm'>{value.title}</h3>
                                <p className='text-gray-500 text-xs mt-1'>{value.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default OurValues