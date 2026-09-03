import React, { useState } from "react";
import { Plus } from "lucide-react";

import ServiceCard from "./ServiceCard/ServiceCard";
import ServiceFormModal from "./ServiceFormModal/ServiceFormModal";
import ServiceDetail from "./ServiceDetail/ServiceDetail";
import SubServiceFormModal from "./SubServiceFormModal/SubServiceFormModal";
import SubServiceDetail from "./SubServiceDetail/SubServiceDetail";
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";
import { INITIAL_SERVICES, ICON_BG_STYLES, nextId } from "./data/dummyData";

/**
 * ServiceMenu — the CMS for "My Services".
 *
 * Does NOT render the Sidebar or the top notification/header bar — those
 * live in Common/Sidebar and Common/DashboardHeader, rendered once by
 * HomeDashboard.jsx. This component only owns the "My Services" tab content.
 *
 * Three-level data model, all in local React state (no backend yet):
 *   Service { id, icon, title, description, status, date,
 *     subServices: [
 *       SubService { id, icon, title, description,
 *         caseStudies: [ { id, image, title, description }, ... up to MAX_CASE_STUDIES ]
 *       }
 *     ]
 *   }
 *
 * Views (drill-down, one at a time):
 *   1. Grid              -> all services, "+ Request New Service" to create
 *   2. Service Detail     -> service info (Edit/Delete) + Sub-Services table
 *                           (unlimited, add/edit/delete, click a row to open it)
 *   3. Sub-Service Detail  -> sub-service info (Edit/Delete) + Case Studies
 *                           table (max MAX_CASE_STUDIES, add/edit/delete)
 *
 * Every form modal and the delete confirmation are rendered ONCE here at
 * the top level (not inside each view) so "Edit"/"Delete" behave
 * identically no matter which screen triggers them.
 */
