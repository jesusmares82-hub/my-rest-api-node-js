const { users } = require("../models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    try {
        let { email, password } = req.body
        // console.log(email, password)
        let existsUsers = await users.findOne({ raw: true, where: { email: email } })
        // console.log(existsUsers)
        if (existsUsers) {
            const cmp = await bcrypt.compare(password, existsUsers.password);
            // console.log(cmp);
            if (cmp) {
                const token = jwt.sign(existsUsers, process.env.JWT_KEY, {
                    algorithm: "HS512",
                    expiresIn: "2 days"
                });
                // console.log(token);
                res.status(200).json({ existsUsers, token });
            } else {
                res.send("Wrong username or password.");
            }
        }
        else {
            res.send("Wrong username or password.");
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login
};