import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentFileCase, reset } from "../../features/loan/loanSlice";

const FileCase = ({ studentId }) => {
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
    dispatch(getStudentFileCase({ studentId: studentId }));
  }, []);
  return (
    <>
      {loanInfo.length ? (
        <h3 className="addClearanceHeaderText glowText"> File Cases</h3>
      ) : (
        <h3 className="addClearanceHeaderText glowText">
          {" "}
          {!isLoading && "No Filed Cases"}
        </h3>
      )}

      {loanInfo &&
        loanInfo.map((info, index) => (
          <div key={index} className="loanitemHolder">
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
    </>
  );
};

export default FileCase;
