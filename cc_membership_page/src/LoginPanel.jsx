import { SignIn } from '@clerk/clerk-react';
import CCLogo from './assets/CCLogo.png';
import SocialIcons from './Socialmedia.jsx';

function LoginPanel() {
  return (
    <div className="flex-col justify-center items-center min-h-screen">
      <div className="h-70 w-70 mx-auto sm:w-96 sm:h-96">
        <div className="aspect-square">
          <img src={CCLogo} className="rounded-full" alt="Logo" />
        </div>
      
      <SignIn
      forceRedirectUrl="/submit"
        appearance={{

          layout: {
            logoPlacement: "none"
          },
          elements: {
            socialButtonsBlockButton:'w-[100%] mx-auto text-center p-4 rounded py-3 border-2 border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 text-2xl font-bold',
            formButtonPrimary: 'bg-blue-400 w-[100%] mx-auto text-center p-4 rounded py-3 border-2 border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 text-2xl font-bold',
            captchaInput: "w-[90%] mx-auto mt-2 text-center p-4 rounded border-2 border-black focus:outline-none text-2xl",
            captcha: "w-[90%] mx-auto mt-2 text-center p-4 rounded border-2 border-black focus:outline-none text-2xl"
          },
        }}
         />
        <SocialIcons />
      </div>
    </div>
  );
}

export default LoginPanel;