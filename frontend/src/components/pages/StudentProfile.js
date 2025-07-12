import '../items/styles/studentprofile.css';
import QRCode from 'react-qr-code';
import {
  FaHandHoldingUsd,
  FaBell,
  FaGavel,
  FaSuitcase,
  FaClipboardList,
  FaSignOutAlt,
} from 'react-icons/fa';
import StudentClearance from '../items/studentClearance';
import StudentBelongings from '../items/studentBelongings';
import StudentBorrowedItem from '../items/studentBorrowedItem';
import Notifications from '../items/notificaton';
import { useState, useEffect, useRef } from 'react';
import FileCase from '../items/fileCase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logout from '../items/utilities/Logout';
import Popup from '../items/utilities/Popup';
import Map from '../items/utilities/Map';
const StudentProfile = () => {
  const navigate = useNavigate();
  const [contentIndex, setContentIndex] = useState(1);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [opacity, setOpacity] = useState(0.6);
  const [showPopup, setShowPopup] = useState(false);
  const animationIndexRef = useRef(animationIndex);
  const { user } = useSelector(state => state.user);
  const studentId = user && user.StudentId;
  const [defaultLocation, setDefaultLoaction] = useState();
  const [locationColor, setLocationColor] = useState(true);
  const [officerLocation, setOfficerLocation] = useState();

  const handleOpactityChange = () => {
    if (opacity >= 1) {
      setOpacity(0.1);
    } else {
      setOpacity(opacity + 0.1);
    }
  };
  useEffect(() => {
    if (!user || !user.StudentId) {
      navigate('/login');
    }
  }, [user]);
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
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setDefaultLoaction([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <>
      {showPopup && defaultLocation && officerLocation && (
        <Popup
          header={'Clearance Location'}
          content={
            <Map
              defaultLocation={defaultLocation}
              pushPin={[
                {
                  location: locationColor && defaultLocation,
                  option: locationColor && { color: 'red' },
                  addHandler: locationColor && {
                    type: 'click',
                    callback: () => {
                      setLocationColor(false);
                    },
                  },
                },
                {
                  location: officerLocation,
                  option: { color: 'blue' },
                  addHandler: {
                    type: 'click',
                    callback: () => {
                      setLocationColor(true);
                    },
                  },
                },
              ]}
            />
          }
          setShowPopup={setShowPopup}
        />
      )}
      <div className="profileHeaderContainer col-l-8">
        <Logout />
        <div className="BarcodeContainer">
          <QRCode
            value={`${studentId}`}
            className="barcode"
            style={{ opacity: opacity }}
            onClick={() => {
              handleOpactityChange();
            }}
          />{' '}
        </div>
        <div className="studentProfileContainer">
          <div className="studentProfilePicture"></div>
          <div className="stuentFullName">
            {user && user.FirstName + ' ' + user.LastName}
          </div>
        </div>
        <div className="menuContainer">
          <ul className="studentMenuHeader">
            <li
              className={`studentMenuItem ${
                contentIndex === 1 && `studentMenuItemActive`
              } `}
              onClick={() => setContentIndex(1)}
            >
              Clearance
            </li>
            <li
              className={`studentMenuItem ${
                contentIndex === 2 && `studentMenuItemActive`
              }`}
              onClick={() => setContentIndex(2)}
            >
              Belongings
            </li>
            <li
              className={`studentMenuItem ${
                contentIndex === 3 && `studentMenuItemActive`
              }`}
              onClick={() => setContentIndex(3)}
            >
              Cases
            </li>
            <li
              className={`studentMenuItem ${
                contentIndex === 4 && `studentMenuItemActive`
              }`}
              onClick={() => setContentIndex(4)}
            >
              Loans
            </li>
            <li
              className={`studentMenuItem ${
                contentIndex === 5 && `studentMenuItemActive`
              }`}
              onClick={() => setContentIndex(5)}
            >
              Notifications
            </li>
          </ul>
        </div>
      </div>
      <div className="studentMobilMenuContainer">
        <ul className="studentMobileiconList">
          <li
            className={`listItemMobileIcon  ${
              contentIndex === 1 ? `listItemMobileIconActive` : ''
            } ${animationIndex === 1 ? `waveturn` : ''}`}
            onClick={() => setContentIndex(1)}
          >
            {' '}
            <FaClipboardList />
          </li>
          <li
            className={`listItemMobileIcon  ${
              contentIndex === 2 ? `listItemMobileIconActive` : ''
            } ${animationIndex === 2 ? `waveturn` : ''}`}
            onClick={() => setContentIndex(2)}
          >
            {' '}
            <FaSuitcase />
          </li>
          <li
            className={`listItemMobileIcon  ${
              contentIndex === 3 ? `listItemMobileIconActive` : ''
            } ${animationIndex === 3 ? `waveturn` : ''}`}
            onClick={() => setContentIndex(3)}
          >
            <FaGavel />
          </li>
          <li
            className={`listItemMobileIcon  ${
              contentIndex === 4 ? `listItemMobileIconActive` : ''
            } ${animationIndex === 4 ? `waveturn` : ''}`}
            onClick={() => setContentIndex(4)}
          >
            <FaHandHoldingUsd />
          </li>
          <li
            className={`listItemMobileIcon  ${
              contentIndex === 5 ? `listItemMobileIconActive` : ''
            } ${animationIndex === 5 ? `waveturn` : ''}`}
            onClick={() => setContentIndex(5)}
          >
            <FaBell />
          </li>
        </ul>
      </div>
      <div className="studentPageContent">
        {contentIndex === 1 && user && (
          <StudentClearance
            studentId={studentId}
            setShowPopup={setShowPopup}
            setOfficerLocation={setOfficerLocation}
          />
        )}
        {contentIndex === 2 && <StudentBelongings studentId={studentId} />}
        {contentIndex === 3 && <FileCase studentId={studentId} />}
        {contentIndex === 4 && <StudentBorrowedItem studentId={studentId} />}
        {contentIndex === 5 && <Notifications studentId={studentId} />}
      </div>
    </>
  );
};
export default StudentProfile;
