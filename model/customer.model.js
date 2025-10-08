const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
  {
    name: String,
    mobileNo: Number,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    gender: String,
    address: {
      city: String,
      state: String,
      pincode: Number,
      country: String,
      street: String,
    },
    qualification: [String],
  },
  { timestamps: true }
);
module.exports = mongoose.model("customer", CustomerSchema);

/*
{
  "name": "gaurav singh",
  "mobileNo": 56376376354,
  "email": "gaurav@gmail.com",
  "password": "1234",
  "gender": "Male",
  "address": {
    "city": "GGM",
    "state": "HR",
    "pincode": 122001,
    "country": "IN",
    "street": "sec 14 ,near ganpati honda"
  },
  "qualification": ["Mngo","Express","React","node"]
}

*/
