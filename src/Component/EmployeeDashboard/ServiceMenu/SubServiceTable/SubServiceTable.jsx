import React, { useState } from "react";
import { Search, Plus, Pencil, Trash2, ChevronRight } from "lucide-react";
import { getIconComponent } from "../utils/iconMap";

/**
 * Table-format CRUD list for a service's sub-services (e.g. "Local SEO",
 * "Technical SEO" under "Website SEO Package"). Unlimited count — no cap
 * like case studies have. Clicking a row's title/arrow opens that
 * sub-service's own detail page (which holds its case studies).
 *
 * This component is presentational only — the add/edit form and the
 * delete confirmation are both owned by ServiceMenu (the top-level
 * component), so "Edit" behaves identically whether triggered from a
 * row here or from the "Edit Sub-Service" button on the sub-service's
 * own detail page.
 */
const SubServiceTable = ({ subServices, onOpen, onAddClick, onEditClick, onDeleteClick }) => {
  const [query, setQuery] = useState("");

  const list = subServices || [];

  const filtered = list.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-[#1a1a2e]">
            Manage Sub-Services
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Parts of this service, each with its own case studies (
            {list.length} total).
          </p>
        </div>

        <button
          type="button"
          onClick={onAddClick}
          className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Plus size={16} />
          Add Sub-Service
        </button>
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
          placeholder="Search sub-services..."
          className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400"
        />
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center">
          <p className="text-sm font-medium text-gray-500">
            No sub-services added yet
          </p>
          <p className="text-xs text-gray-400">
            Add parts of this service, like "Local SEO" or "Technical SEO".
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-400">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Icon</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Case Studies</th>
                <th className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => {
                const IconComp = getIconComponent(item.icon);
                return (
                  <tr
                    key={item.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60"
                  >
                    <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <IconComp size={16} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => onOpen(item)}
                        className="font-medium text-[#1a1a2e] hover:text-indigo-600 hover:underline"
                      >
                        {item.title}
                      </button>
                    </td>
                    <td className="max-w-xs px-4 py-3 text-gray-500">
                      <span className="line-clamp-2">{item.description}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {(item.caseStudies || []).length}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => onEditClick(item)}
                          title="Edit sub-service"
                          className="text-gray-400 hover:text-indigo-600"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteClick(item)}
                          title="Delete sub-service"
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpen(item)}
                          title="View case studies"
                          className="text-gray-400 hover:text-indigo-600"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-400">
                    No sub-services match "{query}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubServiceTable;
