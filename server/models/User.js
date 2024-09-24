const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: { type: String, require: true, unique: true },
    password: { type: String },
    completedMeetings: Number,
    image: String,
    profession: { type: Schema.Types.ObjectId, ref: "Profession" },
    quantities: [{ type: Schema.Types.ObjectId, ref: "Qualities" }],
    rate: Number,
    sex: { type: String, enum: ["male", "female", "other"] },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
