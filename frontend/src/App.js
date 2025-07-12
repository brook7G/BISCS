import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/items/utilities/Spinner';
import Clearance from './components/pages/Clearance';
import StudentProfile from './components/pages/StudentProfile';
import OfficerPage from './components/pages/OfficerPage';
import InitiateClearance from './components/pages/InitiateClearance';
import CreateAccounts from './components/pages/CreateAccounts';
import Login from './components/pages/Login';
import LandingPage from './components/pages/LandingPage';
function App() {
  const { isLoading } = useSelector(state => state.clearance);
  const loanState = useSelector(state => state.loan);
  const userState = useSelector(state => state.user);

  return (
    <>
      <ToastContainer theme="dark" />
      {isLoading && <Spinner />}
      {loanState.isLoading && <Spinner />}
      {userState.isLoading && <Spinner />}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student" element={<StudentProfile />} />
          <Route path="/officer" element={<OfficerPage />} />
          <Route path="/define" element={<Clearance />} />
          <Route path="/accounts" element={<CreateAccounts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/initiate" element={<InitiateClearance />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
