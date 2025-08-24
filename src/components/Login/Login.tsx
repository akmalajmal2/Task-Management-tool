import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
export default function Login() {
  const navigate = useNavigate();

  const handlegoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.log("google sign in error", error);
    }
  };
  return (
    <section className="flex gap-6 h-full pl-13">
      <div className="flex flex-col items-left justify-center">
        <h2 className="text-[#7B1984] font-bold text-2xl">TaskBuddy</h2>
        <p className="font-medium text-xs mb-5">
          Streamsline your workflow and track progress effortlessly with your
          all-in-one task management app
        </p>
        <button
          className="bg-[#292929] font-bold text-xl rounded-2xl px-10 py-3 text-white flex items-center gap-3 cursor-pointer hover:opacity-70"
          onClick={handlegoogleSignIn}
        >
          <img src="/images/google.png" alt="google" className="w-5 h-5" />
          Continue with Google
        </button>
      </div>
      <div className="flex justify-end items-center w-full">
        <div className="rounded-[20rem] border-[0.73px] border-[#7B1984] w-[33rem] h-[33rem] flex justify-center items-center p-8">
          <div className="rounded-[20rem] border-[0.73px] border-[#7B1984] w-full h-full p-12">
            <div className="rounded-[20rem] border-[0.73px] border-[#7B1984] w-full h-full">
              <div className="rounded p-2 overflow-hidden shadow-[0_0_4px_0_#00000040] z-20">
                <img
                  src="/images/toolSample.png"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
