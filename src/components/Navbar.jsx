import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";
import { motion } from "framer-motion";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  return (
    <motion.nav 
      className=" top-0 w-full flex justify-between items-center p-6 bg-gray-900 shadow-lg text-white"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold">ShopCart</h1>
      <ul className="flex gap-6">
        <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
        {user && (
          <li>
            <Link to="/cart" className="relative flex items-center">
              <AiOutlineShoppingCart size={24} />
              {user.cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {user.cart.length}
                </span>
              )}
            </Link>
          </li>
        )}
        {user ? (
          <>
            <li>Welcome, {user.name}!</li>
            <li><button onClick={() => { setUser(null); localStorage.removeItem("user"); }} className="hover:text-red-400">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="hover:text-green-400">Login</Link></li>
            <li><Link to="/signup" className="hover:text-blue-400">Signup</Link></li>
          </>
        )}
      </ul>
    </motion.nav>
  );
}
