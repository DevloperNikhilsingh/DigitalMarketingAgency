import React, { useState } from 'react'
import { User, Mail, Phone, Building2, Send, ShieldCheck, Check, MessageSquare, Clock } from 'lucide-react'

const steps = ['Your Details', 'Our Review', "We'll Contact You"]

const ServiceRequestForm = ({ serviceName }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

   const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.phone || !formData.email) {
        setError('Please fill in your name, email and phone number.')
        return
    }

    console.log('Service request:', { ...formData, service: serviceName, createdAt: new Date().toISOString() })

    setSubmitted(true)
}

    return (
        <div className='bg-purple-50/40 py-12 md:py-16 px-4 md:px-6'>
            <div className='max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center'>

                {/* Left side */}
                <div className='order-1 md:order-1 text-center md:text-left'>
                    <span className='inline-flex items-center gap-2 border border-purple-200 text-purple-600 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full mb-6'>
                        <span className='w-1.5 h-1.5 rounded-full bg-purple-500'></span>
                        LET'S WORK TOGETHER
                    </span>

                    <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight'>
                        Request this <span className='text-purple-600'>service</span>
                    </h2>

                    <p className='text-gray-500 text-sm mt-4 max-w-xs mx-auto md:mx-0'>
                        Fill this out and our team will reach out to you within 24 hours.
                    </p>

                    <div className='flex flex-col gap-4 mt-8'>
                        <div className='flex items-center gap-3 justify-center md:justify-start'>
                            <div className='shrink-0 w-10 h-10 rounded-full bg-white border border-purple-100 shadow-sm flex items-center justify-center'>
                                <Clock className='text-purple-500' size={17} />
                            </div>
                            <div className='text-left'>
                                <p className='text-gray-900 text-sm font-bold'>Quick response</p>
                                <p className='text-gray-500 text-xs'>We reply within 24 hours.</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 justify-center md:justify-start'>
                            <div className='shrink-0 w-10 h-10 rounded-full bg-white border border-purple-100 shadow-sm flex items-center justify-center'>
                                <MessageSquare className='text-purple-500' size={17} />
                            </div>
                            <div className='text-left'>
                                <p className='text-gray-900 text-sm font-bold'>Personalized plan</p>
                                <p className='text-gray-500 text-xs'>Tailored to your business needs.</p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-8 inline-flex items-center gap-2 bg-purple-100/60 text-purple-700 text-xs font-medium px-4 py-2 rounded-full'>
                        <ShieldCheck size={14} />
                        We respect your privacy. Your information is safe with us.
                    </div>
                </div>

                {/* Right side - form */}
                <div className='order-2 md:order-2 bg-white rounded-2xl shadow-lg p-5 sm:p-8'>
                    {submitted ? (
                        <div className='text-center py-10'>
                            <div className='w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4'>
                                <Check className='text-green-600' size={26} />
                            </div>
                            <h3 className='text-gray-900 font-extrabold text-lg'>Request received!</h3>
                            <p className='text-gray-500 text-sm mt-2'>
                                Our team will contact you shortly on the number you provided.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                                <div>
                                    <label className='text-xs font-semibold text-gray-600 mb-1.5 block'>Your full name <span className='text-red-500'>*</span></label>
                                    <div className='flex items-center gap-2 border border-purple-200 rounded-lg px-3 py-2.5 focus-within:border-purple-400'>
                                        <User className='text-purple-400 shrink-0' size={16} />
                                        <input
                                            type='text'
                                            name='name'
                                            placeholder='John Doe'
                                            value={formData.name}
                                            onChange={handleChange}
                                            className='w-full text-sm outline-none min-w-0'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className='text-xs font-semibold text-gray-600 mb-1.5 block'>Email address <span className='text-red-500'>*</span></label>
                                    <div className='flex items-center gap-2 border border-purple-200 rounded-lg px-3 py-2.5 focus-within:border-purple-400'>
                                        <Mail className='text-purple-400 shrink-0' size={16} />
                                        <input
                                            type='email'
                                            name='email'
                                            placeholder='john@example.com'
                                            value={formData.email}
                                            onChange={handleChange}
                                            className='w-full text-sm outline-none min-w-0'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                                <div>
                                    <label className='text-xs font-semibold text-gray-600 mb-1.5 block'>Phone number <span className='text-red-500'>*</span></label>
                                    <div className='flex items-center gap-2 border border-purple-200 rounded-lg px-3 py-2.5 focus-within:border-purple-400'>
                                        <Phone className='text-purple-400 shrink-0' size={16} />
                                        <input
                                            type='tel'
                                            name='phone'
                                            placeholder='+91 98765 43210'
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className='w-full text-sm outline-none min-w-0'
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className='text-xs font-semibold text-gray-600 mb-1.5 block'>Business name (optional)</label>
                                    <div className='flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 focus-within:border-purple-400'>
                                        <Building2 className='text-gray-400 shrink-0' size={16} />
                                        <input
                                            type='text'
                                            name='businessName'
                                            placeholder='Acme Corp'
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            className='w-full text-sm outline-none min-w-0'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='mb-4'>
                                <label className='text-xs font-semibold text-gray-600 mb-1.5 block'>Tell us a bit about what you need</label>
                                <textarea
                                    name='message'
                                    rows={3}
                                    placeholder='We need help with social media management and ad campaigns.'
                                    value={formData.message}
                                    onChange={handleChange}
                                    className='w-full border border-purple-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-purple-400 resize-none'
                                />
                            </div>

                            {error && <p className='text-red-500 text-xs mb-3'>{error}</p>}

                            <button
                                type='submit'
                                className='w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-bold text-sm py-3 rounded-lg
                                transition-all duration-300 ease-out hover:bg-yellow-300 hover:-translate-y-0.5 active:scale-95'
                            >
                                Submit request <Send size={16} />
                            </button>

                            <div className='flex items-center justify-between mt-6'>
                                {steps.map((step, i) => (
                                    <React.Fragment key={step}>
                                        <div className='flex flex-col items-center'>
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                                                ${i === 0 ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                {i + 1}
                                            </div>
                                            <span className='text-[10px] text-gray-400 mt-1 text-center max-w-17.5'>{step}</span>
                                        </div>
                                        {i < steps.length - 1 && <div className='flex-1 h-px bg-gray-200 mx-2 mb-4'></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ServiceRequestForm