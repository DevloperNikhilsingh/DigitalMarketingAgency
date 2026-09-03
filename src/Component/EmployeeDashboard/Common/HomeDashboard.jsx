import React, { act, useState } from "react";

import Sidebar from "../Common/Sidebar/Sidebar";
import DashboardHeader from "../Common/DashboardHeader/DashboardHeader";

import OverviewCards from "../HomeDashboard/OverviewCards/OverviewCards";
import PerformanceSummary from "../HomeDashboard/PerformanceSummary/PerformanceSummary";
import ClientOrders from "../HomeDashboard/ClientOrders/ClientOrders";
import ServicesOverview from "../HomeDashboard/ServicesOverview/ServicesOverview";
import ServiceRequests from "../ServiceRequestMenu/ServiceRequests";

import ServiceMenu from "../ServiceMenu/ServiceMenu";
import Settings from "../SettingMenu/Settings";

const PAGE_LABELS = {
  dashboard: "Dashboard",
  "my-services": "My Services",
  orders: "Orders",
  "service request": "Service Request",
  settings: "Settings",
};

function ComingSoon({ label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white py-24 text-center">
      <p className="text-lg font-semibold text-[#1a1a2e]">{label}</p>
      <p className="text-sm text-gray-400">This page isn't built yet.</p>
    </div>
  );
}

const HomeDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-[#f7f8fb]">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main className="flex-1 min-w-0 p-6 space-y-6">
        <DashboardHeader businessName="TechGear Solutions" />

        {activePage === "dashboard" ? (
          <>
            <OverviewCards />

            <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6 items-start">
              <PerformanceSummary />
              <ClientOrders />
            </div>

            <ServicesOverview />
          </>
        ) : activePage === "my-services" ? (
          <ServiceMenu />
        ) : activePage === "service request" ? (
          <ServiceRequests />
        ) : activePage === "settings" ? (
          <Settings />
        ) : (
          <ComingSoon label={PAGE_LABELS[activePage] || activePage} />
        )}
      </main>
    </div>
  );
};

export default HomeDashboard;