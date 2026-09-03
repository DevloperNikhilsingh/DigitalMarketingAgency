import React, { useState } from "react";
import { User, Lock, Bell, Save } from "lucide-react";

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-6 rounded-full transition-colors duration-300 shrink-0 ${
      checked ? "bg-amber-400" : "bg-gray-200"
    }`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
        checked ? "translate-x-5" : "translate-x-0"
      }`}
    />
  </button>
);

const Settings = () => {
  const [profile, setProfile] = useState({
    fullName: "Nikhil singh",
    email: "nik@gmail.com",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    newServiceRequest: true,
    newEmployerRegistration: true,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#1a1a2e]">Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your admin profile, security, and notifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Profile Information */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <User size={18} className="text-amber-500" />
            <h3 className="text-base font-bold text-[#1a1a2e]">Profile Information</h3>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300"
              />
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 w-fit px-4 py-2.5 text-sm font-bold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors duration-300"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Lock size={18} className="text-amber-500" />
            <h3 className="text-base font-bold text-[#1a1a2e]">Change Password</h3>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">Current Password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">New Password</label>
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-400 transition-colors duration-300"
              />
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 w-fit px-4 py-2.5 text-sm font-bold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors duration-300"
            >
              <Save size={16} /> Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Bell size={18} className="text-amber-500" />
          <h3 className="text-base font-bold text-[#1a1a2e]">Notification Preferences</h3>
        </div>

        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div>
            <p className="text-sm font-semibold text-[#1a1a2e]">New Service Request</p>
            <p className="text-xs text-gray-400 mt-0.5">Get notified when a new service request comes in.</p>
          </div>
          <Toggle
            checked={notifications.newServiceRequest}
            onChange={(val) => setNotifications({ ...notifications, newServiceRequest: val })}
          />
        </div>

        <div className="flex items-center justify-between py-4 border-t border-gray-100">
          <div>
            <p className="text-sm font-semibold text-[#1a1a2e]">New Employer Registration</p>
            <p className="text-xs text-gray-400 mt-0.5">Get notified when a new employer registers.</p>
          </div>
          <Toggle
            checked={notifications.newEmployerRegistration}
            onChange={(val) => setNotifications({ ...notifications, newEmployerRegistration: val })}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;