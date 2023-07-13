const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  locationMap: {
    type: [{
      phoneNumber: String,
      email: String,
      latlng: {
        type: [Number],
        required: true,
      },
    }],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  documents: {
    type: [String],
    required: true,
  },
  benefits: {
    type: [String],
    required: true,
  },
});



const Service = mongoose.model('service', serviceSchema);

module.exports = Service;
