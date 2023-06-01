const Io = require("../utils/Io");
const Users = new Io("./db/users.json");
const sign = require("../utils/jwt");
const bcrypt = require("bcrypt");
const Elon = new Io("./db/elon.json"); 
const Joi = require("joi");
const LOGIN = async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = await Users.read();
        const schema = Joi.object({
            username: Joi.string().min(5).max(15).required(),
            password: Joi.number().min(8).required()            
        })
        const {error} = schema.validate({username,password})
        if(error)return res.status(400).json({message:error.message })
    
        const user = users.find((user) => user.username === username.toLowerCase());

        if (!user) {
        return res.send("Not logged in")
        }

        const isVerified = await bcrypt.compare(password, user.password);

        if (!isVerified) {
            res.send("parol xato")
        } else {
            res.cookie("token", sign({ id: user.id }), { httpOnly: true });
            const elon = await Elon.read()
            const filterobj = elon.filter(obj=>obj.tasdiqlash===true)
            res.status(200).json(filterobj)
        }

                  

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};
module.exports = {
LOGIN
};
