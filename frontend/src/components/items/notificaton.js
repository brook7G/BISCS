import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../features/academicType/clearanceSlice";
import { MdClose } from "react-icons/md";
import {
  approveStudentLoans,
  deleteStudentLoans,
} from "../../features/loan/loanSlice";
import { toast } from "react-toastify";
import { reset } from "../../features/loan/loanSlice";

const Notifications = ({ studentId }) => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState("");
  const [popupMessage, setPopUpMessage] = useState(null);
  const { message, isLoading } = useSelector((state) => state.clearance);
  const { isSuccess, isError } = useSelector((state) => state.loan);
  const handleNotificationClick = (notification) => {
    if (
      notification.NotificationType === "Loan" ||
      notification.NotificationType === "Belonging"
    ) {
      setPopUpMessage(notification);
    }
  };

  const handleConfirm = () => {
    const data = {
      loanId: popupMessage.NotificationAction,
      value: true,
      notificatonId: popupMessage._id,
    };
    dispatch(approveStudentLoans(data));
    setPopUpMessage(null);
  };
  const handleCancel = () => {
    const data = {
      loanId: popupMessage.NotificationAction,
      notificatonId: popupMessage._id,
    };
    dispatch(deleteStudentLoans(data));
    setPopUpMessage(null);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success");
      dispatch(getNotifications(studentId));
    }
    if (isError) {
      toast.error("Something went wrong");
    }
    dispatch(reset());
  }, [isSuccess, isError]);
  useEffect(() => {
    if (message) {
      setNotifications(message);
    }
  }, [message]);
  useEffect(() => {
    dispatch(getNotifications(studentId));
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
            <div className="centerText"> Confirm Loan Request</div>
            {popupMessage.NotificationType === "Loan" ? (
              <p className="addClearanceHeaderText">
                {" "}
                You are about to borrow an item?
              </p>
            ) : (
              <p className="addClearanceHeaderText">
                {" "}
                An item is going to be registered as your belonging?
              </p>
            )}

            <div className="choiceButtonHolder">
              <button
                className="choiceButton"
                onClick={() => {
                  handleConfirm();
                }}
              >
                Confirm
              </button>
              <button
                className="choiceButton"
                style={{ backgroundColor: "black" }}
                onClick={() => {
                  handleCancel();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {!notifications.length ? (
        <h3 className="addClearanceHeaderText glowText">
          {" "}
          {!isLoading && "No new notifications"}
        </h3>
      ) : (
        <>
          <h3 className="addClearanceHeaderText glowText">Notifications</h3>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="loanitemHolder"
              style={{ backgroundColor: "black" }}
              onClick={() => {
                handleNotificationClick(notification);
              }}
            >
              <p>{notification.NotificationText}</p>
              <MdClose color="red" fontSize={22} />
            </div>
          ))}
        </>
      )}
    </>
  );
};
export default Notifications;
