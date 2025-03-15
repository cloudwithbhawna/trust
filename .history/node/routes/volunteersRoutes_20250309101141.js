const express = require("express");
const router = express.Router();
const VolunteersController = require("../controllers/volunteersController");
const upload = require("../middleware/upload");

// Create a volunteer with file uploads for aadhar and passport_photo
router.post("/", upload.fields([
  { name: "aadhar", maxCount: 1 },
  { name: "passport_photo", maxCount: 1 }
]), VolunteersController.createVolunteer);

// Get all volunteers
router.get("/", VolunteersController.getAllVolunteers);

// Get volunteer by ID
router.get("/:id", VolunteersController.getVolunteerById);

// Update volunteer (with file uploads)
router.put("/:id", upload.fields([
  { name: "aadhar", maxCount: 1 },
  { name: "passport_photo", maxCount: 1 }
]), VolunteersController.updateVolunteer);

// Delete volunteer
router.delete("/:id", VolunteersController.deleteVolunteer);

module.exports = router;
