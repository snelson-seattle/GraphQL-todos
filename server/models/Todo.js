const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const todoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model("Todo", todoSchema);

module.exports = Todo;
