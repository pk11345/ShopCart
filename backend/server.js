const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

dotenv.config();
const app = express();
app.use(cors({
  origin: ["https://shop-cart-zw33.vercel.app"],  // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// User Schema & Model
const userSchema = new mongoose.Schema({   
  name: String,
  email: String,
  password: String,
  cart: { type: Array, default: [] }
});
const User = mongoose.model("User", userSchema);

// Signup API
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully!" });
    res.setHeader("Access-Control-Allow-Origin", "https://shop-cart-zw33.vercel.app");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
res.setHeader("Access-Control-Allow-Credentials", "true");

  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
});


// Login API with proper error messages
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ error: "User does not exist. Please sign up." });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Incorrect password. Try again." });
      }
  
      const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
      res.json({ token, user: { name: user.name, email: user.email, cart: user.cart } });
      res.setHeader("Access-Control-Allow-Origin", "https://shop-cart-zw33.vercel.app");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
res.setHeader("Access-Control-Allow-Credentials", "true");

    } catch (error) {
      res.status(500).json({ error: "Login failed. Please try again." });
    }
  });
  

// Add to Cart API (Stores in MongoDB)
app.post("/api/cart", async (req, res) => {
    const { email, product } = req.body;
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { $push: { cart: product } },
        { new: true }
      );
      res.json(user.cart);
      res.setHeader("Access-Control-Allow-Origin", "https://shop-cart-zw33.vercel.app");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
res.setHeader("Access-Control-Allow-Credentials", "true");

    } catch (error) {
      res.status(500).json({ error: "Failed to add item to cart." });
    }
  });
  
  // Fetch Cart API
  app.get("/api/cart/:email", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      console.log("Fetched User:", user);
      res.json(user.cart);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart." });
    }
  });
  
  // Remove Item from Cart API
  app.post("/api/cart/remove", async (req, res) => {
    const { email, productId } = req.body;
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { $pull: { cart: { id: productId } } },
        { new: true }
      );
      res.json(user.cart);
      res.setHeader("Access-Control-Allow-Origin", "https://shop-cart-zw33.vercel.app");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
res.setHeader("Access-Control-Allow-Credentials", "true");

    } catch (error) {
      res.status(500).json({ error: "Failed to remove item from cart." });
    }
  });
  
  
//   // Get Cart API
//   app.get("/api/cart/:email", async (req, res) => {
//     try {
//       const user = await User.findOne({ email: req.params.email });
//       res.json(user.cart);
//     } catch (error) {
//       res.status(500).json({ error: "Failed to fetch cart" });
//     }
//   });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
