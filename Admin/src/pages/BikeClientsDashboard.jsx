import React, { useState, useEffect } from "react";

const BikeClientsDashboard = ({ darkMode, bikeClients = [] }) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

const token = localStorage.getItem("adminToken");
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const fetchClients = async () => {
  try {
    const res = await fetch(`${baseURL}/api/bikeclients`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.error("Failed to fetch:", res.status);
    }

    const data = await res.json();
    // console.log("Fetched bikeclients:", data); 

    setClients(data);
  } catch (err) {
    console.error("Fetch error:", err);
  }
};



  const deleteClient = async (id) => {
    await fetch(`${baseURL}/api/bikeclients/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setClients((prev) => prev.filter((c) => c._id !== id));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <h3 className="text-xl font-semibold mb-2">Bike Client List</h3>
      <div className="w-full overflow-x-auto">
  <table className="min-w-[600px] w-full border">
    <thead>
      <tr>
        <th className="border p-2">Name</th>
        <th className="border p-2">Email</th>
        <th className="border p-2">Phone</th>
        <th className="border p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {clients
        .filter((c) => c.plan && c.plan.name)
        .map((client) => (
          <tr key={client._id}>
            <td className="border p-2">{client.name}</td>
            <td className="border p-2">{client.email}</td>
            <td className="border p-2">{client.phone}</td>
            <td className="border p-2 flex gap-2">
              <button
                onClick={() => {
                  setSelectedClient(client);
                  setShowPopup(true);
                }}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                View
              </button>
              <button
                onClick={() => deleteClient(client._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

      {showPopup && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-2xl">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-3 text-2xl text-red-600 hover:text-red-800"
            >
              ×
            </button>

            <h3 className="text-xl font-bold text-center text-blue-800 mb-4 border-b pb-2">
              Bike Client Full Details
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4 max-h-[400px] overflow-y-auto">
              {Object.entries(selectedClient).map(([key, val]) => {
                if (key === "plan" || key === "__v") return null;

                return (
                  <React.Fragment key={key}>
                    <div className="text-gray-600 font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1")}:
                    </div>
                    <div className="text-gray-800">
                      {typeof val === "object" && val !== null
                        ? JSON.stringify(val)
                        : val}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {selectedClient.plan && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3 text-green-700 border-b pb-2">
                  Plan Details
                </h4>

                <div className="flex items-start bg-white rounded-xl shadow-md p-4 gap-4 border border-gray-200 max-w-3xl">
                  {selectedClient.plan.imageUrl ? (
                    <img
                      src={`${baseURL}/${selectedClient.plan.imageUrl}`}
                      alt="Plan"
                      className="w-32 h-32 object-cover rounded-md border"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-sm rounded-md border">
                      No Image
                    </div>
                  )}

                  <div className="flex-1 space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-medium text-gray-900">Company:</span>{" "}
                      {selectedClient.plan.company || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Plan Name:</span>{" "}
                      {selectedClient.plan.name || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Rate:</span>{" "}
                      {selectedClient.plan.rate}%
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BikeClientsDashboard;
