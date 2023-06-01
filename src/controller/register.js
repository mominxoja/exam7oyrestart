const sign = require("../utils/jwt");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const Joi = require("Joi")

const Io = require("../utils/Io");
const Users = new Io("./db/users.json")

const User = require('../model/user');
 


const Register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admins = await Users.read();
        const schema = Joi.object({
            username: Joi.string().min(5).max(15).required(),
            password: Joi.number().min(8).required()            
        })
        const {error} = schema.validate({username,password})
        if(error)return res.status(400).json({message:error.message })
    

        // const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = await  bcrypt.hash(password, 10) 
        const userId = (admins[admins.length - 1]?.id || 0) + 1

     const token = sign(({ id: userId }), { httpOnly: true })
        const newAdmin = new User(userId, username, hashedPassword, token);

        const allAdmins = [...admins, newAdmin];

        await Users.write(allAdmins);

        res.cookie("token", token);
        // console.log(token);

        res.send(newAdmin);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};








module.exports = {
    Register,
};