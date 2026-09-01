import React from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { team } from '../../data/teamData'

const OurTeam = () => {
    return (
        <div className='bg-neutral-50 py-20 px-4 md:px-6'>
            <div className='max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-start'>

                <div>
                    <span className='inline-flex items-center gap-2 text-yellow-500 text-xs font-bold tracking-widest mb-4'>
                        <span className='w-1.5 h-1.5 rounded-full bg-yellow-500'></span>
                        MEET OUR TEAM
                    </span>
                    <h2 className='text-3xl font-extrabold text-gray-900 leading-tight'>
                        People Behind Your <span className='text-yellow-500'>Success.</span>
                    </h2>
                    <p className='text-gray-500 text-sm mt-4'>
                        Our team of strategists, designers, marketers, and analysts work together to turn ideas into impactful digital experiences.
                    </p>
                </div>

                <div className='md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {team.map((member) => (
                        <div key={member.name} className='relative rounded-xl overflow-hidden group'>
                            <img src={member.image} alt={member.name} className='w-full h-48 object-cover' />
                            <div className='absolute top-2 right-2 w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center'>
                               <FaLinkedin className='text-black' size={13} />
                            </div>
                            <div className='bg-white p-3'>
                                <p className='font-bold text-gray-900 text-sm'>{member.name}</p>
                                <p className='text-gray-400 text-xs'>{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OurTeam