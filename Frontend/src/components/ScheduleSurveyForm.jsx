import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaBars, FaTimes } from "react-icons/fa";
import "./../index.css"
const ScheduleSurveyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: "",
    mainphone: "",
    mainemail: "",
    time: "",
  });
  const [clientInfo, setClientInfo] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
 const baseURL = import.meta.env.VITE_BACKEND_URL;
   useEffect(() => {
    if (window.innerWidth >= 768) {
      setSidebarOpen(true); // desktop pe default open
    } else {
      setSidebarOpen(false); // mobile pe default close
    }
  }, []);

  useEffect(() => {
    const plan = JSON.parse(localStorage.getItem("selectedPlan"));
    const client = JSON.parse(localStorage.getItem("clientInfo"));
    setSelectedPlan(plan);
    setClientInfo(client);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 // State
const [loadingSubmit, setLoadingSubmit] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoadingSubmit(true);
  setButtonActive(true); // button hover wali styling activate

  try {
    if (!clientInfo || !selectedPlan) {
      toast.error("Missing client or plan data");
      setLoadingSubmit(false);
      setButtonActive(false);
      return;
    }

    const fullData = {
      ...clientInfo,
      ...formData,
      plan: selectedPlan,
      yearlyPremium: selectedPlan.yearlyPremium,
    };

    // loader 2 sec chale
    setTimeout(async () => {
      const res = await fetch(`${baseURL}/api/clients/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });

      const result = await res.json();

      if (res.ok) {
        // form reset
        setFormData({
          ownerName: "",
          mainphone: "",
          mainemail: "",
          time: "",
        });
        localStorage.removeItem("clientInfo");
        localStorage.removeItem("selectedPlan");

        // toast dikhana
        toast.success(result.message || "Survey submitted successfully!");

        // 1.5 sec baad popup
        setTimeout(() => {
          setShowPopup(true);
        }, 1500);
      } else {
        toast.error(result.message || "Something went wrong");
      }

      setLoadingSubmit(false);
      setButtonActive(false); // button wapas normal
    }, 2000);
  } catch (err) {
    console.error("Submit failed:", err);
    toast.error("Error submitting form");
    setLoadingSubmit(false);
    setButtonActive(false);
  }
};

  return (
   <div className="min-h-screen bg-[#84B9E2] flex">
  {/* Sidebar */}
  <aside
    className={`fixed top-0 left-0 h-full bg-white shadow-lg p-3 sm:p-4 md:p-5 w-72 sm:w-80 
                transform transition-transform duration-300 z-40 overflow-y-auto custom-scrollbar
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
  >
    {/* Sidebar Header */}
    <div className="flex justify-between items-center mb-4 sm:mb-5">
      <h2 className="text-base sm:text-lg font-bold text-[#005190]">
        <img src="/black logo.png" alt="" className="w-28 sm:w-32" />
      </h2>
      <FaTimes
        size={20}
        className="cursor-pointer text-[#005190]"
        onClick={() => setSidebarOpen(false)}
      />
    </div>

    {/* Client Info */}
    {clientInfo && (
      <div className="mb-5 sm:mb-6 bg-blue-50 p-3 sm:p-4 rounded-xl shadow">
        <h3 className="text-base sm:text-lg font-bold capitalize text-[#005190] border-b pb-2 mb-3">
          {clientInfo.name} Information
        </h3>
        <div className="space-y-1 text-gray-700 text-sm sm:text-base">
          <p>
            <span className="font-semibold">Name:</span> {clientInfo.name}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {clientInfo.phone}
          </p>
          <p className="text-xs sm:text-sm">
            <span className="font-semibold">Email:</span> {clientInfo.email}
          </p>
        </div>
      </div>
    )}

    {/* Selected Plan */}
    {selectedPlan && (
      <div className="bg-blue-50 p-3 sm:p-4 rounded-xl shadow">
        <h3 className="text-base sm:text-lg font-bold capitalize text-[#005190] border-b pb-2 mb-3">
          {selectedPlan.company} Selected Plan
        </h3>
        <img
          src={`http://localhost:5000/${selectedPlan.imageUrl}`}
          alt={selectedPlan.name}
          className="w-full h-28 sm:h-36 object-contain mb-3 border rounded"
        />
        <div className="space-y-1 text-gray-700 text-sm sm:text-base">
          <p>
            <span className="font-semibold">Company:</span>{" "}
            {selectedPlan.company}
          </p>
          <p>
            <span className="font-semibold">Name:</span> {selectedPlan.name}
          </p>
          <p>
            <span className="font-semibold">Rate:</span> {selectedPlan.rate}%
          </p>
          <p>
            <span className="font-semibold">Yearly Premium:</span>{" "}
            {selectedPlan.yearlyPremium}
          </p>
        </div>
      </div>
    )}
  </aside>

  {/* Main Content */}
  <div
    className={`flex-1 p-4 sm:p-6 transition-all duration-300 
                ${sidebarOpen ? "md:ml-72 sm:ml-80" : "ml-0"} 
                flex flex-col items-center justify-center`}
  >
    {/* Mobile menu button */}
    <div className="absolute top-4 sm:top-5 left-4 sm:left-5">
      <FaBars
        size={22}
        className="cursor-pointer text-[#005190]"
        onClick={() => setSidebarOpen(true)}
      />
    </div>

    {/* Form */}
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-xl shadow-2xl py-8 sm:py-10 px-6 sm:px-8 md:px-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center text-[#005190] mb-6 font-manrope">
        Schedule Survey
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 mt-3 sm:mt-5">
        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={handleChange}
          className="w-full p-2.5 sm:p-3 border font-manrope text-sm sm:text-base border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005190]"
          required
        />
        <input
          type="number"
          name="mainphone"
          placeholder="Phone"
          value={formData.mainphone}
          onChange={handleChange}
          className="w-full p-2.5 sm:p-3 border font-manrope text-sm sm:text-base border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005190]"
          required
        />
        <input
          type="email"
          name="mainemail"
          placeholder="Email"
          value={formData.mainemail}
          onChange={handleChange}
          className="w-full p-2.5 sm:p-3 font-manrope text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005190]"
        />
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2.5 sm:p-3 font-manrope text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005190]"
          required
        >
          <option value="" disabled>
            Preferred Time
          </option>
          <option value="9am-12pm">9am - 12pm</option>
          <option value="12pm-3pm">12 noon - 3pm</option>
          <option value="3pm-6pm">3pm - 6pm</option>
        </select>
        <button
          type="submit"
          disabled={loadingSubmit}
          className={`w-full mt-5 py-2.5 sm:py-3 text-white uppercase tracking-wide text-base sm:text-lg font-semibold rounded-lg shadow-md overflow-hidden relative group transition-all duration-700 flex items-center justify-center gap-2
            ${buttonActive ? "bg-[#005190]" : "bg-[#092B4E]"}`}
        >
          {loadingSubmit ? (
            <>
              <span className="relative z-10">Processing</span>
              <img
                src="/loader.gif"
                alt="Loading"
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
            </>
          ) : (
            <>
              <span className="relative font-manrope text-lg sm:text-xl tracking-wider z-10">
                Submit
              </span>
              <span className="absolute top-0 -right-[50px] w-0 h-full bg-[#4CC750] skew-x-[35deg] transition-all duration-700 group-hover:w-full"></span>
            </>
          )}
        </button>
      </form>
    </div>
  </div>

  {/* Popup */}
  {showPopup && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-[#005190] rounded-2xl shadow-2xl px-5 sm:px-6 w-full max-w-sm sm:max-w-md py-8 sm:py-10 text-center">
        <img
          src="/wesecure-logo.png"
          alt="WeSecure Logo"
          className="w-28 sm:w-32 md:w-40 mx-auto mb-4 drop-shadow-lg"
        />
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide mb-3">
          Form Submitted Successfully!
        </h2>
        <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 px-1 sm:px-2">
          Thank you for submitting your details. Our{" "}
          <span className="font-semibold">WeSecure</span> team will get in
          touch with you very soon.
        </p>
        <button
          onClick={() => {
            setShowPopup(false);
            navigate("/");
          }}
          className="bg-white text-blue-700 font-semibold px-4 sm:px-6 py-2 rounded shadow hover:bg-blue-50 transition-all duration-300 text-sm sm:text-base"
        >
          Thank You
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default ScheduleSurveyForm;
