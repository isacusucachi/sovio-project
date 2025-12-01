import { RECAPTCHA_SITE_KEY } from "../../src/config";
import { createContext, useContext, ReactNode } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

// 1. Tipos
interface RecaptchaContextType {
  getRecaptchaToken: (action: string) => Promise<string | null>;
}

interface ProviderProps {
  children: ReactNode;
}

// 2. Contexto tipado
const RecaptchaContext = createContext<RecaptchaContextType | undefined>(
  undefined
);

// 3. Hook de acceso
export const useRecaptcha = (): RecaptchaContextType => {
  const context = useContext(RecaptchaContext);
  if (!context) {
    throw new Error("useRecaptcha must be used within a RecaptchaProvider");
  }
  return context;
};

// 4. Provider principal (envoltorio del Google Provider)
export const RecaptchaProvider = ({ children }: ProviderProps) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <RecaptchaContextProvider>{children}</RecaptchaContextProvider>
    </GoogleReCaptchaProvider>
  );
};

// 5. Provider que expone getRecaptchaToken
const RecaptchaContextProvider = ({ children }: ProviderProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const getRecaptchaToken = async (action: string): Promise<string | null> => {
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

export default RecaptchaProvider;
