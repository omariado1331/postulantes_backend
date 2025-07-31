const db = require('../config/db');

// This function creates a new postulante in the database.
const createPostulante = async (postulante) => {
    const {
        nombre,
        ci,
        fecha_nacimiento,
        correo,
        direccion, // ✅ agrégalo aquí
        curriculum,
        estado = 'postulante',
    } = postulante;

    const query = `
    INSERT INTO postulantes (nombre, ci, fecha_nacimiento, correo, direccion, curriculum, estado)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
    `;
    
    const values = [nombre, ci, fecha_nacimiento, correo, direccion, curriculum, estado];

    const result = await db.query(query, values);

    return result.rows[0];
}

// This function retrieves all postulantes from the database.
const findAllPostulantes = async () => {
    const result = await db.query('SELECT * FROM postulantes');
    return result.rows;
}

// This function retrieves a postulante by its ID from the database.
const findPostulanteById = async (id) => {
    const result = await db.query('SELECT * FROM postulantes WHERE id = $1', [id]);
    if (result.rows.length === 0) {
        throw new Error('Postulante not found');
    }
    return result.rows[0];
}

// This function updates a postulante in the database.
const updatePostulante = async (id, postulante) => {
    const campos = [];
    const valores = [];
    let index = 1;

    for (const key in postulante){
        campos.push(`${key} = $${index}`);
        valores.push(postulante[key]);
        index++;
    }

    const query = `
    UPDATE postulantes SET ${campos.join(', ')} WHERE id = $${index} RETURNING *;
    `;
    valores.push(id);

    const result = await db.query(query, valores);
    return result.rows[0];
}

module.exports = {
    createPostulante,
    findAllPostulantes,
    findPostulanteById,
    updatePostulante,
  };