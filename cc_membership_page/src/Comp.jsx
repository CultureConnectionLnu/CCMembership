import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CCLogo from './assets/CCLogo.png';
import SocialIcons from './Socialmedia.jsx';
import Team from './Team';

function Comp() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [scoreboard, setScoreboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to manage user's vote allocations
  const [teamVotes, setTeamVotes] = useState({});

  // Maximum votes a user can allocate
  const MAX_VOTES = 10;

  const teams = [
    "Peaceful Christmas",
    "Wenyu, Saki and Joanna",
    "Tannenbaum Inc.",
    "The Sweet Architects",
    "Maniacal Monkeys",
    "suspicious delicious",
    "Swedish Gingerbread House Mafia",
    "Hallmark Hunks",
    "EMFs",
    "HELP",
    "Swexemburg",
  ];

  const handleBackButton = () => {
    navigate("/dashboard");
  };

  // Fetch scoreboard data on mount
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchScoreboard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn]);

  const fetchScoreboard = async () => {
    if (!user) {
      setError('User not found.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/scoreboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setScoreboard(data);
        initializeUserVotes(data);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to fetch scoreboard.');
      }
    } catch (err) {
      console.error('Error fetching scoreboard:', err);
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initialize users vote allocations based on fetched scoreboard
  const initializeUserVotes = (data) => {
    const allocations = {};
    data.Teams.forEach(team => {
      const userVote = team.UserVoted.find(u => u.UserID === user.id);
      allocations[team.TeamName] = userVote ? userVote.VotesAllocated : 0;
    });
    setTeamVotes(allocations);
  };

  // Handle vote allocation changes from Team components
  const handleVoteChange = (teamName, votes) => {
    setTeamVotes(prevVotes => {
      const newVotes = { ...prevVotes, [teamName]: votes };
      // Ensure total votes do not exceed MAX_VOTES
      const totalVotes = Object.values(newVotes).reduce((acc, curr) => acc + curr, 0);
      if (totalVotes > MAX_VOTES) {
        return prevVotes;
      }
      return newVotes;
    });
  };

  // Calculate total allocated votes
  const totalAllocated = Object.values(teamVotes).reduce((acc, curr) => acc + curr, 0);

  // Calculate remaining votes
  const remainingVotes = MAX_VOTES - totalAllocated;

  // Save allocations to backend
  const handleSaveVotes = async () => {
    if (!user) {
      setError('User not authenticated.');
      return;
    }

    try {
      const payload = {
        userId: user.id,
        votes: teamVotes,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/allocate-votes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message + " Thank you for your vote!");
        navigate("/dashboard")
        fetchScoreboard();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error('Error saving votes:', err);
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="flex-col justify-center items-center min-h-screen  p-4 sm:p-6">
      <div className="h-70 w-70 mx-auto sm:w-96 sm:h-96">
        <div className="aspect-square">
          <img src={CCLogo} className="rounded-full" alt="Logo" />
        </div>
        <div className="bg-white mx-auto rounded-lg border-2 border-black flex flex-col items-center p-6 mt-4 shadow-lg">
          {/* Header */}
          <h1 className="text-2xl font-bold text-center pt-4">
            You can vote {user?.fullName ? `${user.fullName}` : ''}
          </h1>

          {/* Content */}
          <div className="mt-4 text-center">
            {loading ? (
              <p className="text-gray-500">Loading your points...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="text-xl">
                You have <span className="font-bold">{remainingVotes}</span> votes left!
              </p>
            )}
          </div>

          {/* Team List */}
          {!loading && !error && scoreboard && (
            <>
              <div className="w-full">
                <h2 className="text-xl font-semibold mb-4 text-center">Allocate Votes to Teams</h2>
                {teams.map((team, index) => (
                  <Team
                    key={index}
                    name={team}
                    allocatedVotes={teamVotes[team] || 0}
                    onVoteChange={handleVoteChange}
                    remainingVotes={remainingVotes + (teamVotes[team] || 0)}
                  />
                ))}
              </div>

              {/* Allocation Summary */}
              <div className="w-full mt-4 text-center">
                <p className="text-lg">
                  Total Allocated: <span className="font-bold">{totalAllocated}</span> / {MAX_VOTES} votes
                </p>
                <p className="text-lg">
                  Remaining Votes: <span className="font-bold">{remainingVotes}</span> votes
                </p>
              </div>

              {/* Save Allocations Button */}
              <button
                onClick={handleSaveVotes}
                className={`w-[95%] bg-green-700 mx-auto text-center m-4 p-4 rounded py-3 border-2 font-bold text-xl border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 text-white ${
                  totalAllocated > MAX_VOTES || remainingVotes < 0
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={totalAllocated > MAX_VOTES || remainingVotes < 0}
              >
                Submit Votes
              </button>
            </>
          )}

          {/* Back Button */}
          <button
            onClick={handleBackButton}
            className='w-[95%] bg-red-700 mx-auto text-center m-10 p-4 rounded py-3 border-2 font-bold text-xl border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 text-white'
          >
            Back
          </button>
        </div>
        <SocialIcons />
      </div>
    </div>
  );
}

export default Comp;