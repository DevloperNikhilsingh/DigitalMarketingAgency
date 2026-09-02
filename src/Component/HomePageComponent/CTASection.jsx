import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const CTASection = () => {
    const navigate = useNavigate();
    return (
        <section className='w-full bg-neutral-50 px-4 py-16 md:py-24'>
            <div className='max-w-6xl mx-auto relative bg-black rounded-3xl overflow-hidden px-8 py-12 md:py-16 text-center'>

                {/* Decorative corner accents */}
                <div className='absolute top-0 left-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl'></div>
                <div className='absolute bottom-0 right-0 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl'></div>

                <h2 className='relative z-10 text-2xl md:text-4xl font-extrabold text-white'>
                    Ready to Grow Your Business?
                </h2>
                <p className='relative z-10 text-gray-400 text-sm md:text-base mt-3'>
                    Let's build something amazing together.
                </p>
                
                <button
                onClick={() => navigate("/contact#contact-form")}
                className='relative z-10 inline-flex items-center gap-2 bg-yellow-400 text-black font-bold text-sm px-6 py-3 rounded-md mt-7 shadow-md
                    transition-all duration-300 ease-out hover:bg-yellow-300 hover:-translate-y-1 hover:shadow-yellow-400/40 hover:shadow-xl active:scale-95'>
                    Get a Free Consultation <ArrowRight size={16} />
                </button>
            </div>
        </section>
    )
}

export default CTASection