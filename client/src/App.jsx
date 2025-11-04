import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import MainPage from "./pages/MainPage";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PersonalInformationSheet from "./pages/PersonalInformationSheet";
import IeppoTest from "./pages/IeppoTest";
import PhbTest from "./pages/PhbTest";
import TepeTest from "./pages/TepeTest";
import FinalVocationalTestReport from "./pages/FinalVocationalTestReport";

import { ProtectedRoute } from "./routes";
import { VocationalTestProvider } from "./context/vocationalTestContext";
import { UserProvider } from "./context/userContext";
import { RecaptchaProvider } from "./context/recaptchaContext";
import NotFound from "./pages/NotFound";
import AssessmentSurvey from "./pages/AssessmentSurvey";
import { AssessmentSurveyProvider } from "./context/assessmentSurveyContex";
import Header from "./components/Header";
import MiCarrera from "./pages/MiCarrera";
import { useEffect } from "react";
import { trackPageView } from "./analytics";

const App = () => {
  return (
    <div className="font-redhat">
      <VocationalTestProvider>
        <UserProvider>
          <BrowserRouter>
            <AppRoutes />
            <ToastContainer position="top-center" />
          </BrowserRouter>
        </UserProvider>
      </VocationalTestProvider>
    </div>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/login"
          element={
            <RecaptchaProvider>
              <Login />
            </RecaptchaProvider>
          }
        />
        <Route
          path="/register"
          element={
            <RecaptchaProvider>
              <Register />
            </RecaptchaProvider>
          }
        />
        <Route path="mi-carrera" element={<MiCarrera />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/main" element={<MainPage />} />
          <Route
            path="/personal-information"
            element={<PersonalInformationSheet />}
          />
          <Route path="/phb-test" element={<PhbTest />} />
          <Route path="/ieppo-test" element={<IeppoTest />} />
          <Route path="/tepe-test" element={<TepeTest />} />
          <Route
            path="/final-vocational-test-report"
            element={<FinalVocationalTestReport />}
          />
          <Route
            path="/assessment-survey"
            element={
              <AssessmentSurveyProvider>
                <AssessmentSurvey />
              </AssessmentSurveyProvider>
            }
          />
        </Route>
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
