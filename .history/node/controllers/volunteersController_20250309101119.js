const VolunteersService = require("../services/volunteersService");

class VolunteersController {
  static async createVolunteer(req, res) {
    try {
      const data = req.body;
      // Add file paths if files are uploaded
      if (req.files) {
        if (req.files.aadhar) data.aadhar = req.files.aadhar[0].path;
        if (req.files.passport_photo) data.passport_photo = req.files.passport_photo[0].path;
      }
      const id = await VolunteersService.create(data);
      res.status(201).json({ message: "Created volunteer", id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllVolunteers(req, res) {
    try {
      const volunteers = await VolunteersService.getAll();
      res.json(volunteers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getVolunteerById(req, res) {
    try {
      const volunteer = await VolunteersService.getById(req.params.id);
      if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
      res.json(volunteer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateVolunteer(req, res) {
    try {
      const data = req.body;
      if (req.files) {
        if (req.files.aadhar) data.aadhar = req.files.aadhar[0].path;
        if (req.files.passport_photo) data.passport_photo = req.files.passport_photo[0].path;
      }
      const rows = await VolunteersService.update(req.params.id, data);
      if (rows === 0) return res.status(404).json({ message: "Volunteer not found" });
      res.json({ message: "Updated successfully", rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteVolunteer(req, res) {
    try {
      const rows = await VolunteersService.delete(req.params.id);
      if (rows === 0) return res.status(404).json({ message: "Volunteer not found" });
      res.json({ message: "Deleted successfully", rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = VolunteersController;
