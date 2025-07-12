import "../items/styles/initiateclearance.css";
import { getClearanceTypes } from "../../features/academicType/clearanceSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { DatePicker } from "react-rainbow-components";
import { Application } from "react-rainbow-components";
import { initiateStudentClearance } from "../../features/academicType/clearanceSlice";
import { toast } from "react-toastify";
import { reset } from "../../features/academicType/clearanceSlice";
import Home from "../items/utilities/Home";
const InitiateClearance = () => {
  const dispatch = useDispatch();
  const { isSuccessUpdateClearance, message } = useSelector(
    (state) => state.clearance
  );
  const [choosenClearance, setchoosenClearance] = useState("");
  const [clearances, setClearances] = useState([]);
  const [deadLineDate, setDeadLineDate] = useState("");
  const darkTheme = {
    rainbow: {
      palette: {
        brand: "#80deea",
        mainBackground: "#303030",
        success: "#43a047",
        error: "#f44336",
        warning: "#ff9800",
      },
    },
  };
  const handleSubmit = (clearance) => {
    const data = {
      Clearance: clearance,
      deadline: deadLineDate,
    };
    dispatch(initiateStudentClearance(data));
  };

  useEffect(() => {
    if (message) {
      setClearances(message);
    }
    dispatch(reset());
  }, [message]);
  useEffect(() => {
    if (isSuccessUpdateClearance) {
      toast.success("Initiation successful");
      setchoosenClearance("");
      dispatch(getClearanceTypes());
    }
    dispatch(reset());
  }, [isSuccessUpdateClearance]);
  useEffect(() => {
    dispatch(getClearanceTypes());
  }, [dispatch]);
  return (
    <>
      <Home />
      <h1 className="initateClearanceHeader">Initiate Clearance</h1>
      <div className="initateClearanceContainer col-m-8">
        {clearances &&
          clearances.map((clearance) => (
            <div
              className="initiationClearances col-s-5 col-l-3"
              onClick={() => setchoosenClearance(clearance.AcademicName)}
            >
              {clearance.AcademicName}
            </div>
          ))}
        <div
          className="initiationClearances col-s-5 col-l-3"
          // onClick={() => setchoosenClearance("Student")}
        >
          Student
        </div>
        <div
          className="initiationClearances col-s-5 col-l-3"
          onClick={() => setchoosenClearance("All")}
        >
          All
        </div>
      </div>
      {choosenClearance && (
        <div className="popupContainer">
          <div className="popup col-m-8 col-l-6 col-xl-4">
            <div
              className="closeIconContainer"
              onClick={() => setchoosenClearance("")}
            >
              <MdClose />
            </div>
            <div className="centerText">
              {" "}
              Initiate clearance for {choosenClearance}
            </div>
            <div className="deadlindDateContainer">
              <label className="deadlineLabel" htmlFor="deadline">
                {" "}
                Deadline
              </label>
              <Application theme={darkTheme}>
                <DatePicker
                  id="dateTimePicker-1"
                  formatStyle="small"
                  name="deadline"
                  style={{ maxWidth: 140 }}
                  value={deadLineDate}
                  onChange={(date) => {
                    setDeadLineDate(date);
                  }}
                />
              </Application>
            </div>
            <button
              className="initiateClearanceButton"
              onClick={() => {
                handleSubmit(choosenClearance);
              }}
            >
              Initiate
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default InitiateClearance;
