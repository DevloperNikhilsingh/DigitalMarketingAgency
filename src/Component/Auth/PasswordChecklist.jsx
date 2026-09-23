import React from 'react'
import { Check, X } from 'lucide-react'

const rules = [
    { label: '8+ characters', test: (p) => p.length >= 8 },
    { label: '1 uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { label: '1 lowercase letter', test: (p) => /[a-z]/.test(p) },
    { label: '1 number', test: (p) => /[0-9]/.test(p) },
    { label: '1 special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
]

const PasswordChecklist = ({ password }) => {
    if (!password) return null

    return (
        <div className='grid grid-cols-2 gap-1.5 -mt-1 px-1'>
            {rules.map((rule) => {
                const passed = rule.test(password)
                return (
                    <div
                        key={rule.label}
                        className={`flex items-center gap-1.5 text-[11px] transition-colors duration-200
                            ${passed ? 'text-green-400' : 'text-gray-500'}`}
                    >
                        {passed ? <Check size={12} /> : <X size={12} />}
                        {rule.label}
                    </div>
                )
            })}
        </div>
    )
}

export default PasswordChecklist