import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CCLogo from "./assets/CCLogo.png";
import SocialIcons from "./Socialmedia.jsx";

function LoginPanel() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

//TODO: cleark intergration
   
  // useEffect(() => {
  //   if (isAuthenticated) {
  // // TODO: connect to  clerk database to check login system
  //   }
  // }, [isAuthenticated]);


  const handleRegistration = () => {
    navigate("/registartion");
  };

    return (  
      <div className="flex-col justify-center columns-1 items-center min-h-screen">
        <div className="h-70 w-70 mx-auto sm:w-96 sm:h-96">
          <div className="aspect-square">
            <img
              src={CCLogo}
              className="rounded-full"
              alt="Logo"
            />
          </div>
        </div>
        <form className="p-6 text-center">
          <h1 className="text-2xl mb-4 text-center font-bold bg-neutral-300 sm:w-96 mx-auto mt-6 p-4 rounded-2xl py-3 border-2 border-black shadow-custom">Members Login Panel</h1>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="sm:w-96 mx-auto mt-6 text-center p-4 rounded py-3 border-2 border-black focus:outline-none placeholder text-2xl"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="sm:w-96 mx-auto mt-6 text-center p-4 rounded py-3 border-2 border-black focus:outline-none placeholder text-2xl"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 sm:w-96 mx-auto mt-6 text-center p-4 rounded py-3 border-2 border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 text-2xl font-bold"
          >
            Log In
          </button>
          <div className="mb-2">
          <button
            type="link"
            onClick={handleRegistration}
            className="bg-red-400 sm:w-96 mx-auto mt-6 text-center p-4 rounded py-3 border-2 border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 text-2xl font-bold"
          >
            Become a Member
          </button>
          </div>
        </form>
        <SocialIcons />
      </div>
    );
  }

export default LoginPanel;