import { getStudentInfo } from "../../features/academicType/clearanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const StudentInfo = ({ studentId }) => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.clearance);

  useEffect(() => {
    dispatch(getStudentInfo(studentId));
  }, []);
  return (
    <>
      {message && (
        <>
          <h3 className="addClearanceHeaderText">Student InFormation</h3>
          <h5 className="addClearanceHeaderText">
            {" "}
            ID: {message.student.StudentId}{" "}
          </h5>
          <h5 className="addClearanceHeaderText">
            {" "}
            Full Name: {message.student.FirstName} {message.student.LastName}
          </h5>
          <h5 className="addClearanceHeaderText">
            {" "}
            Academic Type: {message.student.EnrolledIn}{" "}
          </h5>
          <h5 className="addClearanceHeaderText">
            {" "}
            Department: {message.student.Department}{" "}
          </h5>
          <h5 className="addClearanceHeaderText">
            {" "}
            Block: {message.student.Block}{" "}
          </h5>
          <h5 className="addClearanceHeaderText">
            {" "}
            RoomNo: {message.student.RoomNo}{" "}
          </h5>
          {message.clearance.Started && !message.clearance.Completed && (
            <h5 className="addClearanceHeaderText">
              {" "}
              Clearance: <span style={{ color: "red" }}> Not completed</span>
            </h5>
          )}
          {message.clearance.Started && message.clearance.Completed && (
            <h5 className="addClearanceHeaderText">
              {" "}
              Clearance: <span style={{ color: "green" }}> Completed</span>
            </h5>
          )}
        </>
      )}
    </>
  );
};
export default StudentInfo;
