import { useState } from "react";
import ClearanceTypes from "../items/clearanceTypes";
import AddClearance from "../items/addClearance";
import DefineRules from "../items/defineRules";
import ClearancePreview from "../clearancePreview";
import Steps from "../items/steps";
const Clearance = () => {
  const [stepNumber, setStepNumber] = useState(1);
  return (
    <>
      <div className="mainContainer">
        <Steps stepNumber={stepNumber} />
        {stepNumber === 1 && <ClearanceTypes setStepNumber={setStepNumber} />}
        {stepNumber === 2 && <AddClearance setStepNumber={setStepNumber} />}
        {stepNumber === 3 && <DefineRules setStepNumber={setStepNumber} />}
        {stepNumber === 4 && <ClearancePreview setStepNumber={setStepNumber} />}
      </div>
    </>
  );
};
export default Clearance;
