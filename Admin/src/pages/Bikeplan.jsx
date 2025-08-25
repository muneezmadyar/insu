import { useState } from "react";
import { toast } from "react-hot-toast";

const Bikeplan = ({ darkMode }) => {
  const [bikePlan, setBikePlan] = useState({
    company: "",
    name: "",
    rate: "",
    image: null,   // 👈 image bhi yahi store karenge
    preview: null, // 👈 for preview
  });

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const handleBikePlanChange = (e) => {
    const { name, value } = e.target;
    setBikePlan((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBikePlan = async (e) => {
    e.preventDefault();

    if (!bikePlan.company || !bikePlan.name || !bikePlan.rate || !bikePlan.image) {
      toast.error("❌ All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("company", bikePlan.company);
      formData.append("name", bikePlan.name);
      formData.append("rate", bikePlan.rate);
      formData.append("image", bikePlan.image);

      const response = await fetch(`${baseURL}/api/bike-plans`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("✅ Bike plan added successfully!");
        // Reset input fields
        setBikePlan({
          company: "",
          name: "",
          rate: "",
          image: null,
          preview: null,
        });
      } else {
        toast.error(data.message || "❌ Failed to add bike plan.");
      }
    } catch (error) {
      console.error("Error adding bike plan:", error);
      toast.error("❌ An error occurred while adding the plan.");
    }
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <h2 className="text-lg font-bold mb-4">Add Bike Insurance Plan</h2>

      {/* Upload Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <label className="relative border-2 border-dashed rounded-lg w-40 overflow-hidden cursor-pointer h-32 flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files[0]) {
                setBikePlan({
                  ...bikePlan,
                  image: e.target.files[0],
                  preview: URL.createObjectURL(e.target.files[0]),
                });
              }
            }}
          />

          {bikePlan.preview ? (
            <img
              src={bikePlan.preview}
              alt="preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <>
              <img
                src="/upload_area.png"
                alt="upload"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <span className="relative z-10 text-sm font-medium text-gray-700 dark:text-gray-200">
                Upload
              </span>
            </>
          )}
        </label>
      </div>

      {/* Form */}
      <form onSubmit={handleAddBikePlan} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          name="company"
          placeholder="Company"
          value={bikePlan.company}
          onChange={handleBikePlanChange}
          className="border p-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white w-full"
        /> <br />
        <input
          name="name"
          placeholder="Plan Name"
          value={bikePlan.name}
          onChange={handleBikePlanChange}
          className="border p-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white w-full"
        /> <br />
        <input
          type="number"
          name="rate"
          placeholder="Rate"
          value={bikePlan.rate}
          onChange={handleBikePlanChange}
          className="border p-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white w-full"
        />
      </form>

      {/* Save Button */}
      <button
        onClick={handleAddBikePlan}
        disabled={!bikePlan.company || !bikePlan.name || !bikePlan.rate || !bikePlan.image}
        className={`px-6 py-2 rounded-lg w-full sm:w-auto transition 
          ${!bikePlan.company || !bikePlan.name || !bikePlan.rate || !bikePlan.image
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
          }`}
      >
        Save Plan
      </button>
    </div>
  );
};

export default Bikeplan;
