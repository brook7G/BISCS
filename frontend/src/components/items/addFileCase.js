import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLoan } from "../../features/loan/loanSlice";
import { toast } from "react-toastify";
import { reset } from "../../features/loan/loanSlice";

const AddFileCase = ({ studentId, setStep, contentIndex }) => {
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector((state) => state.loan);
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [uniqueRef, setUniqueRef] = useState("");
  const [quantity, setQuantity] = useState();

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("StudentId", studentId);
    formData.append("ItemName", itemName);
    formData.append("ItemType", itemType);
    formData.append("UniqueRef", uniqueRef);
    formData.append("Quantity", quantity);
    formData.append("ItemCategory", "FileCase");
    dispatch(createLoan(formData));
  };

  const resetInputs = () => {
    setItemName("");
    setItemType("");
    setUniqueRef("");
    setQuantity("");
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("File Case Created");
      resetInputs();
      dispatch(reset());
    }
    if (isError) {
      toast.error("Error occured");
    }
  }, [isSuccess, isError]);
  return (
    <>
      <div className="choiceButtonHolder">
        <label className="custom-field">
          <label className="custom-field one">
            <input
              type="text"
              placeholder=" "
              onChange={(e) => {
                setItemName(e.target.value);
              }}
              value={itemName}
            />
            <span className="placeholder">Case Name</span>
          </label>
          <select
            className="loanitemtypeDropDown"
            onChange={(e) => {
              setItemType(e.target.value);
            }}
            value={itemType}
          >
            <option value="">Case Type</option>
            <option value="Robbery">Robbery</option>
            <option value="Assault">Assault</option>
            <option value="Fraud">Fraud</option>
            <option value="Narcotics">Narcotics</option>
            <option value="Other">Other</option>
          </select>

          <label className="custom-field one">
            <input
              type="text"
              placeholder=" "
              onChange={(e) => {
                setUniqueRef(e.target.value);
              }}
              value={uniqueRef}
            />
            <span className="placeholder">Unique Ref</span>
          </label>
          <label className="custom-field one">
            <input
              type="number"
              placeholder=" "
              min={1}
              max={10}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              value={quantity}
            />
            <span className="placeholder">Severity</span>
          </label>
        </label>

        <button
          className="previouschoiceButton"
          onClick={() => {
            setStep(0);
          }}
        >
          Back
        </button>
        <button
          className="choiceButton"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};
export default AddFileCase;
