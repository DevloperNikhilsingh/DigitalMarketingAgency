import React from "react";
import { Phone, MessageCircle, Mail, Clock } from "lucide-react";

export default function ContactCard({ business, onSendEnquiry }) {
  const { phone, whatsapp, hours } = business;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-sm w-full">
      <h3 className="text-base sm:text-lg font-semibold text-stone-900 mb-4">
        Get in Touch
      </h3>

      <div className="flex flex-col gap-2.5">
        <a
          href={`tel:${phone}`}
          className="flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold py-3 rounded-xl transition"
        >
          <Phone size={16} />
          Call Now
        </a>

        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-white hover:bg-stone-50 text-stone-900 text-sm font-semibold py-3 rounded-xl border border-stone-300 transition"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>

        <button
          type="button"
          onClick={onSendEnquiry}
          className="flex items-center justify-center gap-2 w-full bg-amber-400 hover:bg-amber-500 text-stone-900 text-sm font-semibold py-3 rounded-xl transition"
        >
          <Mail size={16} />
          Send Enquiry
        </button>
      </div>

      <div className="mt-5 pt-5 border-t border-stone-200">
        <div className="flex items-center gap-2 text-xs font-medium text-stone-500 uppercase tracking-wide mb-1.5">
          <Clock size={14} />
          Business Hours
        </div>
        <p className="text-sm text-stone-800 leading-relaxed wrap-break-word">
          {hours}
        </p>
      </div>
    </div>
  );
}