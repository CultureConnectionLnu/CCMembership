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
      <div id="user-button" style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f4f8;">
        <div style="padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <span style="font-size: 1.5em; font-weight: bold;">Welcome!</span>
          <div id="user-button-container" style="margin-top: 10px;"></div>
        </div>
      </div>
    `;
  
    const userButtonDiv = document.getElementById("user-button-container");
    clerk.mountUserButton(userButtonDiv);
  } else {
    document.getElementById("app").innerHTML = `
      <div id="sign-in" style="display: flex; justify-content: center; align-items: center; height: 100vh;">
        <div style="padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background: #f0f4f8;">
          <h2 style="text-align: center; margin-bottom: 20px;">Sign In</h2>
          <div id="sign-in-container"></div>
        </div>
      </div>
    `;
  
    const signInDiv = document.getElementById("sign-in-container");
    clerk.mountSignIn(signInDiv);
  }
  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
