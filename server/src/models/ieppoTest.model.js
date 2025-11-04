import mongoose from "mongoose";

const IeppoTestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    testAnswers: {
      personalStyles: {
        E1: {
          type: Boolean,
        },
        E2: {
          type: Boolean,
        },
        E3: {
          type: Boolean,
        },
        E4: {
          type: Boolean,
        },
        E5: {
          type: Boolean,
        },
        E6: {
          type: Boolean,
        },
        E7: {
          type: Boolean,
        },
        E8: {
          type: Boolean,
        },
        E9: {
          type: Boolean,
        },
        E10: {
          type: Boolean,
        },
        E11: {
          type: Boolean,
        },
        E12: {
          type: Boolean,
        },
        E13: {
          type: Boolean,
        },
        E14: {
          type: Boolean,
        },
        E15: {
          type: Boolean,
        },
        E16: {
          type: Boolean,
        },
        E17: {
          type: Boolean,
        },
        E18: {
          type: Boolean,
        },
        E19: {
          type: Boolean,
        },
        E20: {
          type: Boolean,
        },
        E21: {
          type: Boolean,
        },
        E22: {
          type: Boolean,
        },
        E23: {
          type: Boolean,
        },
        E24: {
          type: Boolean,
        },
        E25: {
          type: Boolean,
        },
        E26: {
          type: Boolean,
        },
        E27: {
          type: Boolean,
        },
        E28: {
          type: Boolean,
        },
        E29: {
          type: Boolean,
        },
        E30: {
          type: Boolean,
        },
        E31: {
          type: Boolean,
        },
        E32: {
          type: Boolean,
        },
        E33: {
          type: Boolean,
        },
      },
      preferredActivities: {
        P1: {
          type: Boolean,
        },
        P2: {
          type: Boolean,
        },
        P3: {
          type: Boolean,
        },
        P4: {
          type: Boolean,
        },
        P5: {
          type: Boolean,
        },
        P6: {
          type: Boolean,
        },
        P7: {
          type: Boolean,
        },
        P8: {
          type: Boolean,
        },
        P9: {
          type: Boolean,
        },
        P10: {
          type: Boolean,
        },
        P11: {
          type: Boolean,
        },
        P12: {
          type: Boolean,
        },
        P13: {
          type: Boolean,
        },
        P14: {
          type: Boolean,
        },
        P15: {
          type: Boolean,
        },
        P16: {
          type: Boolean,
        },
        P17: {
          type: Boolean,
        },
        P18: {
          type: Boolean,
        },
        P19: {
          type: Boolean,
        },
        P20: {
          type: Boolean,
        },
        P21: {
          type: Boolean,
        },
        P22: {
          type: Boolean,
        },
        P23: {
          type: Boolean,
        },
        P24: {
          type: Boolean,
        },
        P25: {
          type: Boolean,
        },
        P26: {
          type: Boolean,
        },
        P27: {
          type: Boolean,
        },
        P28: {
          type: Boolean,
        },
        P29: {
          type: Boolean,
        },
        P30: {
          type: Boolean,
        },
        P31: {
          type: Boolean,
        },
        P32: {
          type: Boolean,
        },
        P33: {
          type: Boolean,
        },
        P34: {
          type: Boolean,
        },
        P35: {
          type: Boolean,
        },
        P36: {
          type: Boolean,
        },
        P37: {
          type: Boolean,
        },
        P38: {
          type: Boolean,
        },
        P39: {
          type: Boolean,
        },
        P40: {
          type: Boolean,
        },
        P41: {
          type: Boolean,
        },
        P42: {
          type: Boolean,
        },
        P43: {
          type: Boolean,
        },
        P44: {
          type: Boolean,
        },
        P45: {
          type: Boolean,
        },
        P46: {
          type: Boolean,
        },
        P47: {
          type: Boolean,
        },
      },
      perceptionOfAbility: {
        H1: {
          type: Boolean,
        },
        H2: {
          type: Boolean,
        },
        H3: {
          type: Boolean,
        },
        H4: {
          type: Boolean,
        },
        H5: {
          type: Boolean,
        },
        H6: {
          type: Boolean,
        },
        H7: {
          type: Boolean,
        },
        H8: {
          type: Boolean,
        },
        H9: {
          type: Boolean,
        },
        H10: {
          type: Boolean,
        },
        H11: {
          type: Boolean,
        },
        H12: {
          type: Boolean,
        },
        H13: {
          type: Boolean,
        },
        H14: {
          type: Boolean,
        },
        H15: {
          type: Boolean,
        },
        H16: {
          type: Boolean,
        },
        H17: {
          type: Boolean,
        },
        H18: {
          type: Boolean,
        },
        H19: {
          type: Boolean,
        },
        H20: {
          type: Boolean,
        },
        H21: {
          type: Boolean,
        },
        H22: {
          type: Boolean,
        },
        H23: {
          type: Boolean,
        },
        H24: {
          type: Boolean,
        },
        H25: {
          type: Boolean,
        },
        H26: {
          type: Boolean,
        },
        H27: {
          type: Boolean,
        },
        H28: {
          type: Boolean,
        },
        H29: {
          type: Boolean,
        },
        H30: {
          type: Boolean,
        },
        H31: {
          type: Boolean,
        },
        H32: {
          type: Boolean,
        },
        H33: {
          type: Boolean,
        },
        H34: {
          type: Boolean,
        },
        H35: {
          type: Boolean,
        },
        H36: {
          type: Boolean,
        },
        H37: {
          type: Boolean,
        },
        H38: {
          type: Boolean,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("IeppoTest", IeppoTestSchema);
