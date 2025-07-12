import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentLoans, reset } from "../../features/loan/loanSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

const StudentBorrowedItem = ({ studentId }) => {
  const dispatch = useDispatch();
  const [loanInfo, setLoanInfo] = useState("");
  const { message, isLoading } = useSelector((state) => state.loan);

  useEffect(() => {
    if (message) {
      setLoanInfo(message);
    }
    dispatch(reset());
  }, [message]);
  useEffect(() => {
    dispatch(getStudentLoans({ studentId: studentId }));
  }, []);
  return (
    <>
      {loanInfo.length ? (
        <h3 className="addClearanceHeaderText glowText"> Borrowed items</h3>
      ) : (
        <h3 className="addClearanceHeaderText glowText">
          {" "}
          {!isLoading && "No borrowed item"}
        </h3>
      )}

      {loanInfo &&
        loanInfo.map((info, index) => (
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

export default StudentBorrowedItem;
