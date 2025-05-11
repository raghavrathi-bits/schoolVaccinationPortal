const db = require('../config/db');

class User {
  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    const result = await db.query(query);
    return result.rows[0];
  }

  static async createUser(userData) {
    const { username, password, role, email, full_name } = userData;
    
    const query = `
      INSERT INTO users (username, password, role, email, full_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, role, email, full_name
    `;
    
    const result = await db.query(query, [
      username,
      password,
      role,
      email,
      full_name
    ]);
    
    return result.rows[0];
  }
}

module.exports = User; 