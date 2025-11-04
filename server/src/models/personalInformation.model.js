import mongoose from "mongoose";

const PersonalInformationSchema = new mongoose.Schema({
  disability: {
    type: Boolean,
    required: true,
  },
  typeOfDisability: {
    type: String,
  },
  practiceSport: {
    type: Boolean,
    required: true,
  },
  sport: {
    type: String,
  },
  amountSportPractice: {
    type: String,
  },
  academicLevel: {
    type: String,
    required: true,
  },
  cycle: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
  },
  institutionName: {
    type: String,
    required: true,
  },
  typeOfInstitution: {
    type: String,
    required: true,
  },
  masteredCoursesList: {
    languageOrCommunication: {
      type: String,
      required: true,
    },
    foreignLanguage: {
      type: String,
      required: true,
    },
    math: {
      type: String,
      required: true,
    },
    scienceTechnologyEnvironmentOrBiology: {
      type: String,
      required: true,
    },
    personFamilyHumanRelationships: {
      type: String,
      required: true,
    },
    socialSciences: {
      type: String,
      required: true,
    },
    physicalEducation: {
      type: String,
      required: true,
    },
    Art: {
      type: String,
      required: true,
    },
    educationForWork: {
      type: String,
      required: true,
    },
  },
  likedCoursesList: {
    languageOrCommunication: {
      type: String,
      required: true,
    },
    foreignLanguage: {
      type: String,
      required: true,
    },
    math: {
      type: String,
      required: true,
    },
    scienceTechnologyEnvironmentOrBiology: {
      type: String,
      required: true,
    },
    personFamilyHumanRelationships: {
      type: String,
      required: true,
    },
    socialSciences: {
      type: String,
      required: true,
    },
    physicalEducation: {
      type: String,
      required: true,
    },
    Art: {
      type: String,
      required: true,
    },
    educationForWork: {
      type: String,
      required: true,
    },
  },
  playInstrument: {
    type: Boolean,
    required: true,
  },
  readPentagram: {
    type: Boolean,
    required: true,
  },
  composeSongs: {
    type: Boolean,
    required: true,
  },
  doTheater: {
    type: Boolean,
    required: true,
  },
  paintPictures: {
    type: Boolean,
    required: true,
  },
  doDance: {
    type: Boolean,
    required: true,
  },
  didMilitaryService: {
    type: Boolean,
    required: true,
  },
  otherSkills: {
    type: String,
  },
  futureCareer: {
    type: Boolean,
    required: true,
  },
  career1: {
    type: String,
  },
  career2: {
    type: String,
  },
  career3: {
    type: String,
  },
  levelOfStudiesCanBeFinanced: {
    type: String,
    required: true,
  },
  typeOfInstitutionCanBeFinanced: {
    type: String,
    required: true,
  },
  ocupationNeverWork: {
    type: String,
  },
});

export default mongoose.model("PersonalInformation", PersonalInformationSchema);
