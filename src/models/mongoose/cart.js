const { Schema, model } = require("mongoose");

const collectionName = "cart";

const collectionSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'products'
  }],
  status_id: {
    type: Schema.Types.ObjectId,
    ref: 'status'
  },
  createdAt: {
    type: Date,
    Default: Date.now()
  },
  updatedAt: {
    type: Date,
    Default: null
  },
});

const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;