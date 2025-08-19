// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminDropdownManager from "./AdminDropdownManager"

// const AdminDashboard = () => {
//   const [clients, setClients] = useState([]);
//   const [plans, setPlans] = useState([]);
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [editingPlanId, setEditingPlanId] = useState(null);
// const [newPlan, setNewPlan] = useState({
//   company: "",
//   name: "",
//   rate: "",
//   image: null
// });
// const [editedData, setEditedData] = useState({
//   company: "",
//   name: "",
//   rate: "",
//   newImage: null
// });

//   const [activeTab, setActiveTab] = useState("clients");

//   const navigate = useNavigate();
//   const token = localStorage.getItem("adminToken");
//   console.log(token);

//   const baseURL = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     if (!token) {
//       navigate("/admin-login");
//       return;
//     }
// // for (let pair of formData.entries()) {
// //   console.log("📤", pair[0], pair[1]);
// // }

//     fetch(`${baseURL}/api/clients`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then((res) => res.json())
//       .then(setClients);

//     fetch(`${baseURL}/api/plans/all`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then((res) => res.json())
//       .then(setPlans);
//   }, [token, navigate, baseURL]);

//   const deleteClient = (id) => {
//     fetch(`${baseURL}/api/clients/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` }
//     }).then(() => setClients((prev) => prev.filter((c) => c._id !== id)));
//   };

//   const togglePlan = (id, newStatus) => {
//   fetch(`${baseURL}/api/plans/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ disabled: newStatus }),
//   })
//     .then((res) => res.json())
//     .then((updated) => {
//       setPlans((prev) =>
//         prev.map((p) => (p._id === id ? updated : p))
//       );
//     });
// };

// const saveEditedPlan = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("company", editedData.company);
//       formData.append("name", editedData.name);
//       formData.append("rate", editedData.rate);
//       if (editedData.newImage) {
//         formData.append("image", editedData.newImage);
//       }

//       const res = await fetch(`${baseURL}/api/plans/${editingPlanId}`, {
//         method: "PUT",
//         body: formData,
//       });

//       const updated = await res.json();

//       setPlans((prev) =>
//         prev.map((p) => (p._id === updated._id ? updated : p))
//       );
//       setEditingPlanId(null);
//     } catch (err) {
//       console.error("❌ Error updating plan:", err.message);
//     }
//   };

// const addNewPlan = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("company", newPlan.company);
//       formData.append("name", newPlan.name);
//       formData.append("rate", newPlan.rate);
//       formData.append("image", newPlan.image);

//       for (let pair of formData.entries()) {
//         console.log("📤", pair[0], pair[1]);
//       }

//       const res = await fetch(`${baseURL}/api/plans`, {
//   method: "POST",
//   headers: {
//     Authorization: `Bearer ${token}`,
//     // ❌ DON'T set Content-Type manually with FormData
//   },
//   body: formData,
// });

// let data;
// try {
//   data = await res.json(); // ✅ Only if response is valid JSON
// } catch (err) {
//   const text = await res.text(); // 🔥 catch HTML response
//   console.error("❌ Non-JSON response:", text);
//   throw new Error("Invalid server response format");
// }

// if (!res.ok) throw new Error(data.error || "Upload failed");

//       console.log("✅ Plan uploaded:", data);
//       setPlans((prev) => [...prev, data]);

//       setNewPlan({ company: "", name: "", rate: "", image: null });
//     } catch (err) {
//       console.error("❌ Plan upload failed:", err.message);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     navigate("/");
//   };

//   return (
//     <div className="flex min-h-screen">
//       <aside className="w-64 bg-gray-800 text-white p-4 space-y-4 relative">
//         <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
//         <button onClick={() => setActiveTab("clients")} className="w-full px-4 py-2 text-left hover:bg-gray-700 rounded">Client List</button>
//         <button onClick={() => setActiveTab("plans")} className="w-full px-4 py-2 text-left hover:bg-gray-700 rounded">Insurance Plans</button>
//         <button onClick={() => setActiveTab("add")} className="w-full px-4 py-2 text-left hover:bg-gray-700 rounded">Add New Plan</button>
//         <button onClick={() => setActiveTab("dropdowns")} className="w-full px-4 py-2 text-left hover:bg-gray-700 rounded">Dropdown</button>
//         <button onClick={handleLogout} className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded">Logout</button>
//       </aside>

