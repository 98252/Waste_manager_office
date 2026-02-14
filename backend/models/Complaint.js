/**
 * Complaint Model
 * Defines the schema for waste complaints in the database
 */

const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    wasteType: {
      type: String,
      enum: [
        "Plastic",
        "Organic",
        "Paper",
        "Metal",
        "Glass",
        "Electronic",
        "Other",
      ],
      required: [true, "Please select a waste type"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    image: {
      type: String, // URL or file path
      default: null,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    adminNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Complaint", complaintSchema);
