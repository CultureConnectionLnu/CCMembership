import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import LoginPanel from './LoginPanel';
import Registration from './Registration';
import Submit from './Submit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginpanel" element={<LoginPanel />} />
        <Route path="/registartion" element={<Registration />} />
        <Route path="/submit" element={<Submit />} />
      </Routes>
    </Router>
  );
}

export default App;