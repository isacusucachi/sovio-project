import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import PersonalInformationComponent from "../components/PersonalInformationComponent";
import IeppoTestComponent from "../components/IeppoTestComponent";

const VocationalFlow = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState("loading");

  useEffect(() => {
    if (user) {
      // Determinar qué mostrar basado en el estado del usuario
      if (!user.completedUserInformation) {
        setCurrentStep("personalInfo");
      } else {
        setCurrentStep("ieppoTest");
      }
    }
  }, [user]);

  // Pantalla de carga
  if (currentStep === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  // Mostrar el componente correspondiente
  return (
    <div>
      {currentStep === "personalInfo" ? (
        <PersonalInformationComponent
          user={user}
          setCurrentBigStep={setCurrentStep}
        />
      ) : (
        <IeppoTestComponent />
      )}
    </div>
  );
};

export default VocationalFlow;
