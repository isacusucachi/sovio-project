import axios from "./axios";

export const createUpdateIeppoTestRequest = async (testData) =>
  axios.post("/vocational-test/ieppo-test", testData);

export const finishIeppoTestRequest = async (testData) =>
  axios.post("/vocational-test/ieppo-test/finish", testData);

export const generateResultIeppoTestRequest = async (testData) =>
  axios.post("/vocational-test/ieppo-test/result", testData);

export const getIeppoTestRequest = async () =>
  axios.get("/vocational-test/ieppo-test");

export const ResetIeppoTestRequest = async () =>
  axios.put("/vocational-test/ieppo-test/reset");


export const createUpdatePhbTestRequest = async (testData) =>
  axios.post("/vocational-test/phb-test", testData);

export const finishPhbTestRequest = async (testData) =>
  axios.post("/vocational-test/phb-test/finish", testData);

export const generateResultPhbTestRequest = async (testData) =>
  axios.post("/vocational-test/phb-test/result", testData);

export const getPhbTestRequest = async () =>
  axios.get("/vocational-test/phb-test");

export const ResetPhbTestRequest = async () =>
  axios.put("/vocational-test/phb-test/reset");


export const createUpdateTepeTestRequest = async (testData) =>
  axios.post("/vocational-test/tepe-test", testData);

export const finishTepeTestRequest = async (testData) =>
  axios.post("/vocational-test/tepe-test/finish", testData);

export const generateResultTepeTestRequest = async (testData) =>
  axios.post("/vocational-test/tepe-test/result", testData);

export const getTepeTestRequest = async () =>
  axios.get("/vocational-test/tepe-test");

export const ResetTepeTestRequest = async () =>
  axios.put("/vocational-test/tepe-test/reset");

export const getVocationalTestReportRequest = async () =>
  axios.get("/vocational-test/vocational-test-report");
