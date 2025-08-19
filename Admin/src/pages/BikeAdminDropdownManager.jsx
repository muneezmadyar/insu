import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const BikeAdminDropdownManager = ({ darkMode }) => {
  const [dropdowns, setDropdowns] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedBrand, setEditedBrand] = useState("");
  const [editedModels, setEditedModels] = useState([]);
  const [newDropdown, setNewDropdown] = useState({ brand: "", models: [{ name: "", years: "" }] });

  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("adminToken");

  const fetchDropdowns = () => {
    fetch(`${baseURL}/api/bikedropdowns`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setDropdowns)
      .catch(console.error);
  };

  useEffect(() => {
    fetchDropdowns();
  }, []);

  const handleDelete = (id) => {
    fetch(`${baseURL}/api/bikedropdowns/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete dropdown");
        toast.success("🗑️ Dropdown deleted successfully!");
        fetchDropdowns();
      })
      .catch((err) => {
        console.error("Error deleting dropdown:", err);
        toast.error("❌ Failed to delete dropdown. Please try again.");
      });
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditedBrand(item.brand);
    setEditedModels(
      (item.models || []).map((m) => ({
        name: m.name,
        years: (m.years || []).join(", "),
      }))
    );
  };

  const handleSaveEdit = (id) => {
    const modelsWithYears = editedModels.map((m) => ({
      name: m.name.trim(),
      years: m.years
        .split(",")
        .map((y) => parseInt(y.trim()))
        .filter((y) => !isNaN(y)),
    }));

    const updated = {
      brand: editedBrand.trim(),
      models: modelsWithYears,
    };

    fetch(`${baseURL}/api/bikedropdowns/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updated),
    })
      .then(() => {
        toast.success("✅ Dropdown updated successfully!");
        fetchDropdowns();
        setEditingId(null);
      })
      .catch(console.error);
  };

  const handleAddDropdown = () => {
    const modelsWithYears = newDropdown.models.map((m) => ({
      name: m.name.trim(),
      years: m.years
        .split(",")
        .map((y) => parseInt(y.trim()))
        .filter((y) => !isNaN(y)),
    }));

    const payload = {
      brand: newDropdown.brand.trim(),
      models: modelsWithYears,
    };

    fetch(`${baseURL}/api/bikedropdowns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("✅ Dropdown added successfully!");
        fetchDropdowns();
        setNewDropdown({ brand: "", models: [{ name: "", years: "" }] });
      })
      .catch(console.error);
  };
  const removeModelField = (index, type) => {
    if (type === "edit") {
      setEditedData({
        ...editedData,
        models: editedData.models.filter((_, i) => i !== index),
      });
    } else {
      setNewDropdown({
        ...newDropdown,
        models: newDropdown.models.filter((_, i) => i !== index),
      });
    }
  };
  const handleModelChange = (index, field, value, isEditing = false) => {
    if (isEditing) {
      const updated = [...editedModels];
      updated[index][field] = value;
      setEditedModels(updated);
    } else {
      const updated = [...newDropdown.models];
      updated[index][field] = value;
      setNewDropdown({ ...newDropdown, models: updated });
    }
  };

  const addModelField = (isEditing = false) => {
    if (isEditing) {
      setEditedModels([...editedModels, { name: "", years: "" }]);
    } else {
      setNewDropdown({
        ...newDropdown,
        models: [...newDropdown.models, { name: "", years: "" }],
      });
    }
  };

  return (
   <div className={darkMode ? "bg-gray-900 text-white p-6 min-h-screen" : "bg-gray-50 text-black p-6 min-h-screen"}>
  <h2 className="text-2xl font-bold mb-6"> Bike Dropdown Manager</h2>

  {/* Dropdowns List */}
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {dropdowns.map((item) => (
      <div
        key={item._id}
        className={`rounded-xl shadow-md border p-5 transition hover:shadow-lg ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        {editingId === item._id ? (
          <>
            {/* Brand Input */}
            <input
              value={editedBrand}
              onChange={(e) => setEditedBrand(e.target.value)}
              className={`border rounded-lg p-2 mb-3 w-full ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black placeholder-gray-500"
              }`}
              placeholder="Brand"
            />

            {/* Models */}
            {editedModels.map((m, idx) => (
              <div key={idx} className="flex flex-wrap sm:flex-nowrap gap-2 mb-3">
                <input
                  value={m.name}
                  onChange={(e) => handleModelChange(idx, "name", e.target.value, true)}
                  placeholder="Model Name"
                  className={`flex-1 min-w-0 border rounded-lg p-2 w-full ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-black placeholder-gray-500"
                  }`}
                />
                <input
                  value={m.years}
                  onChange={(e) => handleModelChange(idx, "years", e.target.value, true)}
                  placeholder="Years (comma separated)"
                  className={`flex-1 min-w-0 border rounded-lg p-2 w-full ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-black placeholder-gray-500"
                  }`}
                />
              </div>
            ))}

            <button
              onClick={() => addModelField(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg mb-3 transition"
            >
              ➕ Add Model
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => handleSaveEdit(item._id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                ✅ Save
              </button>
              <button
                onClick={() => setEditingId(null)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
              >
                ❌ Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="font-semibold text-lg mb-2">{item.brand}</p>
            <ul className="list-disc ml-5 mb-3 text-sm">
              {(item.models || []).map((m, idx) => (
                <li key={idx}>
                  {m.name} <span className="text-gray-400">({(m.years || []).join(", ")})</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition"
              >
                🗑️ Delete
              </button>
            </div>
          </>
        )}
      </div>
    ))}
  </div>

  {/* Add New Bike Dropdown */}
  <div
    className={`mt-10 p-6 rounded-xl shadow-md border ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    }`}
  >
    <h3 className="text-xl font-semibold mb-4">➕ Add New Bike Dropdown</h3>

    <input
      placeholder="Brand"
      value={newDropdown.brand}
      onChange={(e) => setNewDropdown({ ...newDropdown, brand: e.target.value })}
      className={`border rounded-lg p-2 mb-4 w-full ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          : "bg-white border-gray-300 text-black placeholder-gray-500"
      }`}
    />

    {newDropdown.models.map((m, idx) => (
      <div key={idx} className="flex flex-wrap sm:flex-nowrap gap-2 mb-3">
        <input
          placeholder="Model Name"
          value={m.name}
          onChange={(e) => handleModelChange(idx, "name", e.target.value)}
          className={`flex-1 min-w-0 border rounded-lg p-2 w-full ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-black placeholder-gray-500"
          }`}
        />
        <input
          placeholder="Years (comma separated)"
          value={m.years}
          onChange={(e) => handleModelChange(idx, "years", e.target.value)}
          className={`flex-1 min-w-0 border rounded-lg p-2 w-full ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-black placeholder-gray-500"
          }`}
        />
        <button
          onClick={() => removeModelField(idx, "new")}
          className="bg-red-500 hover:bg-red-600 text-white px-3 rounded-lg transition"
        >
          ✕
        </button>
      </div>
    ))}

    <button
      onClick={() => addModelField(false)}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 transition"
    >
      ➕ Add Model
    </button>

    <button
      onClick={handleAddDropdown}
      className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
    >
      ✅ Save Dropdown
    </button>
  </div>
</div>

  );
};

export default BikeAdminDropdownManager;
