import axios from "./axios";

export const createPersonalInformationRequest = async (data) =>
  axios.post("/user/personal-information", data);
