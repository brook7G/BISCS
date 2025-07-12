import { FaQrcode } from "react-icons/fa";
import { FaSearch, FaEye, FaHandHolding, FaSuitcase } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentLoans,
  reset,
  getStudentBelongings,
} from "../../features/loan/loanSlice";
import AddLoan from "./addLoan";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import Popup from "./utilities/Popup";
import { reset as refresh } from "../../features/academicType/clearanceSlice";

const LoanItem = ({
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
    contentIndex === 3
      ? dispatch(getStudentLoans({ studentId: studentId }))
      : dispatch(getStudentBelongings({ studentId: studentId }));
  };
  const handdleSearch = () => {
    setStudentId(id);
    setShowPopup(false);
    contentIndex === 3 ? setPrevIndex(3) : setPrevIndex(5);
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
                  required
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
              {contentIndex === 3 && (
                <h3 className="addClearanceHeaderText glowText">
                  Loan Item for {message?.student?.FirstName}{" "}
                </h3>
              )}
              {contentIndex === 5 && (
                <h3 className="addClearanceHeaderText glowText">
                  Register Belongings for {message?.student?.FirstName}{" "}
                </h3>
              )}
              <div className="choiceButtonHolder">
                <button
                  className="choiceButton"
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  {contentIndex === 3 ? <FaHandHolding /> : <FaSuitcase />}
                  {contentIndex === 3 ? "Loan" : "Register"}
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
              {contentIndex === 3 ? (
                <h3 className="addClearanceHeaderText glowText">
                  Loan Item for {message?.student?.FirstName}{" "}
                </h3>
              ) : (
                <h3 className="addClearanceHeaderText glowText">
                  Register Belongings for {message?.student?.FirstName}{" "}
                </h3>
              )}

              <AddLoan
                studentId={studentId}
                setStep={setStep}
                contentIndex={contentIndex}
              />
            </>
          ) : (
            <>
              {contentIndex === 3 && (
                <h3 className="addClearanceHeaderText glowText">
                  Loaned Items for {message?.student?.FirstName}{" "}
                </h3>
              )}
              {contentIndex === 5 && (
                <h3 className="addClearanceHeaderText glowText">
                  Belongings of {message?.student?.FirstName}{" "}
                </h3>
              )}

              {!loanInfo.length ? (
                <>
                  <div className="addClearanceHeaderText">
                    {contentIndex === 3 ? (
                      <>{!loanState.isLoading && "Student has no loans"}</>
                    ) : (
                      <>{!loanState.isLoading && "Student has no Belongings"}</>
                    )}
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
                        <LazyLoadImage
                          className="loanedItemImage"
                          src={`https://vgf59b03-5000.uks1.devtunnels.ms/uploads/${info.ItemImage}`}
                          alt="item"
                        />{" "}
                        <p
                          className="loanitemTexts"
                          style={{ color: info.Approved ? "green" : "red" }}
                        >
                          {info.ItemName}
                        </p>
                        <p className="loanitemTexts">{info.ItemType}</p>
                        <p className="loanitemTexts"> {info.UniqueRef}</p>
                        <p>{info.Quantity}</p>
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
          {contentIndex === 3 && (
            <h3 className="addClearanceHeaderText glowText">
              Loan Item for Student
            </h3>
          )}
          {contentIndex === 5 && (
            <h3 className="addClearanceHeaderText glowText">
              Register Belongings for Student
            </h3>
          )}
          <div className="choiceButtonHolder">
            <button
              className="choiceButton"
              onClick={() => {
                contentIndex === 3 ? setPrevIndex(3) : setPrevIndex(5);
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
export default LoanItem;
