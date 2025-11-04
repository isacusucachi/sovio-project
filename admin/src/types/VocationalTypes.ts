export interface VocationalTestReport {
  _id: string;
  dni: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  educationalService: string;
  grade_section_cycle: string;
  evaluationDate: string;
  completedUserInformation: boolean;
  completedIeppoTest: boolean;
  completedPhbTest: boolean;
  completedTepeTest: boolean;
}

export interface FinalReport {
  _id: string;
  D_DPTO: string;
  D_PROV: string;
  D_DIST: string;
  CEN_EDU: string;
  grade_section_cycle: string;
  evaluationDate: string;
  dni: string;
  fullname: string;
  age: string;
  gender: string;
  vocationalTypes: string;
  careersOption: string;
}

export type VocationalTypeKey =
  | "leaderShip"
  | "mechanicalTechnician"
  | "social"
  | "organized"
  | "artistic"
  | "entrepreneur"
  | "investigative";

export type CarrerasPorTiposVocacionales = {
  [key in VocationalTypeKey]: string[];
};

export interface EvaluateVocationalTestData {
  observations: string;
  vocationalTypes1: string;
  vocationalTypes2: string;
  careersOption1: string;
  careersOption2: string;
}
