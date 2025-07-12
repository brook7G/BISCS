import { useState, useEffect } from "react";
import "./styles/definerules.css";
import { getClearanceTypes } from "../../features/academicType/clearanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  defineClearance,
  reset,
} from "../../features/academicType/clearanceSlice";
const DefineRules = ({ setStepNumber }) => {
  const dispatch = useDispatch();
  const { message, isSuccess, isSuccessUpdateClearance } = useSelector(
    (state) => state.clearance
  );
  const [Clearances, setClearances] = useState([]);
  const [draggedFrom, setDraggedFrom] = useState("");
  const handleDragStart = (index, takenFrom) => (event) => {
    event.dataTransfer.setData("index", index);
    setDraggedFrom(takenFrom);
  };

  const handleDrop = (event, target) => {
    if (target !== draggedFrom) {
      toast.error("Can't perform action!");
      return;
    }
    const draggedDiv = event.dataTransfer.getData("index");
    const droppedDiv = event.target.getAttribute("data-index");
    if (draggedDiv !== droppedDiv) {
      let newClearances = Clearances.map((clearance) => {
        if (clearance.AcademicName === target) {
          let newClearanceDetail = [...clearance.ClearanceDetail];
          newClearanceDetail.splice(draggedDiv, 1);
          newClearanceDetail.splice(
            droppedDiv,
            0,
            clearance.ClearanceDetail[draggedDiv]
          );
          return { ...clearance, ClearanceDetail: newClearanceDetail };
        } else {
          return clearance;
        }
      });
      setClearances(newClearances);
    }
  };
  const handlePreRequest = (
    clearanceTarget,
    clearanceDetailTarget,
    value,
    appeal
  ) => {
    const newClearances = Clearances.map((clearance) => {
      if (clearance.AcademicName === clearanceTarget) {
        const newClearanceDetail = clearance.ClearanceDetail.map((detail) => {
          if (detail.ClearanceFieldName === clearanceDetailTarget) {
            let newDetail;
            appeal
              ? (newDetail = {
                  ClearanceFieldName: detail.ClearanceFieldName,
                  ClearanceOrder: detail.ClearanceOrder,
                  Approved: detail.Approved,
                  PreRequest: detail.PreRequest,
                  PreRequestName: detail.PreRequestName,
                  StudentAppeal: value,
                  _id: detail._id,
                })
              : (newDetail = {
                  ClearanceFieldName: detail.ClearanceFieldName,
                  ClearanceOrder: detail.ClearanceOrder,
                  Approved: detail.Approved,
                  PreRequest: value,
                  PreRequestName: detail.PreRequestName,
                  StudentAppeal: detail.StudentAppeal,
                  _id: detail._id,
                });
            return newDetail;
          } else {
            return detail;
          }
        });
        const Clearance = {
          _id: clearance._id,
          AcademicName: clearance.AcademicName,
          ClearanceDetail: newClearanceDetail,
          Completed: clearance.Completed,
          Started: clearance.Started,
        };
        return Clearance;
      } else {
        return clearance;
      }
    });
    setClearances(newClearances);
  };
  const handleSubmit = () => {
    dispatch(defineClearance(Clearances));
  };
  useEffect(() => {
    if (isSuccess) {
      setClearances(message);
    }
    if (isSuccessUpdateClearance) {
      setStepNumber((prev) => prev + 1);
    }
    dispatch(reset());
  }, [isSuccess, message, isSuccessUpdateClearance, setStepNumber, dispatch]);
  useEffect(() => {
    dispatch(getClearanceTypes());
  }, [dispatch]);
  return (
    <>
      {" "}
      <div className="addClearanceContainer">
        {Clearances &&
          Clearances.map((AcademicNames, index) => (
            <div className="clearance col-l-4 " key={index}>
              <h3 className="addClearanceHeaderText">
                Define for {AcademicNames.AcademicName} clearance
              </h3>
              <label className="reorderclearance"> Re-Order Clearance</label>
              <div className="clearancetypesContainer">
                {AcademicNames.ClearanceDetail.map((content, index) => (
                  <div
                    className="clearanceType draggable col-s-4 col-l-5 col-xl-3"
                    key={index}
                    data-index={index}
                    draggable={true}
                    onDragStart={handleDragStart(
                      index,
                      AcademicNames.AcademicName
                    )}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(event) =>
                      handleDrop(event, AcademicNames.AcademicName)
                    }
                  >
                    {" "}
                    {content.ClearanceFieldName}{" "}
                  </div>
                ))}
              </div>
              <label className="reorderclearance"> Pre-Request</label>
              <div className="PreRequestContainer">
                <div className="preRequests">
                  <label style={{ color: "dodgerblue" }}>Clearance</label>
                  <label style={{ color: "dodgerblue" }}> Pre-request</label>
                  <label
                    className="appealCheckBox"
                    style={{ color: "dodgerblue" }}
                  >
                    In-Person
                  </label>
                </div>
                {AcademicNames.ClearanceDetail.map((content, index) => (
                  <div className="preRequests" key={index}>
                    <div className="clearanceFieldNamePreRequest">
                      <label>{content.ClearanceFieldName}</label>
                    </div>
                    <input
                      type="checkbox"
                      disabled={!index}
                      checked={content.PreRequest}
                      onChange={(e) => {
                        handlePreRequest(
                          AcademicNames.AcademicName,
                          content.ClearanceFieldName,
                          e.target.checked,
                          0
                        );
                      }}
                    />
                    <input
                      type="checkbox"
                      checked={content.StudentAppeal}
                      className="appealCheckBox"
                      onChange={(e) => {
                        handlePreRequest(
                          AcademicNames.AcademicName,
                          content.ClearanceFieldName,
                          e.target.checked,
                          1
                        );
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        <div className="nextButtonContainer"></div>
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
      </div>
    </>
  );
};

export default DefineRules;
