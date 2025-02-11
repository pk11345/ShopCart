import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";
import { motion } from "framer-motion";

export default function ProductPage() {
  const { id } = useParams();
  const { user, setUser } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Error fetching product:", error));
  }, [id]);

  const addToCart = async () => {
    if (!user) {
      setMessage("You need to log in to add items to the cart.");
      return;
    }
  
    try {
      const payload = {
        email: user.email,
        product: {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
        },
      };
      console.log("Payload:", payload); // Log the payload
  
      const res = await axios.post("https://shop-cart-three-sand.vercel.app/api/cart", payload);
      console.log("Response:", res.data); // Log the response
  
      // Update user cart in React state
      const updatedUser = { ...user, cart: res.data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
  
      setMessage("Added to cart!");
    } catch (error) {
      setMessage("Failed to add to cart.");
    }
  };
  if (!product) return <p className="text-center text-2xl mt-10">Loading...</p>;

  return (
    <motion.div 
      className="py-10 px-6 max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img src={product.image} alt={product.title} className="h-60 w-full object-contain" />
      <h2 className="text-3xl font-bold mt-4">{product.title}</h2>
      <p className="text-gray-600 dark:text-gray-300">${product.price}</p>
      <p className="mt-2">{product.description}</p>
      <button onClick={addToCart} className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
        Add to Cart
      </button>
      {message && <p className="mt-4 text-center text-green-400">{message}</p>}
    </motion.div>
  );
}
