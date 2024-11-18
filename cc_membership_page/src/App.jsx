import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Main from './main';
import LoginPanel from './LoginPanel';
import Registration from './Registration';
import Submit from './Submit';

function App() {
  return (
    <Router>
      <Routes>
        {/* for the future to combine to the main web page */}
        {/* <Route path="/" element={<main />} /> */}
        <Route path="/" element={<LoginPanel />} />
        <Route path="/registartion" element={<Registration />} />
        <Route path="/submit" element={<Submit />} />
      </Routes>
    </Router>
  );
}

export default App;