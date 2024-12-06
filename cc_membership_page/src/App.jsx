import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Home from './Home';
import LoginPanel from './LoginPanel';
import Registration from './Registration';
import SigninError from './SigninError';
import Dashboard from './Dashboard';
import Competition from './Comp';


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
          path="/SigninError"
          element={
            <SignedOut>
              <SigninError />
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
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
                {/* Protected Route */}
        <Route
          path="/competition"
          element={
            <SignedIn>
              <Competition />
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