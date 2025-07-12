import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createClearanceType,
  getClearanceTypes,
} from "../../features/academicType/clearanceSlice";
import "./styles/academictype.css";
import { reset } from "../../features/academicType/clearanceSlice";
const ClearanceTypes = ({ setStepNumber }) => {
  const dispatch = useDispatch();
  const [academicNames, setAcademicNames] = useState([]);
  const [academicTypes, setAcademicTypes] = useState(["Regular", "Extension"]);
  const [customAcademic, setCustomAcademic] = useState("");
  const { isError, isSuccess, message } = useSelector(
    (state) => state.clearance
  );
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    if (Array.isArray(message)) {
      setStepNumber((prev) => prev + 1);
      return;
    }
    if (isSuccess) {
      setStepNumber((prevNumber) => prevNumber + 1);
    }
    if (isError) {
      if (message) {
        toast.error(message);
      } else {
        toast.error("No Clearance found");
      }
    }
    dispatch(reset());
  }, [isError, isSuccess, setStepNumber, message, dispatch]);
  const handleDropDownChange = (value) => {
    if (!value) {
      //If there is no value return/exit
      return;
    }
    const duplicateValue = academicNames.find((a) => a === value);
    if (duplicateValue) {
      //If teh value is already there exit
      toast.error(`${value} already added`);
      return;
    }
    setAcademicNames([...academicNames, value]);
    setSelectedValue("");
  };
  const handleRemoveAcademic = (value) => {
    const newAcademicName = academicNames.filter((a) => a !== value);
    setAcademicNames(newAcademicName);
  };
  const handleAddCustomAcademic = () => {
    if (!customAcademic) {
      //If there is no value return/exit
      return;
    }
    const duplicateValue = academicTypes.find((a) => a === customAcademic);
    if (duplicateValue) {
      //If teh value is already there exit
      toast.error(`${customAcademic} already added`);

      return;
    }
    setAcademicTypes([...academicTypes, customAcademic]);
    setCustomAcademic("");
    toast.success("Custom academic type added!");
  };
  const handleSubmit = () => {
    if (!academicNames.length) {
      toast.error("Please add academic types");
      return;
    }
    dispatch(createClearanceType(academicNames));
  };
  const handleSkip = () => {
    dispatch(getClearanceTypes());
  };
  return (
    <>
      <div className="academicContainer">
        <h1 className="stepOneHeaderText"> Add Academic type</h1>
        <div className="academictypesContainer">
          {academicNames.map((academicName, index) => (
            <div key={index} className="academicType col-s-3">
              <div className="academicTypeText">{academicName}</div>
              <div
                className="closeIconContainer"
                onClick={() => {
                  handleRemoveAcademic(academicName);
                }}
              >
                <MdClose />
              </div>
            </div>
          ))}
        </div>
        <select
          className="academictypesContainer"
          value={selectedValue}
          onChange={(e) => {
            handleDropDownChange(e.target.value);
          }}
          style={{ backgroundColor: "white" }}
        >
          <option value=""> Choose an academic type </option>
          {academicTypes.map((academicType, index) => (
            <option key={index} value={academicType}>
              {" "}
              {academicType}{" "}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="customInput"
          placeholder="Custom academic type"
          className="academictypesContainer customAcademicTypeInput"
          value={customAcademic}
          style={{ backgroundColor: "white" }}
          onChange={(e) => {
            setCustomAcademic(e.target.value);
          }}
        />
        <button
          className=" addCustomAcademicTypeButton"
          onClick={() => {
            handleAddCustomAcademic();
          }}
        >
          Add Custom
        </button>
      </div>
      <div className="nextButtonContainer">
        <button
          className="nextStepButton"
          onClick={() => {
            handleSubmit();
          }}
        >
          {" "}
          Next{" "}
        </button>
        <button
          className="nextStepButton"
          onClick={() => {
            handleSkip();
          }}
          style={{ marginLeft: "2px" }}
        >
          {" "}
          Skip{" "}
        </button>
      </div>
    </>
  );
};
export default ClearanceTypes;
