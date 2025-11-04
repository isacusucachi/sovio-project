import mongoose from "mongoose";

const assessmentSurveySchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  navigationDifficulty: {
    type: String,
    required: true,
    enum: [
      "Muy sencilla",
      "Relativamente sencilla",
      "Normal",
      "Algo compleja",
      "Muy compleja",
    ],
  },
  appereanceRating: {
    type: String,
    required: true,
    enum: ["Muy bueno", "Normal", "Peor que la media", "No me gusta nada"],
  },
  satisfactionRating: {
    type: String,
    required: true,
    enum: [
      "Muy satisfecho/a",
      "Satisfecho/a",
      "Medianamente satisfecho/a",
      "Insatisfecho/a",
      "Muy insatisfecho/a",
    ],
  },
  recommendationToOthers: {
    type: String,
    required: true,
    enum: [
      "Sí, definitivamente",
      "Probablemente sí",
      "No lo sé",
      "Probablemente no",
      "No, para nada",
    ],
  },
  comments: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("AssessmentSurvey", assessmentSurveySchema);
