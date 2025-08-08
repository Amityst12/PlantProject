const db = require('../config/db');

async function getAllBuildings() {
  const [rows] = await db.query('SELECT * FROM building');
  return rows;
}

async function getBuildingById(id) {
  const [rows] = await db.query('SELECT * FROM building WHERE id = ?', [id]);
  return rows[0];
}

async function createBuilding({ name }) {
  const [result] = await db.query('INSERT INTO building (name) VALUES (?)', [name]);
  return { id: result.insertId, name };
}

async function updateBuilding(id, { name }) {
  await db.query('UPDATE building SET name = ? WHERE id = ?', [name, id]);
  return { id, name };
}

async function deleteBuilding(id) {
  await db.query('DELETE FROM building WHERE id = ?', [id]);
  return { message: `Building with ID ${id} deleted.` };
}

module.exports = {
  getAllBuildings,
  getBuildingById,
  createBuilding,
  updateBuilding,
  deleteBuilding
};
