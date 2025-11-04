import { RECAPTCHA_SITE_KEY } from "../config";
import React, { createContext, useContext } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const RecaptchaContext = createContext();

export const useRecaptcha = () => {
  const context = useContext(RecaptchaContext);
  if (!context)
    throw new Error("useRecaptcha must be used within a RecaptchaProvider");
  return context;
};

export const RecaptchaProvider = ({ children }) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <RecaptchaContextProvider>{children}</RecaptchaContextProvider>
    </GoogleReCaptchaProvider>
  );
};

const RecaptchaContextProvider = ({ children }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getRecaptchaToken = async (action) => {
    if (executeRecaptcha) {
      const token = await executeRecaptcha(action);
      return token;
    }
    return null; 
  };

  return (
    <RecaptchaContext.Provider value={{ getRecaptchaToken }}>
      {children}
    </RecaptchaContext.Provider>
  );
};
