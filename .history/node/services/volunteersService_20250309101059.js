const Volunteer = require("../models/Volunteer");

class VolunteersService {
  static async create(volunteerData) {
    return await Volunteer.create(volunteerData);
  }

  static async getAll() {
    return await Volunteer.getAll();
  }

  static async getById(id) {
    return await Volunteer.getById(id);
  }

  static async update(id, volunteerData) {
    return await Volunteer.update(id, volunteerData);
  }

  static async delete(id) {
    return await Volunteer.delete(id);
  }
}

module.exports = VolunteersService;
