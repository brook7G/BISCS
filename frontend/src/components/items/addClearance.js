import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClearanceTypes,
  updateClearance,
  reset,
} from "../../features/academicType/clearanceSlice";
import "./styles/addclearance.css";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const AddClearance = ({ setStepNumber }) => {
  const dispatch = useDispatch();
  const [clearanceNames, setClearanceNames] = useState();
  const [customClearanceTypes, setCustomClearanceTypes] = useState();
  const [selectedValue, setSelectedValue] = useState("");
  const [clearanceItems, setClearanceItems] = useState([
    {
      clearanceItemFor: "Regular",
      clearanceItem: [
        "Department",
        "Book Store Keeper",
        "Librarian",
        "Food Service",
        "Housing",
        "StoreKeeper",
        "University Police",
        "Registrar Office",
      ],
    },
    {
      clearanceItemFor: "Extension",
      clearanceItem: [
        "Department",
        "CDE Office",
        "CBE coordinator",
        "Librarian",
        "Book Store keeper",
        "Head,Budget & Finance",
        "University Police",
        "Registrar Office",
      ],
    },
    {
      clearanceItemFor: "Weekend",
      clearanceItem: ["Dorm", "Cafe"],
    },
  ]);

  const { isError, isSuccess, message, isSuccessUpdateClearance } = useSelector(
    (state) => state.clearance
  );
  const handleRemoveAcademic = (value, identifier) => {
    const newclearancName = clearanceNames.map((clearanceName) =>
      clearanceName.clearancefor === identifier
        ? {
            ...clearanceName,
            clearance: clearanceName.clearance.filter((a) => a !== value),
          }
        : clearanceName
    );
    setClearanceNames(newclearancName);
  };
  const handleDropDownChange = (clearanceName, target) => {
    if (!clearanceName) {
      return;
    }
    let duplicateValue;
    for (let i = 0; i < clearanceNames.length; i++) {
      duplicateValue =
        clearanceNames[i].clearancefor === target &&
        clearanceNames[i].clearance.find((a) => a === clearanceName);
      if (duplicateValue) {
        toast.error(`${duplicateValue} already added!`);
        break;
      }
    }
    if (duplicateValue) {
      return;
    }
    const newClearanceNames = clearanceNames.map((oneClearance) =>
      oneClearance.clearancefor === target
        ? {
            ...oneClearance,
            clearance: [...oneClearance.clearance, clearanceName],
          }
        : oneClearance
    );
    setClearanceNames(newClearanceNames);
    setSelectedValue("");
  };
  const handleAddingCustomClearanceTyes = (target) => {
    if (!customClearanceTypes) {
      return;
    }
    let duplicateValue;
    for (let i = 0; i < clearanceItems.length; i++) {
      duplicateValue =
        clearanceItems[i].clearanceItemFor === target &&
        clearanceItems[i].clearanceItem.find((a) => a === customClearanceTypes);
      if (duplicateValue) {
        toast.error(`${duplicateValue} already added!`);
        break;
      }
    }
    if (duplicateValue) {
      return;
    }
    const newClearanceItems = clearanceItems.map((clearanceItem) =>
      clearanceItem.clearanceItemFor === target
        ? {
            clearanceItemFor: clearanceItem.clearanceItemFor,
            clearanceItem: [
              ...clearanceItem.clearanceItem,
              customClearanceTypes,
            ],
          }
        : clearanceItem
    );
    setClearanceItems(newClearanceItems);
    toast.success(`${customClearanceTypes} added!`);
  };
  const handleAddClearance = () => {
    dispatch(updateClearance(clearanceNames));
  };
  useEffect(() => {
    dispatch(getClearanceTypes());
  }, [dispatch]);
  useEffect(() => {
    if (isSuccessUpdateClearance) {
      dispatch(reset());
      setStepNumber((prevState) => prevState + 1);
    }
    if (isSuccess) {
      const initialClearance =
        message &&
        message.map((acadamicNames) => {
          const data = {
            clearance: ["Dormitory", "Cafe"],
            clearancefor: acadamicNames.AcademicName,
          };
          return data;
        });
      setClearanceNames(initialClearance);
      const initialClearanceTypes =
        message &&
        message.map((acadamicNames) => {
          const data = {
            clearanceItem: ["Registrar Office", "University Police"],
            clearanceItemFor: acadamicNames.AcademicName,
          };
          return data;
        });
      setClearanceNames(initialClearance);
      setClearanceItems(initialClearanceTypes);
    }
  }, [
    isSuccess,
    isError,
    message,
    isSuccessUpdateClearance,
    setStepNumber,
    dispatch,
  ]);

  return (
    <>
      <div className="addClearanceContainer">
        {message &&
          message.map((AcademicNames, index) => (
            <div key={index} className="clearance col-l-4 ">
              <h3 className="addClearanceHeaderText">
                Add clearance for {AcademicNames.AcademicName}
              </h3>
              <div className="clearancetypesContainer">
                {clearanceNames &&
                  clearanceNames.map((clearanceName) => (
                    <>
                      {clearanceName.clearancefor === AcademicNames.AcademicName
                        ? clearanceName.clearance.map((oneClearance, index) => (
                            <div
                              key={index}
                              className="clearanceType col-s-4 col-l-5 col-xl-3"
                            >
                              <div className="academicTypeText">
                                {oneClearance}
                              </div>
                              <div
                                className="closeIconContainer"
                                onClick={() => {
                                  handleRemoveAcademic(
                                    oneClearance,
                                    clearanceName.clearancefor
                                  );
                                }}
                              >
                                <MdClose />
                              </div>
                            </div>
                          ))
                        : ""}
                    </>
                  ))}
              </div>
              <select
                className="clearancetypesDropDown"
                value={selectedValue}
                onChange={(e) => {
                  handleDropDownChange(
                    e.target.value,
                    AcademicNames.AcademicName
                  );
                }}
              >
                <option value=""> Choose an Clearance type </option>
                {clearanceItems &&
                  clearanceItems.map((oneClearanceItem) => (
                    <>
                      {oneClearanceItem.clearanceItemFor ===
                      AcademicNames.AcademicName
                        ? oneClearanceItem.clearanceItem.map(
                            (clearanceName) => <option> {clearanceName}</option>
                          )
                        : ""}
                    </>
                  ))}
              </select>
              <input
                type="text"
                name="customInput"
                placeholder="Custom clearance type"
                className="customClearanceInput"
                onChange={(e) => {
                  setCustomClearanceTypes(e.target.value);
                }}
              />
              <button
                className="addCustomClearanceTypeButton"
                onClick={() =>
                  handleAddingCustomClearanceTyes(AcademicNames.AcademicName)
                }
              >
                Add Custom
              </button>
            </div>
          ))}
      </div>
      <div className="nextButtonContainer">
        <button
          className="nextStepButton"
          onClick={() => {
            handleAddClearance();
          }}
        >
          {" "}
          Next{" "}
        </button>
      </div>
    </>
  );
};

export default AddClearance;
