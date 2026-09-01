import React from 'react'
import { Link } from 'react-router-dom'
import { Rocket, ArrowRight } from 'lucide-react'

const AboutCTA = () => {
    return (
        <div className='bg-neutral-50 px-4 md:px-6 pb-16'>
            <div className='max-w-5xl mx-auto bg-black rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6'>
                <div className='flex items-center gap-4'>
                    <div className='w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0'>
                        <Rocket className='text-yellow-400' size={18} />
                    </div>
                    <div>
                        <h3 className='text-white font-extrabold text-lg'>
                            Let's Build Something <span className='text-yellow-400'>Amazing Together!</span>
                        </h3>
                        <p className='text-gray-400 text-sm mt-1'>
                            Have a project in mind? Let's discuss how we can help your brand grow.
                        </p>
                    </div>
                </div>
                <Link
                    to='/contact'
                    className='flex-shrink-0 flex items-center gap-2 bg-yellow-400 text-black font-bold text-sm px-6 py-3 rounded-md
                        transition-all duration-300 ease-out hover:bg-yellow-300 hover:-translate-y-0.5 active:scale-95'
                >
                    Get In Touch <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    )
}

export default AboutCTA