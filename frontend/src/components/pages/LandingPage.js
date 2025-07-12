import Cube from "../items/utilities/Cube";
import "../items/styles/landingpage.css";
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import Image13 from "../../assets/image16.jpg";
import Image12 from "../../assets/Image14.jpg";
import Image14 from "../../assets/Image12.jpg";
import VscodeImage from "../../assets/vsCode.jpeg";
import ReactImage from "../../assets/React.jpeg";
import NodeImage from "../../assets/node.png";
import mongoImage from "../../assets/mongo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { resetUser } from "../../features/user/userSlice";
import { motion } from "framer-motion";
import { MdDevices } from "react-icons/md";
import { FaLightbulb, FaTachometerAlt } from "react-icons/fa";
const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNavBar, setShowNavBar] = useState(false);
  const { user } = useSelector((state) => state.user);
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5 },
    },
  };
  const handleNavigation = (page) => {
    console.log("user", user);
    if (!user || user.roles !== "1000") {
      toast.error("Access Denied!");
      return;
    }
    navigate(page);
  };
  return (
    <>
      <div className="landingPageHeaderContainer col-l-9">
        <h3 className="logoHolder ">BISCS</h3>
        {showNavBar ? (
          <div
            className="navbarHodler"
            onClick={() => {
              setShowNavBar(false);
            }}
          >
            <MdClose fontSize={20} />
          </div>
        ) : (
          <div
            className="navbarHodler"
            onClick={() => {
              setShowNavBar(true);
            }}
          >
            <FaBars fontSize={18} />
          </div>
        )}

        <ol className="navigationList">
          <li className="navigationItem navigationActive">Home</li>
          <li
            className="navigationItem"
            onClick={() => {
              handleNavigation("/accounts");
            }}
          >
            Account
          </li>
          <li
            className="navigationItem"
            onClick={() => {
              handleNavigation("/define");
            }}
          >
            Clearance
          </li>
          <li
            className="navigationItem"
            onClick={() => {
              handleNavigation("/Initiate");
            }}
          >
            Initiate
          </li>
          {!user ? (
            <li
              className="navigationItem"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </li>
          ) : (
            <li
              className="navigationItem"
              onClick={() => dispatch(resetUser())}
            >
              <FaUser color="blue" />{" "}
              {user.FirstName ? user.FirstName : user.name ? user.name : ""}
            </li>
          )}
        </ol>
      </div>
      {showNavBar && (
        <ol className="navigationListMobile">
          <li className="navigationItem navigationActive">Home</li>
          <li
            className="navigationItem"
            onClick={() => {
              handleNavigation("/accounts");
            }}
          >
            Account
          </li>
          <li
            className="navigationItem"
            onClick={() => {
              handleNavigation("/define");
            }}
          >
            Clearance
          </li>
          <li
            className="navigationItem"
            onClick={() => {
              handleNavigation("/Initiate");
            }}
          >
            Initiate
          </li>
          {!user ? (
            <li
              className="navigationItem"
              onClick={() => {
                navigate("/login");
              }}
            >
              Sign In
            </li>
          ) : (
            <li
              className="navigationItem"
              onClick={() => dispatch(resetUser())}
            >
              <FaUser color="blue" /> {user.FirstName}
            </li>
          )}
        </ol>
      )}
      <div className="heroContainer col-l-9">
        <motion.div
          className="heroContent col-m-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
        >
          <h3 className="heroText">
            Welcome to the Future of Student Clearance!
          </h3>
          <h1 className="heroText">
            Barcode Integrated Student Clearance System
          </h1>
          <p className="heroText">
            A groundbreaking innovation exclusively designed for Jimma
            University, streamlining your clearance process, one scan at a time!
          </p>
          <button
            className="choiceButton"
            style={{ margin: "18px 0" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Get Started
          </button>
        </motion.div>
        <div className="heroContent col-m-6">
          <Cube />
        </div>
      </div>
      <div className="secondpageContainer col-l-9">
        <motion.div
          className="secondPageContent col-m-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        >
          <img src={Image13} alt="Hero" style={{ width: "100%" }} />
        </motion.div>

        <motion.div
          className="secondPageContent col-m-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        >
          <h3 className="center-text">Experience the Power of Innovation.</h3>

          <p className="left-text">
            Scan and get instant information. Define and initiate clearance
            tailored to meet your institution's needs. All processes in one
            place. Stay informed every step of the way. No more waiting, no more
            paperwork. Efficiency at its best. Innovation at Your Fingertips,
            Experience the future of student clearance!
          </p>
        </motion.div>
      </div>
      <div className="benefitsPage col-l-10 col-xl-8">
        <motion.div
          className="benefitContent col-l-3"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        >
          {" "}
          <div className="benefitContentHeader">
            <MdDevices size={32} color="dodgerblue" />
          </div>
          <h2 className="benefitContentHeader">Fully Responsive</h2>
          <p className="benefitContentHeader">
            {" "}
            Designed to work seamlessly on any device. Experience the
            convenience of true responsiveness.
          </p>
        </motion.div>
        <motion.div
          className="benefitContent col-l-3"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.4 }}
        >
          {" "}
          <div className="benefitContentHeader">
            <FaLightbulb size={32} color="gold" />{" "}
          </div>
          <h2 className="benefitContentHeader">Easy To Use</h2>
          <p className="benefitContentHeader">
            {" "}
            With an intuitive interface , our system is user-friendly. We’ve
            made student clearance as simple as a few clicks.
          </p>
        </motion.div>
        <motion.div
          className="benefitContent col-l-3"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.7, ease: "easeInOut", delay: 0.6 }}
        >
          {" "}
          <div className="benefitContentHeader">
            <FaTachometerAlt size={32} color="dodgerblue" />{" "}
          </div>
          <h2 className="benefitContentHeader">Lightning Fast</h2>
          <p className="benefitContentHeader">
            {" "}
            Say goodbye to long waits. Our system is optimized for speed,
            providing you with instant information and process.
          </p>
        </motion.div>
      </div>
      <div className="secondpageContainer col-l-9">
        <motion.div
          className="secondPageContent col-m-6"
          initial={{ translateX: "-105%" }}
          whileInView={{ translateX: "0" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        >
          <h3 className="heroText">
            Seamless Workflow for Seamless Campus Life
          </h3>

          <p className="heroText moreInfoText">
            Imagine a campus life where everything flows smoothly. Our system
            seamlessly integrates with your daily routine, ensuring that
            clearance and workflows becomes a natural part of your campus
            experience. No more disruptions—just focus on what matters most.
          </p>
        </motion.div>
        <motion.div
          className="secondPageContent col-m-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
        >
          <img src={Image12} alt="Hero" style={{ width: "100%" }} />
        </motion.div>
      </div>
      <div className="toolsUsed">
        <motion.img
          whileHover={{
            scale: 1.05,
            cursor: "pointer",
            boxShadow: "0 0 8px dodgerblue",
          }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          className="tools col-l-2"
          src={VscodeImage}
          alt="vscode"
        />
        <motion.img
          whileHover={{
            scale: 1.05,
            cursor: "pointer",
            boxShadow: "0 0 8px dodgerblue",
          }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          className="tools col-l-2"
          src={ReactImage}
          alt="vscode"
        />
        <motion.img
          whileHover={{
            scale: 1.05,
            cursor: "pointer",
            boxShadow: "0 0 8px dodgerblue",
          }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
          className="tools col-l-2"
          src={NodeImage}
          alt="vscode"
        />
        <motion.img
          whileHover={{
            scale: 1.05,
            cursor: "pointer",
            boxShadow: "0 0 8px dodgerblue",
          }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
          className="tools col-l-2"
          src={mongoImage}
          alt="vscode"
        />
      </div>
      <div className="secondpageContainer col-l-9">
        <motion.div
          className="secondPageContent col-m-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        >
          <img src={Image14} alt="Hero" style={{ width: "100%" }} />
        </motion.div>

        <motion.div
          className="secondPageContent col-m-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        >
          <h3 className="center-text">From Queue Lines to Quick Scans.</h3>

          <p className="left-text">
            Picture this: no more waiting in long lines, no more frustration.
            Our barcode scans replace tedious queues, making the clearance
            process as swift as a blink. Get back to what you love—studying,
            connecting, and thriving.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default LandingPage;
