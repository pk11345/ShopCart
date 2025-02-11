import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";

export default function CartPage() {
  const { user, setUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  

  useEffect(() => {
    if (user) {
      axios.get(`https://shopcart-api-c1rh.onrender.com/api/cart/${user.email}`)
        .then(res => {
          
          setCart(res.data);
          setUser({ ...user, cart: res.data }); // Sync user state
          localStorage.setItem("user", JSON.stringify({ ...user, cart: res.data }));
        })
        .catch(err => console.error("Error fetching cart:", err));
    }
  }, [user]);

  const removeFromCart = async (id) => {
    try {
      const updatedCart = await axios.post("http://localhost:5000/api/cart/remove", {
        email: user.email,
        productId: id
      });

      setCart(updatedCart.data);
      setUser({ ...user, cart: updatedCart.data });
      localStorage.setItem("user", JSON.stringify({ ...user, cart: updatedCart.data }));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <div className="py-10 px-6">
      <h2 className="text-3xl font-bold text-center">Your Cart</h2>
      {cart.length === 0 ? <p className="text-center mt-6">Cart is empty.</p> : (
        <ul className="mt-6 text-white">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg mt-2">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="h-16 w-16 object-cover rounded" />
                <span>{item.title} - ${item.price}</span>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
