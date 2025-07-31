const model = require('../models/postulanteContratado.model');

const create = async (req, res) => {
    try {
        const nuevo = await model.create(req.body);
        res.status(201).json(nuevo);
    } catch (error){
        console.error('Error creating postulante contratado:', error);
        res.status(500).json({ error: 'Error creating postulante contratado' });
    }
}

const findAll = async (req, res) => {
    try {
        const lista = await model.findAll();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching postulantes contratados' });
    }
}

const findById = async (req, res) => {
    try {
        const contratado = await model.findById(req.params.id);
        if (!contratado) {
            return res.status(404).json({ error: 'Postulante contratado not found' });
        }
        res.json(contratado);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching postulante contratado' });
    }
}

const update = async (req, res) => {
    try {
        const actualizado = await model.update(req.params.id, req.body);
        if (!actualizado) {
            return res.status(404).json({ error: 'Postulante contratado not found' });
        }
        res.json(actualizado);
    } catch (error) {
        console.error('Error updating postulante contratado:', error);
        res.status(500).json({ error: 'Error updating postulante contratado' });
    }
}

const remove = async (req, res) => {
    try {
        await model.remove(req.params.id);
        res.status(204).send();
    }   catch (error) {
        console.error('Error deleting postulante contratado:', error);
        res.status(500).json({ error: 'Error deleting postulante contratado' });
    }
}   

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
}