import { z } from "zod";
export const adminUserSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres."),
  fullname: z
    .string()
    .min(3, "El nombre completo debe tener al menos 3 caracteres."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
  status: z
    .union([z.boolean(), z.string().transform((val) => val === "true")])
    .default(false),
});

export const updateAdminUserSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres.")
    .optional(),
  fullname: z
    .string()
    .min(3, "El nombre completo debe tener al menos 3 caracteres.")
    .optional(),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .optional(),
  status: z
    .union([z.boolean(), z.string().transform((val) => val === "true")])
    .optional(),
});
