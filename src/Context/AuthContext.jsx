import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const ADMIN_CREDENTIALS = {
    email: 'admin@digiservice.com',
    password: 'Admin@123',
}

const STORAGE_KEY = 'digiservice_user'
const EMPLOYERS_KEY = 'digiservice_employers'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : null
    })

    const [employers, setEmployers] = useState(() => {
        const saved = localStorage.getItem(EMPLOYERS_KEY)
        return saved ? JSON.parse(saved) : []
    })

    const registerEmployer = ({ name, email, password, company }) => {
        const exists = employers.find((e) => e.email === email)
        if (exists) {
            return { success: false, message: 'An account with this email already exists.' }
        }
        const newEmployer = { name, email, password, company }
        const updated = [...employers, newEmployer]
        setEmployers(updated)
        localStorage.setItem(EMPLOYERS_KEY, JSON.stringify(updated))
        return { success: true }
    }

    const loginEmployer = ({ email, password }) => {
        const found = employers.find((e) => e.email === email && e.password === password)
        if (!found) {
            return { success: false, message: 'Invalid email or password.' }
        }
        const loggedInUser = {
            role: 'employer',
            name: found.name,
            email: found.email,
            company: found.company,
        }
        setUser(loggedInUser)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
        return { success: true }
    }

    const loginAdmin = ({ email, password }) => {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            const adminUser = { role: 'admin', name: 'Admin', email }
            setUser(adminUser)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser))
            return { success: true }
        }
        return { success: false, message: 'Invalid admin credentials.' }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
    }

    return (
        <AuthContext.Provider
            value={{ user, registerEmployer, loginEmployer, loginAdmin, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)