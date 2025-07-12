import { FaQrcode } from "react-icons/fa";
import { FaSearch, FaEye, FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentFileCase, reset } from "../../features/loan/loanSlice";
import { toast } from "react-toastify";
import AddFileCase from "./addFileCase";
import Popup from "./utilities/Popup";
import { reset as refresh } from "../../features/academicType/clearanceSlice";
const StudentFileCase = ({
  setContentIndex,
  studentId,
  setStudentId,
  setPopUpMessage,
  loanStateChange,
  setLoanStateChange,
  contentIndex,
  setPrevIndex,
}) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [loanInfo, setLoanInfo] = useState("");
  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const { message, isError } = useSelector((state) => state.clearance);
  const loanState = useSelector((state) => state.loan);

  const handleShowPopup = (info) => {
    if (!info.Belonging) {
      setPopUpMessage(info);
    }
  };
  const handleDispatch = () => {
    dispatch(getStudentFileCase({ studentId: studentId }));
  };
  const handdleSearch = () => {
    setStudentId(id);
    setShowPopup(false);
    setPrevIndex(4);
    setContentIndex(1);
  };

  useEffect(() => {
    if (isError) {
      toast.error("Student not found");
    }
    dispatch(refresh());
  }, [isError]);
  useEffect(() => {
    const { isSuccess } = loanState;
    if (loanStateChange && isSuccess) {
      toast.success("Success");
      handleDispatch();
      setLoanStateChange(false);
    }
    dispatch(reset());
  }, [loanStateChange, loanState]);
  useEffect(() => {
    if (step === 2) {
      const { message } = loanState;
      if (message) {
        setLoanInfo(message);
      }
      dispatch(reset());
    }
  }, [loanState, step, loanInfo]);
  return (
    <>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          header={"Enter Student ID"}
          content={
            <div className="centerInputContainer">
              <label className="custom-field one">
                <input
                  type="text"
                  placeholder=" "
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  onKeyDown={(e) => {
                    e.key == "Enter" && e.target.value && handdleSearch();
                  }}
                />
                <span
                  className="placeholder"
                  style={{ backgroundColor: "#434343" }}
                >
                  Student ID
                </span>
              </label>
            </div>
          }
        />
      )}
      {studentId && message.student ? (
        <>
          {!step ? (
            <>
              <h3 className="addClearanceHeaderText glowText">
                File Case on {message?.student?.FirstName}{" "}
              </h3>
              <div className="choiceButtonHolder">
                <button
                  className="choiceButton"
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  <FaPlus />
                  File
                </button>
                <button
                  className="choiceButton"
                  onClick={() => {
                    setStep(2);
                    handleDispatch();
                  }}
                >
                  <FaEye />
                  View
                </button>
                <button
                  className="previouschoiceButton"
                  onClick={() => {
                    setStudentId(null);
                  }}
                >
                  Back
                </button>
              </div>
            </>
          ) : step === 1 ? (
            <>
              <h3 className="addClearanceHeaderText glowText">
                File Case on {message?.student?.FirstName}{" "}
              </h3>
              <AddFileCase
                studentId={studentId}
                setStep={setStep}
                contentIndex={contentIndex}
              />
            </>
          ) : (
            <>
              <h3 className="addClearanceHeaderText glowText">
                Filed cases of {message?.student?.FirstName}{" "}
              </h3>

              {!loanInfo.length ? (
                <>
                  <div className="addClearanceHeaderText">
                    {!loanState.isLoading && "Student has no Filed Case"}
                  </div>
                  <div className="choiceButtonHolder">
                    <button
                      className="previouschoiceButton"
                      onClick={() => {
                        setStep(0);
                      }}
                    >
                      Back
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {loanInfo &&
                    loanInfo.map((info, index) => (
                      <div
                        key={index}
                        className="loanitemHolder"
                        onClick={() => {
                          handleShowPopup(info);
                        }}
                      >
                        <p className="loanitemTexts">{info.ItemName}</p>
                        <p className="loanitemTexts">{info.ItemType}</p>
                        <p className="loanitemTexts"> {info.UniqueRef}</p>
                        <p
                          style={{
                            color:
                              info.Quantity >= 7
                                ? "red"
                                : info.Quantity >= 4
                                ? "yellow"
                                : "green",
                          }}
                        >
                          {info.Quantity}
                        </p>
                      </div>
                    ))}
                  <div className="choiceButtonHolder">
                    <button
                      className="previouschoiceButton"
                      onClick={() => {
                        setStep(0);
                      }}
                    >
                      Back
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <h3 className="addClearanceHeaderText glowText">
            File Case on Student
          </h3>
          <div className="choiceButtonHolder">
            <button
              className="choiceButton"
              onClick={() => {
                setPrevIndex(4);
                setContentIndex(1);
              }}
            >
              <FaQrcode />
              Scan
            </button>
            <button
              className="choiceButton"
              onClick={() => {
                setShowPopup(true);
              }}
            >
              <FaSearch />
              Search
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default StudentFileCase;
