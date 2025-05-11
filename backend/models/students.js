const db = require('../config/db');

class Students {
  static async findAllStudents() {
    const query = `SELECT * FROM student WHERE deleted_flag = false`;
    const result = await db.query(query);
    return result.rows;
  }

  static async findRegisteredVaccinatedStudents(vaccineName) {
    const query = `select * from std_vaccine as sv 
      join student as s on sv.std_id = s.std_id
      join vaccination as v on sv.vac_id = v.vac_id
      where v.vaccination_name = '${vaccineName}' and s.deleted_flag = false`;
    const result = await db.query(query);
    return result.rows;
  }

  static async addStudent(name, grade, gender, age) {
    const query = `INSERT INTO student ( student_name, grade, gender, last_mod_date, deleted_flag, age) VALUES
    ('${name}', '${grade}', '${gender}', CURRENT_TIMESTAMP, false, ${age})`;
    const result = await db.query(query);
    return result.rows;
  }
  

  static async updateStudent(id, name, grade, gender, age) {
    const query = `UPDATE student set student_name = '${name}', grade = '${grade}',  gender = '${gender}', last_mod_date = CURRENT_TIMESTAMP, age = ${age}
    where std_id = ${id}`;
    const result = await db.query(query);
    return result.rows;
  }

  static async findRegisteredStudentsForVaccine(vaccineName){
    let query = '';
    if(vaccineName == 'All')
      {
        query = `select * from std_vaccine`
      }
    else { 
      query = `select * from std_vaccine as sv join vaccination as v on sv.vac_id = v.vac_id where v.vaccination_name = '${vaccineName}'`
    }
    const result = await db.query(query);
    return result.rows;
  }

  static async findVaccinatedStudentsForVaccine(vaccineName){
    let query = '';
    if(vaccineName == 'All')
      {
        query =  `select * from std_vaccine as sv join vaccination as v on sv.vac_id = v.vac_id where sv.status = 'Vaccinated'`
      }
    else {
     query = `select * from std_vaccine as sv join vaccination as v on sv.vac_id = v.vac_id where sv.status = 'Vaccinated' and v.vaccination_name = '${vaccineName}'`
  }
  const result = await db.query(query);
    return result.rows;
  }
}

module.exports = Students; 