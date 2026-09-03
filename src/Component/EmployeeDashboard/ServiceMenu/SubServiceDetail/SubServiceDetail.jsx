import React from "react";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { getIconComponent } from "../utils/iconMap";
import CaseStudyTable from "../CaseStudyTable/CaseStudyTable";

/**
 * Detail page opened when a sub-service row is clicked from the
 * SubServiceTable. Shows the sub-service's own info (icon/title/
 * description) with Edit/Delete, and directly below it — always
 * visible, no extra click — the case-studies table for that sub-service.
 *
 * onEditSubService / onDeleteSubService are the SAME handlers ServiceMenu
 * gives to the SubServiceTable rows, so editing/deleting behaves
 * identically no matter which screen it's triggered from.
 */
const SubServiceDetail = ({
  subService,
  onBack,
  onEditSubService,
  onDeleteSubService,
  onAddCaseStudy,
  onUpdateCaseStudy,
  onDeleteCaseStudy,
}) => {
  const IconComp = getIconComponent(subService.icon);

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600"
      >
        <ArrowLeft size={16} />
        Back to Sub-Services
      </button>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <IconComp size={26} />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEditSubService(subService)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <Pencil size={14} />
              Edit Sub-Service
            </button>
            <button
              type="button"
              onClick={() => onDeleteSubService(subService)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        <h2 className="mt-4 text-xl font-semibold text-[#1a1a2e]">
          {subService.title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
          {subService.description}
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <CaseStudyTable
          caseStudies={subService.caseStudies}
          onAdd={onAddCaseStudy}
          onUpdate={onUpdateCaseStudy}
          onDelete={onDeleteCaseStudy}
        />
      </div>
    </div>
  );
};

export default SubServiceDetail;
