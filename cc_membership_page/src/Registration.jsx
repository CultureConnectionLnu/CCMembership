import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CCLogo from "./assets/CCLogo.png";
import SocialIcons from "./Socialmedia.jsx";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConfirmPassword] = useState("");
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

//TODO: intergrate clerk

  const handleBack = () => {
    navigate("/");
  };

  //uncomment when stuff done

  const handleSubmit = () => {
    navigate("/submit");
  };

  // const handleChecks = () => {
  //   // if (!handleRegistration) {
  //   //   //TODO: Check whats wrong, if account exist already with same email or username
  //   //   return({handleSubmit})
  //   // }
  // };

  return (
    <div className="flex-col justify-center columns-1 items-center min-h-screen">
      <div className="h-70 w-70 mx-auto sm:w-96 sm:h-96">
        <div className="aspect-square">
          <img src={CCLogo} className="rounded-full" alt="Logo" />
        </div>
      </div>
      <div className="p-6 text-center">
        <h1 className="text-2xl mb-4 text-center font-bold bg-neutral-300 sm:w-96 mx-auto mt-6 p-4 rounded-2xl py-3 border-2 border-black shadow-custom">
          Registration Panel
        </h1>
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
            type="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="sm:w-96 mx-auto mt-6 text-center p-4 rounded py-3 border-2 border-black focus:outline-none placeholder text-2xl"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="Password"
            placeholder="Confirm Password"
            value={conPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="sm:w-96 mx-auto mt-6 text-center p-4 rounded py-3 border-2 border-black focus:outline-none placeholder text-2xl"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="First Name"
            value={fName}
            onChange={(e) => setFirstName(e.target.value)}
            className="sm:w-96 mx-auto mt-6 text-center p-4 rounded py-3 border-2 border-black focus:outline-none placeholder text-2xl"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => setLastName(e.target.value)}
            className="sm:w-96 mx-auto mt-6 text-center p-4 rounded py-3 border-2 border-black focus:outline-none placeholder text-2xl"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="sm:w-96 mx-auto mt-6 text-center p-4 rounded py-3 border-2 border-black focus:outline-none placeholder text-2xl"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 sm:w-96 mx-auto mt-6 text-center p-4 rounded py-3 border-2 border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 text-2xl font-bold"
        >
          Submit
        </button>
        <div className="mb-2">
          <button
            type="submit"
            onClick={handleBack}
            className="bg-red-400 sm:w-96 mx-auto mt-6 text-center p-4 rounded py-3 border-2 border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 text-2xl font-bold"
          >
            Back
          </button>
        </div>
      </div>
      <SocialIcons />
    </div>
  );
}

export default Registration;
