const customerModel = require("../model/customer.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../middlewares/auth.middleware");

// ---------------------- LOGIN ----------------------
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(email, password);
    const customer = await customerModel.findOne({ email: email });
    console.log(customer);
    if (!customer) {
      console.log("customer doesn't exist");
      return res
        .status(404)
        .json({ success: false, message: "Account Doesn't Exist!" });
    }

    if (bcrypt.compareSync(password, customer.password)) {
      const token = generateToken(customer.toObject());
      res.status(200).json({ success: true, token: token });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
      error: error.message,
    });
  }
};

// ---------------------- GET ALL STUDENTS ----------------------
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    if (!customers.length) {
      return res
        .status(404)
        .json({ success: false, message: "No customers found!" });
    }
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ---------------------- GET STUDENT BY ID ----------------------
exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const customer = await customerModel.findById(id);
    console.log(customer);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found!" });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid ID format",
      error: error.message,
    });
  }
};

// ---------------------- GET STUDENT BY EMAIL ----------------------
exports.getCustomerByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    // console.log(email);
    const customer = await customerModel.findOne({ email: email });
    // console.log(customer);
    if (customer === null) {
      console.log("customer doesn't exist");
      return res
        .status(404)
        .json({ success: false, message: "Customer not found!" });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid email format",
      error: error.message,
    });
  }
};

// ---------------------- CREATE Customer ----------------------
exports.saveCustomer = async (req, res) => {
  try {
    const customer = req.body;
    const hashedPassword = bcrypt.hashSync(customer.password, 10);
    customer.password = hashedPassword;
    const cust = new customerModel(customer);
    const savedCustomer = await cust.save();
    res.status(201).json({
      success: true,
      message: "Customer created",
      data: savedCustomer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation error",
      error: error.message,
    });
  }
};

// ---------------------- UPDATE STUDENT ----------------------
exports.updateCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = await customerModel
      .findByIdAndUpdate(id, req.body, {
        new: true, // return updated doc
        runValidators: true, // apply schema validators
      })
      .lean();

    if (!updatedCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found!" });
    }
    res.status(200).json({
      success: true,
      message: "Customer updated",
      data: updatedCustomer,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Update failed", error: error.message });
  }
};

// ---------------------- DELETE STUDENT ----------------------
exports.deleteCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await customerModel.findByIdAndDelete(id).lean();
    if (!deletedCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found!" });
    }
    res.status(200).json({
      success: true,
      message: "Customer deleted",
      data: deletedCustomer,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Delete failed", error: error.message });
  }
};
