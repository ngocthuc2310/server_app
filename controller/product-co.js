const Product = require("../model/product-mo.js");

const fs = require("fs");
function removeFile(fileName) {
  const filePath = "./upload/" + fileName;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }
    console.log(`File ${filePath} has been successfully removed.`);
  });
}

exports.listProduct = (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((er) => res.json({ msg: er.message }));
};
exports.searchProduct = (req, res) => {
  const info = req.body;
  Product.find()
    .then((products) => {
      const tt = products.filter((x) =>
        x.name.toLowerCase().includes(info.q.toLowerCase())
      );
      res.json(tt);
    })
    .catch((er) => res.json({ msg: er.message }));
};
exports.deleteProduct = (req, res) => {
  const id = req.query.id;
  Product.findOne({ _id: id }).then((x) => {
    arr1 = x.img1.split("/");
    arr2 = x.img2.split("/");
    arr3 = x.img3.split("/");
    arr4 = x.img4.split("/");
    fileName1 = arr1[arr1.length - 1];
    fileName2 = arr2[arr2.length - 1];
    fileName3 = arr3[arr3.length - 1];
    fileName4 = arr4[arr4.length - 1];
    removeFile(fileName1);
    removeFile(fileName2);
    removeFile(fileName3);
    removeFile(fileName4);

    Product.deleteOne({ _id: id })
      .then((result) => {
        res.json({ msg: "delete product successfully" });
      })
      .catch((err) => {
        res.json({ msg: err.message });
      });
  });
};

exports.productDetail = (req, res) => {
  const id = req.query.id;
  Product.findOne({ _id: id })
    .then((x) => {
      res.json(x);
    })
    .catch((er) => res.json({ msg: er.message }));
};

exports.updateProduct = (req, res) => {
  const info = req.body;
  Product.updateOne(
    { _id: info.id },
    {
      $set: {
        category: info.category,
        long_desc: info.long_desc,
        short_desc: info.short_desc,
        name: info.name,
        price: info.price,
      },
    }
  )
    .then(() => {
      res.json({ msg: "update successfully!" });
    })
    .catch((er) => res.json({ msg: er.message }));
};
