const jwt = require("jsonwebtoken");
const Io = require("../utils/Io");
const Elons = new Io("./db/elon.json");
const Users = new Io("./db/users.json")


const Tasdiqlash = async (req, res) => {
    const elonlar = await Elons.read()
// const { token } = req.cookies;
const { token } = req.headers
const users = await Users.read()

const verified = jwt.verify(token, process.env.SECRET_KEY);
const user = users.find((user) => user.id === verified.id);
if(user.username === "admin"){

    const {id} = req.params
    
    const elon = elonlar[id-1]
    const allElon = elonlar.map((el)=>{
          if(el.id == elon.id){
            elon.tasdiqlash = true
   
   
          }
          return el
        })
    
    Elons.write(allElon)
    
  
    
    res.send("qoshildi yani updaate boldi")


}else{
    res.send("siz admin emassiz")
}

}   




const GetTasdiqlash = async (req, res) => {

    try {

        // const { token } = req.cookies;
const { token } = req.headers
const users = await Users.read()
const elonlar = await Elons.read()

// console.log(token);
const verified = jwt.verify(token, process.env.SECRET_KEY);
const user = users.find((user) => user.id === verified.id);
const kimniki = user.username
if(!kimniki === "admin"){
    return res.send("Bu yerga ota olmaysiz Siz admin emassiz")
}else{
    const filterobj = elonlar.filter(obj=>obj.tasdiqlash===false)
    res.status(200).json(filterobj)
}
        

    } catch (error) {
       console.log(error); // res.send(error)
    }
   
}    



module.exports = {
   GetTasdiqlash,
    Tasdiqlash
}
// elon.tasdiqlash = tasdiqlash ? tasdiqlash : elon.tasdiqlash
