import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetUser } from "../../../features/user/userSlice";
const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(resetUser());
  };
  return (
    <div
      className="logoutContainer"
      onClick={() => {
        handleLogout();
      }}
    >
      <FaSignOutAlt />
    </div>
  );
};

export default Logout;
