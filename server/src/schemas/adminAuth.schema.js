import { z } from "zod";

export const adminLoginSchema = z.object({
  username: z
    .string({
      required_error: "El nombre de usuario es requerido",
    })
    .nonempty("El nombre de usuario no puede estar vacío"),
  password: z
    .string({
      required_error: "La contraseña es requerida.",
    })
    .min(8, {
      message: "La contraseña debe tener 8 caracteres como mínimo",
    }),
});
