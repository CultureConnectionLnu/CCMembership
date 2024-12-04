import { UserProfile ,useUser, useClerk } from '@clerk/clerk-react';
import CCLogo from './assets/CCLogo.png';
import SocialIcons from './Socialmedia.jsx';

function Submit() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="flex-col justify-center items-center min-h-screen">
      <div className="h-70 w-70 mx-auto sm:w-96 sm:h-96">
        <div className="aspect-square">
          <img src={CCLogo} className="rounded-full" alt="Logo" />
        </div>
        <div className="bg-white pb-10 w-96 mx-auto rounded-lg border-2 border-black">
        <h1 className="text-2xl font-bold">
          Submit Page - Welcome, {user?.firstName || 'User'}!
        </h1>
        <UserProfile />
        <button
          onClick={() => signOut()}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
        </div>
        <SocialIcons />
      </div>
    </div>
  );
}

export default Submit;