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
import { FaArrowLeft, FaEye, FaEyeSlash, FaIdCard } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";
import { TbPasswordUser } from "react-icons/tb";
import StepIndicator from "../components/Register/StepIndicator";
import { PasswordRequirement } from "../components/Register/PasswordRequirement";

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

// Campos por paso para validación parcial
const step1Fields = [
  "nationality",
  "typeOfIdentityDocument",
  "identityDocumentNumber",
  "names",
  "surnames",
  "birthdate",
  "gender",
  "height",
];
const step2Fields = [
  "department",
  "province",
  "district",
  "educationalService",
  "grade_section_cycle",
];

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const { getRecaptchaToken } = useRecaptcha();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identityDocumentNumber: "",
      nationality: "PERÚ",
      names: "",
      surnames: "",
      birthdate: "",
      gender: "",
      height: "",
      department: "CUSCO",
      province: "",
      district: "",
      educationalService: "",
      grade_section_cycle: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const handleNext = async () => {
    let fieldsToValidate;
    if (currentStep === 1) fieldsToValidate = step1Fields;
    else if (currentStep === 2) fieldsToValidate = step2Fields;

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      number: 1,
      title: "Información Personal",
      icon: FaIdCard,
    },
    {
      number: 2,
      title: "Institución Educativa",
      icon: IoSchool,
    },
    {
      number: 3,
      title: "Credenciales",
      icon: TbPasswordUser,
    },
  ];

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [institutions, setInstitutions] = useState([]);

  const selectedDepartment = useWatch({ control, name: "department" });
  const selectedProvince = useWatch({ control, name: "province" });
  const selectedDistrict = useWatch({ control, name: "district" });
  const [passwordValue, setPasswordValue] = useState("");

  // Calcular fechas mínima y máxima permitidas (13–24 años)
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 24,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0]; // Máxima edad: 24 años (fecha más antigua permitida)
  const maxDate = new Date(
    today.getFullYear() - 13,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0]; // Mínima edad: 13 años (fecha más reciente permitida)

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated, navigate]);
  
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

    fetchInstitutions();
  }, [selectedDistrict, setValue, selectedProvince, selectedDepartment]);

  const hasMinLength = passwordValue?.length >= 8;
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasLowercase = /[a-z]/.test(passwordValue);
  const hasNumber = /[0-9]/.test(passwordValue);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(passwordValue);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Link
        to="/"
        className="absolute top-4 left-4 inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
      >
        <FaArrowLeft className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">VOLVER A INICIO</span>
      </Link>
      <main className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col justify-center items-center py-8 px-6 mx-auto md:h-screen">
          <a
            href="/"
            className="flex items-center justify-center space-x-2 md:space-x-4 mb-6"
          >
            <img
              src={"./Logo GORE_Nuevo_negativo_vertical.png"}
              className="h-16 w-auto hidden dark:block"
              alt="Logo GORE Cusco"
            />
            <img
              src={"./Logo GORE_Nuevo_positivo_vertical.png"}
              className="h-16 w-auto block dark:hidden"
              alt="Logo GORE Cusco"
            />
            <span className="font-arima text-[6px] md:text-[8px] font-extrabold text-center dark:text-white">
              GERENCIA REGIONAL DE TRABAJO
              <br />Y PROMOCIÓN DEL EMPLEO CUSCO
            </span>
          </a>
          <div className="justify-center items-center w-full bg-white rounded-lg shadow lg:flex md:mt-0 lg:max-w-screen-lg xl:p-0 dark:bg-gray-800">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white w-full">
                Crear una cuenta
              </h1>
              <ol
                className={`flex justify-between items-center w-full mb-4 sm:mb-5 ${
                  currentStep === 0 ? "hidden" : "block"
                }`}
              >
                {steps.map((step, index) => (
                  <StepIndicator
                    key={step.number}
                    step={step}
                    currentStep={currentStep}
                    isLast={index === steps.length - 1}
                  />
                ))}
              </ol>
              <div
                className="mt-8 w-full"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {currentStep === 0 && (
                  <div className="space-y-6 mb-8">
                    <h3 className="mb-4 text-lg lg:text-xl font-bold leading-none text-gray-900 dark:text-white text-center">
                      Antes de comenzar...
                    </h3>

                    <p className="text-lg leading-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-6 md:mb-8">
                      Por favor revisa que tengas a la mano la siguiente
                      información para completar tu registro.
                    </p>

                    <ul className="text-lg leading-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-6 md:mb-8 list-disc px-8">
                      <li>
                        Número de documento de identidad. (DNI, Carnet de
                        Extranjería, Pasaporte)
                      </li>
                      <li>Fecha de nacimiento (Tener entre 13 a 24 años).</li>
                      <li>
                        Información personal completa (nombres, apellidos,
                        género).
                      </li>
                      <li>Institución educativa donde estudias.</li>
                      <li>Correo electrónico y un número de celular válido.</li>
                    </ul>

                    <p className="text-base text-gray-500 dark:text-gray-400 mt-4">
                      <span className="text-red-600 font-bold">*</span> indica
                      los campos obligatorios.
                    </p>
                  </div>
                )}

                {currentStep === 1 && (
                  <div>
                    <h3 className="mb-4 text-lg font-bold leading-none text-gray-900 dark:text-white text-center">
                      1. Información Personal
                    </h3>
                    <div className="grid md:grid-cols-3 gap-x-4 gap-y-6">
                      <div>
                        <label
                          htmlFor="nationality"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Nacionalidad </span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <select
                          id="nationality"
                          name="nationality"
                          {...register("nationality")}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.nationality
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
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
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.nationality?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="typeOfIdentityDocument"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Tipo doc. identidad </span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <select
                          id="typeOfIdentityDocument"
                          name="typeOfIdentityDocument"
                          {...register("typeOfIdentityDocument")}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.typeOfIdentityDocument
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
                          required
                        >
                          <option value="DNI">
                            DOCUMENTO NACIONAL DE IDENTIDAD
                          </option>
                          <option value="CE">CARNÉ DE EXTRANJERÍA</option>
                          <option value="PTP">
                            PERMISO TEMPORAL DE PERMANENCIA
                          </option>
                        </select>
                        {errors.typeOfIdentityDocument?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.typeOfIdentityDocument?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="identityDocumentNumber"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>N° doc. identidad</span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="identityDocumentNumber"
                          id="identityDocumentNumber"
                          {...register("identityDocumentNumber")}
                          onInput={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, "");
                            e.target.value =
                              value.length > 9 ? value.slice(0, 9) : value;
                          }}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.identityDocumentNumber
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
                          placeholder=" Ej. 74######"
                          required
                        />
                        {errors.identityDocumentNumber?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.identityDocumentNumber?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="names"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Nombres</span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="names"
                          id="names"
                          {...register("names")}
                          onInput={(e) => {
                            let value = e.target.value;

                            // Permite letras y espacios, elimina otros caracteres
                            value = value.replace(
                              /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                              ""
                            );

                            value = value.replace(/\s{2,}/g, " ");

                            // Capitaliza cada palabra sin eliminar espacio al final si el usuario está escribiendo
                            value = value
                              .split(" ")
                              .map((word) =>
                                word
                                  ? word.charAt(0).toUpperCase() +
                                    word.slice(1).toLowerCase()
                                  : ""
                              )
                              .join(" ");

                            e.target.value = value;
                          }}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.names
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
                          placeholder="Ej. Juan Carlos"
                          required
                        />
                        {errors.names?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.names?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="surnames"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Apellidos</span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="surnames"
                          id="surnames"
                          {...register("surnames")}
                          onInput={(e) => {
                            let value = e.target.value;

                            // Permite letras y espacios, elimina otros caracteres
                            value = value.replace(
                              /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                              ""
                            );

                            value = value.replace(/\s{2,}/g, " ");

                            // Capitaliza cada palabra sin eliminar espacio al final si el usuario está escribiendo
                            value = value
                              .split(" ")
                              .map((word) =>
                                word
                                  ? word.charAt(0).toUpperCase() +
                                    word.slice(1).toLowerCase()
                                  : ""
                              )
                              .join(" ");

                            e.target.value = value;
                          }}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.surnames
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
                          placeholder="Ej. Flores Gómez"
                          required
                        />
                        {errors.surnames?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.surnames?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="birthdate"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Fecha de nacimiento</span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <input
                          type="date"
                          id="birthdate"
                          name="birthdate"
                          {...register("birthdate")}
                          min={minDate}
                          max={maxDate}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.birthdate
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
                          required
                        />
                        {errors.birthdate?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.birthdate?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="gender"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Género</span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          {...register("gender")}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.gender
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
                          required
                        >
                          <option value="">Seleciona género</option>
                          <option value="femenino">Femenino</option>
                          <option value="masculino">Masculino</option>
                        </select>
                        {errors.gender?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.gender?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="height"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Estatura (cm)</span>
                          <span className="text-gray-500 text-xs ml-1">
                            (Opcional)
                          </span>
                        </label>
                        <input
                          type="text"
                          id="height"
                          name="height"
                          {...register("height")}
                          onInput={(e) => {
                            // Permitir solo números y un punto decimal
                            let value = e.target.value.replace(/[^0-9.]/g, "");

                            // Permitir solo un punto decimal
                            const parts = value.split(".");
                            if (parts.length > 2) {
                              value = parts[0] + "." + parts.slice(1).join("");
                            }

                            // Limitar a 3 dígitos antes del punto (ej: 250.5)
                            if (parts[0].length > 3) {
                              value =
                                parts[0].slice(0, 3) +
                                (parts[1] ? "." + parts[1] : "");
                            }

                            // Limitar a 1 decimal (ej: 165.5)
                            if (parts[1] && parts[1].length > 1) {
                              value = parts[0] + "." + parts[1].slice(0, 1);
                            }

                            e.target.value = value;
                          }}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.height
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
                          placeholder="Ej: 165 o 165.5"
                        />
                        {errors.height?.message && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.height?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 2 && (
                  <div>
                    <h3 className="mb-4 text-lg font-bold leading-none text-gray-900 dark:text-white text-center">
                      2. Institucion Educativa
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label
                          htmlFor="department"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Departamento</span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <select
                          id="department"
                          name="department"
                          {...register("department")}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.department
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
                          required
                        >
                          {departamentos_peru.map((dep) => (
                            <option key={dep} value={dep}>
                              {dep}
                            </option>
                          ))}
                        </select>
                        {errors.department?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.department?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="province"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Provincia </span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <select
                          id="province"
                          name="province"
                          {...register("province")}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.province
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
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
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.province?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="district"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Distrito </span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <select
                          id="district"
                          name="district"
                          {...register("district")}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.district
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
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
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.district?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label
                          htmlFor="educationalService"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Institución Educativa </span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <select
                          id="educationalService"
                          name="educationalService"
                          {...register("educationalService")}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.educationalService
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
                          required
                          disabled={!selectedDistrict}
                        >
                          <option value="">
                            Seleccione una institución educativa
                          </option>
                          {institutions.map((inst) => (
                            <option key={inst._id} value={inst._id}>
                              {inst.CEN_EDU + " - (" + inst.D_NIV_MOD + ")"}
                            </option>
                          ))}
                        </select>
                        {errors.educationalService?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.educationalService?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="grade_section_cycle"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Grado/Sección/Ciclo</span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="grade_section_cycle"
                          id="grade_section_cycle"
                          {...register("grade_section_cycle")}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.grade_section_cycle
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
                          placeholder="Ej. 5to A"
                          required
                        />
                        {errors.grade_section_cycle?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.grade_section_cycle?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div>
                    <h3 className="mb-4 text-lg font-bold leading-none text-gray-900 dark:text-white text-center">
                      3. Credenciales
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Correo electrónico</span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          {...register("email")}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.email
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
                          placeholder="Ej. ejemplo@correo.com"
                        />
                        {errors.email?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.email?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Número de Celular</span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            *
                          </span>
                        </label>

                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          maxLength={9}
                          onInput={(e) => {
                            e.target.value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 9);
                          }}
                          {...register("phoneNumber")}
                          className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                            errors.phoneNumber
                              ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                              : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }`}
                          placeholder="Ej. 9########"
                        />
                        {errors.phoneNumber?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.phoneNumber?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Contraseña</span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            {...register("password")}
                            onChange={(e) => setPasswordValue(e.target.value)}
                            placeholder="••••••••"
                            className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                              errors.password
                                ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                                : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            }`}
                            required
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                          >
                            {showPassword ? (
                              <FaEyeSlash className="w-4 h-4" />
                            ) : (
                              <FaEye className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        <div className="mt-2 space-y-1 text-sm">
                          <PasswordRequirement
                            text="Mínimo 8 caracteres"
                            valid={hasMinLength}
                          />
                          <PasswordRequirement
                            text="Una letra mayúscula"
                            valid={hasUppercase}
                          />
                          <PasswordRequirement
                            text="Una letra minúscula"
                            valid={hasLowercase}
                          />
                          <PasswordRequirement
                            text="Un número"
                            valid={hasNumber}
                          />
                          <PasswordRequirement
                            text="Un carácter especial (!$@#%*)"
                            valid={hasSpecialChar}
                          />
                        </div>

                        {errors.password?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.password?.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Confirmar contraseña</span>
                          <span className="mt-2 text-sm text-red-600 dark:text-red-500 font-bold">
                            {" "}
                            *
                          </span>
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            {...register("confirmPassword")}
                            placeholder="••••••••"
                            className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder:text-gray-400 dark:text-white ${
                              errors.confirmPassword
                                ? "border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500"
                                : "bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            }`}
                            required
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
                          >
                            {showConfirmPassword ? (
                              <FaEyeSlash className="w-4 h-4" />
                            ) : (
                              <FaEye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword?.message && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.confirmPassword?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-start" bis_skin_checked="1">
                      <div
                        className="flex items-center h-5"
                        bis_skin_checked="1"
                      >
                        <input
                          required=""
                          id="termsAndConditions"
                          aria-describedby="termsAndConditions"
                          name="termsAndConditions"
                          type="checkbox"
                          {...register("termsAndConditions")}
                          className="w-4 h-4 bg-gray-50 rounded border-gray-300 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="termsAndConditions"
                          className="font-medium text-gray-900 dark:text-white"
                        >
                          Estoy de acuerdo con los
                          <a
                            className="ml-1 text-blue-700 dark:text-blue-500 hover:underline"
                            href="/terms-and-conditions/"
                            target="_blank"
                          >
                            Términos y Condiciones
                          </a>
                        </label>
                      </div>
                    </div>
                    {errors.termsAndConditions?.message && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.termsAndConditions?.message}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex justify-between mt-8 mb-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`w-2/5 md:w-1/3 inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 ${
                      currentStep === 0 ? "invisible" : "block"
                    }`}
                  >
                    ATRÁS
                  </button>
                  {currentStep == 0 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      INICIAR REGISTRO
                    </button>
                  ) : currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-2/5 md:w-1/3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center"
                    >
                      SIGUIENTE
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="w-2/5 md:w-1/3 flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                        "REGISTRAR"
                      )}
                    </button>
                  )}
                </div>
                <div
                  className="text-lg font-medium text-gray-500 dark:text-gray-400 text-center"
                  bis_skin_checked="1"
                >
                  ¿Ya tienes una cuenta?
                  <a
                    className="ml-1 text-blue-700 dark:text-blue-500 hover:underline font-bold"
                    href="/login"
                  >
                    Inicie sesión aquí
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Register;
