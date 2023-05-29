const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  senderName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  receiverName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner',
    default: null,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2000
  },
  from: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  to: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  partner: {
    type: String,
    default: "Not Assigned",
    minlength: 2,
    maxlength: 50
  },
  status: {
    type: String,
    default: "Shipment Placed",
  },
  lastLocation: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  lastLocationDate: {
    type: Date,
    default: Date.now
  },
  expectedDay: {
    type: Date,
    default: null
  },
  deliveryDay: {
    type: Date,
    default: null
  },
  active: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;