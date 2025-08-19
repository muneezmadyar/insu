import "./App.css"; // Import your global styles
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuoteFormStep1 from "./components/QuoteFormStep1";
import QuoteFormStep2 from "./components/QuoteFormStep2";
import ComparePlans from "./components/ComparePlans";
import { FormProvider } from "./context/FormContext";
import ScheduleSurveyForm from "./components/ScheduleSurveyForm"
import BikeQuoteFormStep1 from "./pages/BikeQuoteFormStep1";
import BikeQuoteFormStep2 from "./pages/BikeQuoteFormStep2";
import BikeComparePlan from "./pages/BikeComparePlan";
import BikeSurveyForm from "./pages/BikeSurveyForm";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Navbar";

function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        {/* <Navbar /> */}
          <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/step1" element={<QuoteFormStep1 />} />
          <Route path="/step2" element={<QuoteFormStep2 />} />
          <Route path="/plans" element={<ComparePlans />} />
          <Route path="/schedule-survey" element={<ScheduleSurveyForm />} />

          <Route path="/bike" element={<BikeQuoteFormStep1 />} />
<Route path="/bike/step2" element={<BikeQuoteFormStep2 />} />
<Route path="/bike/compare" element={<BikeComparePlan />} />
<Route path="/bike/survey" element={<BikeSurveyForm />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
