import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  typeOfIdentityDocument: {
    type: String,
    required: true,
    enum: ["DNI", "CE", "PTP"],
  },
  identityDocumentNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  names: {
    type: String,
    required: true,
    trim: true,
  },
  surnames: {
    type: String,
    required: true,
    trim: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["masculino", "femenino"],
  },
  height: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  termsAndConditions: {
    type: Boolean,
    required: true,
  },
  educationalService: {
    type: mongoose.Types.ObjectId,
    ref: "EducationalService",
    required: true,
  },
  grade_section_cycle: {
    type: String,
    required: true,
  },
  personalInformation: {
    type: mongoose.Types.ObjectId,
    ref: "PersonalInformation",
  },
  completedUserInformation: {
    type: Boolean,
    required: true,
    default: false,
  },
  completedIeppoTest: {
    type: Boolean,
    required: true,
    default: false,
  },
  completedPhbTest: {
    type: Boolean,
    required: true,
    default: false,
  },
  completedTepeTest: {
    type: Boolean,
    required: true,
    default: false,
  },
  completedAssessmentSurvey: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model("User", UserSchema);
