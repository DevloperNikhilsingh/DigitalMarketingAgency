import React from "react";
import { Trash2, Tag, Users } from "lucide-react";
import { STATUS_STYLES } from "../data/dummyData";

const ServiceCard = ({ service, onDelete, onOpen }) => {
  const statusClass =
    STATUS_STYLES[service.status] || "bg-gray-100 text-gray-500";

  return (
    <div className="group relative rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <button
          type="button"
          onClick={() => onOpen?.(service)}
          className="text-left"
        >
          <h3 className="text-base font-bold text-[#1a1a2e]">
            {service.title}
          </h3>
        </button>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
        >
          {service.status}
        </span>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-gray-500">
        {service.description}
      </p>

      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <Tag size={14} className="text-amber-500" />
          {service.category}
        </span>
        <span className="flex items-center gap-1.5">
          <Users size={14} className="text-amber-500" />
          {service.requests} Requests
        </span>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-100 pt-3">
        <button
          type="button"
          onClick={() => onDelete(service)}
          title="Delete service"
          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors duration-200"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;