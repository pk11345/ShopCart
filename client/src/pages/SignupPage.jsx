import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";

export default function SignupPage() {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://shopcart-api-c1rh.onrender.com/api/signup", formData);
    setUser({ name: formData.name, email: formData.email });
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
        <input type="text" name="name" placeholder="Name" className="mt-2 p-2 w-full rounded bg-gray-700 text-white" required onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="email" name="email" placeholder="Email" className="mt-2 p-2 w-full rounded bg-gray-700 text-white" required onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" name="password" placeholder="Password" className="mt-2 p-2 w-full rounded bg-gray-700 text-white" required onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit" className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition w-full">Sign Up</button>
      </form>
    </div>
  );
}
