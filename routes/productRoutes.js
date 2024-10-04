import express from "express";
import { addProduct, removeProduct, getAllProducts } from "../controllers/productCtrl.js";

const router = express.Router();

// Route to add a product
router.post("/addproduct", addProduct);

// Route to remove a product by ID
router.post("/removeproduct", removeProduct);

// Route to get all products
router.get("/allproducts", getAllProducts);

export default router;