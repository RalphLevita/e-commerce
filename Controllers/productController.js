const Product = require("../Models/ProductModel");


exports.createProducts = async (req, res, next) => {
    const {
      username,
      email,
      password,
      firstName,
      middleName,
      lastName,
      gender,
      placeOfBirth,
      mobileNo,
      address,
      image,
      role
    } = req.body;
  
    try {
      const user = await Product.create({
        username,
        email,
        password,
        firstName,
        middleName,
        lastName,
        gender,
        placeOfBirth,
        mobileNo,
        address,
      image,
      role
      });
  
      //sendToken(user, 200, res);
      res.status(200).json({ message: "Successfully Registered" });
    } catch (err) {
      next(err);
    }
  };
  