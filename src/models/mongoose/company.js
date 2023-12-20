const { Schema, model } = require("mongoose");

const collectionName = "companies";

const collectionSchema = new Schema({
  email: {
    unique: true,
    type: String,
    required: true,
    index: true
  },
  name: String,
  address: String,
  phone: String,
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'users'
  }]
});

const modelEntity = model(collectionName, collectionSchema);

module.exports = modelEntity;