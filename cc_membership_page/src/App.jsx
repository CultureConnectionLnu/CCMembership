import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Home from "./Home";
import LoginPanel from "./LoginPanel";
import Registration from "./Registration";
import SigninError from "./SigninError";
import Dashboard from "./Dashboard";
import Competition from "./Comp";
import Scoreboard from "./Scoreboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
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
          path="/sign-up"
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
        <Route
          path="/competition"
          element={
            <SignedIn>
              <Competition />
            </SignedIn>
          }
        />
        <Route
          path="/scoreboard"
          element={
            <SignedIn>
              <Scoreboard />
            </SignedIn>
          }
        />

        {/* Fallback for Unauthenticated Access */}
        <Route
          path="*"
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
