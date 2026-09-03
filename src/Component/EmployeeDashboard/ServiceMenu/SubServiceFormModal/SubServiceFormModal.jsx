import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import IconPicker from "../IconPicker/IconPicker";

const EMPTY_FORM = { icon: "Layers", title: "", description: "" };

/**
 * Single form used for BOTH creating a new sub-service (e.g. "Local SEO"
 * under the "Website SEO Package" service) and editing an existing one.
 * `editingSubService` is null for create mode, or the sub-service object
 * being edited for update mode.
 */
const SubServiceFormModal = ({ open, editingSubService, onClose, onSubmit }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingSubService) {
      setForm({
        icon: editingSubService.icon,
        title: editingSubService.title,
        description: editingSubService.description,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError("");
  }, [editingSubService, open]);

  if (!open) return null;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required.");
      return;
    }
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#1a1a2e]">
            {editingSubService ? "Edit Sub-Service" : "Add Sub-Service"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">
              Icon
            </label>
            <IconPicker
              value={form.icon}
              onChange={(icon) => setForm((prev) => ({ ...prev, icon }))}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              placeholder="e.g. Local SEO"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              rows={3}
              placeholder="Short description of this sub-service"
              className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {editingSubService ? "Save Changes" : "Add Sub-Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubServiceFormModal;
