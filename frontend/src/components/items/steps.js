import "./styles/steps.css";
import { useNavigate } from "react-router-dom";

const Steps = ({ stepNumber }) => {
  const navigate = useNavigate();
  const goStudentPage = () => {
    navigate("/student");
  };
  return (
    <div className="stepContainer">
      <div className="subStepContainer">
        <div className="stepCircle"> 1 </div>
        <div className="stepText"> Academic </div>
      </div>
      <div
        className={`${
          stepNumber < 2
            ? `inactiveLine col-s-1 col-l-1 col-m-1`
            : `stepLine  col-s-1 col-l-1 col-m-1`
        }`}
      >
        {" "}
      </div>
      <div className="subStepContainer">
        <div
          className={`stepCircle ${stepNumber < 2 && `inactiveStep`} `}
          onClick={() => {
            goStudentPage();
          }}
        >
          2
        </div>
        <div className={`stepText ${stepNumber < 2 && `inactiveText`} `}>
          {" "}
          Clearance{" "}
        </div>
      </div>
      <div
        className={`${
          stepNumber < 3
            ? `inactiveLine col-s-1 col-l-1 col-m-1`
            : `stepLine  col-s-1 col-l-1 col-m-1`
        }`}
      >
        {" "}
      </div>
      <div className="subStepContainer">
        <div className={`stepCircle ${stepNumber < 3 && `inactiveStep`} `}>
          {" "}
          3{" "}
        </div>
        <div className={`stepText ${stepNumber < 2 && `inactiveText`} `}>
          {" "}
          Define rule{" "}
        </div>
      </div>
      <div
        className={`${
          stepNumber < 4
            ? `inactiveLine col-s-1 col-l-1 col-m-1`
            : `stepLine  col-s-1 col-l-1 col-m-1`
        }`}
      >
        {" "}
      </div>
      <div className="subStepContainer ">
        <div className={`stepCircle ${stepNumber < 4 && `inactiveStep`} `}>
          {" "}
          4{" "}
        </div>
        <div className="stepText inactiveText"> Complete </div>
      </div>
      <div
        className={`${
          stepNumber < 3
            ? `inactiveLine col-s-1 col-l-1 col-m-1 mobileStepFour`
            : `mobileStepFour stepLine  col-s-1 col-l-1 col-m-1`
        }`}
      >
        {" "}
      </div>
    </div>
  );
};

export default Steps;
