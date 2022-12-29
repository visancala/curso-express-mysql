import { pool } from "../db.js";

export const getEmpleados = async (req, res) => {
  try {
    //throw new error('My error')
    const [rows] = await pool.query(
      "SELECT id, nombre, comunidad_id, categoria_id FROM torneo WHERE id>4845"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).send("Algo fué mal en el servidor");
  }
};

export const getEmpleado = async (req, res) => {
  try {
    console.log(req.params.id);
    const [rows] = await pool.query(
      "SELECT id, nombre, comunidad_id, categoria_id FROM torneo WHERE id=?",
      [req.params.id]
    );

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Torneo no found",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).send("Algo fué mal en el servidor");
  }
};

export const createEmpleados = async (req, res) => {
  const { comunidad_id, orden, categoria_id, nombre } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO torneo (comunidad_id, orden, categoria_id, nombre) VALUES (?,?,?,?)",
      [comunidad_id, orden, categoria_id, nombre]
    );
    //console.log(req.body)
    res.send({
      id: rows.insertId,
      comunidad_id,
      orden,
      categoria_id,
      nombre,
    });
  } catch (error) {
    return res.status(500).send("Algo fué mal en el servidor");
  }
};

export const deleteEmpleados = async (req, res) => {
  console.log(req.params.id);
  try {
    const [result] = await pool.query("DELETE FROM torneo WHERE id=?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Torneo no found",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).send("Algo fué mal en el servidor");
  }
};

export const updateEmpleados = async (req, res) => {
  const { id } = req.params;
  const { nombre, comunidad_id } = req.body;
  try {
    //const [result] = await pool.query('UPDATE torneo SET nombre = ?, comunidad_id = ? WHERE id=?',[nombre, comunidad_id, id])
    const [result] = await pool.query(
      "UPDATE torneo SET nombre = IFNULL(?,nombre), comunidad_id = IFNULL(?,comunidad_id) WHERE id=?",
      [nombre, comunidad_id, id]
    );
    console.log(result);
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Torneo no found",
      });

    const [rows] = await pool.query("SELECT * FROM torneo WHERE id=?", [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).send("Algo fué mal en el servidor");
  }
};
