import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AdminDropdownManager = ({ darkMode }) => {
  const [dropdowns, setDropdowns] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({ brand: "", models: [] });
  const [newDropdown, setNewDropdown] = useState({ brand: "", models: [{ name: "", years: "" }] });

  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("adminToken");

  const fetchDropdowns = () => {
    fetch(`${baseURL}/api/dropdowns`)
      .then((res) => res.json())
      .then(setDropdowns)
      .catch(console.error);
  };

  useEffect(() => {
    fetchDropdowns();
  }, []);

  const handleDelete = (id) => {
    fetch(`${baseURL}/api/dropdowns/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete dropdown");
        toast.success("🗑️ Dropdown deleted successfully!");
        fetchDropdowns();
      })
      .catch(() => toast.error("❌ Failed to delete dropdown. Please try again."));
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditedData({
      brand: item.brand,
      models: (item.models || []).map((m) => ({
        name: m.name,
        years: (m.years || []).join(", "),
      })),
    });
  };

  const handleModelChange = (index, field, value, type) => {
    const updatedModels = [...(type === "edit" ? editedData.models : newDropdown.models)];
    updatedModels[index][field] = value;
    if (type === "edit") {
      setEditedData({ ...editedData, models: updatedModels });
    } else {
      setNewDropdown({ ...newDropdown, models: updatedModels });
    }
  };

  const addModelField = (type) => {
    if (type === "edit") {
      setEditedData({
        ...editedData,
        models: [...editedData.models, { name: "", years: "" }],
      });
    } else {
      setNewDropdown({
        ...newDropdown,
        models: [...newDropdown.models, { name: "", years: "" }],
      });
    }
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

  const handleSaveEdit = (id) => {
    const formattedModels = editedData.models.map((m) => ({
      name: m.name.trim(),
      years: m.years
        .split(",")
        .map((y) => parseInt(y.trim()))
        .filter((y) => !isNaN(y)),
    }));

    fetch(`${baseURL}/api/dropdowns/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ brand: editedData.brand.trim(), models: formattedModels }),
    })
      .then(() => {
        toast.success("✅ Dropdown updated successfully!");
        fetchDropdowns();
        setEditingId(null);
      })
      .catch(console.error);
  };

  const handleAddDropdown = () => {
    const formattedModels = newDropdown.models.map((m) => ({
      name: m.name.trim(),
      years: m.years
        .split(",")
        .map((y) => parseInt(y.trim()))
        .filter((y) => !isNaN(y)),
    }));

    fetch(`${baseURL}/api/dropdowns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ brand: newDropdown.brand.trim(), models: formattedModels }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("✅ Dropdown added successfully!");
        fetchDropdowns();
        setNewDropdown({ brand: "", models: [{ name: "", years: "" }] });
      })
      .catch(console.error);
  };

  return (
  <div className={darkMode ? "bg-gray-900 text-white p-6 min-h-screen" : "bg-gray-50 text-black p-6 min-h-screen"}>
  <h2 className="text-2xl font-bold mb-6"> Car Dropdown Manager</h2>

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
              value={editedData.brand}
              onChange={(e) => setEditedData({ ...editedData, brand: e.target.value })}
              className={`border rounded-lg p-2 mb-3 w-full ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-black placeholder-gray-500"
              }`}
              placeholder="Brand"
            />

            {/* Models */}
       {editedData.models.map((model, idx) => (
  <div key={idx} className="flex flex-wrap sm:flex-nowrap gap-2 mb-3">
    <input
      value={model.name}
      onChange={(e) => handleModelChange(idx, "name", e.target.value, "edit")}
      placeholder="Model Name"
      className={`flex-1 min-w-0 border rounded-lg p-2 w-full ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          : "bg-white border-gray-300 text-black placeholder-gray-500"
      }`}
    />
    <input
      value={model.years}
      onChange={(e) => handleModelChange(idx, "years", e.target.value, "edit")}
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
              onClick={() => addModelField("edit")}
              className="bg-[#005190] hover:bg-blue-600 text-white px-3 py-1 rounded-lg mb-3 transition"
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
              {(item.models || []).map((m, i) => (
                <li key={i}>
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

  {/* Add New Dropdown */}
  <div
    className={`mt-10 p-6 rounded-xl shadow-md border ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
    }`}
  >
    <h3 className="text-xl font-semibold mb-4">➕ Add New Dropdown</h3>

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

    {newDropdown.models.map((model, idx) => (
    <div key={idx} className="flex flex-wrap sm:flex-nowrap gap-2 mb-3">
  <input
    placeholder="Model Name"
    value={model.name}
    onChange={(e) => handleModelChange(idx, "name", e.target.value, "new")}
    className={`flex-1 min-w-0 border rounded-lg p-2 w-full ${
      darkMode
        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        : "bg-white border-gray-300 text-black placeholder-gray-500"
    }`}
  />
  <input
    placeholder="Years (comma separated)"
    value={model.years}
    onChange={(e) => handleModelChange(idx, "years", e.target.value, "new")}
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
      onClick={() => addModelField("new")}
      className="bg-[#005190] hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 transition"
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

export default AdminDropdownManager;
