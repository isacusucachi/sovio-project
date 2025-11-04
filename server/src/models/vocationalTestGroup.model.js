import mongoose from "mongoose";

const VocationalTestGroupSchema = new mongoose.Schema(
  {
    institutionName: {
      type: String,
      required: true,
      trim: true,
    },
    institutionType: {
      type: String,
      required: true,
      enum: [
        "Secundaria",
        "Preuniversitario",
        "Universidad",
        "Instituto",
        "CETPRO",
        "CAR",
        "Otro",
      ],
    },
    department: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
    cycle: {
      type: String,
      required: true,
    },
    modality: {
      type: String,
      enum: ["Individual", "Grupal"],
      required: true,
    },
    ieppoTestEnabled: {
      type: Boolean,
      required: true,
    },
    phbTestEnabled: {
      type: Boolean,
      required: true,
    },
    tepeTestEnabled: {
      type: Boolean,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    maxUses: {
      type: Number,
      required: true,
    },
    useCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("VocationalTestGroup", VocationalTestGroupSchema);
