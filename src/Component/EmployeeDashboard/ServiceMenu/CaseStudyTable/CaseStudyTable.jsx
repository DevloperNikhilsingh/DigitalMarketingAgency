import React, { useState } from "react";
import { Search, Plus, Pencil, Trash2, ImageOff } from "lucide-react";
import CaseStudyFormModal from "../CaseStudyFormModal/CaseStudyFormModal";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { MAX_CASE_STUDIES } from "../data/dummyData";

/**
 * Table-format CRUD list for a service's case studies (previous
 * projects), matching the "Brands We Worked With" list style:
 * search bar, "+ Add" button, one row per item with a thumbnail,
 * and edit/delete actions per row.
 *
 * This is always visible on the service detail page — there is no
 * extra hidden click needed to reach it.
 */
const CaseStudyTable = ({
  caseStudies,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingCaseStudy, setEditingCaseStudy] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const list = caseStudies || [];
  const canAddMore = list.length < MAX_CASE_STUDIES;

  const filtered = list.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  const openCreateForm = () => {
    setEditingCaseStudy(null);
    setFormOpen(true);
  };

  const openEditForm = (item) => {
    setEditingCaseStudy(item);
    setFormOpen(true);
  };

  const handleSubmit = (formData) => {
    if (editingCaseStudy) {
      onUpdate(editingCaseStudy.id, formData);
    } else {
      onAdd(formData);
    }
    setFormOpen(false);
    setEditingCaseStudy(null);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-[#1a1a2e]">
            Manage Case Studies
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Previous projects shown for this service ({list.length}/
            {MAX_CASE_STUDIES}).
          </p>
        </div>

        {canAddMore && (
          <button
            type="button"
            onClick={openCreateForm}
            className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-[#1a1a2e] hover:bg-amber-500"
          >
            <Plus size={16} />
            Add Case Study
          </button>
        )}
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search case studies..."
          className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400"
        />
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center">
          <p className="text-sm font-medium text-gray-500">
            No case studies added yet
          </p>
          <p className="text-xs text-gray-400">
            Add up to {MAX_CASE_STUDIES} previous projects for this service.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Image</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60"
                >
                  <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageOff size={16} className="text-gray-300" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-[#1a1a2e]">
                    {item.title}
                  </td>
                  <td className="max-w-xs px-4 py-3 text-gray-500">
                    <span className="line-clamp-2">{item.description}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => openEditForm(item)}
                        title="Edit case study"
                        className="text-gray-400 hover:text-indigo-600"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmTarget(item)}
                        title="Delete case study"
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-400">
                    No case studies match "{query}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <CaseStudyFormModal
        open={formOpen}
        editingCaseStudy={editingCaseStudy}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={!!confirmTarget}
        title="Delete this case study?"
        message={
          confirmTarget
            ? `"${confirmTarget.title}" will be removed from this service.`
            : ""
        }
        onCancel={() => setConfirmTarget(null)}
        onConfirm={() => {
          onDelete(confirmTarget.id);
          setConfirmTarget(null);
        }}
      />
    </div>
  );
};

export default CaseStudyTable;
