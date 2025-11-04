import User from "../models/user.model.js";
import PersonalInformation from "../models/personalInformation.model.js";

export const createPersonalInformation = async (req, res) => {
  try {
    const {
      disability,
      typeOfDisability,
      practiceSport,
      sport,
      amountSportPractice,
      academicLevel,
      cycle,
      specialty,
      institutionName,
      typeOfInstitution,
      masteredCoursesList,
      likedCoursesList,
      playInstrument,
      readPentagram,
      composeSongs,
      doTheater,
      paintPictures,
      doDance,
      didMilitaryService,
      otherSkills,
      futureCareer,
      career1,
      career2,
      career3,
      levelOfStudiesCanBeFinanced,
      typeOfInstitutionCanBeFinanced,
      ocupationNeverWork,
      password,
      accessToken,
    } = req.body;
    const userFound = await User.findById(req.user.id);

    if (!userFound) {
      return res.status(404).json({ message: ["Usuario no encontrado"] });
    }

    if (userFound.personalInformation)
      return res
        .status(403)
        .json({ message: ["Ya completaste la información personal"] });

    const newPersonalInformation = new PersonalInformation({
      disability,
      typeOfDisability,
      practiceSport,
      sport,
      amountSportPractice,
      academicLevel,
      cycle,
      specialty,
      institutionName,
      typeOfInstitution,
      masteredCoursesList,
      likedCoursesList,
      playInstrument,
      readPentagram,
      composeSongs,
      doTheater,
      paintPictures,
      doDance,
      didMilitaryService,
      otherSkills,
      futureCareer,
      career1,
      career2,
      career3,
      levelOfStudiesCanBeFinanced,
      typeOfInstitutionCanBeFinanced,
      ocupationNeverWork,
      password,
      accessToken,
    });

    const savedPersonalInformation = await newPersonalInformation.save();

    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        personalInformation: savedPersonalInformation._id,
        completedUserInformation: true,
      },
      { new: true }
    );
    res.status(201).json(savedPersonalInformation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserInformation = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await User.findById({
      _id: id,
    }).populate("personalInformation");

    if (!userFound)
      return res.status(400).json({
        message: [`User not found`],
      });

    if (!userFound.personalInformation)
      return res.status(400).json({
        message: [`User information not found`],
      });

    res.status(200).json(userFound.personalInformation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
