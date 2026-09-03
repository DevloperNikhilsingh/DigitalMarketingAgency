import React from "react";
import { ArrowLeft, Calendar, Pencil, Trash2 } from "lucide-react";
import { getIconComponent } from "../utils/iconMap";
import { STATUS_STYLES } from "../data/dummyData";
import SubServiceTable from "../SubServiceTable/SubServiceTable";

/**
 * Detail page opened when a service card is clicked from the grid.
 *
 * Shows the service's own info (icon/title/description/status) with
 * "Edit Service" / "Delete" buttons, AND — directly below, always
 * visible, no extra click required — the Sub-Services table for that
 * service (e.g. "Local SEO", "Technical SEO" under "Website SEO Package").
 * Each sub-service holds its own case studies, opened from its row.
 */
const ServiceDetail = ({
  service,
  onBack,
  onEditService,
  onDeleteService,
  onOpenSubService,
  onAddSubServiceClick,
  onEditSubServiceClick,
  onDeleteSubServiceClick,
}) => {
  const IconComp = getIconComponent(service.icon);
  const statusClass =
    STATUS_STYLES[service.status] || "bg-gray-100 text-gray-500";

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600"
      >
        <ArrowLeft size={16} />
        Back to My Services
      </button>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <IconComp size={26} />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEditService(service)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <Pencil size={14} />
              Edit Service
            </button>
            <button
              type="button"
              onClick={() => onDeleteService(service)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        <h2 className="mt-4 text-xl font-semibold text-[#1a1a2e]">
          {service.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
          {service.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
          >
            {service.status}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar size={13} />
            Requested on {service.date}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <SubServiceTable
          subServices={service.subServices}
          onOpen={onOpenSubService}
          onAddClick={onAddSubServiceClick}
          onEditClick={onEditSubServiceClick}
          onDeleteClick={onDeleteSubServiceClick}
        />
      </div>
    </div>
  );
};

export default ServiceDetail;
