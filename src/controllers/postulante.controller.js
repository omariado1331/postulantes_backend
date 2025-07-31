const postulanteModel = require('../models/postulante.model');

const create = async (req, res) => {
    try {
        const {
            nombre,
            ci,
            fecha_nacimiento,
            correo,
            direccion
        } = req.body;

        const curriculum = req.file ? req.file.filename : null;

        if (!nombre || !ci || !fecha_nacimiento || !correo || !direccion || !curriculum) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const postulante = {
            nombre,
            ci,
            fecha_nacimiento,
            correo,
            direccion,
            curriculum,
            estado: 'postulante' // por defecto
        };

        console.log('Archivo recibido:', req.file);
        console.log('Body:', req.body);
        const nuevo = await postulanteModel.createPostulante(postulante);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error('Error creating postulante:', error);
        res.status(500).json({ error: 'Error creating postulante' });
    }
}

const findAll = async (req, res) => {
    try {
        const lista = await postulanteModel.findAllPostulantes();
        res.json(lista);
    } catch (error) {
        console.error('Error fetching postulantes:', error);
        res.status(500).json({ error: 'Error fetching postulantes' });
    }
}

const findById = async (req, res) => {
    try {
        const id = req.params.id;
        const postulante = await postulanteModel.findPostulanteById(id);
        if (!postulante) {
            return res.status(404).json({ error: 'Postulante not found' });
        }
        res.json(postulante);
    } catch (error) {
        console.error('Error fetching postulante:', error);
        res.status(500).json({ error: 'Error fetching postulante' });
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const actualizado = await postulanteModel.updatePostulante(id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: 'Postulante not found' });
        }
        res.json(actualizado);
    } catch (error) {
        console.error('Error updating postulante:', error);
        res.status(500).json({ error: 'Error updating postulante' });
    }
}

module.exports = {
    create,
    findAll,
    findById,
    update
};  