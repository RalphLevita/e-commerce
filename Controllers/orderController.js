const Order = require("../Models/OrderModel");

exports.createOrder = async (req, res, next) => {
  const {
    productId,
    quantity,
    addressOfDelivery,
    paymentMethod,
    voucherId,
    userId,
    shippingId,
  } = req.body;

  try {
    await Order.create({
      productId,
      quantity,
      addressOfDelivery,
      paymentMethod,
      voucherId,
      userId,
      shippingId,
    });
    res.status(200).json({ message: "Successfully Created" });
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const productOrders = await Orders.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
    ]);
    res.status(200).json(productOrders);
  } catch (error) {
    next(error);
  }
};

exports.viewOrders = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const viewOrders = await Order.findById({ _id });
    res.status(200).json(viewOrders);
  } catch (error) {
    next(error);
  }
};

exports.archiveOrders = async (req, res, next) => {
  const _id = req.params.id;
  try {
    await Order.findByIdAndUpdate({ _id }, { isDeleted: true }, { new: true });
    res.status(200).json({ message: "Successfully Archived" });
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  const _id = req.params.id;
  const {
    quantity,
    addressOfDelivery,
    paymentMethod,
    voucherId,
    userId,
    shippingId,
  } = req.body;
  try {
    await Order.findByIdAndUpdate(
      { _id },
      {
        quantity,
        addressOfDelivery,
        paymentMethod,
        voucherId,
        userId,
        shippingId,
      },
      { new: true }
    );
    res.status(200).json({ message: "Successfully Updated" });
  } catch (error) {
    next(error);
  }
};
