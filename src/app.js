require('dotenv').config();
const express = require('express');
const { env } = require("../config");
const fileUpload = require("express-fileupload");
const cors = require("cors")

const Register = require('./routes/register');
const Login = require('./routes/login');
const AddElon  = require('./routes/addelon');
const Tasdiqlash  = require('./routes/tasdiqlash');
const GetTasdiqlash  = require('./routes/tasdiqlash');
const Filter = require('./routes/filter');

const swaggerRouter = require('./utils/swagger.js')

const app = express();


const PORT = env.PORT;

app.use(express.json())
app.use(fileUpload());

// app.use(cors())



app.use('/api-docs',swaggerRouter)


app.use(Register)
app.use(Login)
app.use(AddElon)
app.use(Tasdiqlash)
app.use(GetTasdiqlash)
app.use(Filter)



app.listen(PORT, () => console.log(`Server ${PORT}`));
