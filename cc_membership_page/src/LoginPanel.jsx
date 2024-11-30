import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn, useClerk } from '@clerk/clerk-react';
import CCLogo from './assets/CCLogo.png';
import SocialIcons from './Socialmedia.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './fontawesome';

function LoginPanel() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signIn } = useSignIn();
  const { setSession } = useClerk();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setSession(signInAttempt.createdSessionId);
        navigate('/submit');
      } else {
        // Handle other statuses (e.g., email verification)
      }
    } catch (err) {
      setError(err.errors ? err.errors[0].message : 'An error occurred');
    }
  };

  const handleRegistration = () => {
    navigate('/registration');
  };

  // Social sign-in handler
  const handleSocialSignIn = (provider) => {
    signIn.authenticateWithRedirect({
      strategy: provider,
      redirectUrl: '/submit',
    });
  };

  return (
    <div className="flex-col justify-center items-center min-h-screen">
      <div className="h-70 w-70 mx-auto sm:w-96 sm:h-96">
        <div className="aspect-square">
          <img src={CCLogo} className="rounded-full" alt="Logo" />
        </div>
      </div>
      <div className="bg-white pb-10 w-96 mx-auto rounded-lg border-2 border-black">
        <form className="text-center" onSubmit={handleSignIn}>
          <h1 className="p-6 text-2xl text-center font-bold">
            Members Sign-in Panel
          </h1>
          <div className="mt-4">
            <button
              type="button"
              onClick={() => handleSocialSignIn('oauth_google')}
              className="bg-red-700 text-white w-[90%] mx-auto mt-2 text-center p-4 rounded border-2 border-black flex items-center justify-center text-2xl font-bold hover:bg-slate-500"
            >
              <FontAwesomeIcon icon={['fab', 'google']} className="h-6 w-6 mr-2" />
              Sign in with Google
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
            className="bg-blue-500 w-[90%] mx-auto mt-6 text-center p-4 rounded border-2 border-black shadow-custom hover:shadow-none transition-all hover:-translate-x-1 hover:translate-y-1 text-2xl font-bold"
          >
            Log In
          </button>
          <div className="mb-2">
            <button
              type="button"
              onClick={handleRegistration}
              className="bg-red-400 w-[90%] mx-auto mt-6 text-center p-4 rounded border-2 border-black shadow-custom hover:shadow-none transition-all hover:-translate-x-1 hover:translate-y-1 text-2xl font-bold"
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