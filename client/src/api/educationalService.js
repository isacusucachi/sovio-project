import axios from "./axios";

export const getProvinceRequest = async (selectedDepartment) =>
  axios.get(
    `/educational-service/provincias?departamento=${selectedDepartment}`
  );

export const getDistrictRequest = async (
  selectedDepartment,
  selectedProvince
) =>
  axios.get(
    `/educational-service/distritos?departamento=${selectedDepartment}&provincia=${selectedProvince}`
  );

export const getInstitutionRequest = async (
  selectedDepartment,
  selectedProvince,
  selectedDistrict
) =>
  axios.get(
    `/educational-service/instituciones?departamento=${selectedDepartment}&provincia=${selectedProvince}&distrito=${selectedDistrict}`
  );
