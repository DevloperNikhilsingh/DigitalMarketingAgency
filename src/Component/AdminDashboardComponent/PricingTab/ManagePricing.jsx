import React, { useState } from 'react'
import { Pencil, X, Plus, Trash2, Check } from 'lucide-react'
import AdminSidebar from '../OverviewTab/AdminSidebar'
import Footer from '../../Layout/Footer '

const initialPlans = [
    {
        id: 1,
        name: 'Starter',
        price: '4,999',
        desc: 'Perfect for small businesses',
        features: ['SEO Audit', 'Keyword Research', 'On-Page SEO', 'Monthly Report'],
        featured: false,
    },
    {
        id: 2,
        name: 'Growth',
        price: '9,999',
        desc: 'Ideal for growing businesses',
        features: ['Everything in Starter', 'Social Media Marketing', 'Google Ads (₹15000 Ad spend)', 'Priority Support'],
        featured: true,
    },
    {
        id: 3,
        name: 'Pro',
        price: '17,499',
        desc: 'For established businesses',
        features: ['Everything in Growth', 'Advanced SEO', 'Conversion Optimization', 'Dedicated Manager'],
        featured: false,
    },
]

const emptyForm = { name: '', price: '', desc: '', features: [''], featured: false }

const ManagePricing = () => {
    const [plans, setPlans] = useState(initialPlans)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState(emptyForm)

    const startEdit = (plan) => {
        setEditingId(plan.id)
        setForm({ ...plan, features: [...plan.features] })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setForm(emptyForm)
    }

    const saveEdit = () => {
        setPlans((prev) =>
            prev.map((p) =>
                p.id === editingId
                    ? { ...form, id: editingId, features: form.features.filter((f) => f.trim() !== '') }
                    : p
            )
        )
        cancelEdit()
    }

    const handleFeatureChange = (index, value) => {
        setForm((prev) => {
            const updated = [...prev.features]
            updated[index] = value
            return { ...prev, features: updated }
        })
    }

    const addFeatureField = () => {
        setForm((prev) => ({ ...prev, features: [...prev.features, ''] }))
    }

    const removeFeatureField = (index) => {
        setForm((prev) => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index),
        }))
    }

    const deletePlan = (id) => {
        setPlans((prev) => prev.filter((p) => p.id !== id))
        if (editingId === id) cancelEdit()
    }

    return (
        
         <div className='flex min-h-screen bg-gray-50'>
        <AdminSidebar />

        <div className='flex-1 flex flex-col gap-6 p-6 overflow-x-hidden'>
            
            <div className='bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm'>
                    <h1 className='font-extrabold text-lg text-gray-900'>Manage Pricing</h1>
                    <p className='text-gray-500 text-sm'>Edit the Pricing Plans</p>
                </div>

            
            <div className='bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden'>
                <div className='flex items-center justify-between px-6 py-5'>
                    <h2 className='font-bold text-gray-900'>All Plans</h2>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full text-sm'>
                        <thead>
                            <tr className='text-left text-gray-400 text-xs uppercase tracking-wide border-y border-gray-100'>
                                <th className='px-6 py-3 font-semibold'>Plan</th>
                                <th className='px-6 py-3 font-semibold'>Price</th>
                                <th className='px-6 py-3 font-semibold'>Description</th>
                                <th className='px-6 py-3 font-semibold'>Features</th>
                                <th className='px-6 py-3 font-semibold'>Highlighted</th>
                                <th className='px-6 py-3 font-semibold text-right'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans.map((plan) => (
                                <React.Fragment key={plan.id}>
                                    <tr className='border-b border-gray-50 hover:bg-gray-50/60 transition-colors'>
                                        <td className='px-6 py-4 font-bold text-gray-900'>{plan.name}</td>
                                        <td className='px-6 py-4 text-gray-700'>₹{plan.price}</td>
                                        <td className='px-6 py-4 text-gray-500 max-w-55'>{plan.desc}</td>
                                        <td className='px-6 py-4 text-gray-500'>
                                            <span className='text-xs bg-gray-100 px-2 py-1 rounded-full'>
                                                {plan.features.length} features
                                            </span>
                                        </td>
                                        <td className='px-6 py-4'>
                                            {plan.featured ? (
                                                <span className='text-xs font-semibold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full'>
                                                    Most Popular
                                                </span>
                                            ) : (
                                                <span className='text-xs text-gray-400'>—</span>
                                            )}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center justify-end gap-2'>
                                                <button
                                                    onClick={() => (editingId === plan.id ? cancelEdit() : startEdit(plan))}
                                                    className='p-2 rounded-lg text-gray-500 hover:bg-yellow-50 hover:text-yellow-600 transition-colors'
                                                    title='Edit plan'
                                                >
                                                    {editingId === plan.id ? <X size={16} /> : <Pencil size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => deletePlan(plan.id)}
                                                    className='p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors'
                                                    title='Delete plan'
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {editingId === plan.id && (
                                        <tr className='bg-gray-50/60 border-b border-gray-100'>
                                            <td colSpan={6} className='px-6 py-6'>
                                                <div className='grid md:grid-cols-2 gap-5 max-w-3xl'>
                                                    <div className='flex flex-col gap-1.5'>
                                                        <label className='text-xs font-semibold text-gray-600'>Plan Name</label>
                                                        <input
                                                            type='text'
                                                            value={form.name}
                                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                            className='border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400 bg-white'
                                                        />
                                                    </div>

                                                    <div className='flex flex-col gap-1.5'>
                                                        <label className='text-xs font-semibold text-gray-600'>Price (₹ / month)</label>
                                                        <input
                                                            type='text'
                                                            value={form.price}
                                                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                                                            className='border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400 bg-white'
                                                        />
                                                    </div>

                                                    <div className='flex flex-col gap-1.5 md:col-span-2'>
                                                        <label className='text-xs font-semibold text-gray-600'>Description</label>
                                                        <input
                                                            type='text'
                                                            value={form.desc}
                                                            onChange={(e) => setForm({ ...form, desc: e.target.value })}
                                                            className='border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400 bg-white'
                                                        />
                                                    </div>

                                                    <div className='flex flex-col gap-1.5 md:col-span-2'>
                                                        <label className='text-xs font-semibold text-gray-600'>Features</label>
                                                        <div className='flex flex-col gap-2'>
                                                            {form.features.map((feature, index) => (
                                                                <div key={index} className='flex items-center gap-2'>
                                                                    <input
                                                                        type='text'
                                                                        value={feature}
                                                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                                        placeholder='Feature'
                                                                        className='flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-yellow-400 bg-white'
                                                                    />
                                                                    <button
                                                                        onClick={() => removeFeatureField(index)}
                                                                        className='p-2 text-gray-400 hover:text-red-500'
                                                                    >
                                                                        <X size={15} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <button
                                                                onClick={addFeatureField}
                                                                className='flex items-center gap-1.5 text-xs font-semibold text-yellow-600 hover:text-yellow-700 mt-1 self-start'
                                                            >
                                                                <Plus size={14} /> Add feature
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <label className='flex items-center gap-2 md:col-span-2 cursor-pointer select-none'>
                                                        <input
                                                            type='checkbox'
                                                            checked={form.featured}
                                                            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                                                            className='accent-yellow-400 w-4 h-4'
                                                        />
                                                        <span className='text-sm text-gray-600'>Mark as "Most Popular"</span>
                                                    </label>
                                                </div>

                                                <div className='flex items-center gap-3 mt-6'>
                                                    <button
                                                        onClick={saveEdit}
                                                        className='flex items-center gap-2 bg-yellow-400 text-black font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-yellow-300 transition-colors'
                                                    >
                                                        <Check size={15} /> Save Changes
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className='text-sm font-semibold text-gray-500 hover:text-gray-700 px-3 py-2.5'
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ManagePricing