const db = require('../config/db');

class Drives {
    static async addDrive(vaccineName, date, availableVaccine) {
        const query = `INSERT INTO vaccine_drive (vac_id, drive_date, no_of_vaccines)
            SELECT vac_id, TO_DATE( '${date}', 'DD/MM/YYYY'), ${availableVaccine}
            FROM vaccination
            WHERE vaccination_name = '${vaccineName}'`;
        const result = await db.query(query);
        return result.rows;
      }
}

module.exports = Drives; 