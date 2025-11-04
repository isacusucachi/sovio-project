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
    .min(3, "El identificador debe tener al menos 3 caracteres")
    .refine(
      (value) =>
        /^[0-9]{6,9}$/.test(value) || // Validar documentos (DNI, CE, PTP)
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value), // Validar correo electrónico
      {
        message:
          "El identificador debe ser un correo electrónico válido o un documento numérico válido",
      }
    ),
  password: z.string().refine((password) => password.trim() !== "", {
    message: "Su contraseña es requerida.",
  }),
});

export const registerSchema = z
  .object({
    typeOfIdentityDocument: z.enum(["DNI", "PTP", "CE"], {
      errorMap: () => ({
        message: "El tipo de documento debe ser DNI, PTP o CE",
      }),
    }),
    identityDocumentNumber: z
      .string()
      .min(6, "El Número de documento debe tener entre 6 y 9 dígitos.")
      .max(9, "El Número de documento debe tener entre 6 y 9 dígitos."),
    nationality: z.string({
      required_error: "La nacionalidad es requerida",
    }),
    names: z.string({
      required_error: "Los nombres son requeridos",
    }),
    surnames: z.string({
      required_error: "Los apellidos son requeridos",
    }),
    birthdate: z.string().refine((value) => {
      const date = new Date(value);
      const age = calculateAge(date);
      return age >= MIN_AGE && age <= MAX_AGE;
    }, `Debes tener entre ${MIN_AGE} y ${MAX_AGE} años.`),
    gender: z.string({
      required_error: "El género es requerido.",
    }),
    height: z.string(),
    educationalService: z.string(),
    grade_section_cycle: z.string({
      required_error: "El grado/sección/ciclo es requerido",
    }),
    email: z
      .string()
      .refine((value) => value === "" || /\S+@\S+\.\S+\S+/.test(value), {
        message: "Correo electrónico no válido",
      }),
    phoneNumber: z
      .string()
      .refine(
        (value) => value === "" || (/^\d{9}$/.test(value) && value[0] === "9"),
        {
          message: "Número de celular no válido",
        }
      )
      .optional(),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .regex(
        /[a-z]/,
        "La contraseña debe contener al menos una letra minúscula"
      )
      .regex(/[0-9]/, "La contraseña debe contener al menos un número")
      .regex(
        /[@$!%*?&#]/,
        "La contraseña debe contener al menos un carácter especial"
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "Por favor, confirma tu contraseña." }),
    termsAndConditions: z.boolean({
      required_error: "Los terminos y condiciones son requeridos",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });
