/**
 * Complaint Routes
 * Handles complaint creation, retrieval, update, and deletion
 */

const express = require("express");
const router = express.Router();
const {
  createComplaint,
  getComplaints,
  getComplaint,
  updateComplaint,
  deleteComplaint,
  getStats,
} = require("../controllers/complaintController");
const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/upload");

/**
 * @route   POST /api/complaints
 * @desc    Create a new complaint with image upload
 * @access  Private (Users)
 */
router.post("/", auth, upload.single("image"), createComplaint);

/**
 * @route   GET /api/complaints
 * @desc    Get all complaints (Admin) or user's complaints (User)
 * @access  Private
 */
router.get("/", auth, getComplaints);

/**
 * @route   GET /api/complaints/stats
 * @desc    Get complaint statistics
 * @access  Private/Admin
 */
router.get("/stats", auth, adminAuth, getStats);

/**
 * @route   GET /api/complaints/:id
 * @desc    Get single complaint
 * @access  Private
 */
router.get("/:id", auth, getComplaint);

/**
 * @route   PATCH /api/complaints/:id
 * @desc    Update complaint status and notes (Admin only)
 * @access  Private/Admin
 */
router.patch("/:id", auth, adminAuth, updateComplaint);

/**
 * @route   DELETE /api/complaints/:id
 * @desc    Delete a complaint
 * @access  Private/Admin or Owner
 */
router.delete("/:id", auth, deleteComplaint);

module.exports = router;
