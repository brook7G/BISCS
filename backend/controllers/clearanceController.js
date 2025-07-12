const Clearance = require("../models/clearanceModel");
const asyncHandler = require("express-async-handler");

//This is a function to create/register academic type
const createClearanceType = asyncHandler(async (req, res) => {
  try {
    const AcademicTypes = req.body;

    // First, check all items for duplicates
    for (const academicType of AcademicTypes) {
      const clearanceExist = await Clearance.findOne({
        AcademicName: academicType,
      });
      if (clearanceExist) {
        throw new Error(`${academicType} already exists.`);
      }
    }

    // If no duplicates are found, register all items
    const promises = AcademicTypes.map((academicType) =>
      Clearance.create({ AcademicName: academicType })
    );
    const results = await Promise.all(promises);

    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({
      message: error.message,
      error: error.message,
    });
  }
});

//This is a function to get all Clearance types
const getClearanceType = asyncHandler(async (req, res) => {
  const result = await Clearance.find();
  if (result.length) {
    res.status(200).json(result); // This give resposne to the frontend
  } else {
    res.status(400).json("No academic Type found!");
  }
});
const updateClearance = asyncHandler(async (req, res) => {
  const clearanceUpdates = req.body;

  try {
    for (const clearanceUpdate of clearanceUpdates) {
      const { clearancefor, clearance } = clearanceUpdate;

      // Find the Clearance document by its AcademicName
      let ClearanceData = await Clearance.findOne({
        AcademicName: clearancefor,
      });

      if (!ClearanceData) {
        continue; // Move to the next Clearance update
      }

      // Create a new ClearanceDetail object
      const clearanceDetails = clearance.map((item) => ({
        ClearanceFieldName: item,
        ClearanceOrder: "",
        Approved: false,
        PreRequest: false,
        PreRequestName: "",
        StudentAppeal: false,
      }));

      // Update the ClearanceDetail field with the new data
      ClearanceData.ClearanceDetail = clearanceDetails;

      // Save the updated document
      await ClearanceData.save();
    }
    const allClearance = await Clearance.find();
    res.status(200).json(allClearance);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
const defineClearance = asyncHandler(async (req, res) => {
  const definedClearances = req.body;
  try {
    for (const definedClearance of definedClearances) {
      let StoredClearance = await Clearance.findOne({
        AcademicName: definedClearance.AcademicName,
      });
      if (!StoredClearance) {
        console.log("Clearance not found");
      }
      const { ClearanceDetail } = definedClearance;
      const newClearanceDetail = ClearanceDetail.map(
        (oneClearanceDetail, index) => {
          const constructedDetail = {
            Approved: oneClearanceDetail.Approved,
            ClearanceFieldName: oneClearanceDetail.ClearanceFieldName,
            ClearanceOrder: index + 1,
            PreRequest: index > 0 ? oneClearanceDetail.PreRequest : false,
            PreRequestName:
              oneClearanceDetail.PreRequest && index > 0
                ? ClearanceDetail[index - 1].ClearanceFieldName
                : oneClearanceDetail.PreRequestName,
            StudentAppeal: oneClearanceDetail.StudentAppeal,
            _id: oneClearanceDetail._id,
          };
          return constructedDetail;
        }
      );
      StoredClearance.ClearanceDetail = newClearanceDetail;
      await StoredClearance.save();
    }
    res.status(200).json("Operation Successful");
  } catch (error) {
    res.status(400).json({ message: "Something is Wrong" });
  }
});

const getClearanceDetails = asyncHandler(async (req, res) => {
  let details = [];
  const allClearance = await Clearance.find();
  for (const clearance of allClearance) {
    const ClearanceDetail = clearance.ClearanceDetail;
    for (const detail of ClearanceDetail) {
      details = [...details, detail.ClearanceFieldName];
    }
  }
  const uniqueDetails = [...new Set(details)];
  if (uniqueDetails.length) {
    res.status(200).json(uniqueDetails);
  } else {
    res.status(400).json("Nothing found!");
  }
});
module.exports = {
  createClearanceType,
  getClearanceType,
  updateClearance,
  defineClearance,
  getClearanceDetails,
};
