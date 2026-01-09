import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../api/axios";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const res = await authAPI.post("/user/signin", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch {
      alert("Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-black via-zinc-950 to-zinc-800 p-5">
      <div className="w-full max-w-md p-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-200 text-center mb-6">
          Please sign in to continue
        </p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          />

          <button className="w-full p-3 bg-white text-purple-700 font-bold rounded-lg">
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-200 mt-6 text-sm">
          Belum punya akun?{" "}
          <Link
            to="/signup"
            className="text-white font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}
