import mongoose from "mongoose";

const PhbTestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    testAnswers: {
      attentionSkills: {
        A1: {
          type: Number,
        },
        A2: {
          type: Number,
        },
        A3: {
          type: Number,
        },
        A4: {
          type: Number,
        },
        A5: {
          type: Number,
        },
        A6: {
          type: Number,
        },
        A7: {
          type: Number,
        },
        A8: {
          type: Number,
        },
        A9: {
          type: Number,
        },
        A10: {
          type: Number,
        },
        A11: {
          type: Number,
        },
        A12: {
          type: Number,
        },
        A13: {
          type: Number,
        },
        A14: {
          type: Number,
        },
      },
      numericalSkills: {
        N1: {
          type: Number,
        },
        N2: {
          type: Number,
        },
        N3: {
          type: Number,
        },
        N4: {
          type: Number,
        },
        N5: {
          type: Number,
        },
        N6: {
          type: Number,
        },
        N7: {
          type: Number,
        },
        N8: {
          type: Number,
        },
        N9: {
          type: Number,
        },
      },
      reasoningSkills: {
        R1: {
          type: String,
        },
        R2: {
          type: String,
        },
        R3: {
          type: String,
        },
        R4: {
          type: String,
        },
        R5: {
          type: String,
        },
        R6: {
          type: String,
        },
        R7: {
          type: String,
        },
        R8: {
          type: String,
        },
        R9: {
          type: String,
        },
        R10: {
          type: String,
        },
        R11: {
          type: String,
        },
      },
      vocabularySkills: {
        V1: {
          type: String,
        },
        V2: {
          type: String,
        },
        V3: {
          type: String,
        },
        V4: {
          type: String,
        },
        V5: {
          type: String,
        },
        V6: {
          type: String,
        },
        V7: {
          type: String,
        },
        V8: {
          type: String,
        },
        V9: {
          type: String,
        },
        V10: {
          type: String,
        },
        V11: {
          type: String,
        },
        V12: {
          type: String,
        },
        V13: {
          type: String,
        },
        V14: {
          type: String,
        },
        V15: {
          type: String,
        },
        V16: {
          type: String,
        },
        V17: {
          type: String,
        },
        V18: {
          type: String,
        },
        V19: {
          type: String,
        },
        V20: {
          type: String,
        },
        V21: {
          type: String,
        },
        V22: {
          type: String,
        },
        V23: {
          type: String,
        },
        V24: {
          type: String,
        },
        V25: {
          type: String,
        },
        V26: {
          type: String,
        },
        V27: {
          type: String,
        },
        V28: {
          type: String,
        },
        V29: {
          type: String,
        },
        V30: {
          type: String,
        },
        V31: {
          type: String,
        },
        V32: {
          type: String,
        },
      },
      spatialSkills: {
        cubeCounting: {
          ES1: {
            type: Number,
          },
          ES2: {
            type: Number,
          },
          ES3: {
            type: Number,
          },
          ES4: {
            type: Number,
          },
          ES5: {
            type: Number,
          },
          ES6: {
            type: Number,
          },
          ES7: {
            type: Number,
          },
          ES8: {
            type: Number,
          },
          ES9: {
            type: Number,
          },
        },
        foldedPaper: {
          ES10: {
            type: String,
          },
          ES11: {
            type: String,
          },
          ES12: {
            type: String,
          },
          ES13: {
            type: String,
          },
        },
        assemblySolidForms: {
          ES14: {
            type: String,
          },
          ES15: {
            type: String,
          },
          ES16: {
            type: String,
          },
          ES17: {
            type: String,
          },
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PhbTest", PhbTestSchema);
