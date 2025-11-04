import mongoose from "mongoose";

const FinalTestReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    evaluationDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    ieppoTestResult: {
      leaderShip: {
        personalStylesScore: {
          type: Number,
        },
        preferredActivitiesScore: {
          type: Number,
        },
        perceptionOfAbilityScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        finalBaremosValue: {
          type: Number,
        },
        correspondenceLevel: {
          type: String,
          enum: ["ALTO", "MEDIO", "BAJO"],
        },
      },
      mechanicalTechnician: {
        personalStylesScore: {
          type: Number,
        },
        preferredActivitiesScore: {
          type: Number,
        },
        perceptionOfAbilityScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        finalBaremosValue: {
          type: Number,
        },
        correspondenceLevel: {
          type: String,
          enum: ["ALTO", "MEDIO", "BAJO"],
        },
      },
      social: {
        personalStylesScore: {
          type: Number,
        },
        preferredActivitiesScore: {
          type: Number,
        },
        perceptionOfAbilityScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        finalBaremosValue: {
          type: Number,
        },
        correspondenceLevel: {
          type: String,
          enum: ["ALTO", "MEDIO", "BAJO"],
        },
      },
      organized: {
        personalStylesScore: {
          type: Number,
        },
        preferredActivitiesScore: {
          type: Number,
        },
        perceptionOfAbilityScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        finalBaremosValue: {
          type: Number,
        },
        correspondenceLevel: {
          type: String,
          enum: ["ALTO", "MEDIO", "BAJO"],
        },
      },
      artistic: {
        personalStylesScore: {
          type: Number,
        },
        preferredActivitiesScore: {
          type: Number,
        },
        perceptionOfAbilityScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        finalBaremosValue: {
          type: Number,
        },
        correspondenceLevel: {
          type: String,
          enum: ["ALTO", "MEDIO", "BAJO"],
        },
      },
      entrepreneur: {
        personalStylesScore: {
          type: Number,
        },
        preferredActivitiesScore: {
          type: Number,
        },
        perceptionOfAbilityScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        finalBaremosValue: {
          type: Number,
        },
        correspondenceLevel: {
          type: String,
          enum: ["ALTO", "MEDIO", "BAJO"],
        },
      },
      investigative: {
        preferredActivitiesScore: {
          type: Number,
        },
        perceptionOfAbilityScore: {
          type: Number,
        },
        totalScore: {
          type: Number,
        },
        finalBaremosValue: {
          type: Number,
        },
        correspondenceLevel: {
          type: String,
          enum: ["ALTO", "MEDIO", "BAJO"],
        },
      },
    },
    phbTestResult: {
      attentionSkills: {
        directScore: {
          type: Number,
        },
        baremosScore: {
          type: Number,
        },
        skillLevel: {
          type: String,
          enum: ["ALTO", "MEDIO", "BAJO"],
        },
      },
      numericalSkills: {
        directScore: {
          type: Number,
        },
        baremosScore: {
          type: Number,
        },
        skillLevel: {
          type: String,
          enum: ["ALTO", "MEDIO", "BAJO"],
        },
      },
      reasoningSkills: {
        directScore: {
          type: Number,
        },
        baremosScore: {
          type: Number,
        },
        skillLevel: {
          type: String,
          enum: ["ALTO", "MEDIO", "BAJO"],
        },
      },
      vocabularySkills: {
        directScore: {
          type: Number,
        },
        baremosScore: {
          type: Number,
        },
        skillLevel: {
          type: String,
          enum: ["ALTO", "MEDIO", "BAJO"],
        },
      },
      spatialSkills: {
        cubeCountingDirectScore: {
          type: Number,
        },
        foldedPaperDirectScore: {
          type: Number,
        },
        assemblySolidFormsDirectScore: {
          type: Number,
        },
        directScore: {
          type: Number,
        },
        baremosScore: {
          type: Number,
        },
        skillLevel: {
          type: String,
          enum: ["ALTO", "MEDIO", "BAJO"],
        },
      },
    },
    tepeTestResult: {
      totalScore: {
        type: Number,
      },
      result: {
        type: String,
        enum: [
          "POTENCIAL EMPRESARIAL MUY ELEVADO",
          "POTENCIAL EMPRESARIAL ELEVADO",
          "POTENCIAL EMPRESARIAL POR DESARROLLAR - POTENCIAL EMPRESARIAL RELATIVO",
          "POTENCIAL EMPRESARIAL POR DESARROLLAR - POTENCIAL EMPRESARIAL BAJO",
        ],
      },
    },
    evaluated: {
      type: Boolean,
      required: true,
      default: false,
    },
    observations: {
      type: String,
    },
    evaluator: {
      type: mongoose.Types.ObjectId,
      ref: "AdminUser",
    },
    vocationalTypes: {
      vocationalTypes1: { type: String },
      vocationalTypes2: { type: String },
    },
    careersOption: {
      careersOption1: { type: String },
      careersOption2: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("FinalTestReport", FinalTestReportSchema);
