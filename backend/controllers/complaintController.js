/**
 * Complaint Controller
 * Handles complaint creation, retrieval, update, and deletion
 */

const Complaint = require("../models/Complaint");
const fs = require("fs");
const path = require("path");

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Private
const createComplaint = async (req, res) => {
  try {
    const { wasteType, description, location, latitude, longitude } = req.body;

    // Validation
    if (!wasteType || !description || !location) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: wasteType, description, location",
      });
    }

    // Create complaint data
    const complaintData = {
      userId: req.user.id,
      wasteType,
      description,
      location,
      latitude: latitude || null,
      longitude: longitude || null,
    };

    // Add image if uploaded
    if (req.file) {
      complaintData.image = `/uploads/${req.file.filename}`;
    }

    const complaint = await Complaint.create(complaintData);

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint,
    });
  } catch (error) {
    // Clean up uploaded file if error occurs
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log("Error deleting file:", err);
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Error creating complaint",
    });
  }
};

// @desc    Get all complaints (Admin) or user's complaints
// @route   GET /api/complaints
// @access  Private
const getComplaints = async (req, res) => {
  try {
    let query;

    // If user is admin, get all complaints. Otherwise, get only user's complaints
    if (req.user.role === "admin") {
      query = Complaint.find().populate("userId", "name email phone address");
    } else {
      query = Complaint.find({ userId: req.user.id });
    }

    const complaints = await query.sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching complaints",
    });
  }
};

// @desc    Get single complaint
// @route   GET /api/complaints/:id
// @access  Private
const getComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate(
      "userId",
      "name email phone address",
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Check if user is admin or complaint owner
    if (
      req.user.role !== "admin" &&
      complaint.userId._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this complaint",
      });
    }

    res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching complaint",
    });
  }
};

// @desc    Update complaint status (Admin only)
// @route   PATCH /api/complaints/:id
// @access  Private/Admin
const updateComplaint = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please provide a status",
      });
    }

    if (!["Pending", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be Pending, In Progress, or Completed",
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes: adminNotes || "" },
      { new: true, runValidators: true },
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error updating complaint",
    });
  }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private/Admin or Complaint Owner
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Check if user is admin or complaint owner
    if (
      req.user.role !== "admin" &&
      complaint.userId.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this complaint",
      });
    }

    // Delete image file if exists
    if (complaint.image) {
      const filePath = path.join(__dirname, "../" + complaint.image);
      fs.unlink(filePath, (err) => {
        if (err) console.log("Error deleting image file:", err);
      });
    }

    await Complaint.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting complaint",
    });
  }
};

// @desc    Get complaint statistics (Admin only)
// @route   GET /api/complaints/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const inProgress = await Complaint.countDocuments({
      status: "In Progress",
    });
    const completed = await Complaint.countDocuments({ status: "Completed" });

    // Get complaints by waste type
    const wasteTypeStats = await Complaint.aggregate([
      {
        $group: {
          _id: "$wasteType",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        total,
        pending,
        inProgress,
        completed,
        wasteTypeStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching statistics",
    });
  }
};

module.exports = {
  createComplaint,
  getComplaints,
  getComplaint,
  updateComplaint,
  deleteComplaint,
  getStats,
};
