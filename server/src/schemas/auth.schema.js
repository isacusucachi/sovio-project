import { z } from "zod";
import { ObjectId } from "mongodb";

export const registerSchema = z.object({
  typeOfIdentityDocument: z.enum(["DNI", "PTP", "CE"], {
    errorMap: () => ({
      message: "El tipo de documento debe ser DNI, PTP o CE",
    }),
  }),
  identityDocumentNumber: z
    .string({
      required_error: "El numero de documento es requerido.",
    })
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
  birthdate: z.string({
    required_error: "La fecha de nacimiento es requerido.",
  }),
  gender: z.string({
    required_error: "El género es requerido.",
  }),
  email: z
    .string({
      required_error: "El correo electrónico es requerido.",
    })
    .refine((value) => value === "" || /\S+@\S+\.\S+\S+/.test(value), {
      message: "Correo electrónico no válido",
    }),
  phoneNumber: z
    .string({
      required_error: "El teléfono es requerido.",
    })
    .refine(
      (value) => value === "" || (/^\d{9}$/.test(value) && value[0] === "9"),
      {
        message: "Número de celular no válido",
      }
    )
    .optional(),
  password: z
    .string({
      required_error: "La contraseña es requerida.",
    })
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    .regex(
      /[@$!%*?&#]/,
      "La contraseña debe contener al menos un carácter especial"
    ),
  educationalService: z
    .string({
      required_error: "El servicio educativo es requerido",
    })
    .refine((val) => ObjectId.isValid(val), {
      message: "Servicio educativo no válido",
    }),
  grade_section_cycle: z.string({
    required_error: "El grado/sección/ciclo es requerido",
  }),
  termsAndConditions: z.boolean({
    required_error: "Los terminos y condiciones son requeridos",
  }),
});

export const loginSchema = z.object({
  identifier: z
    .string({
      required_error: "Número de documento o correo es requerido.",
    })
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
  password: z.string({
    required_error: "La contraseña es requerida.",
  }),
});

export const emailSchema = z.object({
  email: z.string().email({
    required_error: "El correo electrónico debe tener un formato válido",
  }),
});
