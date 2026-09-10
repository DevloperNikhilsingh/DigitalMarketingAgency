import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import businessData, { getBusinessById } from "./data";
import BusinessGallery from "./BusinessGallery";
import ContactCard from "./ContactCard";
import EnquiryForm from "./EnquiryForm";
import "./styles.css";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer ";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services & Pricing" },
  { id: "gallery", label: "Gallery" },
];

export default function BusinessDetail({ businessId }) {
  const params = useParams ? useParams() : {};
  const routeId = params?.businessId ?? businessId ?? businessData[0]?.id;
  const business = getBusinessById(routeId);

  const [activeTab, setActiveTab] = useState("overview");
  const enquiryRef = useRef(null);

  if (!business) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-xl font-semibold text-stone-900 mb-2">
          Business not found
        </h2>
        <p className="text-sm text-stone-500 max-w-sm">
          We couldn't find a listing for this business. It may have been
          removed, or the link might be incorrect.
        </p>
      </div>
    );
  }

  const scrollToEnquiry = () => {
    enquiryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* ---------- Top business area ---------- */}
        <div className="grid lg:grid-cols-[1.4fr_1fr_0.9fr] gap-6">
          {/* Gallery */}
          <BusinessGallery
            images={business.images}
            businessName={business.name}
            isNew={business.isNew}
            variant="header"
          />

          {/* Middle info */}
          <div>
            <p className="text-xs font-semibold tracking-wide text-amber-600 mb-1.5">
              {business.category}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              {business.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-2.5">
              <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-sm font-semibold px-2.5 py-1 rounded-lg">
                <StarIcon />
                {business.rating}
                <span className="text-amber-600 font-normal">
                  ({business.reviewCount})
                </span>
              </span>

              {business.verified && (
                <span className="flex items-center gap-1 text-sm text-stone-600">
                  <VerifiedIcon />
                  Verified Business
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-sm text-stone-500 mt-2">
              <PinIcon />
              {business.location}
            </div>

            <p className="text-sm text-stone-700 leading-relaxed mt-4">
              {business.description}
            </p>

            {business.highlights?.length > 0 && (
              <ul className="grid grid-cols-2 gap-x-3 gap-y-2 mt-5">
                {business.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1.5 text-sm text-stone-700"
                  >
                    <DotIcon />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact card */}
          <div>
            <ContactCard business={business} onSendEnquiry={scrollToEnquiry} />
          </div>
        </div>

        {/* ---------- Tabs ---------- */}
        <div className="mt-10 border-b border-stone-200 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-amber-400 text-stone-900"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- Tab content ---------- */}
        <div className="mt-8">
          {activeTab === "overview" && <Overview business={business} />}
          {activeTab === "services" && <Services business={business} />}
          {activeTab === "gallery" && (
            <BusinessGallery
              images={business.images}
              businessName={business.name}
              variant="grid"
            />
          )}
        </div>

        {/* ---------- Enquiry form ---------- */}
        <div ref={enquiryRef} className="mt-12 scroll-mt-6">
          <EnquiryForm business={business} />
        </div>

        {/* ---------- Business information ---------- */}
        <div className="mt-8 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-stone-900 mb-5">
            Business Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <InfoRow icon={<PinIcon />} label="Address" value={business.address} />
            <InfoRow
              icon={<PhoneIcon />}
              label="Phone"
              value={business.phone}
              href={`tel:${business.phone}`}
            />
            <InfoRow
              icon={<MailIcon />}
              label="Email"
              value={business.email}
              href={`mailto:${business.email}`}
            />
            <InfoRow icon={<ClockIcon />} label="Business Hours" value={business.hours} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Overview({ business }) {
  return (
    <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8">
      <div>
        <h2 className="text-lg font-semibold text-stone-900 mb-3">
          About {business.name}
        </h2>
        <p className="text-sm text-stone-700 leading-relaxed">
          {business.longDescription}
        </p>
      </div>

      {business.features?.length > 0 && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-stone-900 mb-4">
            Key Features
          </h3>
          <ul className="flex flex-col gap-2.5">
            {business.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-stone-700"
              >
                <CheckIcon />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Services({ business }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-stone-900 mb-5">
        Services &amp; Pricing
      </h2>
      <div className="flex flex-col gap-3">
        {business.services?.map((service) => (
          <div
            key={service.name}
            className="flex items-start justify-between gap-4 bg-white border border-stone-200 rounded-xl p-4 sm:p-5 hover:border-amber-300 transition"
          >
            <div>
              <h4 className="text-sm font-semibold text-stone-900">
                {service.name}
              </h4>
              <p className="text-sm text-stone-500 mt-1">
                {service.description}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-base font-bold text-amber-600 whitespace-nowrap">
                {service.price}
              </p>
              <p className="text-xs text-stone-400 whitespace-nowrap">
                {service.unit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, href }) {
  const content = (
    <div className="flex items-start gap-3">
      <span className="text-stone-400 mt-0.5">{icon}</span>
      <div>
        <p className="text-xs font-medium text-stone-500">{label}</p>
        <p className="text-sm text-stone-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="hover:opacity-80 transition">
      {content}
    </a>
  ) : (
    content
  );
}

/* ---------- Icons ---------- */

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5l2.9 6.2 6.6.7-5 4.6 1.4 6.6-5.9-3.3-5.9 3.3 1.4-6.6-5-4.6 6.6-.7L12 2.5z" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="#16a34a"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg width="7" height="7" viewBox="0 0 8 8" fill="#f59e0b">
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 13l4 4L19 7"
        stroke="#f59e0b"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.6 10.8c1.4 2.7 3.6 4.9 6.3 6.3l2.1-2.1c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11 21 3 13 3 4.5c0-.6.4-1 1-1h3.6c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 6.5l8.5 6 8.5-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7v5l3.5 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
