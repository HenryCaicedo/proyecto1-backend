// src/restaurant/restaurant.model.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true },
  });

  const Restaurant = mongoose.model('Restaurant', restaurantSchema);

  module.exports = Restaurant;
