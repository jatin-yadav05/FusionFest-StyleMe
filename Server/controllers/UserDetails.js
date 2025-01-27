const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const User = require("../models/UserSchema")
const userHistory=require("../models/userHistory")
const { oauth2client } = require("../utils/googleConfig")
const jwt = require("jsonwebtoken")
const axios = require("axios")
module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const checkEmail = await User.findOne({ email });
    if (!checkEmail) {
        return res.json({ msg: "This email is not Register", status: false })
    }
    if (!checkEmail.password) {
        return res.json({ msg: "Username and password is incorrect", status: false })
    }
    const checkPassword = await bcrypt.compare(password, checkEmail.password)
    if (!checkPassword) {
        return res.json({ msg: "Username and Password is incorrect", status: false });
    }
    let { _id, username } = checkEmail;
    const jwttoken = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIMEOUT
    })
    delete checkEmail;
    res.json({
        data: {
            email, name: username, token: jwttoken, image: ""
        }, status: true
    })

}
module.exports.registeration = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const UsernameExist = await User.findOne({ username });
        if (UsernameExist) {
            return res.json({ msg: "Username is already exist", status: false })
        }
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.json({ msg: "Email is already registered", status: false })
        }

        const hashpassword = await bcrypt.hash(password, 10);
        const userSet = await User.create({
            username,
            email,
            password: hashpassword
        })
        delete userSet;
        res.status(200).json({ status: true, msg: "User is Created" });
    } catch (e) {
        next(e);
    }


}
module.exports.googleLogin = async (req, res) => {
    try {
        const { code } = req.query;
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens)
        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
        const { email, name, picture } = userRes.data;
        let checkEmail = await User.findOne({ email });
        if (!checkEmail) {
            const user = await User.create({
                username: name,
                email,
                image: picture

            })
            const { _id } = user;
            const token = jwt.sign({ _id, email }, process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_TIMEOUT
                }
            )
            return res.status(200).json({
                status: true,

                data: {
                    email, name, picture, token
                }
            })
        }
        else {
            const user = User.findOne({ email });
            const { _id } = user;
            const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_TIMEOUT
            })
            const data = {
                email, name, picture
            }
            return res.status(200).json({
                status: true,
                data: {
                    email, name, picture, token
                }
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error "
        })
    }

}
