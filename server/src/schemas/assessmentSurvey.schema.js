import { z } from "zod";

export const assessmentSurveySchema = z.object({

  navigationDifficulty: z.enum([
    "Muy sencilla",
    "Relativamente sencilla",
    "Normal",
    "Algo compleja",
    "Muy compleja",
  ]),

  appereanceRating: z.enum([
    "Muy bueno",
    "Normal",
    "Peor que la media",
    "No me gusta nada",
  ]),

  satisfactionRating: z.enum([
    "Muy satisfecho/a",
    "Satisfecho/a",
    "Medianamente satisfecho/a",
    "Insatisfecho/a",
    "Muy insatisfecho/a",
  ]),

  recommendationToOthers: z.enum([
    "Sí, definitivamente",
    "Probablemente sí",
    "No lo sé",
    "Probablemente no",
    "No, para nada",
  ]),

  comments: z.string().optional(),

  rating: z
    .number({
      required_error: "La calificación es obligatoria",
      invalid_type_error: "La calificación debe ser un número",
    })
});
