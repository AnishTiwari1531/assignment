const { db } = require("../db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
    try {
        //CHECK USER IF EXISTS

        const q = "SELECT * FROM Anish WHERE username = ?";
        console.log(req.body.username)

        db.query(q, [req.body.username], (err, data) => {
            if (err) return res.status(500).send(err);
            if (data.length) return res.status(409).send("User already exists!");
            //CREATE A NEW USER
            //Hash the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            const q =
                "INSERT INTO Anish (`username`,`email`,`password`,`name`) VALUE (?)";
            const values = [
                req.body.username,
                req.body.email,
                hashedPassword,
                req.body.name,
            ];

            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send({ msg: "User has been created.", data: values });
            });
        });
    }
    catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
};



const login = (req, res) => {
    const q = "SELECT * FROM Anish WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).send(err);
        if (data.length === 0) return res.send(404).json("User not found!");

        const checkPassword = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        console.log(req.body.password, data[0].password);
        console.log(checkPassword)

        if (!checkPassword)
            return res.status(400).send("Wrong password or username!");

        const token = jwt.sign({ id: data[0].id }, "Vola");
     
        const { password, ...others } = data[0];
        res
            .cookie("accessToken", token, {
                httpOnly: true,
            })
            .status(200)
            .send(others);
    });
};

const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).send("User has been logged out.")
};

module.exports = { register, login, logout };