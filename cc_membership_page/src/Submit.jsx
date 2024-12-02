import { UserProfile ,useUser, useClerk } from '@clerk/clerk-react';

function Submit() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="p-6">
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
  );
}

export default Submit;