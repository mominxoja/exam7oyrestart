const Io = require("../utils/Io");
const Elons = new Io("./db/elon.json");


const Filter = async (req, res) => {

    // const { token } = req.cookies;
    const { token } = req.headers
    const {filter} = req.params
    if(token){
    
    const elonlar = await Elons.read()
    
  
        const filterobj = elonlar.filter(obj=>obj.category===filter)
        res.status(200).json(filterobj)
        
    }else{
        res.send("login qiling")
    
    }
     
    }  






 


module.exports = {
   Filter
}
