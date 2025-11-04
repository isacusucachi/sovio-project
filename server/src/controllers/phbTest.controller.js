import PhbTest from "../models/phbTest.model.js";
import FinalTestReport from "../models/finalTestReport.model.js";
import User from "../models/user.model.js";

export const createUpdatePhbTest = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    const { testAnswers } = req.body;

    if (userFound.completedPhbTest)
      return res.status(403).json({ message: ["Ya completaste el test PHB"] });

    const phbTestFound = await PhbTest.findOne({ userId: req.user.id });

    let phbTest;
    if (phbTestFound) {
      phbTest = await PhbTest.findByIdAndUpdate(
        phbTestFound._id,
        { $set: { testAnswers } },
        { new: true }
      );

      return res.status(200).json(phbTest);
    } else {
      phbTest = new PhbTest({ userId: req.user.id, testAnswers });
      await phbTest.save();

      res.status(201).json(phbTest);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const finishPhbTest = async (req, res) => {
  const { testAnswers } = req.body;
  const userFound = await User.findById(req.user.id);

  if (userFound.completedPhbTest)
    return res.status(403).json({ message: ["Ya completaste el test PHB"] });

  const phbTestFound = await PhbTest.findOne({ userId: userFound._id });

  let phbTest;
  if (phbTestFound) {
    phbTest = await PhbTest.findByIdAndUpdate(
      phbTestFound._id,
      { $set: { testAnswers } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { completedPhbTest: true },
      { new: true }
    );
    return res.status(200).json(phbTest);
  } else {
    phbTest = new PhbTest({ userId: req.user.id, testAnswers });
    await phbTest.save();
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { completedPhbTest: true },
      { new: true }
    );
    res.status(201).json(phbTest);
  }
};

export const getPhbTest = async (req, res) => {
  try {
    const phbTest = await PhbTest.findOne({
      userId: req.user.id,
    });
    res.status(200).json(phbTest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPhbTests = async (req, res) => {
  try {
    const PhbTestFound = await PhbTest.find({ userId: req.user.id }).populate(
      "userId"
    );
    res.status(200).json(PhbTestFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generatePhbTestResult = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound.completedPhbTest)
    return res.status(403).json({ message: ["No completaste el test PHB"] });

  const phbTest = await PhbTest.findOne({ userId: req.user.id });

  const validAttentionResponse = {
    A1: 3,
    A2: 3,
    A3: 3,
    A4: 3,
    A5: 3,
    A6: 3,
    A7: 3,
    A8: 3,
    A9: 3,
    A10: 5,
    A11: 3,
    A12: 3,
    A13: 6,
    A14: 5,
  };
  // Check attention basicSkills results with correct
  const directScoreAttentionSkills = Object.keys(validAttentionResponse)
    .map((questionKey) => {
      const answer = phbTest.testAnswers.attentionSkills[questionKey];
      return validAttentionResponse[questionKey] === answer ? 1 : 0;
    })
    .reduce((total, value) => total + value, 0);

  // Atttention skills scales
  const baremosAttentionSkillsValues = [
    19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 57, 60,
  ];

  const baremosAttentionSkills =
    baremosAttentionSkillsValues[directScoreAttentionSkills];

  const skillLevelAttentionSkills =
    baremosAttentionSkills <= 40
      ? "BAJO"
      : baremosAttentionSkills < 60
      ? "MEDIO"
      : "ALTO";

  // numerical BasicSkillsTest valid results
  const validNumericalResponse = {
    N1: 20,
    N2: 168,
    N3: 40,
    N4: 375,
    N5: 18,
    N6: 10,
    N7: 3,
    N8: 85,
    N9: 60,
  };

  // Check numerical basicSkills results with correct
  const directScoreNumericalSkills = Object.keys(validNumericalResponse)
    .map((questionKey) => {
      const answer = phbTest.testAnswers.numericalSkills[questionKey];
      return validNumericalResponse[questionKey] === answer ? 1 : 0;
    })
    .reduce((total, value) => total + value, 0);
  // Numerical skills scales
  const baremosNumericalSkillsValues = [34, 38, 43, 47, 51, 55, 59, 63, 67, 71];

  const baremosNumericalSkills =
    baremosNumericalSkillsValues[directScoreNumericalSkills];

  const skillLevelNumericalSkills =
    baremosNumericalSkills <= 40
      ? "BAJO"
      : baremosNumericalSkills < 60
      ? "MEDIO"
      : "ALTO";

  // Reasoning BasicSkillsTest valid results
  const validReasoningResponse = {
    R1: "D",
    R2: "D",
    R3: "C",
    R4: "B",
    R5: "C",
    R6: "E",
    R7: "D",
    R8: "B",
    R9: "B",
    R10: "D",
    R11: "A",
  };

  // Check Reasoning basicSkills results with correct
  const directScoreReasoningSkills = Object.keys(validReasoningResponse)
    .map((questionKey) => {
      const answer = phbTest.testAnswers.reasoningSkills[questionKey];
      return validReasoningResponse[questionKey] === answer ? 1 : 0;
    })
    .reduce((total, value) => total + value, 0);
  // Reasoning skills scales
  const baremosReasoningSkillsValues = [
    2, 7, 13, 19, 24, 30, 36, 41, 47, 53, 58, 64,
  ];

  const baremosReasoningSkills =
    baremosReasoningSkillsValues[directScoreReasoningSkills];

  const skillLevelReasoningSkills =
    baremosReasoningSkills <= 40
      ? "BAJO"
      : baremosReasoningSkills < 60
      ? "MEDIO"
      : "ALTO";

  // Vocabulary BasicSkillsTest valid results
  const validVocabularyResponse = {
    V1: "C",
    V2: "C",
    V3: "A",
    V4: "B",
    V5: "C",
    V6: "C",
    V7: "C",
    V8: "D",
    V9: "C",
    V10: "A",
    V11: "D",
    V12: "D",
    V13: "B",
    V14: "A",
    V15: "B",
    V16: "B",
    V17: "C",
    V18: "A",
    V19: "D",
    V20: "A",
    V21: "B",
    V22: "C",
    V23: "A",
    V24: "B",
    V25: "B",
    V26: "B",
    V27: "C",
    V28: "B",
    V29: "B",
    V30: "C",
    V31: "C",
    V32: "D",
  };

  // Check Vocabulary basicSkills results with correct
  const directScoreVocabularySkills = Object.keys(validVocabularyResponse)
    .map((questionKey) => {
      const answer = phbTest.testAnswers.vocabularySkills[questionKey];
      return validVocabularyResponse[questionKey] === answer ? 1 : 0;
    })
    .reduce((total, value) => total + value, 0);
  // Vocabulary skills scales
  const baremosVocabularySkillsValues = [
    13, 15, 16, 18, 20, 21, 23, 25, 26, 28, 30, 31, 33, 35, 37, 38, 40, 42, 43,
    45, 47, 48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67,
  ];

  const baremosVocabularySkills =
    baremosVocabularySkillsValues[directScoreVocabularySkills];

  const skillLevelVocabularySkills =
    baremosVocabularySkills <= 40
      ? "BAJO"
      : baremosVocabularySkills < 60
      ? "MEDIO"
      : "ALTO";

  // Spatial BasicSkillsTest valid results
  const validSpatialResponse = {
    ES1: 15,
    ES2: 18,
    ES3: 12,
    ES4: 15,
    ES5: 27,
    ES6: 22,
    ES7: 40,
    ES8: 19,
    ES9: 20,
    ES10: "A",
    ES11: "B",
    ES12: "D",
    ES13: "D",
    ES14: "D",
    ES15: "A",
    ES16: "C",
    ES17: "C",
  };

  // Check CubeCounting Spatial basicSkills results with correct
  const directScoreCubeCountingSpatialSkills = Object.keys(validSpatialResponse)
    .map((questionKey) => {
      const answer =
        phbTest.testAnswers.spatialSkills.cubeCounting[questionKey];
      return validSpatialResponse[questionKey] === answer ? 1 : 0;
    })
    .reduce((total, value) => total + value, 0);

  // Check FoldedPaper Spatial basicSkills results with correct
  const directScoreFoldedPaperSpatialSkills = Object.keys(validSpatialResponse)
    .map((questionKey) => {
      const answer = phbTest.testAnswers.spatialSkills.foldedPaper[questionKey];
      return validSpatialResponse[questionKey] === answer ? 1 : 0;
    })
    .reduce((total, value) => total + value, 0);

  // Check Assembly Solid Forms Spatial basicSkills results with correct
  const directScoreAssemblySolidFormsSpatialSkills = Object.keys(
    validSpatialResponse
  )
    .map((questionKey) => {
      const answer =
        phbTest.testAnswers.spatialSkills.assemblySolidForms[questionKey];
      return validSpatialResponse[questionKey] === answer ? 1 : 0;
    })
    .reduce((total, value) => total + value, 0);

  const directScoreSpatialSkills =
    directScoreCubeCountingSpatialSkills +
    directScoreFoldedPaperSpatialSkills +
    directScoreAssemblySolidFormsSpatialSkills;

  // Spatial skills scales
  const baremosSpatialSkillsValues = [
    30, 33, 35, 37, 40, 42, 44, 47, 49, 51, 54, 56, 58, 61, 63, 67, 68, 70,
  ];

  const baremosSpatialSkills =
    baremosSpatialSkillsValues[directScoreSpatialSkills];

  const skillLevelSpatialSkills =
    baremosSpatialSkills <= 40
      ? "BAJO"
      : baremosSpatialSkills < 60
      ? "MEDIO"
      : "ALTO";

  const phbTestResult = {
    attentionSkills: {
      directScore: directScoreAttentionSkills,
      baremosScore: baremosAttentionSkills,
      skillLevel: skillLevelAttentionSkills,
    },
    numericalSkills: {
      directScore: directScoreNumericalSkills,
      baremosScore: baremosNumericalSkills,
      skillLevel: skillLevelNumericalSkills,
    },
    reasoningSkills: {
      directScore: directScoreReasoningSkills,
      baremosScore: baremosReasoningSkills,
      skillLevel: skillLevelReasoningSkills,
    },
    vocabularySkills: {
      directScore: directScoreVocabularySkills,
      baremosScore: baremosVocabularySkills,
      skillLevel: skillLevelVocabularySkills,
    },
    spatialSkills: {
      cubeCountingDirectScore: directScoreCubeCountingSpatialSkills,
      foldedPaperDirectScore: directScoreFoldedPaperSpatialSkills,
      assemblySolidFormsDirectScore: directScoreAssemblySolidFormsSpatialSkills,
      directScore: directScoreSpatialSkills,
      baremosScore: baremosSpatialSkills,
      skillLevel: skillLevelSpatialSkills,
    },
  };
  const phbResult = await FinalTestReport.findOneAndUpdate(
    { userId: phbTest.userId },
    { phbTestResult },
    { new: true }
  );

  if (!phbResult) {
    return res.status(404).json({ message: "Reporte final no encontrado" });
  }

  res.status(200).json(phbResult);
};

export const resetPhbTest = async (req, res) => {
  try {
    const defaultTestAnswers = {
      attentionSkills: {
        A1: null,
        A2: null,
        A3: null,
        A4: null,
        A5: null,
        A6: null,
        A7: null,
        A8: null,
        A9: null,
        A10: null,
        A11: null,
        A12: null,
        A13: null,
        A14: null,
      },
      numericalSkills: {
        N1: null,
        N2: null,
        N3: null,
        N4: null,
        N5: null,
        N6: null,
        N7: null,
        N8: null,
        N9: null,
      },
      reasoningSkills: {
        R1: null,
        R2: null,
        R3: null,
        R4: null,
        R5: null,
        R6: null,
        R7: null,
        R8: null,
        R9: null,
        R10: null,
        R11: null,
      },
      vocabularySkills: {
        V1: null,
        V2: null,
        V3: null,
        V4: null,
        V5: null,
        V6: null,
        V7: null,
        V8: null,
        V9: null,
        V10: null,
        V11: null,
        V12: null,
        V13: null,
        V14: null,
        V15: null,
        V16: null,
        V17: null,
        V18: null,
        V19: null,
        V20: null,
        V21: null,
        V22: null,
        V23: null,
        V24: null,
        V25: null,
        V26: null,
        V27: null,
        V28: null,
        V29: null,
        V30: null,
        V31: null,
        V32: null,
      },
      spatialSkills: {
        cubeCounting: {
          ES1: null,
          ES2: null,
          ES3: null,
          ES4: null,
          ES5: null,
          ES6: null,
          ES7: null,
          ES8: null,
          ES9: null,
        },
        foldedPaper: {
          ES10: null,
          ES11: null,
          ES12: null,
          ES13: null,
        },
        assemblySolidForms: {
          ES14: null,
          ES15: null,
          ES16: null,
          ES17: null,
        },
      },
    };

    const phbTest = await PhbTest.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { testAnswers: defaultTestAnswers } },
      { new: true }
    );

    if (!phbTest) {
      return res.status(404).json({ message: "Test no encontrado" });
    }

    await User.findOneAndUpdate(
      { _id: req.user.id },
      { completedPhbTest: false },
      { new: true }
    );

    await FinalTestReport.findOneAndUpdate(
      { userId: req.user.id },
      { $unset: { phbTestResult: "" } },
      { new: true }
    );

    res.status(200).json(phbTest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
