import { createContext, useContext, useState } from "react";
import {
  createUpdateIeppoTestRequest,
  finishIeppoTestRequest,
  generateResultIeppoTestRequest,
  getIeppoTestRequest,
  ResetIeppoTestRequest,
  createUpdatePhbTestRequest,
  finishPhbTestRequest,
  generateResultPhbTestRequest,
  getPhbTestRequest,
  ResetPhbTestRequest,
  createUpdateTepeTestRequest,
  finishTepeTestRequest,
  generateResultTepeTestRequest,
  getTepeTestRequest,
  ResetTepeTestRequest,
  getVocationalTestReportRequest,
} from "../api/vocationalTest";

const VocationalTestContext = createContext();

export const useVocationalTests = () => {
  const context = useContext(VocationalTestContext);
  if (!context)
    throw new Error(
      "useVocationalTests must be used within a VocationalTestProvider"
    );
  return context;
};

export function VocationalTestProvider({ children }) {
  const [vocationalTestReport, setVocationalTestReport] = useState({});

  const createUpdateIeppoTest = async (test) => {
    try {
      const res = await createUpdateIeppoTestRequest(test);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const finishIeppoTest = async (test) => {
    try {
      const res = await finishIeppoTestRequest(test);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const generateResultIeppoTest = async () => {
    try {
      const res = await generateResultIeppoTestRequest();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getIeppoTest = async () => {
    try {
      const res = await getIeppoTestRequest();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const resetIeppoTest = async () => {
    try {
      const res = await ResetIeppoTestRequest();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createUpdateTepeTest = async (test) => {
    try {
      const res = await createUpdateTepeTestRequest(test);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const finishTepeTest = async (test) => {
    try {
      const res = await finishTepeTestRequest(test);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const generateResultTepeTest = async () => {
    try {
      const res = await generateResultTepeTestRequest();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getTepeTest = async () => {
    try {
      const res = await getTepeTestRequest();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const resetTepeTest = async () => {
    try {
      const res = await ResetTepeTestRequest();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createUpdatePhbTest = async (test) => {
    try {
      const res = await createUpdatePhbTestRequest(test);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const finishPhbTest = async (test) => {
    try {
      const res = await finishPhbTestRequest(test);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const generateResultPhbTest = async () => {
    try {
      const res = await generateResultPhbTestRequest();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getPhbTest = async () => {
    try {
      const res = await getPhbTestRequest();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const resetPhbTest = async () => {
    try {
      const res = await ResetPhbTestRequest();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getVocationalTestReport = async () => {
    try {
      const res = await getVocationalTestReportRequest();
      setVocationalTestReport(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VocationalTestContext.Provider
      value={{
        vocationalTestReport,
        createUpdateIeppoTest,
        finishIeppoTest,
        generateResultIeppoTest,
        getIeppoTest,
        resetIeppoTest,
        createUpdateTepeTest,
        finishTepeTest,
        generateResultTepeTest,
        getTepeTest,
        resetTepeTest,
        createUpdatePhbTest,
        finishPhbTest,
        generateResultPhbTest,
        getPhbTest,
        resetPhbTest,
        getVocationalTestReport,
      }}
    >
      {children}
    </VocationalTestContext.Provider>
  );
}