const ServiceMenu = () => {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedSubServiceId, setSelectedSubServiceId] = useState(null);

  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [subServiceFormOpen, setSubServiceFormOpen] = useState(false);
  const [editingSubService, setEditingSubService] = useState(null);

  // { type: "service" | "subService", data } — drives the shared ConfirmDialog
  const [confirmTarget, setConfirmTarget] = useState(null);

  const selectedService = services.find((s) => s.id === selectedServiceId);
  const selectedSubService = selectedService?.subServices.find(
    (ss) => ss.id === selectedSubServiceId
  );

  // ---------- Service CRUD ----------

  const openCreateServiceForm = () => {
    setEditingService(null);
    setServiceFormOpen(true);
  };

  const openEditServiceForm = (service) => {
    setEditingService(service);
    setServiceFormOpen(true);
  };

  const handleServiceSubmit = (formData) => {
    if (editingService) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id ? { ...s, ...formData } : s
        )
      );
    } else {
      const today = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setServices((prev) => [
        { id: nextId(), ...formData, date: today, subServices: [] },
        ...prev,
      ]);
    }
    setServiceFormOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = () => {
    const target = confirmTarget.data;
    setServices((prev) => prev.filter((s) => s.id !== target.id));
    if (selectedServiceId === target.id) {
      setSelectedServiceId(null);
      setSelectedSubServiceId(null);
    }
    setConfirmTarget(null);
  };

  // ---------- Sub-Service CRUD, scoped to the currently selected service ----------

  const openCreateSubServiceForm = () => {
    setEditingSubService(null);
    setSubServiceFormOpen(true);
  };

  const openEditSubServiceForm = (subService) => {
    setEditingSubService(subService);
    setSubServiceFormOpen(true);
  };

  const handleSubServiceSubmit = (formData) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id !== selectedServiceId) return s;
        if (editingSubService) {
          return {
            ...s,
            subServices: s.subServices.map((ss) =>
              ss.id === editingSubService.id ? { ...ss, ...formData } : ss
            ),
          };
        }
        return {
          ...s,
          subServices: [
            ...s.subServices,
            { id: nextId(), ...formData, caseStudies: [] },
          ],
        };
      })
    );
    setSubServiceFormOpen(false);
    setEditingSubService(null);
  };

  const handleDeleteSubService = () => {
    const target = confirmTarget.data;
    setServices((prev) =>
      prev.map((s) =>
        s.id === selectedServiceId
          ? {
              ...s,
              subServices: s.subServices.filter((ss) => ss.id !== target.id),
            }
          : s
      )
    );
    if (selectedSubServiceId === target.id) setSelectedSubServiceId(null);
    setConfirmTarget(null);
  };

  // ---------- Case-study CRUD, scoped to the selected service + sub-service ----------

  const handleAddCaseStudy = (data) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === selectedServiceId
          ? {
              ...s,
              subServices: s.subServices.map((ss) =>
                ss.id === selectedSubServiceId
                  ? {
                      ...ss,
                      caseStudies: [
                        ...(ss.caseStudies || []),
                        { id: nextId(), ...data },
                      ],
                    }
                  : ss
              ),
            }
          : s
      )
    );
  };

  const handleUpdateCaseStudy = (caseStudyId, data) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === selectedServiceId
          ? {
              ...s,
              subServices: s.subServices.map((ss) =>
                ss.id === selectedSubServiceId
                  ? {
                      ...ss,
                      caseStudies: ss.caseStudies.map((c) =>
                        c.id === caseStudyId ? { ...c, ...data } : c
                      ),
                    }
                  : ss
              ),
            }
          : s
      )
    );
  };

  const handleDeleteCaseStudy = (caseStudyId) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === selectedServiceId
          ? {
              ...s,
              subServices: s.subServices.map((ss) =>
                ss.id === selectedSubServiceId
                  ? {
                      ...ss,
                      caseStudies: ss.caseStudies.filter(
                        (c) => c.id !== caseStudyId
                      ),
                    }
                  : ss
              ),
            }
          : s
      )
    );
  };

  // ---------- Shared delete confirmation copy ----------

  const confirmCopy = (() => {
    if (!confirmTarget) return { title: "", message: "", onConfirm: () => {} };
    if (confirmTarget.type === "service") {
      return {
        title: "Delete this service?",
        message: `"${confirmTarget.data.title}" and all its sub-services will be removed.`,
        onConfirm: handleDeleteService,
      };
    }
    return {
      title: "Delete this sub-service?",
      message: `"${confirmTarget.data.title}" and its case studies will be removed.`,
      onConfirm: handleDeleteSubService,
    };
  })();

  // ---------- Render ----------

  let content;
  if (selectedSubService) {
    content = (
      <SubServiceDetail
        subService={selectedSubService}
        onBack={() => setSelectedSubServiceId(null)}
        onEditSubService={openEditSubServiceForm}
        onDeleteSubService={(ss) => setConfirmTarget({ type: "subService", data: ss })}
        onAddCaseStudy={handleAddCaseStudy}
        onUpdateCaseStudy={handleUpdateCaseStudy}
        onDeleteCaseStudy={handleDeleteCaseStudy}
      />
    );
  } else if (selectedService) {
    content = (
      <ServiceDetail
        service={selectedService}
        onBack={() => setSelectedServiceId(null)}
        onEditService={openEditServiceForm}
        onDeleteService={(s) => setConfirmTarget({ type: "service", data: s })}
        onOpenSubService={(ss) => setSelectedSubServiceId(ss.id)}
        onAddSubServiceClick={openCreateSubServiceForm}
        onEditSubServiceClick={openEditSubServiceForm}
        onDeleteSubServiceClick={(ss) => setConfirmTarget({ type: "subService", data: ss })}
      />
    );
  } else {
    content = (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#1a1a2e]">My Services</h2>
            <p className="mt-1 text-sm text-gray-500">
              Here are the services you have requested for your business.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateServiceForm}
            className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-amber-300 px-4 py-2.5 text-sm font-medium text-black hover:text-white hover:bg-black"
          >
            <Plus size={16} />
            Request New Service
          </button>
        </div>

        {services.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <p className="text-sm font-medium text-gray-500">No services yet</p>
            <p className="text-xs text-gray-400">
              Click "Request New Service" to add your first one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                iconBg={ICON_BG_STYLES[index % ICON_BG_STYLES.length]}
                onOpen={(s) => setSelectedServiceId(s.id)}
                onEdit={openEditServiceForm}
                onDelete={(s) => setConfirmTarget({ type: "service", data: s })}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {content}

      <ServiceFormModal
        open={serviceFormOpen}
        editingService={editingService}
        onClose={() => setServiceFormOpen(false)}
        onSubmit={handleServiceSubmit}
      />

      <SubServiceFormModal
        open={subServiceFormOpen}
        editingSubService={editingSubService}
        onClose={() => setSubServiceFormOpen(false)}
        onSubmit={handleSubServiceSubmit}
      />

      <ConfirmDialog
        open={!!confirmTarget}
        title={confirmCopy.title}
        message={confirmCopy.message}
        onCancel={() => setConfirmTarget(null)}
        onConfirm={confirmCopy.onConfirm}
      />
    </>
  );
};

export default ServiceMenu;
