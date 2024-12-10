import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CCLogo from "./assets/CCLogo.png";
import CCLogo_inactive from "./assets/CCLogo_inactive.png";
import arrow from "./assets/arrow.png";
import SocialIcons from "./Socialmedia.jsx";

function Card() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setUsername(user.username || "Anonymous User");
    }
    setLoading(false);
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="error">
        You must be signed in to view your membership card.
      </div>
    );
  }

  const handleBack = async () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <div className="card-container w-[100%] max-w-md bg-white shadow-lg rounded-lg p-6">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              className="flex items-center justify-center py-2 px-4 rounded transition"
            >
              <img src={arrow} alt="Button Icon" className="w-6 h-6 mr-2" />
            </button>
            <h2 className="text-2xl font-bold pt-4">
              Culture Connection Member
            </h2>
          </div>

          {/* User Information */}
          <div className="card-body">
            <div className="user-avatar mb-4">
              <img
                src={getStatus() ? CCLogo : CCLogo_inactive}
                alt="Cultutre COnnection Logo"
                className="w-50 h-50 rounded-full mx-auto border-2 border-gray-300"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 text-center">
              Name: {username}
            </h3>
            <h3 className="text-xl font-semibold text-gray-700 text-center">
              Status: {getStatus() ? "Active" : "Inactive"}
            </h3>
            <h3 className="text-xl font-semibold text-gray-700 text-center">
              Expiration: {getExpiration()}
            </h3>
            <h3 className="text-xl font-semibold text-gray-700 text-center">
              Current Date: {getCurrentDateTime()}
            </h3>
            
          </div>
        </div>

        <SocialIcons />
      </div>
    </div>
  );
}

function getCurrentDateTime() {
  const now = new Date();

  // Format the date
  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Format the time
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${date} ${time}`;
}

function getStatus() {

  return false;
}

function getExpiration() {
  return getCurrentDateTime();
}

export default Card;
