const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const cardSchema = new Schema({
  _id: { type: String },
  number: { type: String, required: true },
  name: { type: String, required: true },
  cvv: { type: String, required: true },
  expiration: { type: String, required: true },
  deleted: { type: Boolean, default: false },
  created: { type: Number, default: ~~(new Date().getTime() / 1e3) },
  updated: { type: Number, default: ~~(new Date().getTime() / 1e3) }
}, { timestamps: false, _id: false });

const modelCard = model('card', cardSchema, 'card');

module.exports = modelCard;
