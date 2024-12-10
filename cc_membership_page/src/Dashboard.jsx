import { UserButton, useUser, useClerk } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CCLogo from './assets/CCLogo.png';
import SocialIcons from './Socialmedia.jsx';

function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setUsername(user.username || '');
    }
  }, [isLoaded, isSignedIn, user]);

  // Handler for the "Ginger Bread Comp." button
  const handleButtonClick = async () => {
    if (!username) {
      setError('Username is not available.');
      return;
    }

    const newMember = {
      UserID: user.id,
      username: username,
      fname: user.firstName,
      lname: user.lastName,
      points: 10,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/score`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });

      if (response.status === 201 || response.status === 409) {
        navigate('/competition');
      } else {
        const data = await response.json();
        setError(data.error || 'An unexpected error occurred.');
      }
    } catch (networkError) {
      console.error('Network error:', networkError);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleButtonScoreboard = async () => {
    navigate("/scoreboard")
  }

  const handleButtonMembershipCard = async () => {
    navigate ("/card")
  }


  // Optional: Fetch username if not directly available from Clerk
  // Uncomment and modify if necessary 
  /*
  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/score/${user.id}/username`);
          if (response.ok) {
            const data = await response.json();
            setUsername(data.username);
          }
        } catch (err) {
          console.error('Error fetching username:', err);
        }
      }
    };

    fetchUsername();
  }, [user]);
  */

  return (
    <div className="flex-col justify-center items-center min-h-screen">
      <div className="h-70 w-70 mx-auto sm:w-96 sm:h-96">
        <div className="aspect-square">
          <img src={CCLogo} className="rounded-full" alt="Logo" />
        </div>
        <div className="bg-white mx-auto rounded-lg border-2 border-black flex flex-col items-center p-6">
          <h1 className="text-2xl font-bold text-center pt-4">
            Welcome, {user?.fullName || 'User'}! <UserButton />
          </h1>
          
          {/* Optional: Display Username */}
          {username && (
            <p className="text-lg mt-2">
              Username: <span className="font-semibold">{username}</span>
            </p>
          )}
          
          <button
            onClick={handleButtonClick}
            className={`w-[95%] bg-yellow-700 mx-auto text-center m-0 p-4 rounded py-3 border-2 font-bold text-xl border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Gingerbread House Competition'}
          </button>

          <button
            onClick={handleButtonScoreboard}
            className={`w-[95%] bg-violet-800 mx-auto text-center m-6 p-4 rounded py-3 border-2 font-bold text-xl border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Gingerbread House Competition Scoreboard'}
          </button>

          <button
            onClick={handleButtonMembershipCard}
            className={`w-[95%] bg-[#85b2c2] mx-auto text-center m-6 p-4 rounded py-3 border-2 font-bold text-xl border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Membership Card'}
          </button>
          
          {error && <p className="text-red-500">{error}</p>}

          <button
            onClick={() => signOut()}
            className="w-[90%] bg-red-400 mx-auto text-center mb-6 p-4 rounded py-3 border-2 font-bold text-xl border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1"
          >
            Sign Out
          </button>
          
        </div>
        <SocialIcons />
      </div>
    </div>
  );
}

export default Dashboard;