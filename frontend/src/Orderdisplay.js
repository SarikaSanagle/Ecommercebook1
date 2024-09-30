import React, { useState } from 'react';
import Cartimg from '../src/images/bookshopee.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

//import Orderid from './ProductList';


//import { response } from 'express';
import axios from 'axios';
//import Orderlist from './Orderlist';

 const Orderdisplay = () =>{
    const [Orderstatus, setOrderstatus] =useState("Complete");
    const [Username, setUsername] = useState('');
    //const Oid = id.value[0];
    const [Address, setAddress] = useState('');
    const [Phoneno, setPhoneno] = useState('');
    async function Confirmorder() {
        try {
            //alert(Oid);
           
          /*  const data = {
                Username,
                Address,
                Phoneno,
                Orderstatus,
            };*/

            //    setLoading(true)

            //axios.get("http://localhost:5000/registrations");


            //Alert(setUsername)
            try {
                if (!Username || !Address || !Phoneno) {
                    alert("Please enter all fields.");

                    return;
                }

                const response = await axios.get("http://localhost:5000/maxorderno");

                //alert(response.data[0]._id);
                const Orderid =response.data[0]._id ;
                //const { id } = request.params;
                setOrderstatus("Complete");
                //alert(Orderstatus);
                const data = { Username, Address, Phoneno ,Orderstatus };
              
                await axios.put('http://localhost:5000/orderdisplay/' +Orderid, data);
                //setOrderstatus("Incomplete");
                Clrdata();
                alert("Order place successful!y");
               
                //setError('');
                
                return;
            } catch (error) {
                alert("An error occurred during order confirm.");
                //setOrderstatus = "Incomplete";
                //console.error(error);
                return;
            }
        }
        catch (error) {
            alert("An error occurred during order confirm.");
        }
    };

    async function Clrdata() {
        setUsername('');
        setAddress('');
        setPhoneno('');
        
    }


   return(
    <div className='col-sm-12 offset-sm-0' style={{ height: 50 }}>
    <h2 style={{ textAlign: 'center', backgroundColor: 'lightyellow' , color:'purple' }}>Order Information</h2>
     <Container>
    <Row>
        <Col xs={5}>
        <img src={Cartimg} style={{ width: 550, height: 525, top: -8, left: -125, position: 'relative' }} alt="Login" />
        </Col>
        <Col xs={7}>
            <br />
            <br />
            <label for='UserName' style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Enter Name</label>
            <br />

            <input
                type='text'
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                className='form-control' style={{ width: 500 }} />
            <br />
            <label for='Address' style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Enter Address</label>
            <br />
            <input
                type='text'
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                className='form-control' style={{ width: 500 }} />
            <br />
            <label for='Phoneno' style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Phone no</label>
            <br />
            <input type='text' value={Phoneno} onChange={(e) => setPhoneno(e.target.value)} className='form-control' style={{ width: 500 }} />
            <br />
            <Link to='/orderlist' >
            <button className='bin-bin-primary'  onClick={Confirmorder}>Confirm Order</button>            
            </Link>
            <button className='bin-bin-primary' onClick={Clrdata} style={{ marginLeft: 100 }}>Cancel</button>




        </Col>
    </Row>
</Container>

</div>
   ) 
}

export default Orderdisplay;
