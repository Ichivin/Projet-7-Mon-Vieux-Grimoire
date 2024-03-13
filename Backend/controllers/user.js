const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

exports.signup = (req, res, next) => {
    const isValidEmail = validateEmail(req.body.email);
    if (isValidEmail) {
        bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                });
                user.save()
                    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                    .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
    } else {
        return res.status(500).json({ message: "Email invalide" });
    }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ message: "Paire login/mot de passe incorrecte" });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
