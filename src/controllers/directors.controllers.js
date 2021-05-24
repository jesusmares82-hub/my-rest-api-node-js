const { directors } = require('../models')
const jwt = require("jsonwebtoken");

const getAll =  async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        // console.log(page, limit);

        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;

        const actorsData = await directors.findAll({ raw: true })

        const result = {};
        if (endIndex < actorsData.length) {
            let pageNext = page + 1
            console.log(pageNext);
            result.next = {
                page: pageNext,
                limit: limit
            }
        }

        if (startIndex > 0) {
            result.previous = {
                page: page - 1,
                limit: limit
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
        const actorId = await directors.findAll({raw: true, where: {id: id}})
        res.status(201).json(actorId);
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        let { first_name, last_name, dob, biography, profile_photo, active } = req.body;
        let createDirectors = await directors.create({first_name, last_name, dob, biography, profile_photo, active})
        res.status(201).json(createDirectors)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { first_name, last_name, dob, biography, profile_photo, active } = req.body
        let updateDirector = await directors.update({first_name, last_name, dob, biography, profile_photo, active}, {where: {id}})
        res.status(201).json(updateDirector)
    } catch (error) {
        next(error)
    }
}

const deleteActors = async (req, res, next) => {
    try {
        let { id } = req.params
        let deleDirectors = await directors.destroy({where: {id: id}})
        res.status(201).json(deleDirectors);
    } catch (error) {
        next(error)
    }
} 

const verifyToken = ((req, res, next) => {
    const token = req.headers['access-token'];

if (token) {
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {      
    if (err) {
      return res.json({ mensaje: 'Token inválido' });    
    } else {
      req.decoded = decoded;    
      next();
    }
  });
} else {
  res.send({ 
      mensaje: 'Token no proporcionado.' 
  });
}
});

const updatePhoto = async (req, res, next) => {
    try {
        let { id } = req.params;
        req.body.profile_photo = req.file.path
        let actorsPhoto = await directors.findAll({raw: true, where: {id: id}});
        let updateActorsPhoto = await directors.update(req.body, {where: {id: id}});
        console.log(updateActorsPhoto);
        res.send('Estamos porbando el put de gallery')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    getId,
    create,
    update, 
    deleteActors,
    verifyToken,
    updatePhoto
}