import { createContext, useContext, useState } from "react";
import {
  createPersonalInformationRequest,
} from "../api/user";

const UserContext = createContext();

export const useUsers = ()  => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUsers must be used within a VocationalTestProvider");
  return context;
};

export function UserProvider({ children }) {
  const [errors, setErrors] = useState([]);

  const createPersonalInformation = async (data) => {
    try {
      const res = await createPersonalInformationRequest(data);
      return res.data;
    } catch (error) {
      if (error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        createPersonalInformation,
        errors,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
