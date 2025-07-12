import '../items/styles/createaccount.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import Home from '../items/utilities/Home';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const { isSuccess, message, isError, user } = useSelector(
    state => state.user,
  );

  const handleSubmit = () => {
    const data = {
      phoneNumber: phoneNumber,
      password: password,
    };
    dispatch(login(data));
  };

  useEffect(() => {
    if (isSuccess && user) {
      if (user.StudentId) {
        toast.success(`Welcome ${user.FirstName} ${user.LastName}!`);
        navigate('/student');
      } else if (user.roles == '1000') {
        navigate('/');
      } else {
        toast.success(`Welcome ${user.name}!`);
        navigate('/officer');
      }
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isSuccess, message]);
  return (
    <>
      <Home />
      <div className="createAccountContainer">
        <div className="leftPanelLogin"></div>
        <div className="rightPanel">
          <div className="previewContainer">
            <h2 className="accountHeadertext glowText">Sign In</h2>
            <div className="centerInputContainer">
              <label className="custom-field one">
                <input
                  type="text"
                  placeholder=" "
                  onChange={e => {
                    setPhoneNumber(e.target.value);
                  }}
                />
                <span className="placeholder">ID or Phone Number</span>
              </label>
            </div>
            <div className="centerInputContainer">
              <label className="custom-field one">
                <input
                  type="password"
                  placeholder=" "
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
                <span className="placeholder">Password</span>
              </label>
            </div>

            <div className="centerInputContainer" style={{ marginTop: '22px' }}>
              <button
                className="choiceButton "
                style={{ minWidth: '250px' }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
