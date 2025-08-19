import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 space-y-4 fixed">
      <h2 className="text-xl font-bold">Admin Panel</h2>

      <NavLink
        to="clients"
        className="block px-4 py-2 rounded hover:bg-gray-700"
      >
        Clients
      </NavLink>

      <NavLink
        to="plans"
        className="block px-4 py-2 rounded hover:bg-gray-700"
      >
        Plans
      </NavLink>

      <NavLink
        to="add-plan"
        className="block px-4 py-2 rounded hover:bg-gray-700"
      >
        Add Plan
      </NavLink>

      <NavLink
        to="dropdowns"
        className="block px-4 py-2 rounded hover:bg-gray-700"
      >
        Dropdown
      </NavLink>
      <NavLink
        to="Bike"
        className="block px-4 py-2 rounded hover:bg-gray-700"
      >
        Bike
      </NavLink>

      

    </div>
  );
};

export default Sidebar;
