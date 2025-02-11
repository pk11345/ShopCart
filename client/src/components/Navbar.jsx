import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav 
      className=" top-0 w-full flex justify-between items-center p-6 bg-gray-900 shadow-lg text-white z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold">ShopCart</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6">
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

      {/* Mobile Menu Button */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
      </button>

      {/* Mobile Menu (Animated) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center py-6 space-y-4 shadow-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Home</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Cart ({user?.cart?.length || 0})</Link>
            {user ? (
              <>
                <span>Welcome, {user.name}!</span>
                <button onClick={() => { setUser(null); localStorage.removeItem("user"); setMenuOpen(false); }} className="hover:text-red-400">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-green-400">Login</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">Signup</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
