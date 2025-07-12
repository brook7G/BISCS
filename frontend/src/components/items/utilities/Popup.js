import { MdClose } from 'react-icons/md';
const Popup = ({
  header,
  content,
  popupConfirm,
  popupCancel,
  setShowPopup,
}) => {
  return (
    <div className="popupContainer" style={{ zIndex: 2 }}>
      <div className="popup col-m-8 col-l-6 col-xl-4">
        <div
          className="closeIconContainer"
          onClick={() => {
            setShowPopup(false);
          }}
        >
          <MdClose />
        </div>
        <div className="centerText"> {header} </div>
        {content}
        <div className="choiceButtonHolder">
          {popupConfirm}
          {popupCancel}
        </div>
      </div>
    </div>
  );
};
export default Popup;
