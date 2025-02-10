import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="py-10 px-6">
      <h2 className="text-3xl font-bold text-center">Our Products</h2>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <motion.div 
            key={product.id} 
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <img src={product.image} alt={product.title} className="h-40 w-full object-contain" />
            <h3 className="text-xl font-semibold mt-4">{product.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">${product.price}</p>
            <Link to={`/product/${product.id}`} className="mt-3 inline-block text-blue-500">
              View Details →
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
