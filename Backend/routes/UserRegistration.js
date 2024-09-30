import express from  'express';
import  UserRegi  from '../models/UserRegi.js'
const router = express.Router();
//const  UserRegi  = useModel('./Backend/models/UserRegi.js');



/*router.get('/',async(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome to MERN");
});*/
//Show all records

router.get('/registrations', async (request, response) => {
    try {

        const user = await UserRegi.find({});

        return response.status(200).json({
            count: user.length,
            data: user,
            //console.log(data)
        });


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

router.post('/registrations', async(request,response)=>{
    try{

        if(
            !request.body.Username ||
            !request.body.Password ||
            !request.body.Confirmpassword ||
            !request.body.Email  
        ){
            return response.status(400).send({
                mesaage: "send all required feilds: Username,Password,Confirmpassword,Email"
            });
        }
        const newRegistration ={
            Username: request.body.Username,
            Password: request.body.Password,
            Confirmpassword: request.body.Confirmpassword,
            Email: request.body.Email,
        };
        const data = await UserRegi.create(newRegistration);
        return response.status(201).send(data);
    }catch(error){
        console.log(error.mesaage);
        response.status(500).send({message: error.mesaage});
    }
});

export default router;