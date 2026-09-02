import React, { useState } from 'react'
import { X, Upload, Plus, Trash2 } from 'lucide-react'
import { serviceCategories } from '../../../data/myServicesData'

const AddServiceModal = ({ onClose, onAdd }) => {
    const [form, setForm] = useState({
        // Card info
        title: '',
        category: serviceCategories[0],
        desc: '',
        icon: null,       // File object (svg/image)
        iconPreview: '',  // preview URL

        // Detail page info
        tagline: '',
        description: '',
        examples: [{ name: '', result: '', image: null, imagePreview: '' }],
    })
    const [errors, setErrors] = useState({})

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        setErrors((prev) => ({ ...prev, [field]: '' }))
    }

    const handleIconUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setForm((prev) => ({
            ...prev,
            icon: file,
            iconPreview: URL.createObjectURL(file),
        }))
        setErrors((prev) => ({ ...prev, icon: '' }))
    }

    const handleExampleChange = (index, field, value) => {
        setForm((prev) => {
            const updated = [...prev.examples]
            updated[index] = { ...updated[index], [field]: value }
            return { ...prev, examples: updated }
        })
    }

    const handleExampleImageUpload = (index, e) => {
        const file = e.target.files[0]
        if (!file) return
        setForm((prev) => {
            const updated = [...prev.examples]
            updated[index] = {
                ...updated[index],
                image: file,
                imagePreview: URL.createObjectURL(file),
            }
            return { ...prev, examples: updated }
        })
    }

    const addExample = () => {
        setForm((prev) => ({
            ...prev,
            examples: [...prev.examples, { name: '', result: '', image: null, imagePreview: '' }],
        }))
    }

    const removeExample = (index) => {
        setForm((prev) => ({
            ...prev,
            examples: prev.examples.filter((_, i) => i !== index),
        }))
    }

    const validate = () => {
        const newErrors = {}
        if (!form.title.trim()) newErrors.title = 'Required'
        if (!form.desc.trim()) newErrors.desc = 'Required'
        if (!form.icon) newErrors.icon = 'Required'
        if (!form.tagline.trim()) newErrors.tagline = 'Required'
        if (!form.description.trim()) newErrors.description = 'Required'

        form.examples.forEach((ex, i) => {
            if (!ex.name.trim() || !ex.result.trim() || !ex.image) {
                newErrors[`example-${i}`] = 'Required'
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return

        const slug = form.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

        onAdd({
            id: `SRV-${Date.now()}`,
            slug,
            title: form.title.trim(),
            category: form.category,
            desc: form.desc.trim(),
            icon: form.icon,
            tagline: form.tagline.trim(),
            description: form.description.trim(),
            examples: form.examples.map((ex) => ({
                name: ex.name.trim(),
                result: ex.result.trim(),
                image: ex.image,
            })),
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

            <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto'>
                <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10'>
                    <h3 className='font-extrabold text-gray-900'>Add New Service</h3>
                    <button onClick={onClose} className='p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200'>
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className='p-5 flex flex-col gap-5'>

                    {/* ---------- CARD INFO ---------- */}
                    <div className='flex flex-col gap-3.5'>
                        <p className='text-xs font-bold text-gray-400 uppercase tracking-wide'>Card details</p>

                        {/* Icon upload */}
                        <div>
                            <label className='flex items-center gap-3 cursor-pointer'>
                                <div className={`w-14 h-14 rounded-lg border flex items-center justify-center overflow-hidden bg-gray-50
                                    ${errors.icon ? 'border-red-400' : 'border-gray-200'}`}>
                                    {form.iconPreview ? (
                                        <img src={form.iconPreview} alt='icon preview' className='w-full h-full object-contain' />
                                    ) : (
                                        <Upload size={18} className='text-gray-400' />
                                    )}
                                </div>
                                <div>
                                    <span className='text-sm font-semibold text-gray-700'>Upload icon</span>
                                    <p className='text-xs text-gray-400'>SVG or image file</p>
                                </div>
                                <input
                                    type='file'
                                    accept='image/*,.svg'
                                    onChange={handleIconUpload}
                                    className='hidden'
                                />
                            </label>
                        </div>

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

                        <textarea
                            value={form.desc}
                            onChange={(e) => handleChange('desc', e.target.value)}
                            placeholder='Short description (shown on card)...'
                            rows={2}
                            className={`${inputClass('desc')} resize-none`}
                        />
                    </div>

                    {/* ---------- DETAIL PAGE INFO ---------- */}
                    <div className='flex flex-col gap-3.5 pt-1 border-t border-gray-100'>
                        <p className='text-xs font-bold text-gray-400 uppercase tracking-wide pt-3'>Detail page content</p>

                        <input
                            value={form.tagline}
                            onChange={(e) => handleChange('tagline', e.target.value)}
                            placeholder='Tagline (e.g. Improve rankings and drive traffic)'
                            className={inputClass('tagline')}
                        />

                        <textarea
                            value={form.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder='Full description shown on the detail page...'
                            rows={4}
                            className={`${inputClass('description')} resize-none`}
                        />
                    </div>

                    {/* ---------- EXAMPLES ---------- */}
                    <div className='flex flex-col gap-3.5 pt-1 border-t border-gray-100'>
                        <div className='flex items-center justify-between pt-3'>
                            <p className='text-xs font-bold text-gray-400 uppercase tracking-wide'>Examples</p>
                            <button
                                type='button'
                                onClick={addExample}
                                className='flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-500'
                            >
                                <Plus size={14} /> Add example
                            </button>
                        </div>

                        {form.examples.map((ex, index) => (
                            <div key={index} className='p-3 border border-gray-200 rounded-lg flex flex-col gap-2.5 relative'>
                                {form.examples.length > 1 && (
                                    <button
                                        type='button'
                                        onClick={() => removeExample(index)}
                                        className='absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500'
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}

                                <label className='flex items-center gap-3 cursor-pointer'>
                                    <div className='w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50'>
                                        {ex.imagePreview ? (
                                            <img src={ex.imagePreview} alt='example preview' className='w-full h-full object-cover' />
                                        ) : (
                                            <Upload size={16} className='text-gray-400' />
                                        )}
                                    </div>
                                    <span className='text-xs font-semibold text-gray-600'>Upload example image</span>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={(e) => handleExampleImageUpload(index, e)}
                                        className='hidden'
                                    />
                                </label>

                                <input
                                    value={ex.name}
                                    onChange={(e) => handleExampleChange(index, 'name', e.target.value)}
                                    placeholder='Example name (e.g. Local SEO Success)'
                                    className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-400'
                                />

                                <input
                                    value={ex.result}
                                    onChange={(e) => handleExampleChange(index, 'result', e.target.value)}
                                    placeholder='Result (e.g. Top 3 Rankings)'
                                    className='w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-400'
                                />

                                {errors[`example-${index}`] && (
                                    <p className='text-xs text-red-400'>Fill all fields for this example</p>
                                )}
                            </div>
                        ))}
                    </div>

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