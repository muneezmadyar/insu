import { useEffect, useState } from "react";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const token = localStorage.getItem("adminToken");
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${baseURL}/api/clients`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setClients);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Client List</h2>
      <ul className="space-y-2">
        {clients.map((client) => (
          <li key={client._id} className="border p-2 rounded bg-white">
            {client.name} - {client.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
