import mongoose from "mongoose";

const TepeTestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    testAnswers: {
      traits: {
        N1: {
          type: Boolean,
        },
        N2: {
          type: Boolean,
        },
        N3: {
          type: Boolean,
        },
        N4: {
          type: Boolean,
        },
        N5: {
          type: Boolean,
        },
        N6: {
          type: Boolean,
        },
        N7: {
          type: Boolean,
        },
        N8: {
          type: Boolean,
        },
        N9: {
          type: Boolean,
        },
        N10: {
          type: Boolean,
        },
        N11: {
          type: Boolean,
        },
        N12: {
          type: Boolean,
        },
        N13: {
          type: Boolean,
        },
        N14: {
          type: Boolean,
        },
        N15: {
          type: Boolean,
        },
        N16: {
          type: Boolean,
        },
        N17: {
          type: Boolean,
        },
        N18: {
          type: Boolean,
        },
        N19: {
          type: Boolean,
        },
        N20: {
          type: Boolean,
        },
        N21: {
          type: Boolean,
        },
      },
      affirmations: {
        N22: {
          type: Boolean,
        },
        N23: {
          type: Boolean,
        },
        N24: {
          type: Boolean,
        },
        N25: {
          type: Boolean,
        },
        N26: {
          type: Boolean,
        },
        N27: {
          type: Boolean,
        },
        N28: {
          type: Boolean,
        },
        N29: {
          type: Boolean,
        },
        N30: {
          type: Boolean,
        },
        N31: {
          type: Boolean,
        },
        N32: {
          type: Boolean,
        },
        N33: {
          type: Boolean,
        },
        N34: {
          type: Boolean,
        },
        N35: {
          type: Boolean,
        },
        N36: {
          type: Boolean,
        },
        N37: {
          type: Boolean,
        },
        N38: {
          type: Boolean,
        },
        N39: {
          type: Boolean,
        },
        N40: {
          type: Boolean,
        },
        N41: {
          type: Boolean,
        },
        N42: {
          type: Boolean,
        },
        N43: {
          type: Boolean,
        },
        N44: {
          type: Boolean,
        },
        N45: {
          type: Boolean,
        },
        N46: {
          type: Boolean,
        },
        N47: {
          type: Boolean,
        },
        N48: {
          type: Boolean,
        },
        N49: {
          type: Boolean,
        },
        N50: {
          type: Boolean,
        },
        N51: {
          type: Boolean,
        },
        N52: {
          type: Boolean,
        },
        N53: {
          type: Boolean,
        },
        N54: {
          type: Boolean,
        },
        N55: {
          type: Boolean,
        },
        N56: {
          type: Boolean,
        },
        N57: {
          type: Boolean,
        },
        N58: {
          type: Boolean,
        },
        N59: {
          type: Boolean,
        },
        N60: {
          type: Boolean,
        },
        N61: {
          type: Boolean,
        },
        N62: {
          type: Boolean,
        },
        N63: {
          type: Boolean,
        },
        N64: {
          type: Boolean,
        },
        N65: {
          type: Boolean,
        },
        N66: {
          type: Boolean,
        },
        N67: {
          type: Boolean,
        },
        N68: {
          type: Boolean,
        },
        N69: {
          type: Boolean,
        },
        N70: {
          type: Boolean,
        },
        N71: {
          type: Boolean,
        },
        N72: {
          type: Boolean,
        },
        N73: {
          type: Boolean,
        },
        N74: {
          type: Boolean,
        },
        N75: {
          type: Boolean,
        },
        N76: {
          type: Boolean,
        },
        N77: {
          type: Boolean,
        },
        N78: {
          type: Boolean,
        },
        N79: {
          type: Boolean,
        },
        N80: {
          type: Boolean,
        },
        N81: {
          type: Boolean,
        },
        N82: {
          type: Boolean,
        },
        N83: {
          type: Boolean,
        },
        N84: {
          type: Boolean,
        },
        N85: {
          type: Boolean,
        },
        N86: {
          type: Boolean,
        },
        N87: {
          type: Boolean,
        },
        N88: {
          type: Boolean,
        },
        N89: {
          type: Boolean,
        },
        N90: {
          type: Boolean,
        },
        N91: {
          type: Boolean,
        },
        N92: {
          type: Boolean,
        },
        N93: {
          type: Boolean,
        },
        N94: {
          type: Boolean,
        },
        N95: {
          type: Boolean,
        },
        N96: {
          type: Boolean,
        },
        N97: {
          type: Boolean,
        },
        N98: {
          type: Boolean,
        },
        N99: {
          type: Boolean,
        },
        N100: {
          type: Boolean,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("TepeTest", TepeTestSchema);
