import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import fs from "fs";
import loadEnv from "./config/env.js";  // Load env variables
import connectDB from "./config/db.js";  // Connect to MongoDB
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables from .env file
loadEnv();

// Initialize express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Use the routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Serving static images
app.use("/images", express.static("upload/images"));

// Port setup for server from .env file
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Check if the upload directory exists and create if necessary
const imageUploadPath = './upload/images';
if (!fs.existsSync(imageUploadPath)) {
  fs.mkdirSync(imageUploadPath, { recursive: true });
}

// Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Upload Endpoint for images
app.post("/upload", upload.single("product"), (req, res) => {
  const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;
  res.json({
    success: 1,
    image_url: `${baseUrl}/images/${req.file.filename}`,
  });
});
