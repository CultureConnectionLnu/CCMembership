import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Home from './Home';
import LoginPanel from './LoginPanel';
import Registration from './Registration';
import Submit from './Submit';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/loginpanel"
          element={
            <SignedOut>
              <LoginPanel />
            </SignedOut>
          }
        />
        <Route
          path="/registration"
          element={
            <SignedOut>
              <Registration />
            </SignedOut>
          }
        />

        {/* Protected Route */}
        <Route
          path="/submit"
          element={
            <SignedIn>
              <Submit />
            </SignedIn>
          }
        />

        {/* Fallback for Unauthenticated Access */}
        <Route
          path="/"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;