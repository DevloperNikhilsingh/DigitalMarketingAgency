import React, { useState } from "react";
import { ICON_NAMES, getIconComponent } from "../utils/iconMap";

/**
 * Lets the CMS user pick a lucide-react icon by name for a service card.
 * Renders a small searchable grid instead of a raw text input so the
 * person managing services never has to type an exact icon name.
 */
const IconPicker = ({ value, onChange }) => {
  const [query, setQuery] = useState("");

  const filtered = ICON_NAMES.filter((name) =>
    name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search icons..."
        className="mb-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-indigo-400"
      />

      <div className="grid max-h-40 grid-cols-6 gap-2 overflow-y-auto rounded-xl border border-gray-100 p-2 sm:grid-cols-8">
        {filtered.map((name) => {
          const IconComp = getIconComponent(name);
          const isSelected = value === name;
          return (
            <button
              type="button"
              key={name}
              title={name}
              onClick={() => onChange(name)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                isSelected
                  ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                  : "border-transparent text-gray-500 hover:bg-gray-50"
              }`}
            >
              <IconComp size={18} />
            </button>
          );
        })}

        {filtered.length === 0 && (
          <p className="col-span-full py-3 text-center text-xs text-gray-400">
            No icons match "{query}"
          </p>
        )}
      </div>
    </div>
  );
};

export default IconPicker;
