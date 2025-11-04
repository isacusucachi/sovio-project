import FinalTestReport from "../models/finalTestReport.model.js";
import TepeTest from "../models/tepeTest.model.js";
import User from "../models/user.model.js";

export const createUpdateTepeTest = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    const { testAnswers } = req.body;

    if (userFound.completedTepeTest)
      return res.status(403).json({ message: ["Ya completaste el test TEPE"] });

    const tepeTestFound = await TepeTest.findOne({ userId: req.user.id });

    let tepeTest;
    if (tepeTestFound) {
      tepeTest = await TepeTest.findByIdAndUpdate(
        tepeTestFound._id,
        { $set: { testAnswers } },
        { new: true }
      );

      return res.status(200).json(tepeTest);
    } else {
      tepeTest = new TepeTest({ userId: req.user.id, testAnswers });
      await tepeTest.save();

      res.status(201).json(tepeTest);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const finishTepeTest = async (req, res) => {
  const { testAnswers } = req.body;
  const userFound = await User.findById(req.user.id);

  if (userFound.completedTepeTest)
    return res.status(403).json({ message: ["Ya completaste el test TEPE"] });

  const tepeTestFound = await TepeTest.findOne({ userId: userFound._id });

  let tepeTest;
  if (tepeTestFound) {
    tepeTest = await TepeTest.findByIdAndUpdate(
      tepeTestFound._id,
      { $set: { testAnswers } },
      { new: true }
    );
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { completedTepeTest: true },
      { new: true }
    );
    return res.status(200).json(tepeTest);
  } else {
    tepeTest = new TepeTest({ userId: req.user.id, testAnswers });
    await tepeTest.save();
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { completedTepeTest: true },
      { new: true }
    );
    res.status(201).json(tepeTest);
  }
};

export const getTepeTest = async (req, res) => {
  try {
    const tepeTestFound = await TepeTest.findOne({ userId: req.user.id });

    return res.json(tepeTestFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTepeTests = async (req, res) => {
  try {
    const TepeTestFound = await TepeTest.find({ userId: req.user.id }).populate(
      "userId"
    );
    res.status(200).json(TepeTestFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generateTepeTestResult = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);

    if (!userFound.completedTepeTest)
      return res.status(403).json({ message: ["No completaste el test TEPE"] });

    const tepeTest = await TepeTest.findOne({ userId: req.user.id });
    let totalScore = 0;

    if (tepeTest.testAnswers.traits.N8) totalScore += 2;
    if (tepeTest.testAnswers.traits.N12) totalScore += 2;
    if (tepeTest.testAnswers.traits.N15) totalScore += 2;
    if (tepeTest.testAnswers.traits.N20) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N22) totalScore += 2;
    if (!tepeTest.testAnswers.affirmations.N24) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N26) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N28) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N32) totalScore += 2;
    if (!tepeTest.testAnswers.affirmations.N34) totalScore += 2;
    if (!tepeTest.testAnswers.affirmations.N37) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N41) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N44) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N46) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N47) totalScore += 2;
    if (!tepeTest.testAnswers.affirmations.N49) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N50) totalScore += 2;
    if (!tepeTest.testAnswers.affirmations.N54) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N58) totalScore += 2;
    if (!tepeTest.testAnswers.affirmations.N60) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N61) totalScore += 2;
    if (!tepeTest.testAnswers.affirmations.N62) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N65) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N70) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N72) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N73) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N76) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N77) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N81) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N85) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N89) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N93) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N98) totalScore += 2;
    if (tepeTest.testAnswers.affirmations.N99) totalScore += 2;

    const result =
      totalScore >= 64
        ? "POTENCIAL EMPRESARIAL MUY ELEVADO"
        : totalScore >= 60
        ? "POTENCIAL EMPRESARIAL ELEVADO"
        : totalScore > 50
        ? "POTENCIAL EMPRESARIAL POR DESARROLLAR - POTENCIAL EMPRESARIAL RELATIVO"
        : "POTENCIAL EMPRESARIAL POR DESARROLLAR - POTENCIAL EMPRESARIAL BAJO";

    const tepeTestResult = { totalScore, result };
    const tepeResult = await FinalTestReport.findOneAndUpdate(
      { userId: tepeTest.userId },
      { tepeTestResult },
      { new: true }
    );

    if (!tepeResult) {
      return res.status(404).json({ message: "Reporte final no encontrado" });
    }

    res.status(200).json(tepeResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetTepeTest = async (req, res) => {
  try {
    const defaultTestAnswers = {
      traits: {
        N1: null,
        N2: null,
        N3: null,
        N4: null,
        N5: null,
        N6: null,
        N7: null,
        N8: null,
        N9: null,
        N10: null,
        N11: null,
        N12: null,
        N13: null,
        N14: null,
        N15: null,
        N16: null,
        N17: null,
        N18: null,
        N19: null,
        N20: null,
        N21: null,
      },
      affirmations: {
        N22: null,
        N23: null,
        N24: null,
        N25: null,
        N26: null,
        N27: null,
        N28: null,
        N29: null,
        N30: null,
        N31: null,
        N32: null,
        N33: null,
        N34: null,
        N35: null,
        N36: null,
        N37: null,
        N38: null,
        N39: null,
        N40: null,
        N41: null,
        N42: null,
        N43: null,
        N44: null,
        N45: null,
        N46: null,
        N47: null,
        N48: null,
        N49: null,
        N50: null,
        N51: null,
        N52: null,
        N53: null,
        N54: null,
        N55: null,
        N56: null,
        N57: null,
        N58: null,
        N59: null,
        N60: null,
        N61: null,
        N62: null,
        N63: null,
        N64: null,
        N65: null,
        N66: null,
        N67: null,
        N68: null,
        N69: null,
        N70: null,
        N71: null,
        N72: null,
        N73: null,
        N74: null,
        N75: null,
        N76: null,
        N77: null,
        N78: null,
        N79: null,
        N80: null,
        N81: null,
        N82: null,
        N83: null,
        N84: null,
        N85: null,
        N86: null,
        N87: null,
        N88: null,
        N89: null,
        N90: null,
        N91: null,
        N92: null,
        N93: null,
        N94: null,
        N95: null,
        N96: null,
        N97: null,
        N98: null,
        N99: null,
        N100: null,
      },
    };

    const tepeTest = await TepeTest.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { testAnswers: defaultTestAnswers } },
      { new: true }
    );

    if (!tepeTest) {
      return res.status(404).json({ message: "Test no encontrado" });
    }

    await User.findOneAndUpdate(
      { _id: req.user.id },
      { completedTepeTest: false },
      { new: true }
    );

    await FinalTestReport.findOneAndUpdate(
      { userId: req.user.id },
      { $unset: { tepeTestResult: "" } },
      { new: true }
    );

    res.status(200).json(tepeTest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
