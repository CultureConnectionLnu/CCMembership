import { UserButton ,useUser, useClerk } from '@clerk/clerk-react';
import CCLogo from './assets/CCLogo.png';
import SocialIcons from './Socialmedia.jsx';

function Dashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();

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
        <button
          onClick={() => signOut()}
          className="w-[95%] bg-yellow-700 mx-auto text-center m-10 p-4 rounded py-3 border-2 font-bold text-xl border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1"
        >
          Ginger Bread Comp.
        </button>
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