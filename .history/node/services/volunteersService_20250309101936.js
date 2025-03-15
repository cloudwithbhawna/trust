const Volunteer = require("../models/Volunteer");

class VolunteersService {
  // Create a new volunteer
  static async createVolunteer(volunteerData) {
    try {
      const volunteerId = await Volunteer.createVolunteer(volunteerData);
      return volunteerId;
    } catch (error) {
      console.error("Error in VolunteersService.createVolunteer:", error.message);
      throw error;
    }
  }

  // Get all volunteers
  static async getAllVolunteers() {
    try {
      const volunteers = await Volunteer.getAllVolunteers();
      return volunteers;
    } catch (error) {
      console.error("Error in VolunteersService.getAllVolunteers:", error.message);
      throw error;
    }
  }

  // Get a volunteer by ID
  static async getVolunteerById(id) {
    try {
      const volunteer = await Volunteer.getVolunteerById(id);
      return volunteer;
    } catch (error) {
      console.error("Error in VolunteersService.getVolunteerById:", error.message);
      throw error;
    }
  }

  // Update a volunteer
  static async updateVolunteer(id, volunteerData) {
    try {
      const affectedRows = await Volunteer.updateVolunteer(id, volunteerData);
      return affectedRows;
    } catch (error) {
      console.error("Error in VolunteersService.updateVolunteer:", error.message);
      throw error;
    }
  }

  // Delete a volunteer
  static async deleteVolunteer(id) {
    try {
      const affectedRows = await Volunteer.deleteVolunteer(id);
      return affectedRows;
    } catch (error) {
      console.error("Error in VolunteersService.deleteVolunteer:", error.message);
      throw error;
    }
  }
}

module.exports = VolunteersService;
