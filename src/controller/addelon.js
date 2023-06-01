const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require("uuid");
const joi = require("joi");
const Io = require("../utils/Io");
const Elons = new Io("./db/elon.json");
const Users = new Io("./db/users.json");

const elonmodeli = require('../model/elon');
const Joi = require("joi");

const GetElon = async (req, res)=>{
    try {
        const elonlar = await Elons.read()
        const filterobj = elonlar.filter(obj=>obj.tasdiqlash===true)
    res.send(filterobj)
    } catch (error) {
        
    }
}


const AddElon = async (req, res) => {
    try {
        const users = await Users.read()
        // const { token } = req.cookies;
        const { token } = req.headers


        const verified = jwt.verify(token, process.env.SECRET_KEY)
        const user = users.find((user) => user.id === verified.id);
        const kimniki = user.username+"ning "

       
        const { title, description, phoneNumber, date, category } = req.body;
        const  {image}  = req.files;

        const schema = Joi.object({
            title: Joi.string().max(20).required(),
            description: Joi.string().max(100).required(),
            phoneNumber: Joi.number().min(9).required(),
            date: Joi.date().required(),
            category: Joi.string().min(5).required()

        })
        const {error} = schema.validate({title, description, phoneNumber,date, category});
        if(error)return res.status(400).json({message:error.message })
    

        const admins = await Elons.read();

        const imageFormat = image.mimetype.split('/')[1];
        const imageName = `${uuidv4()}.${imageFormat}`
        const path = `${process.cwd()}/src/uploads/${imageName}`;

        image.mv(path);

        const elonid = (admins[admins.length - 1]?.id || 0) + 1

        const newAdmin = new elonmodeli(elonid, kimniki, title, description, phoneNumber, imageName, category, date, tasdiqlash =false);
        const allAdmins = [...admins, newAdmin];

        await Elons.write(allAdmins);

        res.send(`${newAdmin.kimniki} e'loni qo'shildi admin tasdiqlashini kuting`)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    GetElon,
    AddElon,
};
