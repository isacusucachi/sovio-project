import { z } from "zod";

// Configuración: Edad mínima y máxima
const MIN_AGE = 13;
const MAX_AGE = 24;

// Función para calcular la edad a partir de una fecha
const calculateAge = (birthDate) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "N° de documento o correo electrónico es requerido")
    .refine(
      (value) =>
        /^[0-9]{6,9}$/.test(value) || // Validar documentos (DNI, CE, PTP)
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), // Validar correo electrónico
      {
        message: "N° de documento o correo electrónico inválido",
      }
    ),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const registerSchema = z
  .object({
    // Paso 1: Información Personal
    typeOfIdentityDocument: z.enum(["DNI", "PTP", "CE"], {
      errorMap: () => ({
        message: "El tipo de documento debe ser DNI, PTP o CE",
      }),
    }),
    identityDocumentNumber: z
      .string()
      .min(6, "El número de documento debe tener entre 6 y 9 dígitos")
      .max(9, "El número de documento debe tener entre 6 y 9 dígitos")
      .regex(/^\d+$/, "El número de documento solo puede contener números"),
    nationality: z.string().min(1, "La nacionalidad es requerida"),
    names: z
      .string()
      .min(1, "Los nombres son requeridos")
      .max(100, "Los nombres no pueden exceder 100 caracteres"),
    surnames: z
      .string()
      .min(1, "Los apellidos son requeridos")
      .max(100, "Los apellidos no pueden exceder 100 caracteres"),
    birthdate: z
      .string()
      .min(1, "La fecha de nacimiento es requerida")
      .refine(
        (value) => {
          const date = new Date(value);
          const age = calculateAge(date);
          return age >= MIN_AGE && age <= MAX_AGE;
        },
        {
          message: `Debes tener entre ${MIN_AGE} y ${MAX_AGE} años`,
        }
      ),
    gender: z.string().min(1, "El género es requerido"),
    height: z
      .string()
      .optional()
      .refine(
        (value) => {
          // Si está vacío, es válido (campo opcional)
          if (!value || value.trim() === "") return true;

          // Solo permite números y punto decimal
          const regex = /^\d+(\.\d+)?$/;
          if (!regex.test(value)) return false;

          // Convierte a número
          const heightNum = parseFloat(value);

          // Valida rango en centímetros (ej: 140-220 cm)
          return heightNum <= 250;
        },
        {
          message:
            "La estatura debe ser un número menor o igual a 250 cm (ej: 165 o 165.5)",
        }
      )
      .transform((value) => {
        // Si está vacío, retorna string vacío
        if (!value || value.trim() === "") return "";
        // Retorna el valor limpio
        return value.trim();
      }),

    // Paso 2: Institución Educativa
    department: z.string().min(1, "El departamento es requerido"),
    province: z.string().min(1, "La provincia es requerida"),
    district: z.string().min(1, "El distrito es requerido"),
    educationalService: z
      .string()
      .min(1, "La institución educativa es requerida"),
    grade_section_cycle: z
      .string()
      .min(1, "El grado/sección/ciclo es requerido")
      .max(50, "El grado/sección/ciclo no puede exceder 50 caracteres"),

    // Paso 3: Credenciales
    email: z
      .string()
      .min(1, "El correo electrónico es requerido")
      .email("Correo electrónico no válido")
      .toLowerCase(),
    phoneNumber: z
      .string()
      .min(1, "El número de celular es requerido")
      .refine((value) => value.startsWith("9"), {
        message: "Número de celular inválido: debe iniciar con 9",
      })
      .refine((value) => value.length === 9, {
        message: "Número de celular inválido: debe tener 9 dígitos",
      }),

    password: z
      .string()
      .min(8, "Contraseña no válida. Verifica los requisitos")
      .regex(/[A-Z]/, "Contraseña no válida. Verifica los requisitos")
      .regex(/[a-z]/, "Contraseña no válida. Verifica los requisitos")
      .regex(/[0-9]/, "Contraseña no válida. Verifica los requisitos")
      .regex(
        /[^A-Za-z0-9]/,
        "Contraseña no válida. Verifica los requisitos"
      ),
    confirmPassword: z.string().min(1, "Por favor, confirma tu contraseña"),
    termsAndConditions: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos y condiciones",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
