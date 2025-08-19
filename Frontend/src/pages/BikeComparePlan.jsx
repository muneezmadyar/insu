import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import { FaRegFilePdf } from "react-icons/fa";

const BikeComparePlan = () => {
  const [bikePlans, setBikePlans] = useState([]);
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const bikeInfo = JSON.parse(localStorage.getItem("bikeInfo"));
  const bikeValue = Number(bikeInfo?.currentValue);

  useEffect(() => {
    const fetchBikePlans = async () => {
      try {
        const res = await fetch(`${baseURL}/api/bike-plans/all`);
        const data = await res.json();
        const enabledPlans = data.filter((plan) => !plan.isDisabled);
        setBikePlans(enabledPlans);
      } catch (err) {
        console.error("Failed to fetch bike plans:", err);
      }
    };

    fetchBikePlans();
  }, []);

  const calculateYearlyPremium = (value, rateString) => {
    const rate = parseFloat(rateString.replace("%", ""));
    const yearlyPremium = (value / 100) * rate;
    return yearlyPremium.toFixed(0);
  };

  const handleBuyNow = (selectedPlan) => {
    const yearlyPremium = calculateYearlyPremium(bikeValue, selectedPlan.rate);
    const updatedPlan = { ...selectedPlan, yearlyPremium };
    localStorage.setItem("selectedBikePlan", JSON.stringify(updatedPlan));
    navigate("/bike/survey");
  };

  const handleBuyNowClick = (plan) => {
    setLoadingPlanId(plan._id);
    setTimeout(() => {
      handleBuyNow(plan);
      setLoadingPlanId(null);
    }, 3000);
  };

  const handleDownloadPDF = (plan) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Bike Insurance Plan", 20, 20);

    doc.setFontSize(14);
    doc.text(`Company: ${plan.company}`, 20, 40);
    doc.text(`Plan Name: ${plan.name}`, 20, 50);
    doc.text(`Rate: ${plan.rate}%`, 20, 60);
    doc.text(
      `Yearly Premium: ${calculateYearlyPremium(bikeValue, plan.rate)}`,
      20,
      70
    );

    doc.save(`${plan.name.replace(/\s+/g, "_")}-BikePlan.pdf`);
  };

  return (
    <div className="py-8 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-[#84B9E2] min-h-screen">
  <h2
    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-10 lg:mb-12 
               text-center text-[#005190] tracking-wide drop-shadow-lg font-mulish leading-snug"
  >
    Compare Bike <br className="hidden sm:block" /> Insurance in Seconds
  </h2>

  {bikePlans.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-2 sm:px-4 lg:px-6">
      {bikePlans.map((plan, index) => (
        <div
          key={index}
          className="relative bg-white backdrop-blur-lg border border-white/20 shadow-lg 
                     hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 lg:p-10 
                     flex flex-col items-center text-center transform hover:-translate-y-2 rounded-xl"
        >
          {/* PDF Button */}
          <button
            onClick={() => handleDownloadPDF(plan)}
            className="absolute top-3 right-2 bg-[#005190] hover:bg-[#115ce6] 
                       text-white p-2 rounded-full shadow-md transition"
            title="Download PDF"
          >
            <FaRegFilePdf className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Logo */}
          <div className="bg-transparent p-2 sm:p-3 lg:p-4 rounded-full mb-4 sm:mb-6">
            <img
              src={`${baseURL}/${plan.imageUrl}`}
              alt={plan.name}
              className="w-[120px] sm:w-[140px] lg:w-[150px] h-[50px] sm:h-[55px] lg:h-[61px] 
                         object-contain mx-auto"
            />
            <h1 className="text-sm sm:text-base font-semibold text-[#1F1F1F] mt-1 font-manrope mb-1 tracking-tight">
              {plan.company}
            </h1>
          </div>

          {/* Plan Name */}
          <p className="text-sm sm:text-base capitalize flex justify-between mt-3 sm:mt-4 font-normal mb-2 sm:mb-3 border-b border-[#8F8F8F] pb-1 sm:pb-2 w-full text-[#8F8F8F] font-manrope">
            <span>Plan Name:</span> {plan.name}
          </p>

          {/* Rate */}
          <p className="text-sm sm:text-base flex justify-between text-[#8F8F8F] mb-2 sm:mb-3 mt-3 sm:mt-3 border-b border-[#8F8F8F] pb-1 sm:pb-2 w-full font-normal font-manrope">
            <span>Rate:</span> {plan.rate}%
          </p>

          {/* Premium */}
          <p className="text-sm sm:text-base flex justify-between text-[#8F8F8F] mt-3 sm:mt-3 mb-5 sm:mb-6 lg:mb-8 border-b border-[#8F8F8F] pb-1 sm:pb-2 w-full font-normal font-manrope">
            <span className="font-semibold">Yearly Premium:</span>
            {calculateYearlyPremium(bikeValue, plan.rate)}/Pkr
          </p>

          {/* Buy Button */}
          <div className="flex gap-3 sm:gap-4 mt-auto">
            <button
              className="border-1 border-[#005190] text-[#005190] 
                         px-4 sm:px-5 lg:px-6 py-2 sm:py-3 rounded 
                         transition-all duration-300 flex items-center justify-center gap-2 
                         min-w-[120px] sm:min-w-[140px] lg:min-w-[150px] 
                         font-medium font-manrope text-base sm:text-lg leading-5
                         hover:bg-[#005190] hover:text-white hover:border-[#005190]"
              onClick={() => handleBuyNowClick(plan)}
              disabled={loadingPlanId === plan._id}
            >
              {loadingPlanId === plan._id ? (
                <>
                  <span>Processing</span>
                  <img
                    src="/loader.gif"
                    alt="loading"
                    className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                  />
                </>
              ) : (
                "Buy Now"
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-600 text-base sm:text-lg">No bike plans found.</p>
  )}
</div>

  );
};

export default BikeComparePlan;
