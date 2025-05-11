const db = require('../config/db');

class Vaccine {
  static async findAllVaccine() {
    const query = `select vaccination_name from vaccination;`;
    const result = await db.query(query);
    return result.rows;
  }
}

module.exports = Vaccine; 