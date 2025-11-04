import { z } from "zod";

export const assessmentSurveySchema = z.object({
  navigationDifficulty: z.string({
    required_error: "Calificación de la dificultad de navegación es requerido",
  }),
  appereanceRating: z.string({
    required_error: "Calificación de la apariencia o aspecto es requerido",
  }),
  satisfactionRating: z.string({
    required_error: "Calificación de la satisfacción es requerida",
  }),
  recommendationToOthers: z.string({
    required_error: "Calificación de la recomendación a otros es requerida",
  }),
  comments: z.string({
    required_error: "Los comentarios son requeridos",
  }),
  rating: z.number({
    required_error: "La calificación es requerida",
  }),
});
