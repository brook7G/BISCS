import '../items/styles/createaccount.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getClearanceDetails,
  reset,
} from '../../features/academicType/clearanceSlice';
import {
  registerUser,
  reset as refreshState,
} from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import Home from '../items/utilities/Home';
const CreateAccounts = () => {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState();
  const [clearanceOfficer, setClearanceOfficer] = useState();
  const [permissions, setPermissions] = useState([]);
  const [clearanceOffice, setClearanceOffice] = useState([]);
  const { isSuccess, message } = useSelector(state => state.clearance);
  const userState = useSelector(state => state.user);
  const handleChange = (permission, value) => {
    if (value) {
      setPermissions([...permissions, permission]);
    } else {
      setPermissions(permissions.filter(a => a !== permission));
    }
  };
  const handleSubmit = () => {
    const data = {
      fullName,
      phoneNumber,
      permissions,
      clearanceOffice: clearanceOfficer,
      roles: 1001,
    };
    dispatch(registerUser(data));
  };

  const resetInputs = () => {
    setFullName('');
    setPhoneNumber('');
    setClearanceOfficer('');
  };
  useEffect(() => {
    const { isSuccess, message } = userState;
    if (isSuccess) {
      toast.success(message);
      resetInputs();
    }
    dispatch(refreshState());
  }, [userState]);
  useEffect(() => {
    if (isSuccess) {
      setClearanceOffice(message);
    }
    dispatch(reset());
  }, [isSuccess, message]);
  useEffect(() => {
    dispatch(getClearanceDetails());
  }, [dispatch]);
  return (
    <>
      <Home />
      <div className="createAccountContainer">
        <div className="leftPanel"></div>
        <div className="rightPanel">
          <div className="previewContainer">
            <h2 className="accountHeadertext glowText"> Create account</h2>
            <div className="centerInputContainer">
              <label className="custom-field one">
                <input
                  type="text"
                  placeholder=" "
                  onChange={e => {
                    setFullName(e.target.value);
                  }}
                  value={fullName}
                />
                <span className="placeholder">Full Name</span>
              </label>
            </div>
            <div className="centerInputContainer">
              <label className="custom-field one">
                <input
                  value={phoneNumber}
                  type="number"
                  placeholder=" "
                  onChange={e => {
                    setPhoneNumber(e.target.value);
                  }}
                />
                <span className="placeholder">Phone Number</span>
              </label>
            </div>
            <div className="centerInputContainer">
              <select
                className="loanitemtypeDropDown"
                onChange={e => {
                  setClearanceOfficer(e.target.value);
                }}
                value={clearanceOfficer}
                style={{
                  width: '52%',
                  border: '2px solid black',
                  minWidth: '250px',
                }}
              >
                <option value="">Clearance Office</option>
                <option value="SecurityOfficer">Security Officer</option>
                {clearanceOffice &&
                  clearanceOffice.map((office, index) => (
                    <option key={index} value={office}>
                      {office}
                    </option>
                  ))}
              </select>
            </div>
            <div className="permissionContainer">
              <p>Scan Barcode</p>
              <input
                type="checkbox"
                role="switch"
                className="toggle"
                onChange={e => {
                  handleChange('Barcode', e.target.checked);
                }}
              />
            </div>
            <div className="permissionContainer">
              <p>Process Clearance</p>
              <input
                type="checkbox"
                role="switch"
                className="toggle"
                onChange={e => {
                  handleChange('Clearance', e.target.checked);
                }}
              />
            </div>
            <div className="permissionContainer">
              <p>Belongings</p>
              <input
                type="checkbox"
                role="switch"
                className="toggle"
                onChange={e => {
                  handleChange('Belongings', e.target.checked);
                }}
              />
            </div>
            <div className="permissionContainer">
              <p>Process Loans</p>
              <input
                type="checkbox"
                role="switch"
                className="toggle"
                onChange={e => {
                  handleChange('Loans', e.target.checked);
                }}
              />
            </div>
            <div className="permissionContainer">
              <p>File Cases</p>
              <input
                type="checkbox"
                role="switch"
                className="toggle"
                onChange={e => {
                  handleChange('FileCase', e.target.checked);
                }}
              />
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
export default CreateAccounts;
