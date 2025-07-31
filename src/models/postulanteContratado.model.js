const db = require('../config/db');

const create = async (data) => {
    const {
        postulante_id,
        nombre,
        ci,
        fecha_nacimiento,
        correo,
        direccion,
        tipo,
        adjudicacion,
        proceso,
        nro_contrato,
    } = data;

    const query = `
    INSERT INTO postulante_contratado
    (postulante_id, nombre, ci, fecha_nacimiento, correo, direccion, tipo, adjudicacion, proceso, nro_contrato)
    VALUES ($1,$2,$3,$4,$5,$6, $7, $8, $9, $10)
    RETURNING *;
    `;

    const values = [
        postulante_id,
        nombre,
        ci,
        fecha_nacimiento,
        correo,
        direccion,
        tipo,
        adjudicacion,
        proceso,
        nro_contrato
    ];

    const result = await db.query(query, values);
    return result.rows[0];
}

const findAll = async () => {
    const result = await db.query('SELECT * FROM postulante_contratado');
    return result.rows;
}

const findById = async (id) => {
    const result = await db.query('SELECT * FROM postulante_contratado WHERE id = $1', [id]);
    return result.rows[0];
};

const update = async (id, data) => {
    const {
      tipo,
      adjudicacion,
      proceso,
      nro_contrato
    } = data;
  
    const query = `
      UPDATE postulante_contratado
      SET tipo = $1, adjudicacion = $2, proceso = $3, nro_contrato = $4
      WHERE id = $5
      RETURNING *;
    `;
  
    const values = [tipo, adjudicacion, proceso, nro_contrato, id];
    const result = await db.query(query, values);
    return result.rows[0];
  };

  const remove = async (id) => {
    await db.query('DELETE FROM postulante_contratado WHERE id = $1', [id]);
  };

  module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
  }

