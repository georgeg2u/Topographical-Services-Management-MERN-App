const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  salary: {
    type: mongoose.Mixed,
    required: true,
  },
  languages: {
    type: [String],
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  favorited: {
    type: Boolean,
    required: true,
  },
  locationMap: {
    type: [{
      address: String,
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
  shareLinks: {
    type: {
      facebook: String,
      instagram: String,
      linkedin: String,
      twitter: String,
    },
    required: true,
  },
});


const Service = mongoose.model('service', serviceSchema);

module.exports = Service;
