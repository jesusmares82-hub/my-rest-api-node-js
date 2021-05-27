const { contents } = require('../models');

const getAll =  async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        // console.log(page, limit);

        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;

        const actorsData = await contents.findAll({ raw: true })

        const result = {};

        if (endIndex < actorsData.length) {
            let arrayData = actorsData.slice(startIndex, endIndex);
            result._links = {
                base: "http://localhost:8080/contents",
                next: `http://localhost:3000/api/v1/contents?page=${ page + 1}&limit=5`,
                self: `http://localhost:3000/api/v1/contents?page=${ page }&limit=5`,
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
                base: "http://localhost:8080/contents",
                previous: `http://localhost:3000/api/v1/contents?page=${ page - 1}&limit=5`,
                self: `http://localhost:3000/api/v1/contents?page=${ page }&limit=5`,
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
        const actorId = await contents.findAll({raw: true, where: {id: id}})
        res.status(201).json(actorId);
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        let { title } = req.body;
        let createContents = await contents.create({ title })
        res.status(201).json(createContents)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { title } = req.body
        let updateContents = await contents.update({ title }, {where: {id}})
        res.status(201).json(updateContents)
    } catch (error) {
        next(error)
    }
}

const deleteContents = async (req, res, next) => {
    try {
        let { id } = req.params
        let deleContents = await contents.destroy({where: {id: id}})
        res.status(201).json(deleContents);
    } catch (error) {
        next(error)
    }
} 

module.exports = {
    getAll,
    getId,
    create,
    update,
    deleteContents
}