// import { useEffect, useState } from "react";

// const Plans = () => {
//   const [plans, setPlans] = useState([]);
//   const token = localStorage.getItem("adminToken");
//   const baseURL = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     fetch(`${baseURL}/api/plans/all`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then(setPlans);
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Insurance Plans</h2>
//       <ul className="space-y-2">
//         {plans.map((plan) => (
//           <li key={plan._id} className="border p-2 rounded bg-white">
//             {plan.name} - {plan.rate}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Plans;


// src/components/Plans.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDropdownManager from "./AdminDropdownManager";
import Plans from "./Plans";

const Plans = () => {
  const [clients, setClients] = useState([]);
  const [plans, setPlans] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  // const [selectedClient, setSelectedClient] = useState(null);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editedData, setEditedData] = useState({ company: "", name: "", rate: "", newImage: null });
  // const [newPlan, setNewPlan] = useState({ company: "", name: "", rate: "", image: null });
  // const [activeTab, setActiveTab] = useState("clients");

  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
      return;
    }

    fetch(`${baseURL}/api/clients`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setClients);

    fetch(`${baseURL}/api/plans/all`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(setPlans);
  }, [token, navigate, baseURL]);

  // const deleteClient = (id) => {
  //   fetch(`${baseURL}/api/clients/${id}`, {
  //     method: "DELETE",
  //     headers: { Authorization: `Bearer ${token}` },
  //   }).then(() => setClients((prev) => prev.filter((c) => c._id !== id)));
  // };

  const togglePlanStatus = async (plan) => {
    try {
      const res = await fetch(`${baseURL}/api/plans/${plan._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !plan.enabled }),
      });

      const updated = await res.json();
      setPlans((prev) => prev.map((p) => (p._id === plan._id ? updated : p)));
    } catch (err) {
      console.error("❌ Error toggling plan:", err.message);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlanId(plan._id);
    setEditedData({
      company: plan.company,
      name: plan.name,
      rate: plan.rate.replace('%', ''),
      newImage: null,
    });
  };

  const saveEditedPlan = async (plan) => {
    try {
      const formData = new FormData();
      formData.append("company", plan.company);
      formData.append("name", plan.name);
      formData.append("rate", plan.rate + "%");
      if (plan.newImage) {
        formData.append("image", plan.newImage);
      }

      const res = await fetch(`${baseURL}/api/plans/${plan._id}`, {
        method: "PUT",
        body: formData,
      });

      const updated = await res.json();
      setPlans((prev) => prev.map((p) => (p._id === plan._id ? updated : p)));
      setEditingPlanId(null);
      setEditedData({ company: "", name: "", rate: "", newImage: null });
    } catch (err) {
      console.error("❌ Error updating plan:", err.message);
    }
  };

  // const addNewPlan = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("company", newPlan.company);
  //     formData.append("name", newPlan.name);
  //     formData.append("rate", newPlan.rate + "%");
  //     formData.append("image", newPlan.image);

  //     const res = await fetch(`${baseURL}/api/plans`, {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}` },
  //       body: formData,
  //     });

  //     const data = await res.json();
  //     setPlans((prev) => [...prev, data]);
  //     setNewPlan({ company: "", name: "", rate: "", image: null });
  //   } catch (err) {
  //     console.error("❌ Plan upload failed:", err.message);
  //   }
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem("adminToken");
  //   navigate("/");
  // };

  return (
     <table className="w-full border mb-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Company</th>
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Rate</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => {
                  const isEditing = editingPlanId === plan._id;
                  return (
                    <tr key={plan._id} className={`border-b ${!plan.enabled ? "brightness-50" : ""}`}>
                      <td className="py-3 px-4">
                        {isEditing ? (
                          <input type="text" value={editedData.company} onChange={(e) => setEditedData({ ...editedData, company: e.target.value })} className="border p-1 rounded w-full" />
                        ) : (
                          plan.company
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {isEditing ? (
                          <input type="file" onChange={(e) => setEditedData({ ...editedData, newImage: e.target.files[0] })} className="w-full" />
                        ) : (
                          <img src={`${baseURL}/${plan.imageUrl}`} alt="Plan" className="w-12 h-12 object-contain" />
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {isEditing ? (
                          <input type="text" value={editedData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} className="border p-1 rounded w-full" />
                        ) : (
                          plan.name
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {isEditing ? (
                          <input type="number" value={editedData.rate} onChange={(e) => setEditedData({ ...editedData, rate: e.target.value })} className="border p-1 rounded w-full" />
                        ) : (
                          `${plan.rate}`
                        )}
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        {isEditing ? (
                          <button onClick={() => saveEditedPlan({ ...editedData, _id: plan._id })} className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
                        ) : (
                          <button onClick={() => handleEdit(plan)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
                        )}
                        <button onClick={() => togglePlanStatus(plan)} className={`${plan.enabled ? "bg-red-600" : "bg-purple-600"} text-white px-3 py-1 rounded`}>
                          {plan.enabled ? "Disable" : "Enable"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
  );
};

export default Plans;