//       <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
//         {activeTab === "clients" && (
//           <div>
//             <h3 className="text-xl font-semibold mb-2">Client List</h3>
//             <table className="w-full border mb-6">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border p-2">Name</th>
//                   <th className="border p-2">Email</th>
//                   <th className="border p-2">Phone</th>
//                   <th className="border p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {clients.map((client) => (
//                   <tr key={client._id}>
//                     <td className="border p-2">{client.name}</td>
//                     <td className="border p-2">{client.email}</td>
//                     <td className="border p-2">{client.phone}</td>
//                     <td className="border p-2 flex gap-2">
//                       <button onClick={() => { setSelectedClient(client); setShowPopup(true); }} className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
//                       <button onClick={() => deleteClient(client._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {showPopup && selectedClient && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                 <div className="bg-white p-6 rounded-lg w-96 relative">
//                   <button onClick={() => setShowPopup(false)} className="absolute top-2 right-2 text-xl">×</button>
//                   <h3 className="text-lg font-semibold mb-2">Client Info</h3>
//                   {Object.entries(selectedClient).map(([key, val]) => (
//                     <p key={key}><strong>{key}:</strong> {val}</p>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

// {activeTab === "plans" && (
//   <div>
//     <h3 className="text-xl font-semibold mb-2">Insurance Plans</h3>
//     <table className="w-full border mb-6">
//       <thead>
//         <tr className="bg-gray-100">
//           <th className="border p-2">Company</th>
//           <th className="border p-2">Image</th>
//           <th className="border p-2">Name</th>
//           <th className="border p-2">Rate</th>
//           <th className="border p-2">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {plans.map((plan) => (
//           <tr key={plan._id} className={plan.disabled ? "opacity-50" : ""}>
//             <td className="border p-2">
//               {editingPlanId === plan._id ? (
//                 <input
//                   value={plan.company}
//                   onChange={(e) =>
//                     setPlans((prev) =>
//                       prev.map((p) =>
//                         p._id === plan._id ? { ...p, company: e.target.value } : p
//                       )
//                     )
//                   }
//                 />
//               ) : (
//                 plan.company
//               )}
//             </td>

//             <td className="border p-2">
//               {editingPlanId === plan._id ? (
//                 <input
//                   type="file"
//                   onChange={(e) => {
//                     const file = e.target.files[0];
//                     setPlans((prev) =>
//                       prev.map((p) =>
//                         p._id === plan._id ? { ...p, newImage: file } : p
//                       )
//                     );
//                   }}
//                 />
//               ) : (
//                 <img
//                   src={`http://localhost:5000/${plan.imageUrl}`}
//                   alt={plan.name}
//                   className="h-12 w-12 object-cover rounded"
//                 />
//               )}
//             </td>

//             <td className="border p-2">
//               {editingPlanId === plan._id ? (
//                 <input
//                   value={plan.name}
//                   onChange={(e) =>
//                     setPlans((prev) =>
//                       prev.map((p) =>
//                         p._id === plan._id ? { ...p, name: e.target.value } : p
//                       )
//                     )
//                   }
//                 />
//               ) : (
//                 plan.name
//               )}
//             </td>

//             <td className="border p-2">
//               {editingPlanId === plan._id ? (
//                 <input
//                   value={plan.rate}
//                   onChange={(e) =>
//                     setPlans((prev) =>
//                       prev.map((p) =>
//                         p._id === plan._id ? { ...p, rate: e.target.value } : p
//                       )
//                     )
//                   }
//                 />
//               ) : (
//                 plan.rate
//               )}
//             </td>

//             <td className="border p-2 flex gap-2">
//               {editingPlanId === plan._id ? (
//                 <button
//                   onClick={() => saveEditedPlan(plan)}
//                   className="bg-green-600 text-white px-2 py-1 rounded"
//                 >
//                   Save
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setEditingPlanId(plan._id)}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded"
//                 >
//                   Edit
//                 </button>
//               )}
//               <button
//                 onClick={() => togglePlan(plan._id, !plan.disabled)}
//                 className={`${
//                   plan.disabled ? "bg-green-600" : "bg-gray-400"
//                 } text-white px-2 py-1 rounded`}
//               >
//                 {plan.disabled ? "Enable" : "Disable"}
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}

//       {activeTab === "add" && (
//   <div>
//     <h3 className="text-xl font-semibold mb-2">Add New Plan</h3>
//     <div className="grid grid-cols-1 gap-4 mb-6">
//       <input
//         placeholder="Company Name"
//         value={newPlan.company || ""}
//         onChange={(e) =>
//           setNewPlan({ ...newPlan, company: e.target.value })
//         }
//         className="border p-2 rounded"
//       />
//       <input
//         placeholder="Plan Name"
//         value={newPlan.name || ""}
//         onChange={(e) =>
//           setNewPlan({ ...newPlan, name: e.target.value })
//         }
//         className="border p-2 rounded"
//       />
//       <input
//         placeholder="Rate (e.g. 1.75%)"
//         value={newPlan.rate || ""}
//         onChange={(e) =>
//           setNewPlan({ ...newPlan, rate: e.target.value })
//         }
//         className="border p-2 rounded"
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) =>
//           setNewPlan({ ...newPlan, image: e.target.files[0] })
//         }
//         className="border p-2 rounded"
//       />
//     </div>
//     <button
//       onClick={addNewPlan}
//       className="bg-blue-600 text-white px-4 py-2 rounded"
//     >
//       Save Plan
//     </button>
//   </div>
// )}

