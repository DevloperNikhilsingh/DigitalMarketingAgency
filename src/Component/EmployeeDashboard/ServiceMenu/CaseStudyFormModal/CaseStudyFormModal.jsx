import React, { useEffect, useRef, useState } from "react";
import { X, UploadCloud, ImageOff } from "lucide-react";

const EMPTY_FORM = { image: "", title: "", description: "" };

/**
 * Form for a single case-study card that lives inside a service
 * (image + title + description/result). Used both to add a new one
 * and to edit an existing one.
 *
 * Image is a real local file upload (via <input type="file">), read
 * into a base64 data URL with FileReader and kept in memory — there is
 * no backend/storage yet, so this is what lets it actually preview and
 * save without needing to host the file anywhere.
 */
const CaseStudyFormModal = ({ open, editingCaseStudy, onClose, onSubmit }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingCaseStudy) {
      setForm({
        image: editingCaseStudy.image || "",
        title: editingCaseStudy.title || "",
        description: editingCaseStudy.description || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError("");
  }, [editingCaseStudy, open]);

  if (!open) return null;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
      setError("");
    };
    reader.onerror = () => setError("Couldn't read that file, try again.");
    reader.readAsDataURL(file);
  };

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
            {editingCaseStudy ? "Edit Case Study" : "Add Case Study"}
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
              Image
            </label>

            <div className="flex items-center gap-3">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageOff size={20} className="text-gray-300" />
                )}
              </div>

              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
                >
                  <UploadCloud size={16} />
                  {form.image ? "Change Image" : "Upload from device"}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              placeholder="e.g. Bloomstack Organics"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-600">
              Description / Result
            </label>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              rows={3}
              placeholder="What was achieved for this client"
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
              {editingCaseStudy ? "Save Changes" : "Add Case Study"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaseStudyFormModal;
