import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentBelongings, reset } from "../../features/loan/loanSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
const StudentBelongings = ({ studentId }) => {
  const dispatch = useDispatch();
  const [studentInfo, setStudentInfo] = useState();
  const { isSuccess, message, isLoading } = useSelector((state) => state.loan);

  useEffect(() => {
    if (isSuccess) {
      setStudentInfo(message);
    }
    dispatch(reset());
  }, [isSuccess]);
  useEffect(() => {
    dispatch(getStudentBelongings({ studentId: studentId }));
  }, []);
  return (
    <>
      {studentInfo ? (
        <h3 className="addClearanceHeaderText glowText">Your belongings</h3>
      ) : (
        <h3 className="addClearanceHeaderText">
          {" "}
          {!isLoading && "No belongings yet"}
        </h3>
      )}

      {studentInfo &&
        studentInfo.map((info, index) => (
          <div key={index} className="loanitemHolder">
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
    </>
  );
};
export default StudentBelongings;
