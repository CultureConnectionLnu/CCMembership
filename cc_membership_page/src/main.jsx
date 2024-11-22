import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Clerk } from "@clerk/clerk-js";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const clerk = new Clerk(clerkPubKey);

await clerk.load();

if (clerk.user) {
  document.getElementById("app").innerHTML = `
    <div id="user-button"></div>
  `;

  const userButtonDiv =
    document.getElementById("user-button");

  clerk.mountUserButton(userButtonDiv);
} else {
  document.getElementById("app").innerHTML = `
    <div id="sign-in"></div>
  `;

  const signInDiv =
    document.getElementById("sign-in");

  clerk.mountSignIn(signInDiv);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
