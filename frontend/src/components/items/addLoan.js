import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLoan } from "../../features/loan/loanSlice";
import { toast } from "react-toastify";
import { reset } from "../../features/loan/loanSlice";
const AddLoan = ({ studentId, setStep, contentIndex }) => {
  const dispatch = useDispatch();
  const imageRef = useRef();
  const { isSuccess, isError } = useSelector((state) => state.loan);
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [uniqueRef, setUniqueRef] = useState("");
  const [quantity, setQuantity] = useState();
  const [itemImage, setImage] = useState("");

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("StudentId", studentId);
    formData.append("ItemName", itemName);
    formData.append("ItemType", itemType);
    formData.append("UniqueRef", uniqueRef);
    formData.append("Quantity", quantity);
    formData.append("image", itemImage[0]);
    contentIndex === 3
      ? formData.append("Belonging", false)
      : formData.append("Belonging", true);
    contentIndex === 3
      ? formData.append("ItemCategory", "Loan")
      : formData.append("ItemCategory", "Belonging");
    dispatch(createLoan(formData));
  };

  const resetInputs = () => {
    setItemName("");
    setItemType("");
    setUniqueRef("");
    setQuantity("");
    setImage("");
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };
  useEffect(() => {
    if (isSuccess) {
      contentIndex === 5
        ? toast.success("Belonging created")
        : toast.success("Loan created");
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
            <span className="placeholder">Item Name</span>
          </label>
          <select
            className="loanitemtypeDropDown"
            onChange={(e) => {
              setItemType(e.target.value);
            }}
            value={itemType}
          >
            <option value="">Item Type</option>
            <option value="Cloth">Cloth</option>
            <option value="Electronics">Electronics</option>
            <option value="Book">Book</option>
            <option value="Mattress">Mattress</option>
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
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              value={quantity}
            />
            <span className="placeholder">Quantity</span>
          </label>
        </label>
        <label className="custom-field one">
          <input
            ref={imageRef}
            type="file"
            placeholder=" "
            accept="Image/*"
            capture="camera"
            onChange={(e) => {
              setImage(e.target.files);
            }}
          />
          <span className="placeholder">Item Image</span>
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

export default AddLoan;
