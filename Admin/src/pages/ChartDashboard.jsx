import React from "react";
import CountUp from "react-countup";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { FaCar, FaMotorcycle, FaClipboardCheck } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const ChartDashboard = ({
  darkMode,
  clients = [],
  bikeClients = [],
  carPlansCount = [],
  enabledBikePlansCount = [],
  totalCarPlans = 0,
  totalBikePlans = 0,
}) => {
  const textColor = darkMode ? "text-white" : "text-black";
  const bgBox = darkMode ? "bg-gray-800" : "bg-white";

  const filteredClients = clients.filter((c) => c.plan && c.plan.name);
  // const filteredClientsB = clients.filter((c) => c.plan && c.plan.name);
  const carUserNames = filteredClients.map((c) => c.name);
  const carUserCounts = filteredClients.map((c, i) => i + 1); // Ya koi relevant metric

  const barData = {
    labels: carUserNames.length > 0 ? carUserNames : ["No Users"],
    datasets: [
      {
        label: "Car Users",
        data: carUserCounts.length > 0 ? carUserCounts : [0],
        backgroundColor: "#36A2EB",
        borderRadius: 8,
      },
    ],
  };

  const bikeUserNames = bikeClients.map((c) => c.name);
  const bikeUserCounts = bikeClients.map((c, i) => i + 1); // Ya koi relevant metric

  const lineData = {
    labels: bikeUserNames.length > 0 ? bikeUserNames : ["No Users"],
    datasets: [
      {
        label: "Bike Users",
        data: bikeUserCounts.length > 0 ? bikeUserCounts : [0],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255,99,132,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const enabledCarPlans = carPlansCount; // enabled plans
  const disabledCarPlans = totalCarPlans - carPlansCount; // agar totalCarPlans variable hai

  const doughnutData = {
    labels: ["Enabled Car Plans", "Disabled Car Plans"],
    datasets: [
      {
        data: [enabledCarPlans, disabledCarPlans],
        backgroundColor: ["#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  const disabledBikePlans = totalBikePlans - enabledBikePlansCount;

  const pieData = {
    labels: ["Enabled Bike Plans", "Disabled Bike Plans"],
    datasets: [
      {
        data: [enabledBikePlansCount, disabledBikePlans],
        backgroundColor: ["#4BC0C0", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className={`min-h-screen p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Row 1: Counters */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
  {/* Total Car Users */}
  <div
    className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} 
    p-4 sm:p-6 rounded-xl shadow-md border text-center h-32 sm:h-40 flex flex-col justify-center items-center transition`}
  >
    <FaCar className="text-3xl sm:text-4xl text-blue-500 mb-2" />
    <h2 className="text-sm sm:text-md font-semibold mb-1">Total Car Users</h2>
    <CountUp
      end={filteredClients.length}
      duration={2}
      separator=","
      className="text-xl sm:text-2xl font-bold"
    />
  </div>

  {/* Total Bike Users */}
  <div
    className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} 
    p-4 sm:p-6 rounded-xl shadow-md border text-center h-32 sm:h-40 flex flex-col justify-center items-center transition`}
  >
    <FaMotorcycle className="text-3xl sm:text-4xl text-green-500 mb-2" />
    <h2 className="text-sm sm:text-md font-semibold mb-1">Total Bike Users</h2>
    <CountUp
      end={bikeClients.length}
      duration={2.5}
      separator=","
      className="text-xl sm:text-2xl font-bold"
    />
  </div>

  {/* Active Car Plans */}
  <div
    className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} 
    p-4 sm:p-6 rounded-xl shadow-md border text-center h-32 sm:h-40 flex flex-col justify-center items-center transition`}
  >
    <FaClipboardCheck className="text-3xl sm:text-4xl text-purple-500 mb-2" />
    <h2 className="text-sm sm:text-md font-semibold mb-1">Active Car Plans</h2>
    <CountUp
      end={carPlansCount}
      duration={2}
      separator=","
      className="text-xl sm:text-2xl font-bold"
    />
  </div>

  {/* Active Bike Plans */}
  <div
    className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} 
    p-4 sm:p-6 rounded-xl shadow-md border text-center h-32 sm:h-40 flex flex-col justify-center items-center transition`}
  >
    <FaClipboardCheck className="text-3xl sm:text-4xl text-orange-500 mb-2" />
    <h2 className="text-sm sm:text-md font-semibold mb-1">Active Bike Plans</h2>
    <CountUp
      end={enabledBikePlansCount}
      duration={2}
      separator=","
      className="text-xl sm:text-2xl font-bold"
    />
  </div>
</div>

      {/* Row 2: Bar and Line Charts */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 md:grid-cols-2">
        <div className={`${bgBox} p-2 sm:p-4 rounded-xl shadow flex flex-col`}>
          <h2 className="mb-2 sm:mb-4 font-semibold text-sm sm:text-base Dark:text-white">
            Car Users
          </h2>
          <div className="flex-1 flex items-center justify-center min-h-[260px] h-[320px]">
            <div className="w-full h-full">
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { labels: { color: darkMode ? "white" : "black", } } },
                }}
              />
            </div>
          </div>
        </div>
        <div className={`${bgBox} p-2 sm:p-4 rounded-xl shadow flex flex-col`}>
          <h2 className="mb-2 sm:mb-4 font-semibold text-sm sm:text-base">
            Bike Users
          </h2>
          <div className="flex-1 flex items-center justify-center min-h-[260px] h-[320px]">
            <div className="w-full h-full">
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { labels: { color: darkMode ? "white" : "black", } } },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Pie and Doughnut Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <div className={`${bgBox} p-2 sm:p-4 rounded-xl shadow flex flex-col`}>
          <h2 className="mb-2 sm:mb-4 font-semibold text-sm sm:text-base">
            Car Plans Detail
          </h2>
          <div className="flex-1 flex items-center justify-center min-h-[260px] h-[320px]">
            <div className="w-full h-full">
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { labels: { color: darkMode ? "white" : "black", } } },
                }}
              />
            </div>
          </div>
        </div>
        <div className={`${bgBox} p-2 sm:p-4 rounded-xl shadow flex flex-col`}>
          <h2 className="mb-2 sm:mb-4 font-semibold text-sm sm:text-base">
            Bike Plans Detail
          </h2>
          <div className="flex-1 flex items-center justify-center min-h-[260px] h-[320px]">
            <div className="w-full h-full">
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { labels: { color: darkMode ? "white" : "black", } } },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDashboard;
