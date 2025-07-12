import { useDispatch, useSelector } from "react-redux";
import { getStudentClearance } from "../../features/academicType/clearanceSlice";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { reset } from "../../features/academicType/clearanceSlice";
import Beep from "./utilities/Beep";
import { useWebSocket } from "../../features/hooks/useWebSocket";
import { toast } from "react-toastify";
import { getLocation } from "../../features/user/userSlice";
const StudentClearance = ({ studentId, setShowPopup, setOfficerLocation }) => {
  const ws = useWebSocket(studentId);
  const dispatch = useDispatch();
  const { message, isSuccess, isLoading } = useSelector(
    (state) => state.clearance
  );
  const userState = useSelector((state) => state.user);
  const [studentClearance, setStudentClearance] = useState("");

  const handleClick = (detail) => {
    if (detail.StudentAppeal) {
      const data = {
        clearanceOffice: detail.ClearanceFieldName,
      };
      dispatch(getLocation(data));
    }
  };
  useEffect(() => {
    const { message, isSuccess } = userState;
    if (isSuccess) {
      setShowPopup(true);
      setOfficerLocation(message.location);
    }
  }, [userState]);
  useEffect(() => {
    if (isSuccess) {
      setStudentClearance(message);
    }
    dispatch(reset());
  }, [isSuccess]);

  useEffect(() => {
    dispatch(getStudentClearance(studentId));
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (evt) => {
        const successMessage = JSON.parse(evt.data);
        toast.success(successMessage);
        Beep(200, 440, 100);
        if ("vibrate" in navigator) {
          navigator.vibrate([1000, 500, 2000]);
        } else {
          console.log("Vibration is not supported on this device.");
        }

        dispatch(getStudentClearance(studentId));
      };
    }
  }, [ws]);
  return (
    <>
      {studentClearance &&
        studentClearance.Deadline &&
        !studentClearance.Completed && (
          <div className="deadLineDateShow">
            {new Date(studentClearance.Deadline).toLocaleDateString("en-GB")}
          </div>
        )}
      {studentClearance && studentClearance.Completed && (
        <div className="deadLineDateShow" style={{ color: "lightgreen" }}>
          Completed
        </div>
      )}
      {studentClearance && !studentClearance.Started && (
        <h3 className="addClearanceHeaderText glowText">
          {!isLoading && "Clearance not started"}
        </h3>
      )}
      {studentClearance && studentClearance.Started && (
        <>
          <h3 className="addClearanceHeaderText glowText">
            Clearance has started
          </h3>
          {studentClearance.ClearanceDetail.map((detail) => (
            <div
              className="CleranceDetailContainer"
              onClick={() => {
                handleClick(detail);
              }}
            >
              <h4>
                {" "}
                {detail.ClearanceFieldName} &nbsp;
                {detail.StudentAppeal && <FaUser color="lightgreen" />}
                &nbsp;
                {detail.PreRequest && <FaInfoCircle color="lightblue" />}
              </h4>
              <>
                <input type="checkbox" checked={detail.Approved} />
              </>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default StudentClearance;
