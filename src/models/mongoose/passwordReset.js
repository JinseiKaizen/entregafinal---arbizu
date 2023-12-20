const { Schema, model } = require("mongoose");

const collectionName = "password_reset";

const collectionSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  expires: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    Default: Date.now()
  },
  updatedAt: {
    type: Date,
    Default: null
  },
  deletedAt: {
    type: Date,
    Default: null
  }
});

const modelEntity = model(collectionName, collectionSchema);

module.exports =  modelEntity;