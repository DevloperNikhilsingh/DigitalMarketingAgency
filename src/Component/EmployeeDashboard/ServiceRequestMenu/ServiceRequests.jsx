import React, { useState } from "react";
import { Search, Eye, X, User, Briefcase, Phone, Mail, Calendar, Hash } from "lucide-react";

const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-600",
  "In Progress": "bg-blue-50 text-blue-600",
  Completed: "bg-green-50 text-green-600",
  Cancelled: "bg-red-50 text-red-500",
};

const INITIAL_REQUESTS = [
  { id: 101, name: "Rahul Sharma", service: "SEO Optimization", contact: "+91 98765 43210", email: "rahul.s@email.com", date: "2025-05-28", status: "Pending" },
  { id: 102, name: "Priya Verma", service: "Website Development", contact: "+91 91234 56789", email: "priya.v@email.com", date: "2025-05-27", status: "In Progress" },
  { id: 103, name: "Amit Singh", service: "Digital Marketing", contact: "+91 99887 66554", email: "amit.s@email.com", date: "2025-05-26", status: "Completed" },
  { id: 104, name: "Neha Gupta", service: "Social Media Marketing", contact: "+91 90123 45678", email: "neha.g@email.com", date: "2025-05-25", status: "Pending" },
  { id: 105, name: "Vikram Rao", service: "Video Editing", contact: "+91 98123 45670", email: "vikram.r@email.com", date: "2025-05-24", status: "Cancelled" },
  { id: 106, name: "Sneha Patel", service: "Google Ads Management", contact: "+91 97654 32109", email: "sneha.p@email.com", date: "2025-05-23", status: "In Progress" },
  { id: 107, name: "Karan Mehta", service: "SEO Optimization", contact: "+91 96543 21098", email: "karan.m@email.com", date: "2025-05-22", status: "Completed" },
  { id: 108, name: "Anjali Nair", service: "Website Development", contact: "+91 95432 10987", email: "anjali.n@email.com", date: "2025-05-21", status: "Pending" },
];

const STATUS_OPTIONS = ["All", "Pending", "In Progress", "Completed", "Cancelled"];
const UPDATE_STATUS_OPTIONS = ["Pending", "In Progress", "Completed", "Cancelled"];

const ServiceRequests = () => {
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [draftStatus, setDraftStatus] = useState("Pending");

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.service.toLowerCase().includes(search.toLowerCase()) ||
      String(r.id).includes(search);
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openRequest = (r) => {
    setSelectedRequest(r);
    setDraftStatus(r.status);
  };

  const closeModal = () => {
    setSelectedRequest(null);
  };

  const saveStatus = () => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id ? { ...r, status: draftStatus } : r
      )
    );
    closeModal();
  };

  return (
    <div className="flex flex-col gap-5">

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-bold text-[#1a1a2e]">All Service Requests</h3>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
              <Search size={16} className="text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, service, ID..."
                className="w-48 text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold outline-none bg-white"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-200 text-left text-sm">
            <thead>
              <tr className="border-y border-gray-100 bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-400">
                <th className="px-3 py-3">ID</th>
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Service</th>
                <th className="px-3 py-3">Contact</th>
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60">
                  <td className="px-3 py-4 text-gray-600">{r.id}</td>
                  <td className="px-3 py-4 font-semibold text-[#1a1a2e]">{r.name}</td>
                  <td className="px-3 py-4 text-gray-600">{r.service}</td>
                  <td className="px-3 py-4 text-gray-600">{r.contact}</td>
                  <td className="px-3 py-4 text-gray-600">{r.date}</td>
                  <td className="px-3 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => openRequest(r)}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#1a1a2e] transition-colors duration-200"
                      title="View details"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-10 text-center text-sm text-gray-400">
                    No requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="font-extrabold text-gray-900">Request Details</h3>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition-colors duration-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-sm text-gray-400">
                  <Hash size={14} /> {selectedRequest.id}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[selectedRequest.status]}`}>
                  {selectedRequest.status}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <User size={17} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="text-sm font-bold text-[#1a1a2e]">{selectedRequest.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase size={17} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Service Requested</p>
                  <p className="text-sm font-bold text-[#1a1a2e]">{selectedRequest.service}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={17} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="text-sm font-bold text-[#1a1a2e]">{selectedRequest.contact}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={17} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-bold text-[#1a1a2e]">{selectedRequest.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar size={17} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Date Submitted</p>
                  <p className="text-sm font-bold text-[#1a1a2e]">{selectedRequest.date}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <label className="mb-1.5 block text-sm font-medium text-gray-600">
                  Update Status
                </label>
                <select
                  value={draftStatus}
                  onChange={(e) => setDraftStatus(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-semibold border border-amber-400 rounded-lg outline-none bg-white"
                >
                  {UPDATE_STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 px-5 pb-5 pt-1">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveStatus}
                className="flex-1 py-2.5 text-sm font-bold text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequests;