import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useMemo, useRef } from "react";
import {
  approveStudentClearance,
  getSpecificStudentClearances,
} from "../../features/academicType/clearanceSlice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { reset } from "../../features/academicType/clearanceSlice";
import { toast } from "react-toastify";
const ApproveClearance = ({
  setContentIndex,
  setStudentId,
  setPrevIndex,
  clearanceOffice,
}) => {
  const dispatch = useDispatch();
  const [userChoice, setUserChoice] = useState(0);
  const { message, isError } = useSelector((state) => state.clearance);
  const [studentInfo, setStudentInfo] = useState(message);

  const studentInfoRef = useRef();
  studentInfoRef.current = studentInfo;
  const BtnCellRenderer = (value) => {
    const btnClickedHandler = (event) => {
      const data = {
        updateType: 1,
        clearanceId: value.data.Id,
        value: event.target.checked,
        ClearanceFieldName: clearanceOffice,
      };
      dispatch(approveStudentClearance(data));
    };
    const checkMultipleApproved = () => {
      if (studentInfoRef.current) {
        for (const student of studentInfoRef.current) {
          if (student.StudentId === value.data.studentId) {
            const clearanceDetail = student.ClearanceDetail;
            for (const detail of clearanceDetail) {
              if (detail && detail.ClearanceFieldName === clearanceOffice) {
                return detail.Approved;
              }
            }
          }
        }
        return true;
      }
    };
    return (
      <input
        type="checkbox"
        onChange={btnClickedHandler}
        checked={checkMultipleApproved()}
      />
    );
  };
  const [columnDefs] = useState([
    {
      field: "FullName",
      filter: true,
    },

    {
      field: "studentId",
      filter: true,
    },
    {
      field: "Id",
      filter: true,
      hide: true,
    },

    {
      field: "Approve",
      cellRenderer: BtnCellRenderer,
      cellRendererParams: (params) => ({
        Info: message ? message : studentInfo,
      }),
      filter: true,
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);

  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  const checkApproved = () => {
    const clearanceDetail = studentInfo.clearance.ClearanceDetail;
    for (const detail of clearanceDetail) {
      if (detail && detail.ClearanceFieldName === clearanceOffice) {
        return detail.Approved;
      }
    }
  };

  useEffect(() => {
    if (message) {
      setStudentInfo(message);
    }
    if (isError) {
      toast.error("Something went wrong");
    }
    dispatch(reset());
  }, [message, isError]);
  const handleChoice = () => {
    dispatch(getSpecificStudentClearances(clearanceOffice));
  };
  const handleChange = (value) => {
    const data = {
      updateType: 0,
      clearanceId: studentInfo.clearance._id,
      value: value,
      ClearanceFieldName: clearanceOffice,
    };
    dispatch(approveStudentClearance(data));
  };
  return (
    <>
      <h3 className="addClearanceHeaderText glowText">
        Approve Student Clearance
      </h3>
      {!userChoice && !studentInfo && (
        <div className="choiceButtonHolder">
          <button
            className="choiceButton"
            onClick={() => {
              setUserChoice(1);
            }}
          >
            Single
          </button>
          <button
            className="choiceButton"
            onClick={() => {
              handleChoice();
            }}
          >
            Multiple
          </button>
        </div>
      )}
      {userChoice === 1 && (
        <div className="choiceButtonHolder">
          <button
            className="previouschoiceButton"
            onClick={() => setUserChoice(0)}
          >
            Back
          </button>
          <button
            className="choiceButton"
            onClick={() => {
              setContentIndex(1);
              setPrevIndex(2);
            }}
          >
            Scan
          </button>
        </div>
      )}
      {studentInfo && Array.isArray(studentInfo) && (
        <>
          <div
            className="ag-theme-alpine-dark"
            style={{
              height: 200,
              width: "90%",
              margin: "auto",
            }}
          >
            <AgGridReact
              rowData={studentInfo.map((student) => ({
                FullName: student.FullName,
                studentId: student.StudentId,
                Id: student._id,
                Approve: student.Approved,
              }))}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              popupParent={popupParent}
            ></AgGridReact>
          </div>
          <div className="choiceButtonHolder">
            <button
              className="previouschoiceButton"
              onClick={() => {
                setUserChoice(0);
                setStudentInfo();
              }}
            >
              Back
            </button>
          </div>
        </>
      )}

      {studentInfo &&
        !Array.isArray(studentInfo) &&
        (!studentInfo?.clearance?.Started ? (
          <div className="addClearanceHeaderText glowText">
            {" "}
            Clearance not Started for
            <h4 style={{ textDecoration: "underline" }}>
              {studentInfo.clearance.FullName}
            </h4>
          </div>
        ) : (
          <>
            <div className="CleranceDetailContainer">
              <label>{studentInfo.clearance.FullName}</label>
              <input
                type="checkbox"
                onChange={(e) => handleChange(e.target.checked)}
                checked={checkApproved()}
              />
            </div>
            <div className="choiceButtonHolder">
              <button
                className="previouschoiceButton"
                onClick={() => {
                  setUserChoice(0);
                  setStudentInfo();
                  setStudentId("");
                }}
              >
                Back
              </button>
            </div>
          </>
        ))}
    </>
  );
};
export default ApproveClearance;
