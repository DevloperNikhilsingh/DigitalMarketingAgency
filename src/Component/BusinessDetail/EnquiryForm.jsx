import React, { useState } from "react";

export default function EnquiryForm({ business }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only for now — no API call.
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ name: "", phone: "", service: "", date: "", message: "" });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <CheckIcon />
        </div>
        <h3 className="text-lg font-semibold text-stone-900 mb-1.5">
          Enquiry sent
        </h3>
        <p className="text-sm text-stone-600 max-w-sm mx-auto mb-5">
          Thanks {form.name || "there"}, {business.name} will get back to you
          shortly on the number you shared.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="text-sm font-semibold text-stone-900 border border-stone-300 rounded-xl px-5 py-2.5 hover:bg-stone-50 transition"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-stone-900">
        Send an Enquiry
      </h3>
      <p className="text-sm text-stone-500 mt-1 mb-6">
        {business.name} usually replies within a few hours.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Your Name">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g. Aditya Sharma"
            className="dg-input"
          />
        </Field>

        <Field label="Phone Number">
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="e.g. 98765 43210"
            className="dg-input"
          />
        </Field>

        <Field label="Select Service">
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="dg-input"
          >
            <option value="">Choose a service</option>
            {business.services?.map((s) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Preferred Date (optional)">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="dg-input"
          />
        </Field>

        <Field label="Message" full>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us a little about what you need..."
            className="dg-input resize-none"
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-stone-900 text-sm font-semibold px-6 py-3 rounded-xl transition"
      >
        Send Enquiry
        <ArrowRight />
      </button>
    </form>
  );
}

function Field({ label, children, full }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-medium text-stone-600">{label}</span>
      {children}
    </label>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
