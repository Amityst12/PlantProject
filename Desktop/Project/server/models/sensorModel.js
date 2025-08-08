const db = require('../config/db');

// כל החיישנים
async function getAllSensors() {
  const [rows] = await db.query('SELECT * FROM sensor');
  return rows;
}

// לפי מזהה
async function getSensorById(id) {
  const [rows] = await db.query('SELECT * FROM sensor WHERE id = ?', [id]);
  return rows[0];
}

// יצירה
async function createSensor(sensor) {
  const {
    serial_number, model, manufacturer, type, name, unit,
    status, installed_at, last_maintenance,
    room_id, x_coord, y_coord, x_percent, y_percent
  } = sensor;

  const [result] = await db.query(
    `INSERT INTO sensor (
      serial_number, model, manufacturer, type, name, unit,
      status, installed_at, last_maintenance,
      room_id, x_coord, y_coord, x_percent, y_percent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [serial_number, model, manufacturer, type, name, unit,
      status, installed_at, last_maintenance,
      room_id, x_coord, y_coord, x_percent, y_percent]
  );
  return result.insertId;
}

// עדכון
async function updateSensor(id, sensor) {
  const [result] = await db.query(
    `UPDATE sensor SET ? WHERE id = ?`,
    [sensor, id]
  );
  return result.affectedRows;
}

// מחיקה
async function deleteSensor(id) {
  const [result] = await db.query('DELETE FROM sensor WHERE id = ?', [id]);
  return result.affectedRows;
}

module.exports = {
  getAllSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor
};
