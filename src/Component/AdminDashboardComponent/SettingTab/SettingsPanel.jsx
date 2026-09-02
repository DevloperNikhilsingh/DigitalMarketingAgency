import React, { useState } from 'react'
import { User, Lock, Bell, Save } from 'lucide-react'
import SettingsCard from './SettingsCard'
import SettingsInput from './SettingsInput'
import NotificationToggle from './NotificationToggle'
import { notificationItems, defaultNotifications } from '../../../data/AdminsettingData'


const SettingsPanel = ({ user, onSaved }) => {
    const [profile, setProfile] = useState({ name: user?.name || 'Admin', email: user?.email || '' })
    const [passwords, setPasswords] = useState({ current: '••••••••', new: '', confirm: '' })
    const [notifications, setNotifications] = useState(defaultNotifications)

    const handleProfileSubmit = (e) => {
        e.preventDefault()
        onSaved('Profile updated successfully.')
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (passwords.new !== passwords.confirm) {
            onSaved('New passwords do not match.')
            return
        }
        setPasswords({ current: '', new: '', confirm: '' })
        onSaved('Password changed successfully.')
    }

    const toggleNotification = (key) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <>
            <div className='grid lg:grid-cols-2 gap-5'>
                <SettingsCard icon={User} title='Profile Information'>
                    <form onSubmit={handleProfileSubmit} className='flex flex-col gap-3.5'>
                        <SettingsInput
                            label='Full Name'
                            value={profile.name}
                            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                        />
                        <SettingsInput
                            label='Email Address'
                            type='email'
                            value={profile.email}
                            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                        />
                        <button
                            type='submit'
                            className='self-start flex items-center gap-2 mt-1 bg-amber-400 text-black text-sm font-bold px-4 py-2.5 rounded-lg
                                transition-all duration-300 hover:bg-amber-300 active:scale-95'
                        >
                            <Save size={15} /> Save Changes
                        </button>
                    </form>
                </SettingsCard>

                <SettingsCard icon={Lock} title='Change Password'>
                    <form onSubmit={handlePasswordSubmit} className='flex flex-col gap-3.5'>
                        <SettingsInput
                            label='Current Password'
                            type='password'
                            value={passwords.current}
                            onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                            required
                        />
                        <SettingsInput
                            label='New Password'
                            type='password'
                            value={passwords.new}
                            onChange={(e) => setPasswords((p) => ({ ...p, new: e.target.value }))}
                            required
                        />
                        <SettingsInput
                            label='Confirm New Password'
                            type='password'
                            value={passwords.confirm}
                            onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                            required
                        />
                        <button
                            type='submit'
                            className='self-start flex items-center gap-2 mt-1 bg-amber-400 text-black text-sm font-bold px-4 py-2.5 rounded-lg
                                transition-all duration-300 hover:bg-amber-300 active:scale-95'
                        >
                            <Save size={15} /> Update Password
                        </button>
                    </form>
                </SettingsCard>
            </div>

            <SettingsCard icon={Bell} title='Notification Preferences'>
                <div className='flex flex-col divide-y divide-gray-50'>
                    {notificationItems.map((item) => (
                        <NotificationToggle
                            key={item.key}
                            label={item.label}
                            desc={item.desc}
                            checked={notifications[item.key]}
                            onToggle={() => toggleNotification(item.key)}
                        />
                    ))}
                </div>
            </SettingsCard>
        </>
    )
}

export default SettingsPanel