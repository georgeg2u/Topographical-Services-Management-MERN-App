const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema({
  status: {
    type: String,
    require: true,
  },
  customerFirstName: {
    type: String,
    require: true,
  },
  customerLastName: {
    type: String,
    require: true,
  },
  customerEmail: {
    type: String,
    require: true,
  },
  serviceId: {
    type: String,
    require: true,
  },
  companyName: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  serviceName: {
    type:String,
    required: true,
  },
  propertyDocument: {
    type: Buffer,
  },
  identityDocument: {
    type: Buffer,
  },
  fiscalDocument: {
    type: Buffer,
  },
  finalServiceDocument: {
    type: Buffer,
  }
});

const Contract = mongoose.model("contract", contractSchema);

module.exports = Contract;
