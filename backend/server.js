const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');                    // ✅ Import CORS
const app = express();
const PORT = process.env.PORT || 5000;
const assignmentRoutes = require("./routes/assignmentRoutes");


// Load environment variables from .env
dotenv.config();

// Middleware
app.use(cors());                                 // ✅ Allow frontend requests
app.use(express.json());                         // ✅ Parse JSON bodies

// Routes
const authRoutes = require('./routes/authRoutes');  // ✅ Import auth routes
app.use('/api/auth', authRoutes);                   // ✅ Mount under /api/auth


// Test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});
app.use("/api/assignments", assignmentRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB Atlas");
  // Start server after DB connection
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
