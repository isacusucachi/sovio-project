import FinalTestReport from "../models/finalTestReport.model.js";
import IeppoTest from "../models/ieppoTest.model.js";
import User from "../models/user.model.js";

export const createUpdateIeppoTest = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id).populate(
      "personalInformation"
    );
    const { testAnswers } = req.body;

    if (!userFound.completedUserInformation)
      return res
        .status(403)
        .json({ mensaje: "No completaste la Información de Usuario." });

    if (userFound.completedIeppoTest)
      return res.status(403).json({ mensaje: "Ya realizaste el test IEPPO." });

    const ieppoTestFound = await IeppoTest.findOne({ userId: req.user.id });

    let ieppoTest;
    if (ieppoTestFound) {
      ieppoTest = await IeppoTest.findByIdAndUpdate(
        ieppoTestFound._id,
        { $set: { testAnswers } },
        { new: true }
      );

      return res.status(200).json(ieppoTest);
    } else {
      ieppoTest = new IeppoTest({ userId: req.user.id, testAnswers });
      await ieppoTest.save();

      res.status(201).json(ieppoTest);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const finishIeppoTest = async (req, res) => {
  const { testAnswers } = req.body;
  const userFound = await User.findById(req.user.id);

  if (userFound.completedIeppoTest)
    return res.status(403).json({ message: ["Ya completaste el test IEPPO"] });

  const ieppoTestFound = await IeppoTest.findOne({ userId: userFound._id });

  let ieppoTest;
  if (ieppoTestFound) {
    ieppoTest = await IeppoTest.findByIdAndUpdate(
      ieppoTestFound._id,
      { $set: { testAnswers } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { completedIeppoTest: true },
      { new: true }
    );
    return res.status(200).json(ieppoTest);
  } else {
    ieppoTest = new IeppoTest({ userId: req.user.id, testAnswers });
    await ieppoTest.save();
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { completedIeppoTest: true },
      { new: true }
    );
    res.status(201).json(ieppoTest);
  }
};

export const getIeppoTest = async (req, res) => {
  try {
    const IeppoTestFound = await IeppoTest.findOne({
      userId: req.user.id,
    });
    res.status(200).json(IeppoTestFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getIeppoTests = async (req, res) => {
  try {
    const IeppoTestFound = await IeppoTest.find({
      userId: req.user.id,
    }).populate("userId");
    res.status(200).json(IeppoTestFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generateIeppoTestResult = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id).populate(
      "personalInformation"
    );
    if (!userFound.completedIeppoTest)
      return res
        .status(403)
        .json({ message: ["No completaste el test IEPPO"] });

    const ieppoTest = await IeppoTest.findOne({ userId: req.user.id });

    const genre = userFound.genre;

    const personalStyles = ieppoTest.testAnswers.personalStyles;
    const preferredActivities = ieppoTest.testAnswers.preferredActivities;
    const perceptionOfAbility = ieppoTest.testAnswers.perceptionOfAbility;

    let leadership_personalStylesScore = 0;
    let mechanicalTechnician_personalStylesScore = 0;
    let social_personalStylesScore = 0;
    let organized_personalStylesScore = 0;
    let artistic_personalStylesScore = 0;
    let entrepreneur_personalStylesScore = 0;

    for (let i = 1; i <= 33; i++) {
      if (i <= 3 && personalStyles[`E${i}`] === true) {
        leadership_personalStylesScore += 1;
      }
      if (i === 4 && personalStyles[`E${i}`] === false) {
        leadership_personalStylesScore += 1;
      }
      if (i > 4 && i <= 6 && personalStyles[`E${i}`] === true)
        leadership_personalStylesScore += 1;
      if (i > 6 && i <= 10 && personalStyles[`E${i}`] === true)
        mechanicalTechnician_personalStylesScore += 1;
      if (i > 10 && i <= 15 && personalStyles[`E${i}`] === true)
        social_personalStylesScore += 1;
      if (i > 15 && i <= 21 && personalStyles[`E${i}`] === true)
        organized_personalStylesScore += 1;
      if (i > 21 && i <= 25 && personalStyles[`E${i}`] === true)
        artistic_personalStylesScore += 1;
      if (i > 25 && i <= 33 && personalStyles[`E${i}`] === true)
        entrepreneur_personalStylesScore += 1;
    }

    let leadership_preferredActivitiesScore = 0;
    let mechanicalTechnician_preferredActivitiesScore = 0;
    let social_preferredActivitiesScore = 0;
    let organized_preferredActivitiesScore = 0;
    let artistic_preferredActivitiesScore = 0;
    let entrepreneur_preferredActivitiesScore = 0;
    let investigative_preferredActivitiesScore = 0;

    for (let i = 1; i <= 47; i++) {
      if (i <= 6 && preferredActivities[`P${i}`] === true)
        leadership_preferredActivitiesScore += 1;
      else if (i <= 11 && preferredActivities[`P${i}`] === true)
        mechanicalTechnician_preferredActivitiesScore += 1;
      else if (i <= 17 && preferredActivities[`P${i}`] === true)
        social_preferredActivitiesScore += 1;
      else if (i <= 24 && preferredActivities[`P${i}`] === true)
        organized_preferredActivitiesScore += 1;
      else if (i <= 32 && preferredActivities[`P${i}`] === true)
        artistic_preferredActivitiesScore += 1;
      else if (i <= 39 && preferredActivities[`P${i}`] === true)
        entrepreneur_preferredActivitiesScore += 1;
      else if (i <= 47 && preferredActivities[`P${i}`] === true)
        investigative_preferredActivitiesScore += 1;
    }

    let leadership_perceptionOfAbilityScore = 0;
    let mechanicalTechnician_perceptionOfAbilityScore = 0;
    let social_perceptionOfAbilityScore = 0;
    let organized_perceptionOfAbilityScore = 0;
    let artistic_perceptionOfAbilityScore = 0;
    let entrepreneur_perceptionOfAbilityScore = 0;
    let investigative_perceptionOfAbilityScore = 0;

    for (let i = 1; i <= 38; i++) {
      if (i <= 8 && perceptionOfAbility[`H${i}`] === true)
        leadership_perceptionOfAbilityScore += 1;
      else if (i <= 13 && perceptionOfAbility[`H${i}`] === true)
        mechanicalTechnician_perceptionOfAbilityScore += 1;
      else if (i <= 17 && perceptionOfAbility[`H${i}`] === true)
        social_perceptionOfAbilityScore += 1;
      else if (i <= 24 && perceptionOfAbility[`H${i}`] === true)
        organized_perceptionOfAbilityScore += 1;
      else if (i <= 28 && perceptionOfAbility[`H${i}`] === true)
        artistic_perceptionOfAbilityScore += 1;
      else if (i <= 34 && perceptionOfAbility[`H${i}`] === true)
        entrepreneur_perceptionOfAbilityScore += 1;
      else if (i <= 38 && perceptionOfAbility[`H${i}`] === true)
        investigative_perceptionOfAbilityScore += 1;
    }

    const totalScoreLeadership =
      leadership_personalStylesScore +
      leadership_preferredActivitiesScore +
      leadership_perceptionOfAbilityScore;
    const totalScoreMechanicalTechnician =
      mechanicalTechnician_personalStylesScore +
      mechanicalTechnician_preferredActivitiesScore +
      mechanicalTechnician_perceptionOfAbilityScore;
    const totalScoreSocial =
      social_personalStylesScore +
      social_preferredActivitiesScore +
      social_perceptionOfAbilityScore;
    const totalScoreOrganized =
      organized_personalStylesScore +
      organized_preferredActivitiesScore +
      organized_perceptionOfAbilityScore;
    const totalScoreArtistic =
      artistic_personalStylesScore +
      artistic_preferredActivitiesScore +
      artistic_perceptionOfAbilityScore;
    const totalScoreEntrepreneur =
      entrepreneur_personalStylesScore +
      entrepreneur_preferredActivitiesScore +
      entrepreneur_perceptionOfAbilityScore;
    const totalScoreInvestigative =
      investigative_preferredActivitiesScore +
      investigative_perceptionOfAbilityScore;

    const femaleLeadershipBaremosValues = [
      28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62,
      64, 66, 68,
    ];
    const maleLeadershipBaremosValues = [
      30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64,
      66, 68, 70,
    ];

    const femaleMechanicalTechnicianBaremosValues = [
      34, 38, 41, 44, 47, 51, 54, 57, 60, 64, 67, 70, 73, 77, 80,
    ];
    const maleMechanicalTechnicianBaremosValues = [
      27, 30, 33, 36, 39, 41, 44, 47, 50, 53, 55, 58, 61, 64, 67,
    ];

    const femaleSocialBaremosValues = [
      18, 21, 24, 27, 30, 33, 36, 40, 43, 46, 49, 52, 55, 59, 62, 65,
    ];
    const maleSocialBaremosValues = [
      20, 30, 33, 36, 36, 41, 44, 47, 50, 53, 55, 58, 61, 64, 67, 70,
    ];

    const femaleOrganizedBaremosValues = [
      30, 32, 34, 36, 38, 40, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63,
      65, 67, 69, 71,
    ];
    const maleOrganizedBaremosValues = [
      29, 31, 33, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64,
      66, 68, 70, 72,
    ];

    const femaleArtisticBaremosValues = [
      25, 27, 30, 33, 35, 38, 40, 43, 45, 48, 50, 53, 56, 58, 61, 63, 66,
    ];
    const maleArtisticBaremosValues = [
      29, 31, 34, 36, 39, 42, 44, 47, 49, 52, 54, 57, 60, 62, 65, 67, 70,
    ];

    const femaleEntrepreneurBaremosValues = [
      23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 46, 48, 50, 52, 54, 56, 58,
      60, 62, 65, 67,
    ];
    const maleEntrepreneurBaremosValues = [
      23, 25, 27, 29, 32, 34, 36, 38, 40, 42, 44, 47, 49, 51, 53, 55, 57, 59,
      62, 64, 66, 68,
    ];

    const femaleInvestigativeBaremosValues = [
      28, 31, 34, 37, 41, 44, 47, 50, 53, 56, 59, 62, 65,
    ];
    const maleInvestigativeBaremosValues = [
      31, 34, 37, 40, 44, 47, 50, 53, 56, 59, 63, 66, 69,
    ];

    const finalLeadershipBaremosValue =
      genre === "femenino"
        ? femaleLeadershipBaremosValues[totalScoreLeadership]
        : maleLeadershipBaremosValues[totalScoreLeadership];

    const finalMechanicalTechnicianBaremosValue =
      genre === "femenino"
        ? femaleMechanicalTechnicianBaremosValues[
            totalScoreMechanicalTechnician
          ]
        : maleMechanicalTechnicianBaremosValues[totalScoreMechanicalTechnician];

    const finalSocialBaremosValue =
      genre === "femenino"
        ? femaleSocialBaremosValues[totalScoreSocial]
        : maleSocialBaremosValues[totalScoreSocial];

    const finalOrganizedBaremosValue =
      genre === "femenino"
        ? femaleOrganizedBaremosValues[totalScoreOrganized]
        : maleOrganizedBaremosValues[totalScoreOrganized];

    const finalArtisticBaremosValue =
      genre === "femenino"
        ? femaleArtisticBaremosValues[totalScoreArtistic]
        : maleArtisticBaremosValues[totalScoreArtistic];

    const finalEntrepreneurBaremosValue =
      genre === "femenino"
        ? femaleEntrepreneurBaremosValues[totalScoreEntrepreneur]
        : maleEntrepreneurBaremosValues[totalScoreEntrepreneur];

    const finalInvestigativeBaremosValue =
      genre === "femenino"
        ? femaleInvestigativeBaremosValues[totalScoreInvestigative]
        : maleInvestigativeBaremosValues[totalScoreInvestigative];

    const ieppoTestResult = {
      leaderShip: {
        personalStylesScore: leadership_personalStylesScore,
        preferredActivitiesScore: leadership_preferredActivitiesScore,
        perceptionOfAbilityScore: leadership_perceptionOfAbilityScore,
        totalScore: totalScoreLeadership,
        finalBaremosValue: finalLeadershipBaremosValue,
        correspondenceLevel:
          finalLeadershipBaremosValue < 40
            ? "BAJO"
            : finalLeadershipBaremosValue < 60
            ? "MEDIO"
            : "ALTO",
      },
      mechanicalTechnician: {
        personalStylesScore: mechanicalTechnician_personalStylesScore,
        preferredActivitiesScore: mechanicalTechnician_preferredActivitiesScore,
        perceptionOfAbilityScore: mechanicalTechnician_perceptionOfAbilityScore,
        totalScore: totalScoreMechanicalTechnician,
        finalBaremosValue: finalMechanicalTechnicianBaremosValue,
        correspondenceLevel:
          finalMechanicalTechnicianBaremosValue < 40
            ? "BAJO"
            : finalMechanicalTechnicianBaremosValue < 60
            ? "MEDIO"
            : "ALTO",
      },
      social: {
        personalStylesScore: social_personalStylesScore,
        preferredActivitiesScore: social_preferredActivitiesScore,
        perceptionOfAbilityScore: social_perceptionOfAbilityScore,
        totalScore: totalScoreSocial,
        finalBaremosValue: finalSocialBaremosValue,
        correspondenceLevel:
          finalSocialBaremosValue < 40
            ? "BAJO"
            : finalSocialBaremosValue < 60
            ? "MEDIO"
            : "ALTO",
      },
      organized: {
        personalStylesScore: organized_personalStylesScore,
        preferredActivitiesScore: organized_preferredActivitiesScore,
        perceptionOfAbilityScore: organized_perceptionOfAbilityScore,
        totalScore: totalScoreOrganized,
        finalBaremosValue: finalOrganizedBaremosValue,
        correspondenceLevel:
          finalOrganizedBaremosValue < 40
            ? "BAJO"
            : finalOrganizedBaremosValue < 60
            ? "MEDIO"
            : "ALTO",
      },
      artistic: {
        personalStylesScore: artistic_personalStylesScore,
        preferredActivitiesScore: artistic_preferredActivitiesScore,
        perceptionOfAbilityScore: artistic_perceptionOfAbilityScore,
        totalScore: totalScoreArtistic,
        finalBaremosValue: finalArtisticBaremosValue,
        correspondenceLevel:
          finalArtisticBaremosValue < 40
            ? "BAJO"
            : finalArtisticBaremosValue < 60
            ? "MEDIO"
            : "ALTO",
      },
      entrepreneur: {
        personalStylesScore: entrepreneur_personalStylesScore,
        preferredActivitiesScore: entrepreneur_preferredActivitiesScore,
        perceptionOfAbilityScore: entrepreneur_perceptionOfAbilityScore,
        totalScore: totalScoreEntrepreneur,
        finalBaremosValue: finalEntrepreneurBaremosValue,
        correspondenceLevel:
          finalEntrepreneurBaremosValue < 40
            ? "BAJO"
            : finalEntrepreneurBaremosValue < 60
            ? "MEDIO"
            : "ALTO",
      },
      investigative: {
        preferredActivitiesScore: investigative_preferredActivitiesScore,
        perceptionOfAbilityScore: investigative_perceptionOfAbilityScore,
        totalScore: totalScoreInvestigative,
        finalBaremosValue: finalInvestigativeBaremosValue,
        correspondenceLevel:
          finalInvestigativeBaremosValue < 40
            ? "BAJO"
            : finalInvestigativeBaremosValue < 60
            ? "MEDIO"
            : "ALTO",
      },
    };

    // Obtiene las propiedades y valores ordenados por finalBaremosValue de mayor a menor
    const sortedProperties = Object.entries(ieppoTestResult).sort(
      ([, a], [, b]) =>
        b.finalBaremosValue - a.finalBaremosValue || b.totalScore - a.totalScore
    );

    // Selecciona las dos primeras propiedades
    const top2Properties = sortedProperties.slice(0, 2);

    const vocationalTypes = {
      vocationalTypes1: top2Properties[0][0],
      vocationalTypes2: top2Properties[1][0],
    };

    const ieppoResult = await FinalTestReport.findOneAndUpdate(
      { userId: ieppoTest.userId },
      {
        ieppoTestResult,
        vocationalTypes,
      },
      { new: true }
    );

    if (!ieppoResult) {
      return res.status(404).json({ message: "Reporte final no encontrado" });
    }

    res.status(200).json(ieppoResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetIeppoTest = async (req, res) => {
  try {
    const defaultTestAnswers = {
      personalStyles: {
        E1: null,
        E2: null,
        E3: null,
        E4: null,
        E5: null,
        E6: null,
        E7: null,
        E8: null,
        E9: null,
        E10: null,
        E11: null,
        E12: null,
        E13: null,
        E14: null,
        E15: null,
        E16: null,
        E17: null,
        E18: null,
        E19: null,
        E20: null,
        E21: null,
        E22: null,
        E23: null,
        E24: null,
        E25: null,
        E26: null,
        E27: null,
        E28: null,
        E29: null,
        E30: null,
        E31: null,
        E32: null,
        E33: null,
      },
      preferredActivities: {
        P1: null,
        P2: null,
        P3: null,
        P4: null,
        P5: null,
        P6: null,
        P7: null,
        P8: null,
        P9: null,
        P10: null,
        P11: null,
        P12: null,
        P13: null,
        P14: null,
        P15: null,
        P16: null,
        P17: null,
        P18: null,
        P19: null,
        P20: null,
        P21: null,
        P22: null,
        P23: null,
        P24: null,
        P25: null,
        P26: null,
        P27: null,
        P28: null,
        P29: null,
        P30: null,
        P31: null,
        P32: null,
        P33: null,
        P34: null,
        P35: null,
        P36: null,
        P37: null,
        P38: null,
        P39: null,
        P40: null,
        P41: null,
        P42: null,
        P43: null,
        P44: null,
        P45: null,
        P46: null,
        P47: null,
      },
      perceptionOfAbility: {
        H1: null,
        H2: null,
        H3: null,
        H4: null,
        H5: null,
        H6: null,
        H7: null,
        H8: null,
        H9: null,
        H10: null,
        H11: null,
        H12: null,
        H13: null,
        H14: null,
        H15: null,
        H16: null,
        H17: null,
        H18: null,
        H19: null,
        H20: null,
        H21: null,
        H22: null,
        H23: null,
        H24: null,
        H25: null,
        H26: null,
        H27: null,
        H28: null,
        H29: null,
        H30: null,
        H31: null,
        H32: null,
        H33: null,
        H34: null,
        H35: null,
        H36: null,
        H37: null,
        H38: null,
      },
    };

    const ieppoTest = await IeppoTest.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { testAnswers: defaultTestAnswers } },
      { new: true }
    );

    if (!ieppoTest) {
      return res.status(404).json({ message: "Test no encontrado" });
    }

    await User.findOneAndUpdate(
      { _id: req.user.id },
      { completedIeppoTest: false },
      { new: true }
    );

    await FinalTestReport.findOneAndUpdate(
      { userId: req.user.id },
      { $unset: { ieppoTestResult: "" } },
      { new: true }
    );

    res.status(200).json(ieppoTest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};