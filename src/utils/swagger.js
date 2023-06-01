const SwaggerUi = require('swagger-ui-express') 
const SwaggerJsDocs = require ('swagger-jsdoc')
const { env } = require("../../config");
const PORT = env.PORT;

const {Router} = require('express')

const router = Router()

const swaggerDoc = SwaggerJsDocs({
  swaggerDefinition:{
    openapi:"3.0.0",
    servers:[
        {
            url:`http://localhost:${PORT}`,
            title:"Backend Api",
            description: "Backend Api"
        }
    ],
    info:{
      version:'1.0.0',
        title:"Exam 2-oyniki Proyect",
        description:"Backend Swaggeri"
    },
  },
  apis:[
    `${process.cwd()}/src/swagger/components/*.yaml`,
    `${process.cwd()}/src/swagger/docs/*.yaml`,
    ],
})


router.use("/", SwaggerUi.serve, SwaggerUi.setup(swaggerDoc))



module.exports = router;