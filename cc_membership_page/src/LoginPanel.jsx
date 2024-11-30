import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CCLogo from "./assets/CCLogo.png";
import SocialIcons from "./Socialmedia.jsx";

function LoginPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //TODO: clerk integration

  const handleRegistration = () => {
    navigate("/registration");
  };

  return (
    <div className="flex-col justify-center items-center min-h-screen">
      <div className="h-70 w-70 mx-auto sm:w-96 sm:h-96">
        <div className="aspect-square">
          <img src={CCLogo} className="rounded-full" alt="Logo" />
        </div>
      </div>
      <div className="bg-white pb-10 w-96 mx-auto rounded-lg border-2 border-black focus:outline-none placeholder">
      <form className="text-center">
        <h1 className="p-6 text-2xl text-center font-bold">
          Members Login Panel
        </h1>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-[90%] mx-auto mt-2 text-center p-4 rounded border-2 border-black focus:outline-none text-2xl"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[90%] mx-auto mt-6 text-center p-4 rounded border-2 border-black focus:outline-none text-2xl"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 w-[90%] mx-auto mt-6 text-center p-4 rounded border-2 border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 text-2xl font-bold"
        >
          Log In
        </button>
        <div className="mb-2">
          <button
            type="button"
            onClick={handleRegistration}
            className="bg-red-400 w-[90%] mx-auto mt-6 text-center p-4 rounded border-2 border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 text-2xl font-bold"
          >
            Become a Member
          </button>
        </div>
      </form>
      </div>
      <SocialIcons />
    </div>
  );
}

export default LoginPanel;