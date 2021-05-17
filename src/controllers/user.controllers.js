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
      
        res.send('Estamos creando un nuevo registro')

    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { first_name, last_name, email, reset_token, active } = req.body
        const password = await bcrypt.hash(req.body.password, saltRounds);
        await users.update({ first_name, last_name, email, password, reset_token, active }, { where: { id } })
        res.send('<h1>Estamos actualizando un registro</h1>')
    } catch (error) {
        next(error)
    }
}

const deleteActors = async (req, res, next) => {
    try {
        let { id } = req.params
        await users.destroy({ where: { id: id } })
        res.send('<h1>Estamos eliminando un registro</h1>')
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
    verifyToken,
    verify
}