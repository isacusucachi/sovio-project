import AssessmentSurvey from "../models/assessmentSurvey.model.js";
import User from "../models/user.model.js";

export const createAssessmentSurvey = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (userFound.completedAssessmentSurvey)
      return res
        .status(403)
        .json({ message: ["Ya completaste la encuesta de valoración"] });

    const {
      navigationDifficulty,
      appereanceRating,
      satisfactionRating,
      recommendationToOthers,
      comments,
      rating,
    } = req.body;

    const newAssessmentSurvey = new AssessmentSurvey({
      user: req.user.id,
      navigationDifficulty,
      appereanceRating,
      satisfactionRating,
      recommendationToOthers,
      comments,
      rating,
    });

    const assessmentSurveySaved = await newAssessmentSurvey.save();

    await User.findOneAndUpdate(
        { _id: req.user.id },
        { completedAssessmentSurvey: true },
        { new: true }
      );

    res.status(201).json({
      assessmentSurveySaved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
