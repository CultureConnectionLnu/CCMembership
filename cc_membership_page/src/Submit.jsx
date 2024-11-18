
import { useNavigate } from "react-router-dom";
import CCLogo from "./assets/CCLogo.png";

function Submit() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

    return (  
      <div className="flex-col justify-center columns-1 items-center min-h-screen">
        <div className="h-70 w-70 mx-auto sm:w-96 sm:h-96">
          <div className="aspect-square">
            <img
              src={CCLogo}
              className="rounded-full"
              alt="Logo"
            />
          </div>
        </div>
          <div className="p-6 text-center">
            <h1 className="text-2xl mb-4 text-center font-bold bg-neutral-300 sm:w-96 mx-auto mt-6 p-4 rounded-2xl py-3 border-2 border-black shadow-custom">Succesful </h1>
            <div className="mb-2">
              <button
                type="submit"
                onClick={handleBack}
                className="bg-red-400 sm:w-96 mx-auto mt-6 text-center p-4 rounded py-3 border-2 border-black shadow-custom hover:shadow-none transition-all hover:translate-x-1 translate-y-1 text-2xl font-bold"
              >
                Back
              </button>
            </div>
        </div>
      </div>
    );
  }

export default Submit;