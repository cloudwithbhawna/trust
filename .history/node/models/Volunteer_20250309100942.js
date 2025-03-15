const db = require("../config/db");

class Volunteer {
  static async create(volunteerData) {
    const sql = `
      INSERT INTO volunteers 
        (fullname, dob, gender, mobilenumber, email, address, house_no_street, city, state, pincode, emergency_name, emergency_relationship, emergency_mobile, consent, aadhar, passport_photo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      volunteerData.fullname,
      volunteerData.dob,
      volunteerData.gender || 'Female',
      volunteerData.mobilenumber,
      volunteerData.email,
      volunteerData.address,
      volunteerData.house_no_street,
      volunteerData.city,
      volunteerData.state,
      volunteerData.pincode,
      volunteerData.emergency_name,
      volunteerData.emergency_relationship,
      volunteerData.emergency_mobile,
      volunteerData.consent || false,
      volunteerData.aadhar || null,
      volunteerData.passport_photo || null
    ];
    const [result] = await db.execute(sql, values);
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await db.execute("SELECT * FROM volunteers");
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.execute("SELECT * FROM volunteers WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
  }

  static async update(id, volunteerData) {
    const sql = `
      UPDATE volunteers SET
        fullname = ?,
        dob = ?,
        gender = ?,
        mobilenumber = ?,
        email = ?,
        address = ?,
        house_no_street = ?,
        city = ?,
        state = ?,
        pincode = ?,
        emergency_name = ?,
        emergency_relationship = ?,
        emergency_mobile = ?,
        consent = ?,
        aadhar = ?,
        passport_photo = ?
      WHERE id = ?
    `;
    const values = [
      volunteerData.fullname,
      volunteerData.dob,
      volunteerData.gender || 'Female',
      volunteerData.mobilenumber,
      volunteerData.email,
      volunteerData.address,
      volunteerData.house_no_street,
      volunteerData.city,
      volunteerData.state,
      volunteerData.pincode,
      volunteerData.emergency_name,
      volunteerData.emergency_relationship,
      volunteerData.emergency_mobile,
      volunteerData.consent || false,
      volunteerData.aadhar || null,
      volunteerData.passport_photo || null,
      id
    ];
    const [result] = await db.execute(sql, values);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.execute("DELETE FROM volunteers WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

module.exports = Volunteer;
