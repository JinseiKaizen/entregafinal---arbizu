const { Schema, model } = require("mongoose");

const collectionName = "products";

const collectionSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'companies'
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