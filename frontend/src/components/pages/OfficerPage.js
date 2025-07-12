import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../items/styles/studentprofile.css";
import {
  FaSuitcase,
  FaHandHoldingUsd,
  FaGavel,
  FaClipboardList,
  FaQrcode,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import ScanBarcode from "../items/scanBarcode";
import ApproveClearance from "../items/approveClearance";
import StudentInfo from "../items/studentInfo";
import LoanItem from "../items/loanItem";
import { deleteStudentLoans } from "../../features/loan/loanSlice";
import StudentFileCase from "../items/studentFileCase";
import { toast } from "react-toastify";
import { saveLocation } from "../../features/user/userSlice";
import { ReactBingmaps } from "react-bingmaps";
import Logout from "../items/utilities/Logout";
const OfficerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contentIndex, setContentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [studentId, setStudentId] = useState();
  const [loanStateChange, setLoanStateChange] = useState(false);
  const animationIndexRef = useRef(animationIndex);
  const [popupMessage, setPopUpMessage] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [defaultLocation, setDefaultLoaction] = useState();
  const handleLoanReturn = () => {
    const data = {
      loanId: popupMessage._id,
    };
    dispatch(deleteStudentLoans(data));
    setPopUpMessage(null);
    setLoanStateChange(true);
  };

  const checkPermission = (req, index) => {
    const permissions = user.permissions;
    const result = permissions.find((permission) => permission === req);
    if (result) {
      if (req === "Barcode") {
        setStudentId();
        setContentIndex(1);
        setPrevIndex(0);
      }
      setContentIndex(index);
    } else {
      toast.error("Access Denied!");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user && !user.roles) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [user]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDefaultLoaction([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (defaultLocation) {
      const data = {
        Id: user._id,
        location: defaultLocation,
      };
      dispatch(saveLocation(data));
    }
  }, [defaultLocation]);

  useEffect(() => {
    if (studentId && prevIndex) {
      setContentIndex(prevIndex);
    }
  }, [studentId, prevIndex]);
  useEffect(() => {
    animationIndexRef.current = animationIndex;
  }, [animationIndex]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (animationIndexRef.current === 5) {
        clearInterval(interval);
        setAnimationIndex(0);
      } else {
        setAnimationIndex(animationIndexRef.current + 1);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {popupMessage && (
        <div className="popupContainer" style={{ zIndex: 2 }}>
          <div className="popup col-m-8 col-l-6 col-xl-4">
            <div
              className="closeIconContainer"
              onClick={() => setPopUpMessage(null)}
            >
              <MdClose />
            </div>
            <div className="centerText"> Confirm </div>
            {popupMessage.ItemCategory === "FileCase" ? (
              <p className="addClearanceHeaderText" style={{ color: "white" }}>
                {" "}
                Is the student case resolved?
              </p>
            ) : (
              <p className="addClearanceHeaderText" style={{ color: "white" }}>
                {" "}
                Did the student return the {popupMessage.ItemName}?
              </p>
            )}

            <div className="choiceButtonHolder">
              <button
                className="choiceButton"
                onClick={() => {
                  handleLoanReturn();
                }}
              >
                Yes
              </button>
              <button
                className="choiceButton"
                style={{ backgroundColor: "black" }}
                onClick={() => setPopUpMessage(null)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="OfficerHeaderContainer col-l-8">
        <Logout />
        <h1 style={{ color: "lightgreen" }}> {user?.clearanceOffice}</h1>
        <div className="menuContainer">
          <ul className="studentMenuHeader">
            <li
              className={`studentMenuItem ${
                contentIndex === 1 && `studentMenuItemActive`
              } `}
              onClick={() => checkPermission("Barcode", 1)}
            >
              Scan
            </li>
            <li
              className={`studentMenuItem ${
                contentIndex === 2 && `studentMenuItemActive`
              }`}
              onClick={() => checkPermission("Clearance", 2)}
            >
              Clearance
            </li>
            <li
              className={`studentMenuItem ${
                contentIndex === 3 && `studentMenuItemActive`
              }`}
              onClick={() => checkPermission("Loans", 3)}
            >
              Loan
            </li>
            <li
              className={`studentMenuItem ${
                contentIndex === 4 && `studentMenuItemActive`
              }`}
              onClick={() => checkPermission("FileCase", 4)}
            >
              Cases
            </li>
            <li
              className={`studentMenuItem ${
                contentIndex === 5 && `studentMenuItemActive`
              }`}
              onClick={() => checkPermission("Belongings", 5)}
            >
              Belonging
            </li>
          </ul>
        </div>
      </div>
      <div className="studentMobilMenuContainer">
        <ul className="studentMobileiconList">
          <li
            className={`listItemMobileIcon  ${
              contentIndex === 1 ? `listItemMobileIconActive` : ""
            } ${animationIndex === 1 ? `waveturn` : ""}`}
            onClick={() => checkPermission("Barcode", 1)}
          >
            {" "}
            <FaQrcode />
          </li>
          <li
            className={`listItemMobileIcon  ${
              contentIndex === 2 ? `listItemMobileIconActive` : ""
            } ${animationIndex === 2 ? `waveturn` : ""}`}
            onClick={() => checkPermission("Clearance", 2)}
          >
            {" "}
            <FaClipboardList />
          </li>
          <li
            className={`listItemMobileIcon  ${
              contentIndex === 3 ? `listItemMobileIconActive` : ""
            } ${animationIndex === 3 ? `waveturn` : ""}`}
            onClick={() => checkPermission("Loans", 3)}
          >
            <FaHandHoldingUsd />
          </li>
          <li
            className={`listItemMobileIcon  ${
              contentIndex === 4 ? `listItemMobileIconActive` : ""
            } ${animationIndex === 4 ? `waveturn` : ""}`}
            onClick={() => checkPermission("FileCase", 4)}
          >
            <FaGavel />
          </li>
          <li
            className={`listItemMobileIcon  ${
              contentIndex === 5 ? `listItemMobileIconActive` : ""
            } ${animationIndex === 5 ? `waveturn` : ""}`}
            onClick={() => checkPermission("Belongings", 5)}
          >
            <FaSuitcase />
          </li>
        </ul>
      </div>
      <div className="studentPageContent">
        {contentIndex === 0 && defaultLocation && (
          <div
            style={{
              width: "100%",
              height: "40vh",
              border: "1px solid black",
            }}
          >
            <ReactBingmaps
              bingmapKey="AuJ-09hG9klQpIlE48fGFMRXOjVi_LV19JxbOdKFcXzCefZJvue0DWOYvvpuYQSh"
              center={defaultLocation}
              zoom={17}
              mapTypeId={"aerial"}
              pushPins={[
                {
                  location: defaultLocation,
                  option: { color: "red" },
                },
              ]}
            ></ReactBingmaps>
          </div>
        )}
        {contentIndex === 1 && studentId && (
          <StudentInfo studentId={studentId} />
        )}
        {contentIndex === 1 && !studentId && (
          <ScanBarcode setStudentId={setStudentId} />
        )}
        {contentIndex === 2 && (
          <ApproveClearance
            clearanceOffice={user && user.clearanceOffice}
            setContentIndex={setContentIndex}
            setStudentId={setStudentId}
            setPrevIndex={setPrevIndex}
          />
        )}
        {contentIndex === 3 && (
          <LoanItem
            contentIndex={contentIndex}
            setContentIndex={setContentIndex}
            studentId={studentId}
            setStudentId={setStudentId}
            setPopUpMessage={setPopUpMessage}
            loanStateChange={loanStateChange}
            setLoanStateChange={setLoanStateChange}
            setPrevIndex={setPrevIndex}
          />
        )}
        {contentIndex === 4 && (
          <StudentFileCase
            contentIndex={contentIndex}
            setContentIndex={setContentIndex}
            studentId={studentId}
            setStudentId={setStudentId}
            setPopUpMessage={setPopUpMessage}
            loanStateChange={loanStateChange}
            setLoanStateChange={setLoanStateChange}
            setPrevIndex={setPrevIndex}
          />
        )}
        {contentIndex === 5 && (
          <LoanItem
            contentIndex={contentIndex}
            setContentIndex={setContentIndex}
            studentId={studentId}
            setStudentId={setStudentId}
            setPopUpMessage={setPopUpMessage}
            loanStateChange={loanStateChange}
            setLoanStateChange={setLoanStateChange}
            setPrevIndex={setPrevIndex}
          />
        )}
      </div>
    </>
  );
};
export default OfficerPage;
