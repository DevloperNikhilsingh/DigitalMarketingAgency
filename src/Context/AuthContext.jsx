import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const API_BASE = 'http://localhost:8081'
const STORAGE_KEY = 'digiservice_user'
const TOKEN_KEY = 'digiservice_token'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : null
    })

    // STEP 1: Register - sends OTP to email, does NOT log the user in
    const registerEmployer = async ({ name, email, password, company }) => {
        try {
            const res = await fetch(`${API_BASE}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: name,
                    companyName: company,
                    email,
                    password,
                }),
            })
            const data = await res.json()
            if (!res.ok) {
                return { success: false, message: data.message || 'Registration failed.' }
            }
            return { success: true, message: data.message || 'OTP sent to your email.' }
        } catch (err) {
            return { success: false, message: 'Network error. Is the backend running?' }
        }
    }

    // STEP 2: Verify OTP - after this, account becomes ACTIVE and can login
    const verifyOtp = async ({ email, otp }) => {
        try {
            const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            })
            const data = await res.json()
            if (!res.ok) {
                return { success: false, message: data.message || 'Invalid or expired OTP.' }
            }
            return { success: true, message: data.message || 'Email verified successfully.' }
        } catch (err) {
            return { success: false, message: 'Network error. Is the backend running?' }
        }
    }

    // Resend OTP if expired
    const resendOtp = async (email) => {
        try {
            const res = await fetch(`${API_BASE}/api/auth/resend-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()
            if (!res.ok) {
                return { success: false, message: data.message || 'Could not resend OTP.' }
            }
            return { success: true, message: data.message || 'OTP resent.' }
        } catch (err) {
            return { success: false, message: 'Network error. Is the backend running?' }
        }
    }

    // STEP 3: Login (only works after OTP is verified / account is ACTIVE)
    const loginEmployer = async ({ email, password }) => {
        try {
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            if (!res.ok) {
                return { success: false, message: data.message || 'Invalid email or password.' }
            }

            const loggedInUser = {
                role: 'employer',
                name: data.fullName,
                email: data.email,
                company: data.companyName,
            }
            setUser(loggedInUser)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
            localStorage.setItem(TOKEN_KEY, data.accessToken)
            return { success: true }
        } catch (err) {
            return { success: false, message: 'Network error. Is the backend running?' }
        }
    }

    const loginAdmin = async ({ email, password }) => {
        try {
            const res = await fetch(`${API_BASE}/api/admin/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            if (!res.ok) {
                return { success: false, message: data.message || 'Invalid admin credentials.' }
            }

            const adminUser = {
                role: 'admin',
                name: data.fullName || 'Admin',
                email: data.email,
            }
            setUser(adminUser)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser))
            localStorage.setItem(TOKEN_KEY, data.accessToken)
            return { success: true }
        } catch (err) {
            return { success: false, message: 'Network error. Is the backend running?' }
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(TOKEN_KEY)
    }

    return (
        <AuthContext.Provider
            value={{ user, registerEmployer, verifyOtp, resendOtp, loginEmployer, loginAdmin, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)