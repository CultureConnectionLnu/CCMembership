// Comp.jsx
import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CCLogo from './assets/CCLogo.png';
import SocialIcons from './Socialmedia.jsx';
import Team from './Team';

function Comp() {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamAllocations, setTeamAllocations] = useState({});
  
  // 10 default
  const MAX_ALLOCATION = `${points}`;

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

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchUserPoints();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isSignedIn]);

  const fetchUserPoints = async () => {
    if (!user) {
      setError('User not found.');
      setLoading(false);
      return;
    }

    const userId = user.id;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/score/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const memberData = await response.json();
        setPoints(memberData.points);
      } else if (response.status === 404) {
        setError('User not found in the competition.');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An unexpected error occurred.');
      }
    } catch (err) {
      console.error('Error fetching user points:', err);
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handler to update allocations
  const handleAllocationChange = (teamName, allocatedPoints) => {
    setTeamAllocations(prevAllocations => ({
      ...prevAllocations,
      [teamName]: allocatedPoints,
    }));
  };
  const totalAllocated = Object.values(teamAllocations).reduce((acc, curr) => acc + curr, 0);
  const remainingAllocation = MAX_ALLOCATION - totalAllocated;
  const remainingPoints = points !== null ? points - totalAllocated : 0;

  // Handler to save allocations (optional)
  const handleSaveAllocations = async () => {
    if (!user) {
      setError('User not authenticated.');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/allocate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          allocations: teamAllocations,
        }),
      });

      if (response.ok) {
        alert('Allocations saved successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to save allocations.');
      }
    } catch (err) {
      console.error('Error saving allocations:', err);
      setError('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="flex-col justify-center items-center min-h-screen">
      <div className="h-70 w-70 mx-auto sm:w-96 sm:h-96">
        <div className="aspect-square">
          <img src={CCLogo} className="rounded-full" alt="Logo" />
        </div>
        <div className="bg-white mx-auto rounded-lg border-2 border-black flex flex-col items-center p-6 mt-4 shadow-lg">
          {/* Header */}
          <h1 className="text-2xl font-bold text-center pt-4">
            Competition Status {user?.fullName ? `for ${user.fullName}` : ''}
          </h1>

          {/* Content */}
          <div className="mt-4 text-center">
            {loading ? (
              <p className="text-gray-500">Loading your points...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="text-xl">
                You have <span className="font-bold">{remainingPoints >= 0 ? remainingPoints : 0}</span> points left!
              </p>
            )}
          </div>

          {/* Team List */}
          {!loading && !error && points !== null && (
            <>
              <div className="w-full mt-6">
                <h2 className="text-xl font-semibold mb-4">Allocate Points to Teams</h2>
                {teams.map((team, index) => (
                  <Team
                    key={index}
                    name={team}
                    allocatedPoints={teamAllocations[team] || 0}
                    maxPoints={points !== null ? Math.min(MAX_ALLOCATION, points) : 10}
                    onAllocationChange={handleAllocationChange}
                    remainingAllocation={remainingAllocation + (teamAllocations[team] || 0)}
                  />
                ))}
              </div>

              {/* Allocation Summary */}
              <div className="w-full mt-4 text-center">
                <p className="text-lg">
                  Total voted: <span className="font-bold">{totalAllocated}</span> / {MAX_ALLOCATION} points
                </p>
                <p className="text-lg">
                  Remaining Votes: <span className="font-bold">{remainingAllocation >= 0 ? remainingAllocation : 0}</span> points
                </p>
              </div>

              {/* Save Allocations Button */}
              <button
                onClick={handleSaveAllocations}
                className='w-[95%] bg-green-700 mx-auto text-center m-4 p-4 rounded py-3 border-2 font-bold text-xl border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 text-white'
                disabled={totalAllocated > MAX_ALLOCATION || remainingPoints < 0}
              >
                Submit
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