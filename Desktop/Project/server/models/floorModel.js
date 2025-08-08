const db = require('../config/db');

async function getAllFloors() {
  const [rows] = await db.query('SELECT * FROM floor');
  return rows;
}

async function getFloorById(id) {
  const [rows] = await db.query('SELECT * FROM floor WHERE id = ?', [id]);
  return rows[0];
}

async function createFloor(floor) {
  const { number, building_id } = floor;
  const [result] = await db.query(
    'INSERT INTO floor (number, building_id) VALUES (?, ?)',
    [number, building_id]
  );
  return { id: result.insertId, number, building_id };
}

async function updateFloor(id, floor) {
  const { number, building_id } = floor;
  await db.query(
    'UPDATE floor SET number = ?, building_id = ? WHERE id = ?',
    [number, building_id, id]
  );
  return { id, number, building_id };
}

async function deleteFloor(id) {
  await db.query('DELETE FROM floor WHERE id = ?', [id]);
  return { message: 'Floor deleted' };
}

module.exports = {
  getAllFloors,
  getFloorById,
  createFloor,
  updateFloor,
  deleteFloor
};
