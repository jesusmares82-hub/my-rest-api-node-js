const { actors }  = require('../models')
const jwt = require("jsonwebtoken");


const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        console.log(page, limit);

        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;

        const actorsData = await actors.findAll({ raw: true })

        const result = {};
        if (endIndex < actorsData.length) {
            let arrayData = actorsData.slice(startIndex, endIndex);
            result._links = {
                base: "http://localhost:8080/actors",
                next: `http://localhost:3000/api/v1/actors?page=${ page + 1}&limit=5`,
                self: `http://localhost:3000/api/v1/actors?page=${ page }&limit=5`,
            }

            result.info = {
                limit: limit,
                size: arrayData.length,
                start: actorsData.length - limit
            }
        }

        if (startIndex > 0) {
            let arrayData = actorsData.slice(startIndex, endIndex);
            result._links = {
                base: "http://localhost:8080/actors",
                previous: `http://localhost:3000/api/v1/actors?page=${ page - 1}&limit=5`,
                self: `http://localhost:3000/api/v1/actors?page=${ page }&limit=5`,
            }

            result.info = {
                limit: limit,
                size: arrayData.length,
                start: actorsData.length - limit
            }
        }

        result.actorsDataPagination = actorsData.slice(startIndex, endIndex);

        res.status(201).json(result);

    } catch (error) {
        next(error)
    }
}

const getId = async (req, res, next) => {
    try {
        let id = req.params.id;
        const actorId = await actors.findAll({ raw: true, where: { id: id } })
        res.json(actorId);
    } catch (error) {
        next(error)
    }
}

const createf = async (req, res, next) => {
    try {
        let { first_name, last_name, dob, biography, profile_photo, active } = req.body;
        let actor = await actors.create({ first_name, last_name, dob, biography})
        res.status(201).json(actor);
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { first_name, last_name, dob, biography, profile_photo, active } = req.body
        let actorsUpdate = await actors.update({ first_name, last_name, dob, biography, profile_photo, active }, { where: { id } })
        res.status(201).json(actorsUpdate)
    } catch (error) {
        next(error)
    }
}

const deleteActors = async (req, res, next) => {
    try {
        let { id } = req.params
        let deleteActors = await actors.destroy({ where: { id: id } })
        res.status(201).json(deleteActors);
    } catch (error) {
        next(error)
    }
}

const updatePhoto = async (req, res, next) => {
    try {
        let { id } = req.params;
        req.body.profile_photo = req.file.path
        let actorsPhoto = await actors.findAll({ raw: true, where: { id: id } });
        let updateActorsPhoto = await actors.update(req.body, { where: { id: id } });
        console.log(updateActorsPhoto);
        res.status(201).json(updateActorsPhoto)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    getId,
    createf,
    update,
    deleteActors,
    updatePhoto
}