import { useEffect, useState } from 'react';
import CCLogo from './assets/CCLogo.png';
import SocialIcons from './Socialmedia.jsx';
import { useNavigate } from 'react-router-dom';

function Scoreboard() {
  const [scoreboard, setScoreboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchScoreboard();
  }, []);

  const fetchScoreboard = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/scoreboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Sort teams in descending order based on Total_points
        const sortedTeams = data.Teams.sort((a, b) => b.Total_points - a.Total_points);
        setScoreboard(sortedTeams);
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

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 sm:p-6">
      <div className="h-70 w-70">
        <div className="flex justify-center mb-6">
          <img src={CCLogo} className="w-48 h-48 rounded-full" alt="Logo" />
        </div>

        {/* Scoreboard Container */}
        <div className="bg-white rounded-lg border-2 border-black flex flex-col items-center p-6 shadow-lg">
          {/* Header */}
          <h1 className="text-3xl font-bold text-center mb-6">Scoreboard</h1>

          {/* Content */}
          <div className="w-full">
            {loading ? (
              <p className="text-gray-500">Loading scoreboard...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Team Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Total Votes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-200">
                  {scoreboard.map((team, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900">{team.TeamName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900">{team.Total_points}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Back Button */}
          {!loading && !error && (
            <button
              onClick={handleBack}
              className="mt-6 w-full bg-red-700 text-white py-3 rounded-lg border-2 border-black font-bold text-lg hover:bg-red-800 transition-colors"
            >
              Back to Dashboard
            </button>
          )}
        </div>
        <SocialIcons />
      </div>
    </div>
  );
}

export default Scoreboard;