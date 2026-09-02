import React, { useState } from 'react'
import { X } from 'lucide-react'
import { serviceCategories, deliveryTimeOptions } from '../../../data/myServicesData'

const AddServiceModal = ({ onClose, onAdd }) => {
    const [form, setForm] = useState({
        title: '',
        category: serviceCategories[0],
        deliveryTime: deliveryTimeOptions[0],
        description: '',
    })
    const [errors, setErrors] = useState({})

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        setErrors((prev) => ({ ...prev, [field]: '' }))
    }

    const validate = () => {
        const newErrors = {}
        if (!form.title.trim()) newErrors.title = 'Required'
        if (!form.description.trim()) newErrors.description = 'Required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return

        onAdd({
            id: `SRV-${Date.now()}`,
            title: form.title.trim(),
            category: form.category,
            deliveryTime: form.deliveryTime,
            description: form.description.trim(),
            status: 'Active',
            requests: 0,
            createdDate: new Date().toISOString().split('T')[0],
        })
        onClose()
    }

    const inputClass = (field) =>
        `w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-colors duration-300
        ${errors[field] ? 'border-red-400' : 'border-gray-200 focus:border-amber-400'}`

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
            <div onClick={onClose} className='absolute inset-0 bg-black/50 backdrop-blur-sm' />

            <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto'>
                <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white'>
                    <h3 className='font-extrabold text-gray-900'>Add New Service</h3>
                    <button onClick={onClose} className='p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200'>
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='p-5 flex flex-col gap-3.5'>
                    <input
                        value={form.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder='Service title (e.g. SEO Optimization Package)'
                        className={inputClass('title')}
                    />

                    <select
                        value={form.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className='w-full px-3 py-2.5 text-sm font-semibold border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300 bg-white'
                    >
                        {serviceCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <select
                        value={form.deliveryTime}
                        onChange={(e) => handleChange('deliveryTime', e.target.value)}
                        className='w-full px-3 py-2.5 text-sm font-semibold border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300 bg-white'
                    >
                        {deliveryTimeOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>

                    <textarea
                        value={form.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder='Short description of the service...'
                        rows={3}
                        className={`${inputClass('description')} resize-none`}
                    />

                    <div className='flex gap-3 pt-1'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='flex-1 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='flex-1 py-2.5 text-sm font-bold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors duration-300'
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddServiceModal