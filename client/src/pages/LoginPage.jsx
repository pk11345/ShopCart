import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before making a request

    try {
      const res = await axios.post("https://shopcart-api-c1rh.onrender.com/api/login", { email, password });
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-white">Login</h2>
        {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="mt-2 p-2 w-full rounded bg-gray-700 text-white" 
          required 
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="mt-2 p-2 w-full rounded bg-gray-700 text-white" 
          required 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          type="submit" 
          className="mt-4 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
