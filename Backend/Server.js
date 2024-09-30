import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
//import router from './routes/UserRegistration.js';
import cors from 'cors';

import UserRegi from './models/UserRegi.js';
import ProductList from './models/ProductList.js';
import Orderdisplay from './models/Orderdisplay.js';

//import Productlist from './models/ProductList.js';

const app = express();

app.use(express.json());
app.use(cors());
//app.use(cors({
//   origin:'http://localhost:5000',
//  methods: ['GET','POST','PUT', 'DELTE'],
//  allowedHeaders : ['Content-Type'],
//})
//);

//app.use('/',router);
app.get('/', async (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome');
})

app.get('/registrations', async (request, response) => {
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


app.get('/productlists', async (request, response) => {
    try {

        const Productlist = await ProductList.find({});

        return response.status(200).json({

            data: Productlist,
            //console.log(data)
        });


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}, []);



app.get('/productlists/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const Productlist = await ProductList.findById(id);

        return response.status(200).json(Productlist);


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



app.post('/registrations', async (request, response) => {
    try {

        if (
            !request.body.Username ||
            !request.body.Password ||
            !request.body.Confirmpassword ||
            !request.body.Email
        ) {
            return response.status(400).send({
                mesaage: "send all required feilds: Username,Password,Confirmpassword,Email"
            });
        }
        const newRegistration = {
            Username: request.body.Username,
            Password: request.body.Password,
            Confirmpassword: request.body.Confirmpassword,
            Email: request.body.Email,
        };
        const data = await UserRegi.create(newRegistration);
        return response.status(201).send(data);
    } catch (error) {
        console.log(error.mesaage);
        response.status(500).send({ message: error.mesaage });
    }
});



app.post('/productlists', async (request, response) => {
    try {

        if (
            !request.body.Bookname ||
            !request.body.Author ||
            !request.body.Edition ||
            !request.body.Price ||
            !request.body.Stock
        ) {
            return response.status(400).send({
                mesaage: "send all required feilds: Bookname,Author,Edition,Price,Stock"

            });
        }
        const newProductlist = {
            Bookname: request.body.Bookname,
            Author: request.body.Author,
            Edition: request.body.Edition,
            Price: request.body.Price,
            Stock: request.body.Stock
        };
        const data = await ProductList.create(newProductlist);
        return response.status(201).send(data);
    } catch (error) {
        console.log(error.mesaage);
        response.status(500).send({ message: error.mesaage });
    }
});



app.get('/orderdisplay', async (request, response) => {
    try {

        const OrderDisplay = await Orderdisplay.find({});

        return response.status(200).json({

            data: OrderDisplay,
            //console.log(data)
        });


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}, []);




app.post('/orderdisplay', async (request, response) => {
    try {

       //if 
       (
            !request.body.Username ||
            !request.body.Address ||
            !request.body.Phoneno ||
            !request.body.Orderno ||
            !request.body.Orderdate ||
            !request.body.Totalbooks ||
            !request.body.Orderstatus ||
            !request.body.Totalamt
        ) 
        //{
          //  return response.status(400).send({
            //    mesaage: "send all required feilds: "

        //   }
        //);
       // }
        const newOrderdisplay = {
            Username: request.body.Username,
            Address: request.body.Address,
            Phoneno: request.body.Phoneno,
            Orderno: request.body.Orderno,
            Orderdate: request.body.Orderdate,
            Totalbooks: request.body.Totalbooks,
            Totalamt: request.body.Totalamt,
            Orderstatus: request.body.Orderstatus
        };
        const data = await Orderdisplay.create(newOrderdisplay);
        

        return response.status(201).send(data);
    } catch (error) {
        console.log(error.mesaage);
        response.status(500).send({ message: error.mesaage });
    }
});


app.get('/maxorderno',async(request,response)=>{
    try{
        
    const result = await Orderdisplay.find().sort({Orderno :-1}).limit(1);
        
       //const data = response.json(result);
        
        return response.status(201).send(result);
     }catch(err){
        response.status(500).send(err);
     }

    })



    app.put('/orderdisplay/:id', async (request, response) => {
        try {
            if (
                !request.body.Username ||
                !request.body.Address ||
                !request.body.Phoneno
            ) {
                return response.status(400).send({
                    message: 'Send all the require fields'
                });
            }
    
    
            const { id } = request.params;
            const result = await Orderdisplay.findByIdAndUpdate(id , request.body);
            //return response.status(200).json(book);

          /*  if (!result) {
                return response.status(404).json({ message: 'Order not found' });
            }*/
    
            //return response.status(200).send({ message: 'Order updated successfully' });
    
            return response.status(200).json(result);
    
        } catch (error) {
            console.log(error.message);
            response.status(500).send({ message: error.message });
        }
    });


app.get('/productlists', async (request, response) => {
    try {

        const Productlist = await ProductList.find({});

        return response.status(200).json({

            data: Productlist,
            //console.log(data)
        });


    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}, []);








mongoose.connect(mongoDBURL, {
   // useNewUrlParser: true,

    //useUnifiedTopology: true,
})
    .then(() => {
        console.log("Application run succucefully");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
            const connection = mongoose.connection;
            connection.openUri;
            //console.log(connection);
            //connection.once("open",'');



        }

        );

    })
    .catch((error) => {
        console.log(error);
    });

/*
mongoose.connect(mongoDBURL,{useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,});
    
    const connection = mongoose.connection;
    connection.once("open", () => {
    try(()=>{    
       console.log(`mangodb database connection succussful ok`);
       app.listen(PORT,()=>{
        console.log(`App is listening to port: ${PORT}`);
       } )
    }).catch((error)=>{
        console.log(error);
    });
    }
)
*/