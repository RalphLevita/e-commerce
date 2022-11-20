const Product = require("../Models/ProductModel");

exports.createProducts = async (req, res, next) => {
  const {
    productCode,
    productName,
    productDesc,
    productImage,
    quantity,
    adminId,
  } = req.body;

  try {
    await Product.create({
      productCode,
      productName,
      productDesc,
      productImage,
      quantity,
      adminId,
    });
    res.status(200).json({ message: "Successfully Created" });
  } catch (err) {
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const productData = await Product.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
    ]);
    res.status(200).json(productData);
  } catch (error) {
    next(error);
  }
};

exports.viewProduct = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const viewProducts = await Product.findById({ _id });
    res.status(200).json(viewProducts);
  } catch (error) {
    next(error);
  }
};

exports.archiveProduct = async (req, res, next) => {
  const _id = req.params.id;
  try {
    await Product.findByIdAndUpdate(
      { _id },
      { isDeleted: true },
      { new: true }
    );
    res.status(200).json({ message: "Successfully Archived" });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  const _id = req.params.id;
  const {
    productCode,
    productName,
    productDesc,
    productImage,
    quantity,
    adminId,
  } = req.body;
  try {
    await Product.findByIdAndUpdate(
      { _id },
      {
        productCode,
        productName,
        productDesc,
        productImage,
        quantity,
        adminId,
      },
      { new: true }
    );
    res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    next(error);
  }
};
