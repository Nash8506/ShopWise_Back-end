import Product from "../models/productModel.js";

// Add a new product
export const addProduct = async (req, res) => {
  try {
    let products = await Product.find({});
    let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    await product.save();
    console.log("Product saved");

    res.json({ success: true, name: req.body.name });
  } catch (error) {
    console.error("Error adding product", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Remove a product by ID
export const removeProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Product removed");
    res.json({ success: true });
  } catch (error) {
    console.error("Error removing product", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find({});
    console.log("All products fetched");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};