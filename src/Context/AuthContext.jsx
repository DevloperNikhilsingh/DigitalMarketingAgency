import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Hardcoded admin credential (replace with backend check later)
const ADMIN_CREDENTIALS = {
    email: 'admin@digiservice.com',
    password: 'Admin@123',
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null) // { role: 'employer' | 'admin', name, email }
    const [employers, setEmployers] = useState([]) // in-memory store until backend

    const registerEmployer = ({ name, email, password, company }) => {
        const exists = employers.find((e) => e.email === email)
        if (exists) {
            return { success: false, message: 'An account with this email already exists.' }
        }
        const newEmployer = { name, email, password, company }
        setEmployers((prev) => [...prev, newEmployer])
        return { success: true }
    }

    const loginEmployer = ({ email, password }) => {
        const found = employers.find((e) => e.email === email && e.password === password)
        if (!found) {
            return { success: false, message: 'Invalid email or password.' }
        }
        setUser({ role: 'employer', name: found.name, email: found.email })
        return { success: true }
    }

    const loginAdmin = ({ email, password }) => {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            setUser({ role: 'admin', name: 'Admin', email })
            return { success: true }
        }
        return { success: false, message: 'Invalid admin credentials.' }
    }

    const logout = () => setUser(null)

    return (
        <AuthContext.Provider
            value={{ user, registerEmployer, loginEmployer, loginAdmin, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)