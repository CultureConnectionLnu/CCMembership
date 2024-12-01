import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp,} from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CCLogo from './assets/CCLogo.png';
import SocialIcons from './Socialmedia.jsx';
import './fontawesome';

function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  // const { signUp } = useSignUp();
  // const { setSession } = useClerk();
  const navigate = useNavigate();
  const { isLoaded, signUp } = useSignUp();

  if (!isLoaded) {
    console.log("sadasd");
  } else {
    console.log("YES IAM HERE")
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
        username,
      });
      // Proceed with verification or redirect
    } catch (err) {
      setError(err.errors ? err.errors[0].message : 'An error occurred');
    }
  };

  const handleLogin = () => {
    navigate('/loginpanel');
  };

  const handleSocialSignUp = (provider) => {
    signUp.authenticateWithRedirect({
      strategy: provider,
      redirectUrl: '/complete-profile',
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="h-70 w-70 mx-auto sm:w-96 sm:h-96">
        <div className="aspect-square">
          <img src={CCLogo} className="rounded-full" alt="Logo" />
        </div>
      </div>
      <div className="bg-white pb-10 w-96 mx-auto rounded-lg border-2 border-black">
        <form className="text-center" onSubmit={handleSignUp}>
          <h1 className="p-6 text-2xl font-bold">Become a Member</h1>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => handleSocialSignUp('oauth_google')}
                className="bg-red-700 text-white w-[90%] mx-auto mt-2 text-center p-4 rounded border-2 border-black flex items-center justify-center text-2xl font-bold hover:bg-slate-500"
              >
                <FontAwesomeIcon icon={['fab', 'google']} className="h-6 w-6 mr-2" />
                Sign up with Google
              </button>
            </div>
          {error && <p className="text-red-500 m-5 text-xl font-bold">{error}</p>}
          <div className="my-4">
            <input
              type="email"
              placeholder="Email Address"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="w-[90%] mx-auto mt-2 text-center p-4 rounded border-2 border-black focus:outline-none text-2xl"
              required
            />
          </div>
          <div className="mb-2">
          <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-[90%] mx-auto mt-2 text-center p-4 rounded border-2 border-black focus:outline-none text-2xl"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-[90%] mx-auto mt-2 text-center p-4 rounded border-2 border-black focus:outline-none text-2xl"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-[90%] mx-auto mt-2 text-center p-4 rounded border-2 border-black focus:outline-none text-2xl"
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
          <div className="mb-2">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-[90%] mx-auto mt-2 text-center p-4 rounded border-2 border-black focus:outline-none text-2xl"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 w-[90%] mx-auto mt-6 p-4 rounded border-2 border-black shadow-custom hover:shadow-none transition-all hover:-translate-x-1 hover:translate-y-1 text-2xl font-bold"
          >
            Sign Up
          </button>
          <div className="mb-2">
            <button
              type="button"
              onClick={handleLogin}
              className="bg-blue-500 w-[90%] mx-auto mt-6 p-4 rounded border-2 border-black shadow-custom hover:shadow-none transition-all hover:-translate-x-1 hover:translate-y-1 text-2xl font-bold"
            >
              Already a Member? Log In
            </button>
          </div>
        </form>
      </div>
      <SocialIcons />
    </div>
  );
}

export default Registration;