//         {activeTab === "dropdowns" && (
//   <div>
//     <h3 className="text-xl font-semibold mb-4">Dropdown Manager</h3>
//     {/* 👇 Yahan tum apna dropdown wala component ya form paste karo */}
//     {/* Example: <DropdownManager /> */}

//     <AdminDropdownManager/>
//     <p>Dropdown management UI yahan aayega.</p>
//   </div>
// )}

//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDropdownManager from "./AdminDropdownManager";
import axios from "axios"; // ✅ REQUIRED
import Bikeplan from "./bikeplan";
import { toast } from "react-hot-toast";
import BikeAdminDropdownManager from "./BikeAdminDropdownManager";
// import BikeClientsDashboard from "./BikeClientsDashboard";
import { FaBars, FaTimes, FaSearch, FaSun, FaMoon, FaUser, FaCar, FaPlus, FaSignOutAlt, FaChevronDown, FaTrash, FaEllipsisH, FaEdit, FaSave, FaToggleOn, FaToggleOff } from "react-icons/fa";
import ChartDashboard from "./ChartDashboard";
const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [plans, setPlans] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [bikePlans, setBikePlans] = useState([]);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showAddDropdown, setShowAddDropdown] = useState(false);
  const [showDropdownSettings, setShowDropdownSettings] = useState(false);
  const [bikeClients, setBikeClients] = useState([]);
  const [newPlan, setNewPlan] = useState({
    company: "",
    name: "",
    rate: "",
    image: null,
  });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedPlan, setEditedPlan] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  // const [bikeEditIndex, setBikeEditIndex] = useState(null);
  const [editedBikePlan, setEditedBikePlan] = useState({});

  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
      return;
    }

    fetchClients();
    fetchPlans();
    fetchBikePlans();
  }, [token, navigate]);

  const fetchClients = async () => {
    const res = await fetch(`${baseURL}/api/clients`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setClients(data);
  };

  const fetchPlans = async () => {
    try {
      const res = await fetch(`${baseURL}/api/plans/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPlans(data);
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  const deleteClient = async (id) => {
    await fetch(`${baseURL}/api/clients/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setClients((prev) => prev.filter((c) => c._id !== id));
    toast.success("User deleted successfully");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedPlan({ ...plans[index] });
    setPreviewImage(null);
  };

  const handleSave = async (planId) => {
    try {
      const formData = new FormData();
      formData.append("company", editedPlan.company);
      formData.append("name", editedPlan.name);
      formData.append("rate", editedPlan.rate);

      if (editedPlan.image) {
        formData.append("image", editedPlan.image);
      }

      await axios.put(`${baseURL}/api/plans/update/${planId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

     toast.success("✅ Your plan has been successfully updated!");

      setEditIndex(null);
      setEditedPlan({});
      fetchPlans();
    } catch (error) {
      console.error("Error saving plan:", error);
      toast.error("❌ Failed to update plan. Please try again.");
    }
  };

  const handleToggleEnabled = async (id, currentStatus) => {
    try {
      await axios.put(
        `${baseURL}/api/plans/toggle/${id}`,
        {
          enabled: !currentStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!currentStatus) {
      toast.success("✅ Plan has been enabled successfully!");
    } else {
      toast.success("⚠️ Plan has been disabled successfully!");
    }
      fetchPlans();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };
const fileInputRef = useRef(null);
  const addNewPlan = async () => {
    try {
      const formData = new FormData();
      formData.append("company", newPlan.company);
      formData.append("name", newPlan.name);
      formData.append("rate", newPlan.rate);
      formData.append("image", newPlan.image);

      const res = await fetch(`${baseURL}/api/plans`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      setPlans((prev) => [...prev, data]);
      setNewPlan({ company: "", name: "", rate: "", image: null });
       if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
      toast.success("✅ New plan added successfully!");
    } catch (err) {
      console.error("❌ Plan upload failed:", err.message);
      toast.error("❌ Failed to add new plan. Please try again.");
    }
  };
  useEffect(() => {
    const storedPlan = localStorage.getItem("selectedPlan");
    if (storedPlan) {
      const parsedPlan = JSON.parse(storedPlan);
      setPlans([parsedPlan]); // if you are using plans
      setSelectedClient({ plan: parsedPlan }); // important: this sets selectedClient.plan
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  useEffect(() => {
    fetchBikePlans();
  }, []);

  const fetchBikePlans = async () => {
    try {
      const res = await fetch(`${baseURL}/api/bike-plans/all`);
      const data = await res.json();
      setBikePlans(data);
    } catch (err) {
      console.error("Error fetching bike plans:", err);
    }
  };

  const handleBikeInputChange = (index, field, value) => {
    const updatedPlans = [...bikePlans];
    updatedPlans[index][field] = value;
    setBikePlans(updatedPlans);
  };

  const handleBikeEdit = (index) => {
    setEditIndex(index);
    setEditedBikePlan({ ...bikePlans[index] });
  };

  const handleBikeSave = async (plan) => {
    const formData = new FormData();

    formData.append("name", plan.name);
    formData.append("company", plan.company);
    formData.append("rate", plan.rate);

    if (plan.image) {
      formData.append("image", plan.image);
    }

    try {
      const res = await axios.put(
        `${baseURL}/api/bike-plans/${plan._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Plan updated successfully");

      setEditIndex(null); // Hide inputs
      fetchBikePlans(); // Refresh updated data
    } catch (err) {
      console.error("Error saving plan:", err);
      toast.error("Failed to update plan");
    }
  };

  const handleBikeToggleDisable = async (planId) => {
    try {
      await axios.patch(`${baseURL}/api/bike-plans/${planId}/toggle`);
      toast.success("Plan status toggled");
      fetchBikePlans(); // Refresh list
    } catch (err) {
      console.error("Error toggling plan", err);
      toast.error("Failed to toggle plan");
    }
  };

   const dropdowns = [
    {
      title: "User Details",
      icon: <FaUser />,
      id: "client",
      options: [
        { label: "Car Clients", tab: "clients" },
        { label: "Bike Clients", tab: "BikeClients" },
      ],
    },
    {
      title: "Insurance Plans",
      icon: <FaCar />,
      id: "plans",
      options: [
        { label: "Car Insurance", tab: "plans" },
        { label: "Bike Insurance", tab: "bike-plans" },
      ],
    },
    {
      title: "Add New Plans",
      icon: <FaPlus />,
      id: "addPlans",
      options: [
        { label: "Add Car Plan", tab: "add" },
        { label: "Add Bike Plan", tab: "Bike" },
      ],
    },
    {
      title: "Add Dropdown",
      icon: <FaPlus />,
      id: "dropdowns",
      options: [
        { label: "Car Dropdowns", tab: "Car Dropdowns" },
        { label: "Bike Dropdowns", tab: "Bike Dropdowns" },
      ],
    },
  ];
useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    fetch(`${baseURL}/api/bikeclients`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBikeClients(data));
  }, []);

  const filteredBikeClients = bikeClients.filter((c) => c.plan && c.plan.name);
const totalBikePlans = bikePlans.length;
const totalCarPlans = plans.length;
  const carPlansCount = plans.filter(plan => plan.isEnabled).length;
  const enabledBikePlansCount = bikePlans.filter(plan => !plan.isDisabled).length;
  return (
    <div className={`min-h-screen w-full flex ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      
<aside
  className={`${
    sidebarOpen ? "w-64" : "w-20"
  } transition-all duration-300 p-4 relative h-screen sticky overflow-y-auto
  ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
>
  {/* Toggle Button */}
  <button
    onClick={() => {
      setSidebarOpen(!sidebarOpen);
      setActiveDropdown(null);
    }}
    className="absolute top-5 right-1 text-xl z-50"
  >
    {sidebarOpen ? <FaTimes /> : <FaBars />}
  </button>

  {/* Title (Logo switch by darkMode) */}
  <h2
    className={`text-2xl font-bold mb-6 transition-opacity duration-300 ${
      sidebarOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
    }`}
  >
    {darkMode ? (
      <img src="/wesecure-logo.png" alt="Logo Dark" className="h-14" />
    ) : (
      <img src="/black logo.png" alt="Logo Light" className="h-14" />
    )}
  </h2>

  {/* Dashboard */}
  <button
    onClick={() => {
      setActiveTab("dashboard");
      setActiveDropdown(null);
    }}
    className={`w-full mt-14 flex items-center gap-3 text-left px-4 py-2 rounded text-lg transition-all ${
      activeTab === "dashboard"
        ? "bg-[#005190] text-white"
        : "hover:bg-[#4CC750] hover:text-white"
    }`}
  >
    <FaUser
      className={`${
        sidebarOpen ? "text-xl" : "text-2xl"
      } transition-all ${
        activeTab === "dashboard"
          ? "text-white"
          : darkMode
          ? "text-gray-300"
          : "text-gray-700"
      }`}
    />
    {sidebarOpen && "Dashboard"}
  </button>

  {/* Dropdown Menus */}
  {dropdowns.map((item, index) => {
    const isDropdownOpen = activeDropdown === item.id;
    const isTabInsideActive = item.options.some(
      (opt) => opt.tab === activeTab
    );

    return (
      <div key={index} className="relative">
        {/* Parent Dropdown Button */}
        <button
          onClick={() => {
            if (!sidebarOpen) {
              setSidebarOpen(true);
              setTimeout(() => setActiveDropdown(item.id), 300);
            } else {
              setActiveDropdown((prev) =>
                prev === item.id ? null : item.id
              );
            }
          }}
          className={`w-full mt-5 flex items-center gap-3 text-left px-4 py-2 rounded text-lg transition-all ${
            isTabInsideActive
              ? "bg-[#005190] text-white"
              : "hover:bg-[#4CC750] hover:text-white"
          }`}
        >
          {React.cloneElement(item.icon, {
            className: `${
              sidebarOpen ? "text-xl" : "text-2xl"
            } transition-all ${
              isTabInsideActive
                ? "text-white"
                : darkMode
                ? "text-gray-300"
                : "text-gray-700"
            }`,
          })}
          {sidebarOpen && item.title}
          {sidebarOpen && (
            <FaChevronDown
              className={`ml-auto transform transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {/* Dropdown Panel */}
        {isDropdownOpen && (
          <div
            className={`${
              sidebarOpen
                ? "ml-4"
                : "absolute left-full top-0 mt-0 ml-2 w-48"
            } ${
              darkMode
                ? "bg-gray-800 border border-gray-700 text-white"
                : "bg-white border border-gray-300 text-black"
            } 
               rounded z-50 shadow-xl transition-all duration-300`}
          >
            {item.options.map((option, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveTab(option.tab);
                  setActiveDropdown(item.id);
                }}
                className={`block w-full text-left px-4 py-2 transition-all ${
                  activeTab === option.tab
                    ? "bg-[#005190] text-white"
                    : "hover:bg-[#4CC750] hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  })}
</aside>





{/* sidebar */}

      
      <main className={`flex-1 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} overflow-y-auto`}>
        {/* top bar */}
<div className={`flex-1 justify-between items-center px-4 py-3
  ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
       <div className={`flex justify-between items-center px-4 py-3 shadow ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
  {/* Left: Logout + Darkmode */}
 
  {/* Right: Search */}
 <div className="relative flex items-center">
  {/* Search Icon Button */}
  <button
    onClick={() => setSearchOpen(!searchOpen)}
    className="text-xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    aria-label="Search"
  >
    <FaSearch />
  </button>

  {/* Search Box */}
  <div
    className={`absolute left-0 top-1/2 -translate-y-1/2 flex items-center rounded-full border shadow px-3 py-1 z-50
      transition-all duration-300 ease-in-out
      ${searchOpen ? "opacity-100 scale-100 w-56" : "opacity-0 scale-95 w-0 overflow-hidden"}
      ${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}
    `}
  >
    <input
      type="text"
      placeholder="Search..."
      className={`bg-transparent outline-none flex-1 px-2 py-1 text-sm
        ${darkMode ? "text-white placeholder-gray-400" : "text-black placeholder-gray-500"}
      `}
      autoFocus={searchOpen}
    />
    <button
      onClick={() => setSearchOpen(false)}
      className="ml-2 p-1 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm transition"
      aria-label="Close"
    >
      <FaTimes />
    </button>
  </div>
</div>

 <div className="flex items-center gap-4">
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-red-600 font-semibold"
    >
      <FaSignOutAlt /> Logout
    </button>
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="text-xl"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  </div>
</div>

        {/* Main Content */}
        <div className="p-4">
          {/* Render active tab content here */}
          {activeTab === "dashboard"}
          {/* Add your other tab conditions here */}
        </div>
      </div>
      {/* top bar */}
      <div className="px-6">
        {activeTab === "clients" && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Client List</h3>
       <div className="w-full overflow-x-auto border rounded-lg">
  <table className="min-w-[600px] w-full border-collapse">
    <thead className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
      <tr>
        <th className="border p-2 text-left">Name</th>
        <th className="border p-2 text-left">Email</th>
        <th className="border p-2 text-left">Phone</th>
        <th className="border p-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {clients.filter(c => c.plan && c.plan.name).map(client => (
        <tr key={client._id} className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}>
          <td className="border p-2">{client.name}</td>
          <td className="border p-2">{client.email}</td>
          <td className="border p-2">{client.phone}</td>
          <td className="border p-2 flex gap-2">
            <button
              onClick={() => {
                setSelectedClient(client);
                setShowPopup(true);
              }}
              className="bg-[#005190] text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-[#4CC750]"
            >
              <FaEllipsisH /> View
            </button>
            <button
              onClick={() => deleteClient(client._id)}
              className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600"
            >
              <FaTrash /> Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Client Popup */}
{showPopup && selectedClient && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-2 sm:p-4">
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl w-full max-w-sm relative shadow-2xl max-h-[95vh] overflow-y-auto text-black dark:text-white">
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-2 right-3 text-xl text-red-600 hover:text-red-800"
      >
        ×
      </button>

      <h3 className="text-lg font-bold text-center text-blue-800 dark:text-blue-400 mb-4 border-b pb-2">
        Client Full Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mb-3 max-h-[40vh] sm:max-h-[45vh] overflow-y-auto">
        {Object.entries(selectedClient).map(([key, val]) => {
          if (key === "plan" || key === "__v") return null;
          return (
            <React.Fragment key={key}>
              <div className="text-gray-600 dark:text-gray-400 font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </div>
              <div className="break-words">
                {typeof val === "object" && val !== null ? JSON.stringify(val) : val}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {selectedClient.plan && (
        <div className="mt-3">
          <h4 className="text-sm sm:text-base font-semibold mb-2 text-green-700 border-b pb-1">
            Plan Details
          </h4>
          <div className="flex flex-col sm:flex-row items-start bg-white dark:bg-gray-700 rounded-xl shadow-md p-2 sm:p-3 gap-2 sm:gap-3 border border-gray-200 dark:border-gray-600">
            {selectedClient.plan.imageUrl ? (
              <img
                src={`${baseURL}/${selectedClient.plan.imageUrl}`}
                alt="Plan"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-gray-400 dark:text-gray-200 text-xs sm:text-sm rounded-md border">
                No Image
              </div>
            )}

            <div className="flex-1 space-y-1 text-xs sm:text-sm">
              <p>
                <span className="font-medium">Company:</span>{" "}
                {selectedClient.plan.company || "N/A"}
              </p>
              <p>
                <span className="font-medium">Plan Name:</span>{" "}
                {selectedClient.plan.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Rate:</span> {selectedClient.plan.rate}%
              </p>
              <p>
                <span className="font-medium">Yearly:</span>{" "}
                {selectedClient.plan.yearlyPremium}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
)}


          </div>
        )}
        {activeTab === "BikeClients" && (
  <div>
    {activeTab === "BikeClients" && (
  <div>
    <h3 className="text-xl font-semibold mb-2">Bike Client List</h3>

    <div className="w-full overflow-x-auto border rounded-lg">
      <table className="min-w-[600px] w-full border-collapse">
        <thead className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
          <tr>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Phone</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBikeClients.map(client => (
            <tr key={client._id} className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}>
              <td className="border p-2">{client.name}</td>
              <td className="border p-2">{client.email}</td>
              <td className="border p-2">{client.phone}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedClient(client);
                    setShowPopup(true);
                  }}
                  className="bg-[#005190] text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-[#4CC750]"
                >
                  <FaEllipsisH /> View
                </button>
                <button
                  onClick={async () => {
                    await fetch(`${baseURL}/api/bikeclients/${client._id}`, {
                      method: "DELETE",
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    setBikeClients(prev => prev.filter(c => c._id !== client._id));
                    toast.success("User deleted successfully");
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600"
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Bike Client Popup */}
 {showPopup && selectedClient && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-2 sm:p-4">
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl w-full max-w-sm relative shadow-2xl max-h-[95vh] overflow-y-auto text-black dark:text-white">
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-2 right-3 text-xl text-red-600 hover:text-red-800"
      >
        ×
      </button>

      <h3 className="text-lg font-bold text-center text-blue-800 dark:text-blue-400 mb-4 border-b pb-2">
        Bike Client Full Details
      </h3>

      {/* Recursive details rendering */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm mb-3 max-h-[40vh] sm:max-h-[45vh] overflow-y-auto">
        {Object.entries(selectedClient).map(([key, val]) => {
          if (key === "__v" || key === "plan") return null;

          const renderValue = (v) => {
            if (typeof v === "object" && v !== null) {
              return (
                <div className="ml-2 space-y-1">
                  {Object.entries(v).map(([subKey, subVal]) => (
                    <p key={subKey} className="text-xs sm:text-sm">
                      <span className="font-medium capitalize">{subKey}:</span>{" "}
                      {typeof subVal === "object" && subVal !== null
                        ? JSON.stringify(subVal)
                        : subVal}
                    </p>
                  ))}
                </div>
              );
            }
            return v;
          };

          return (
            <React.Fragment key={key}>
              <div className="text-gray-600 dark:text-gray-400 font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </div>
              <div className="break-words">{renderValue(val)}</div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Plan Details */}
      {selectedClient.plan && (
        <div className="mt-3">
          <h4 className="text-sm sm:text-base font-semibold mb-2 text-green-700 border-b pb-1">
            Plan Details
          </h4>
          <div className="flex flex-col sm:flex-row items-start bg-white dark:bg-gray-700 rounded-xl shadow-md p-2 sm:p-3 gap-2 sm:gap-3 border border-gray-200 dark:border-gray-600">
            {selectedClient.plan.imageUrl ? (
              <img
                src={`${baseURL}/${selectedClient.plan.imageUrl}`}
                alt="Plan"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-gray-400 dark:text-gray-200 text-xs sm:text-sm rounded-md border">
                No Image
              </div>
            )}

            <div className="flex-1 space-y-1 text-xs sm:text-sm">
              <p>
                <span className="font-medium">Company:</span>{" "}
                {selectedClient.plan.company || "N/A"}
              </p>
              <p>
                <span className="font-medium">Plan Name:</span>{" "}
                {selectedClient.plan.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Rate:</span>{" "}
                {selectedClient.plan.rate}%
              </p>
              <p>
                <span className="font-medium">Yearly:</span>{" "}
                {selectedClient.plan.yearlyPremium}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
)}

  </div>
)}


  </div>
)}

        {activeTab === "plans" && (
  <div
    className={`rounded-lg shadow-lg border ${
      darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
    }`}
  >
    <h3
      className={`text-2xl font-bold px-4 py-3 border-b ${
        darkMode ? "text-white border-gray-700" : "text-black border-gray-200"
      }`}
    >
     Car Insurance Plans
    </h3>

    <div className="w-full overflow-x-auto">
      <table className="min-w-[700px] w-full text-sm border-collapse">
        {/* Table Header */}
        <thead
          className={`uppercase text-xs ${
            darkMode
              ? "bg-gray-800 text-gray-200"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <tr>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Rate</th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Actions</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody
          className={`divide-y ${
            darkMode ? "divide-gray-700" : "divide-gray-200"
          }`}
        >
          {plans.map((plan, index) => (
            <tr
              key={plan._id}
              className={`transition-colors duration-200 ${
                darkMode
                  ? "hover:bg-gray-800 text-gray-100"
                  : "hover:bg-gray-50 text-gray-800"
              }`}
            >
              {/* Company */}
              <td className="p-3">
                {editIndex === index ? (
                  <input
                    className="w-full bg-gray-100 text-black rounded px-2 py-1"
                    value={editedPlan.company}
                    onChange={(e) =>
                      setEditedPlan({
                        ...editedPlan,
                        company: e.target.value,
                      })
                    }
                  />
                ) : (
                  plan.company
                )}
              </td>

              {/* Name */}
              <td className="p-3">
                {editIndex === index ? (
                  <input
                    className="w-full bg-gray-100 text-black rounded px-2 py-1"
                    value={editedPlan.name}
                    onChange={(e) =>
                      setEditedPlan({
                        ...editedPlan,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  plan.name
                )}
              </td>

              {/* Rate */}
              <td className="p-3">
                {editIndex === index ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={`${editedPlan.rate}%`}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace("%", "");
                        setEditedPlan({ ...editedPlan, rate: rawValue });
                      }}
                      className="w-20 bg-gray-100 text-black rounded px-2 py-1"
                    />
                  </div>
                ) : (
                  `${plan.rate}%`
                )}
              </td>

              {/* Image */}
              <td className="p-3">
                {editIndex === index ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setEditedPlan({ ...editedPlan, image: file });
                          setPreviewImage(URL.createObjectURL(file));
                        }
                      }}
                      className="text-sm"
                    />
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="mt-2 w-12 h-12 object-cover rounded"
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={`${baseURL}/${plan.imageUrl}`}
                    alt="Plan"
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
              </td>

              {/* Actions */}
              <td className="p-3">
                {editIndex === index ? (
                  <button
                    className="flex items-center gap-1 bg-[#005190] hover:bg-[#005190] text-white px-3 py-1 rounded"
                    onClick={() => handleSave(plan._id)}
                  >
                    <FaSave /> Save
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(index)}
                  >
                    <FaEdit /> Edit
                  </button>
                )}
              </td>

              {/* Status */}
              <td className="p-3">
                <button
                  onClick={() =>
                    handleToggleEnabled(plan._id, plan.isEnabled)
                  }
                  className={`flex items-center gap-1 px-3 py-1 rounded text-white ${
                    plan.isEnabled
                      ? "bg-[#4CC750] hover:bg-[#4CC750]"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {plan.isEnabled ? (
                    <>
                      <FaToggleOn /> Enabled
                    </>
                  ) : (
                    <>
                      <FaToggleOff /> Disabled
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

        {activeTab === "bike-plans" && (
  <div
    className={`rounded-lg shadow-lg border ${
      darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
    }`}
  >
    <h3
      className={`text-2xl font-bold px-4 py-3 border-b ${
        darkMode ? "text-white border-gray-700" : "text-black border-gray-200"
      }`}
    >
      Bike Insurance Plans
    </h3>

    <div className="w-full overflow-x-auto">
      <table className="min-w-[700px] w-full text-sm border-collapse">
        {/* Header */}
        <thead
          className={`uppercase text-xs ${
            darkMode
              ? "bg-gray-800 text-gray-200"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Rate</th>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody
          className={`divide-y ${
            darkMode ? "divide-gray-700" : "divide-gray-200"
          }`}
        >
          {bikePlans.map((plan, index) => (
            <tr
              key={plan._id}
              className={`transition-colors duration-200 ${
                darkMode
                  ? "hover:bg-gray-800 text-gray-100"
                  : "hover:bg-gray-50 text-gray-800"
              }`}
            >
              {/* Name */}
              <td className="p-3">
                {editIndex === index ? (
                  <input
                    type="text"
                    className="w-full bg-gray-100 text-black rounded px-2 py-1"
                    value={plan.name}
                    onChange={(e) =>
                      handleBikeInputChange(index, "name", e.target.value)
                    }
                  />
                ) : (
                  plan.name
                )}
              </td>

              {/* Company */}
              <td className="p-3">
                {editIndex === index ? (
                  <input
                    type="text"
                    className="w-full bg-gray-100 text-black rounded px-2 py-1"
                    value={plan.company}
                    onChange={(e) =>
                      handleBikeInputChange(index, "company", e.target.value)
                    }
                  />
                ) : (
                  plan.company
                )}
              </td>

              {/* Rate */}
              <td className="p-3">
                {editIndex === index ? (
                  <input
                    type="number"
                    className="w-full bg-gray-100 text-black rounded px-2 py-1"
                    value={plan.rate}
                    onChange={(e) =>
                      handleBikeInputChange(index, "rate", e.target.value)
                    }
                  />
                ) : (
                  `${plan.rate}%`
                )}
              </td>

              {/* Image */}
              <td className="p-3">
                {editIndex === index ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleBikeInputChange(index, "image", e.target.files[0])
                      }
                      className="text-sm"
                    />
                    {plan.imageUrl && (
                      <img
                        src={`${baseURL}/${plan.imageUrl}`}
                        alt="preview"
                        className="mt-2 w-12 h-12 object-cover rounded"
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={`${baseURL}/${plan.imageUrl}`}
                    alt="plan"
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
              </td>

              {/* Actions */}
              <td className="p-3 flex gap-2">
                {editIndex === index ? (
                  <button
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    onClick={() => handleBikeSave(plan)}
                  >
                    <FaSave /> Save
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-1 bg-[#005190] hover:bg-blue-700 text-white px-3 py-1 rounded"
                    onClick={() => handleBikeEdit(index)}
                  >
                    <FaEdit /> Edit
                  </button>
                )}

                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded text-white ${
                    plan.isDisabled
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                  onClick={() => handleBikeToggleDisable(plan._id)}
                >
                  {plan.isDisabled ? (
                    <>
                      <FaToggleOn /> Enable
                    </>
                  ) : (
                    <>
                      <FaToggleOff /> Disable
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

       {activeTab === "add" && (
  <div className="w-full">
    <h3 className="text-xl font-semibold mb-4">
      Add Car Insurance Plan
    </h3>

    {/* Upload Section */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {[...Array(1)].map((_, idx) => (
        <label
          key={idx}
          className="relative border-2 border-dashed rounded-lg w-40 overflow-hidden cursor-pointer h-32 flex items-center justify-center"
        >
          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files[0]) {
                setNewPlan({
                  ...newPlan,
                  image: e.target.files[0],
                  preview: URL.createObjectURL(e.target.files[0]), // 👈 preview save
                });
              }
            }}
          />

          {/* Show uploaded image OR default */}
          {newPlan.preview ? (
            <img
              src={newPlan.preview}
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
      ))}
    </div>

    {/* Form Inputs */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <input
        placeholder="Company"
        value={newPlan.company}
        onChange={(e) => setNewPlan({ ...newPlan, company: e.target.value })}
        className="border p-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white w-full"
      />
      <input
        placeholder="Plan Name"
        value={newPlan.name}
        onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
        className="border p-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white w-full"
      />
      <input
        placeholder="Rate"
        type="number"
        value={newPlan.rate}
        onChange={(e) => setNewPlan({ ...newPlan, rate: e.target.value })}
        className="border p-2 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white w-full"
      />
    </div>

    {/* Save Button */}
    <button
      onClick={addNewPlan}
      disabled={!newPlan.company || !newPlan.name || !newPlan.rate || !newPlan.image}
      className={`px-6 py-2 rounded-lg w-full sm:w-auto transition 
        ${!newPlan.company || !newPlan.name || !newPlan.rate || !newPlan.image
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
    >
      Save Plan
    </button>
  </div>
)}



        {activeTab === "Car Dropdowns" && (
          <div>
            {/* <h3 className="text-xl font-semibold mb-4">Car Dropdowns</h3> */}
            <AdminDropdownManager darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        )}
        {activeTab === "Bike Dropdowns" && (
          <div>
            {/* <h3 className="text-xl font-semibold mb-4">Bike Dropdowns</h3> */}
            <BikeAdminDropdownManager darkMode={darkMode} setDarkMode={setDarkMode}/>
          </div>
        )}

        {activeTab === "Bike" && (
          <div>
            {/* <h3 className="text-xl font-semibold mb-4">Bike</h3> */}
            <Bikeplan darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        )}
        {activeTab === "dashboard" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Dashboard</h3>
            <ChartDashboard darkMode={darkMode} setDarkMode={setDarkMode} clients={clients}  bikeClients={filteredBikeClients} carPlansCount={carPlansCount} enabledBikePlansCount={enabledBikePlansCount} totalCarPlans={totalCarPlans} totalBikePlans={totalBikePlans} />
          </div>
        )}

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
