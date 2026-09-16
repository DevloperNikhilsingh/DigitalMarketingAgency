import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const CATEGORY_OPTIONS = [
  "Gym & Fitness",
  "Restaurant",
  "Salon",
  "Spa",
  "Cafe",
  "Photography Studio",
  "Interior Design",
  "Coaching / Education",
  "Automobile / Car Service",
  "Digital Marketing",
  "Other",
];

const emptyService = { name: "", description: "", price: "", unit: "" };

const GetListedModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [hours, setHours] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [highlights, setHighlights] = useState(["", "", "", ""]);
  const [features, setFeatures] = useState(["", "", "", "", "", ""]);
  const [services, setServices] = useState([{ ...emptyService }]);

  // images array will store { file, preview } objects
  const [images, setImages] = useState([]);

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  // simple helper to update highlight/feature array by index
  const updateHighlight = (index, value) => {
    const newHighlights = [...highlights];
    newHighlights[index] = value;
    setHighlights(newHighlights);
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addHighlight = () => {
    setHighlights([...highlights, ""]);
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeHighlight = (index) => {
    setHighlights(highlights.filter((item, i) => i !== index));
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((item, i) => i !== index));
  };

  const updateService = (index, key, value) => {
    const newServices = [...services];
    newServices[index][key] = value;
    setServices(newServices);
  };

  const addService = () => {
    setServices([...services, { ...emptyService }]);
  };

  const removeService = (index) => {
    setServices(services.filter((item, i) => i !== index));
  };

  // handle image file select from input
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // dont allow more than 6 images
    if (images.length >= 6) {
      alert("You can upload maximum 6 images only");
      return;
    }

    // make a preview url so we can show the image right away
    const previewUrl = URL.createObjectURL(file);

    setImages([...images, { file: file, preview: previewUrl }]);
  };

  const removeImage = (index) => {
    setImages(images.filter((item, i) => i !== index));
  };

  const validate = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Business name is required";
    }
    if (!category) {
      newErrors.category = "Please select a category";
    }
    if (!location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!description.trim()) {
      newErrors.description = "Short description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const payload = {
      name,
      category,
      location,
      address,
      phone,
      whatsapp,
      email,
      hours,
      description,
      longDescription,
      highlights: highlights.filter((h) => h.trim() !== ""),
      features: features.filter((f) => f.trim() !== ""),
      services: services.filter((s) => s.name.trim() !== ""),
      images: images.map((img) => img.file), // send actual files to backend
      rating: 0,
      reviewCount: 0,
      verified: false,
      isNew: true,
    };

    if (onSubmit) {
      onSubmit(payload);
    }

    onClose();
  };

  const inputClass =
    "w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition";
  const labelClass = "block text-sm font-medium text-stone-700 mb-1.5";
  const errorClass = "text-xs text-red-500 mt-1";
  const sectionTitleClass =
    "text-base font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-stone-100 shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              List Your Business
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Fill in your details to get listed on DigiService
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-500 transition shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-5 sm:px-7 py-6 space-y-8 flex-1"
        >
          <div>
            <h3 className={sectionTitleClass}>Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className={labelClass}>Business Name *</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. FitZone Fitness"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className={errorClass}>{errors.name}</p>}
              </div>

              <div>
                <label className={labelClass}>Category *</label>
                <select
                  className={inputClass}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose a category</option>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className={errorClass}>{errors.category}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>City / Location *</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. Varanasi, UP"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {errors.location && (
                  <p className={errorClass}>{errors.location}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Full Address *</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. 123, Sigra Main Road, Varanasi, UP - 221010"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {errors.address && (
                  <p className={errorClass}>{errors.address}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Phone Number *</label>
                <input
                  type="tel"
                  className={inputClass}
                  placeholder="e.g. +919876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className={errorClass}>{errors.phone}</p>}
              </div>

              <div>
                <label className={labelClass}>WhatsApp Number</label>
                <input
                  type="tel"
                  className={inputClass}
                  placeholder="e.g. 919876543210"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="e.g. contact@business.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className={labelClass}>Business Hours</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="e.g. Mon – Sun: 9:00 AM – 9:00 PM"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className={sectionTitleClass}>Description</h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Short Description *</label>
                <textarea
                  rows={2}
                  className={inputClass}
                  placeholder="One or two lines shown on the listing card"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (
                  <p className={errorClass}>{errors.description}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Detailed Description</label>
                <textarea
                  rows={4}
                  className={inputClass}
                  placeholder="Full 'About' text shown on your business page"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className={sectionTitleClass}>Highlights</h3>
            <p className="text-xs text-stone-500 -mt-2 mb-3">
              Short tags shown near your business name (e.g. "Modern
              Equipment")
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    className={inputClass}
                    placeholder={`Highlight ${i + 1}`}
                    value={h}
                    onChange={(e) => updateHighlight(i, e.target.value)}
                  />
                  {highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHighlight(i)}
                      className="text-stone-400 hover:text-red-500 shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addHighlight}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700"
            >
              <Plus size={14} /> Add Highlight
            </button>
          </div>

          <div>
            <h3 className={sectionTitleClass}>Key Features</h3>
            <p className="text-xs text-stone-500 -mt-2 mb-3">
              Facilities or offerings shown on your business page
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    className={inputClass}
                    placeholder={`Feature ${i + 1}`}
                    value={f}
                    onChange={(e) => updateFeature(i, e.target.value)}
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="text-stone-400 hover:text-red-500 shrink-0"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700"
            >
              <Plus size={14} /> Add Feature
            </button>
          </div>

          <div>
            <h3 className={sectionTitleClass}>Services & Pricing</h3>
            <div className="space-y-4">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="border border-stone-200 rounded-xl p-4 relative"
                >
                  {services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeService(i)}
                      className="absolute top-3 right-3 text-stone-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Service Name</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="e.g. Basic Membership"
                        value={service.name}
                        onChange={(e) =>
                          updateService(i, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>
                        Service Description
                      </label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="e.g. Full gym floor access during regular hours."
                        value={service.description}
                        onChange={(e) =>
                          updateService(i, "description", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Price</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="e.g. ₹1,999"
                        value={service.price}
                        onChange={(e) =>
                          updateService(i, "price", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Unit</label>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="e.g. / month"
                        value={service.unit}
                        onChange={(e) =>
                          updateService(i, "unit", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addService}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700"
            >
              <Plus size={14} /> Add Another Service
            </button>
          </div>

          <div>
            <h3 className={sectionTitleClass}>Photos</h3>
            <p className="text-xs text-stone-500 -mt-2 mb-3">
              Upload photos for your gallery (first image is used as the main
              photo)
            </p>

            {/* show already uploaded images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative border border-stone-200 rounded-lg overflow-hidden h-28"
                >
                  <img
                    src={img.preview}
                    alt="uploaded"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 text-stone-500 hover:text-red-500 shadow"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* upload box - hide once 6 images are added */}
            {images.length < 6 && (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-stone-300 rounded-lg h-28 cursor-pointer hover:border-amber-400 transition text-stone-400 hover:text-amber-500">
                <Plus size={20} />
                <span className="text-xs mt-1">Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}

            <p className="text-xs text-stone-400 mt-2">
              {images.length}/6 images uploaded
            </p>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 px-5 sm:px-7 py-4 border-t border-stone-100 shrink-0 bg-stone-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-full text-sm font-semibold text-stone-600 hover:bg-stone-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-full text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-stone-900 transition"
          >
            Submit Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetListedModal;