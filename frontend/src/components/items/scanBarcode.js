import { useState, useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
const ScanBarcode = ({ setStudentId }) => {
  const [scanResult, setScanResult] = useState("");
  
  const handleResult = (text, result) => {
    setScanResult(text);
  };

  useEffect(() => {
    setStudentId(scanResult);
  }, [scanResult]);
  return (
    <>
      <div
        className="barcodeScannerContainer"
        style={{
          width: "200px",
          height: "200px",
          margin: "auto",
        }}
      >
        <Scanner
          onResult={(text, result) => handleResult(text, result)}
          onError={(error) => console.log(error)}
          components={{ audio: false }}
        />
      </div>
    </>
  );
};
export default ScanBarcode;
