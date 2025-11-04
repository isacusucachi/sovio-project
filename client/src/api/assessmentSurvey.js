import axios from "./axios";

export const createAssessmentSurveyRequest = async (data) =>
  axios.post(`/assessment-survey`, data);
