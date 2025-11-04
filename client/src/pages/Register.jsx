import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "../context/authContext";
import { useRecaptcha } from "../context/recaptchaContext";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/authSchema";
import {
  getProvinceRequest,
  getDistrictRequest,
  getInstitutionRequest,
} from "../api/educationalService";
import paises from "../data/paises.json";

const departamentos_peru = [
  "AMAZONAS",
  "ANCASH",
  "APURIMAC",
  "AREQUIPA",
  "AYACUCHO",
  "CAJAMARCA",
  "CALLAO",
  "CUSCO",
  "HUANCAVELICA",
  "HUANUCO",
  "ICA",
  "JUNIN",
  "LA LIBERTAD",
  "LAMBAYEQUE",
  "LIMA",
  "LORETO",
  "MADRE DE DIOS",
  "MOQUEGUA",
  "PASCO",
  "PIURA",
  "PUNO",
  "SAN MARTIN",
  "TACNA",
  "TUMBES",
  "UCAYALI",
];

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const { getRecaptchaToken } = useRecaptcha();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { department: "CUSCO" },
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [institutions, setInstitutions] = useState([]);

  const selectedDepartment = useWatch({ control, name: "department" });
  const selectedProvince = useWatch({ control, name: "province" });
  const selectedDistrict = useWatch({ control, name: "district" });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const recaptchaToken = await getRecaptchaToken("register_form");
      const res = await signup({ ...data, recaptchaToken: recaptchaToken });
      if (res) {
        toast.success("Registro exitoso");
      }
    } catch (error) {
      toast.error("Error al iniciar sesión");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/main");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (registerErrors.length > 0) {
      registerErrors.forEach((error) => toast.error(error));
    }
  }, [registerErrors]);

  // Cargar provincias cuando se selecciona un departamento
  useEffect(() => {
    const fetchProvinces = async () => {
      if (selectedDepartment) {
        try {
          const response = await getProvinceRequest(selectedDepartment);
          setProvinces(response.data);
          setValue("province", ""); // Limpiar selección de provincia
          setValue("district", ""); // Limpiar selección de distrito
          setValue("educationalInstitution", ""); // Limpiar selección de institución
          setDistricts([]);
          setInstitutions([]);
        } catch (error) {
          console.error("Error fetching provinces:", error);
        }
      }
    };

    fetchProvinces(); // Llamar a la función asíncrona
  }, [selectedDepartment, setValue]);

  useEffect(() => {
    const fetchDistrics = async () => {
      if (selectedProvince) {
        try {
          const response = await getDistrictRequest(
            selectedDepartment,
            selectedProvince
          );
          setDistricts(response.data);
          setValue("district", ""); // Limpiar selección de distrito
          setValue("educationalInstitution", ""); // Limpiar selección de institución
          setInstitutions([]);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      }
    };

    fetchDistrics(); // Llamar a la función asíncrona
  }, [selectedProvince, setValue, selectedDepartment]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      if (selectedDistrict) {
        try {
          const response = await getInstitutionRequest(
            selectedDepartment,
            selectedProvince,
            selectedDistrict
          );
          setInstitutions(response.data);
          setValue("educationalInstitution", ""); // Limpiar selección de institución
        } catch (error) {
          console.error("Error fetching institutions:", error);
        }
      }
    };

    fetchInstitutions(); // Llamar a la función asíncrona
  }, [selectedDistrict, setValue, selectedProvince, selectedDepartment]);
  return (
    <section className="flex justify-center items-center bg-[url('/Fondo-blanco-GORE.svg')] dark:bg-[url('/Fondo-rojo-GORE.svg')] bg-cover bg-center w-full h-full relative pb-[110px] pt-[120px] lg:pt-[100px] lg:p-20">
      <div className="w-full max-w-4xl mx-auto p-6 flex flex-col items-center justify-center">
        <div className="py-2 px-5 rounded-t-lg bg-red-gore-1 dark:bg-white shadow-lg inline-block w-full ">
          <h2 className="text-2xl text-white dark:text-red-gore-3 font-bold text-center text-primary">
            Crear una cuenta
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white dark:bg-gray-800 dark:border-gray-700 rounded-b-lg p-6 shadow-lg"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="nationality"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                <span>Nacionalidad </span>
                <span className="text-red-500 font-bold"> ⁕</span>
              </label>
              <select
                id="nationality"
                name="nationality"
                {...register("nationality")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="PERÚ">PERÚ</option>
                {paises.map((pais) => (
                  <option key={pais.iso3} value={pais.nombre}>
                    {pais.nombre}
                  </option>
                ))}
              </select>
              {errors.nationality?.message && (
                <p className="text-red-500">{errors.nationality?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="typeOfIdentityDocument"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                <span>Tipo doc. identidad </span>
                <span className="text-red-500 font-bold"> ⁕</span>
              </label>
              <select
                id="typeOfIdentityDocument"
                name="typeOfIdentityDocument"
                {...register("typeOfIdentityDocument")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="DNI">DOCUMENTO NACIONAL DE IDENTIDAD</option>
                <option value="CE">CARNÉ DE EXTRANJERÍA</option>
                <option value="PTP">PERMISO TEMPORAL DE PERMANENCIA</option>
              </select>
              {errors.typeOfIdentityDocument?.message && (
                <p className="text-red-500">
                  {errors.typeOfIdentityDocument?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="identityDocumentNumber"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                <span>N° doc. identidad</span>
                <span className="text-red-500 font-bold"> ⁕</span>
              </label>
              <input
                type="text"
                name="identityDocumentNumber"
                id="identityDocumentNumber"
                {...register("identityDocumentNumber")}
                onInput={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  e.target.value = value.length > 9 ? value.slice(0, 9) : value;
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="N° doc. identidad"
                required
              />
              {errors.identityDocumentNumber?.message && (
                <p className="text-red-500">
                  {errors.identityDocumentNumber?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="names"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                <span>Nombres</span>
                <span className="text-red-500 font-bold"> ⁕</span>
              </label>
              <input
                type="text"
                name="names"
                id="names"
                {...register("names")}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nombres"
                required
              />
              {errors.names?.message && (
                <p className="text-red-500">{errors.names?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="surnames"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                <span>Apellidos</span>
                <span className="text-red-500 font-bold"> ⁕</span>
              </label>
              <input
                type="text"
                name="surnames"
                id="surnames"
                {...register("surnames")}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Apellidos"
                required
              />
              {errors.surnames?.message && (
                <p className="text-red-500">{errors.surnames?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="birthdate"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                <span>Fecha de nacimiento</span>
                <span className="text-red-500 font-bold"> ⁕</span>
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                {...register("birthdate")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.birthdate?.message && (
                <p className="text-red-500">{errors.birthdate?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                <span>Género</span>
                <span className="text-red-500 font-bold"> ⁕</span>
              </label>
              <select
                id="gender"
                name="gender"
                {...register("gender")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="">Seleciona género</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
              </select>
              {errors.gender?.message && (
                <p className="text-red-500">{errors.gender?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="height"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                <span>Estatura</span>
              </label>
              <input
                type="text"
                id="height"
                name="height"
                {...register("height")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1.65"
              />
              {errors.height?.message && (
                <p className="text-red-500">{errors.height?.message}</p>
              )}
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
              ¿En qué institución educativa estudiaste o estás estudiando
              actualmente?
            </h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label
                  htmlFor="department"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  <span>Departamento</span>
                  <span className="text-red-500 font-bold"> ⁕</span>
                </label>
                <select
                  id="department"
                  name="department"
                  {...register("department")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  {departamentos_peru.map((dep) => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
                {errors.department?.message && (
                  <p className="text-red-500">{errors.department?.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="province"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  <span>Provincia </span>
                  <span className="text-red-500 font-bold"> ⁕</span>
                </label>
                <select
                  id="province"
                  name="province"
                  {...register("province")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  disabled={!selectedDepartment}
                >
                  <option value="">Seleccione una provincia</option>
                  {provinces.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
                {errors.province?.message && (
                  <p className="text-red-500">{errors.province?.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="district"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  <span>Distrito </span>
                  <span className="text-red-500 font-bold"> ⁕</span>
                </label>
                <select
                  id="district"
                  name="district"
                  {...register("district")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  disabled={!selectedProvince}
                >
                  <option value="">Seleccione un distrito</option>
                  {districts.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
                {errors.district?.message && (
                  <p className="text-red-500">{errors.district?.message}</p>
                )}
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor="educationalService"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  <span>Institución Educativa </span>
                  <span className="text-red-500 font-bold"> ⁕</span>
                </label>
                <select
                  id="educationalService"
                  name="educationalService"
                  {...register("educationalService")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  disabled={!selectedDistrict}
                >
                  <option value="">Seleccione una institución educativa</option>
                  {institutions.map((inst) => (
                    <option key={inst._id} value={inst._id}>
                      {inst.CEN_EDU + " - (" + inst.D_NIV_MOD + ")"}
                    </option>
                  ))}
                </select>
                {errors.educationalService?.message && (
                  <p className="text-red-500">
                    {errors.educationalService?.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="grade_section_cycle"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                <span>Grado/Sección/Ciclo</span>
                <span className="text-red-500 font-bold"> ⁕</span>
              </label>
              <input
                type="text"
                name="grade_section_cycle"
                id="grade_section_cycle"
                {...register("grade_section_cycle")}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Grado/Sección/Ciclo"
                required
              />
              {errors.grade_section_cycle?.message && (
                <p className="text-red-500">{errors.grade_section_cycle?.message}</p>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                <span>Correo electrónico</span>
                <span className="text-red-500 font-bold"> ⁕</span>
              </label>
              <input
                type="text"
                name="email"
                id="email"
                {...register("email")}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Apellidos"
              />
              {errors.email?.message && (
                <p className="text-red-500">{errors.email?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                <span>Nº celular</span>
                <span className="text-red-500 font-bold"> ⁕</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                {...register("phoneNumber")}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nº celular"
              />
              {errors.phoneNumber?.message && (
                <p className="text-red-500">{errors.phoneNumber?.message}</p>
              )}
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <h3 className="font-bold mb-4 text-gray-900 dark:text-white text-lg">
              Crear contraseña
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  <span>Contraseña</span>
                  <span className="text-red-500 font-bold"> ⁕</span>
                </label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  {...register("password")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  minLength={8}
                />
                {errors.password?.message && (
                  <p className="text-red-500">{errors.password?.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  <span>Confirmar contraseña</span>
                  <span className="text-red-500 font-bold"> ⁕</span>
                </label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  minLength={8}
                />
                {errors.confirmPassword?.message && (
                  <p className="text-red-500">
                    {errors.confirmPassword?.message}
                  </p>
                )}
                <div className="w-full flex items-center justify-end mt-2">
                  <label className="flex items-center justify-center">
                    <input
                      id="showPassword"
                      type="checkbox"
                      className="mr-2 w-4 h-4"
                      checked={isPasswordVisible}
                      onChange={() =>
                        setIsPasswordVisible((prevState) => !prevState)
                      }
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-300">
                      Mostrar contraseña
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pl-2">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAndConditions"
                  name="termsAndConditions"
                  aria-describedby="termsAndConditions"
                  type="checkbox"
                  {...register("termsAndConditions")}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-base">
                <label
                  htmlFor="termsAndConditions"
                  className="font-normal text-gray-500 dark:text-gray-300"
                >
                  Estoy de acuerdo con los{" "}
                  <a
                    href="/terms-and-conditions"
                    target="_blank"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    términos y condiciones
                  </a>
                </label>
              </div>
            </div>
            {errors.termsAndConditions?.message && (
              <p className="text-red-500">
                {errors.termsAndConditions?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 mr-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#FFFFFF"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Crear una cuenta"
              )}
            </button>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400 w-full text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary-600 hover:underline dark:text-primary-500"
              >
                Ingresar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Register;
