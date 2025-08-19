import React, { createContext, useState, useContext } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [carData, setCarData] = useState({});
  const [userData, setUserData] = useState({});
  const [matchedPlans, setMatchedPlans] = useState([]); // ✅ Add this line

  return (
    <FormContext.Provider value={{ 
      carData, setCarData, 
      userData, setUserData, 
      matchedPlans, setMatchedPlans // ✅ Include here
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
