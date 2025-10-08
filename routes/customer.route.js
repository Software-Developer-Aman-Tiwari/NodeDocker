const {
  getAllCustomers,
  getCustomerById,
  saveCustomer,
  updateCustomerById,
  deleteCustomerById,
  getCustomerByEmail,
  login,
} = require("../controller/customer.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/greet", (req, res) => {
  //  http://localhst:5000/api/v1/customers/greet
  res.send("good evening sir!");
});

router.post("/", saveCustomer); // http://localhst:5000/api/v1/customers
router.post("/login", login); // http://localhst:5000/api/v1/customers
router.use(authMiddleware); // router level middleware
router.get("/email/:email", getCustomerByEmail); // http://localhst:5000/api/v1/customers/1233
router.get("/", getAllCustomers); // http://localhst:5000/api/v1/customers
router.get("/:id", getCustomerById); // http://localhst:5000/api/v1/customers/1233
router.put("/:id", updateCustomerById); // http://localhst:5000/api/v1/customers/1452
router.delete("/:id", deleteCustomerById); // http://localhst:5000/api/v1/customers/233

module.exports = router;
