import { createContext, useContext, useEffect, useState } from "react";
import { createAssessmentSurveyRequest } from "../api/assessmentSurvey";

const AssessmentSurveyContext = createContext();

export const useAssessmentSurveys = () => {
  const context = useContext(AssessmentSurveyContext);
  if (!context)
    throw new Error(
      "useAssessmentSurveys debe ser utilizado dentro de AssessmentSurveyProvider"
    );
  return context;
};

export function AssessmentSurveyProvider({ children }) {
  const [errors, setErrors] = useState([]);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const createAssessmentSurvey = async (data) => {
    try {
      const res = await createAssessmentSurveyRequest(data);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  return (
    <AssessmentSurveyContext.Provider
      value={{
        createAssessmentSurvey,
        errors,
      }}
    >
      {children}
    </AssessmentSurveyContext.Provider>
  );
}
