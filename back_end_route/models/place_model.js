import mongoose from "mongoose";
const { Schema } = mongoose;
const placeSchema = new Schema({
  county: { type: String, minlength: 1, maxlength: 10, required: true },
  region: { type: String, maxlength: 20, minlength: 2, required: true },
  village: { type: String, maxlength: 20, minlength: 2, required: true },
  place: { type: String, maxlength: 20, minlength: 0, required: true },
});
const Place = mongoose.model("Place", placeSchema);
export default Place;
