const express = require("express");
const router = express.Router();
const controllerProduct = require("../controller/product-co.js");
const multer = require("multer");
const Product = require("../model/product-mo.js");

router.get("/listproduct", controllerProduct.listProduct);
router.post("/search", controllerProduct.searchProduct);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

const link = "https://shop-38kh.onrender.com";

router.post("/addproduct", upload.array("img", 4), (req, res) => {
  const info = req.body;
  const imgg = req.files;
  const pro = new Product({
    name: info.name,
    category: info.category,
    price: info.price,
    short_desc: info.short_desc,
    long_desc: info.long_desc,
    img1: link + "/image/" + imgg[0].filename,
    img2: link + "/image/" + imgg[1].filename,
    img3: link + "/image/" + imgg[2].filename,
    img4: link + "/image/" + imgg[3].filename,
  });
  pro
    .save()
    .then(() => {
      res.json({ msg: "add product successfully!" });
    })
    .catch((er) => res.json({ msg: er.message }));
});
router.get("/deleteproduct", controllerProduct.deleteProduct);
router.get("/productdetail", controllerProduct.productDetail);
router.post("/updateproduct", controllerProduct.updateProduct);

module.exports = router;
