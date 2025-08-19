import { useState } from "react";

const AddPlan = () => {
  const [plan, setPlan] = useState({ name: "", rate: "" });
  const token = localStorage.getItem("adminToken");
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${baseURL}/api/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(plan),
    });

    setPlan({ name: "", rate: "" });
    alert("Plan added!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Plan Name"
        value={plan.name}
        onChange={(e) => setPlan({ ...plan, name: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        type="text"
        placeholder="Rate"
        value={plan.rate}
        onChange={(e) => setPlan({ ...plan, rate: e.target.value })}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Plan
      </button>
    </form>
  );
};

export default AddPlan;
