const { users, validate_accounts } = require('../models')
const { sendEmail } = require('../herpers/nodemailer')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { compute_beta } = require('googleapis');

const saltRounds = 10;

const getAll = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        console.log(page, limit);

        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;

        const actorsData = await users.findAll({ raw: true })

        const result = {};
        if (endIndex < actorsData.length) {
            let arrayData = actorsData.slice(startIndex, endIndex);
            result._links = {
                base: "http://localhost:8080/users",
                next: `http://localhost:3000/api/v1/users?page=${ page + 1}&limit=5`,
                self: `http://localhost:3000/api/v1/users?page=${ page }&limit=5`,
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
                base: "http://localhost:8080/users",
                previous: `http://localhost:3000/api/v1/users?page=${ page - 1}&limit=5`,
                self: `http://localhost:3000/api/v1/users?page=${ page }&limit=5`,
            }

            result.info = {
                limit: limit,
                size: arrayData.length,
                start: actorsData.length - limit
            }
        }

        result.actorsDataPagination = actorsData.slice(startIndex, endIndex);

        res.json(result);

    } catch (error) {
        res.json({ message: error.message })
        next(error)
    }
}

const getId = async (req, res, next) => {
    try {
        let id = req.params.id;
        const actorId = await users.findAll({ raw: true, where: { id: id } })
        res.json(actorId);
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        let { first_name, last_name, email } = req.body;
        let active = false;
        const password = await bcrypt.hash(req.body.password, saltRounds);
        const newUsers = await users.create({ first_name, last_name, email, password, active })

        let user_id = newUsers.dataValues.id;
        let hashPure = await bcrypt.hash(req.body.email, saltRounds);
        let hastArray = hashPure.split('');
        let newHast = [];
        let hastFixedUp = hastArray.forEach((value) => {
            if (value != '/') {
                newHast.push(value)
            } 
        });
        
        let hash = newHast.join('');
        console.log(hash);

        await validate_accounts.create({ user_id, hash });

        const emailOptions = {
            subject: "Correo de confirmación de cuenta.",
            to: email,
            from: process.env.G_USER
        }

        emailOptions.subject = 'Confirmación de cuenta'
        emailOptions["template"] = 'email',
        emailOptions["context"] = { title:  `http://localhost:3000/api/v1/verify/${hash}`, name: first_name, }
        sendEmail(emailOptions);
      
        res.status(201).json(newUsers);

    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { first_name, last_name, email, reset_token, active } = req.body
        const password = await bcrypt.hash(req.body.password, saltRounds);
        let updateUsers = await users.update({ first_name, last_name, email, password }, { where: { id } })
        res.status(203).json(updateUsers);
    } catch (error) {
        next(error)
    }
}

const deleteActors = async (req, res, next) => {
    try {
        let { id } = req.params
        let deleteUser = await users.destroy({ where: { id: id } })
        res.status(201).json(deleteUser);
    } catch (error) {
        next(error)
    }
}

const verify = async (req, res, next) => {
    try {
        let hast = req.params.hash;
        const confirmactionAccount = await validate_accounts.findAll({raw: true, where: {hash: hast}})
        console.log(confirmactionAccount[0].user_id);
        const idUser = confirmactionAccount[0].user_id
        const ActiveAccounts = await users.findAll({raw: true, where: {id: idUser}})
        const active = true;
        const updateActive = await users.update({active}, {where: {id: idUser}})
        console.log(updateActive)  
        res.send('Estamos verficando la cuenta')
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
    verify
}