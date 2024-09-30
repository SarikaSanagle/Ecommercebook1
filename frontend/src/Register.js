import React, { useState } from 'react';
//import router from   '../../Backend/routes/UserRegistration';
//import React, { useState, useEffect } from "react";
import axios from 'axios';
//import { response } from  'express';
//import { useNavigate }  from 'react-router-dom';

import logimg from './images/tobuybooks.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import { set } from 'mongoose';
//import { Alert } from 'react-bootstrap/Alert';

const Register = () => {
    const [Username, setUsername] = useState('');

    const [Password, setPassword] = useState('');
    const [Confirmpassword, setConfirmpassword] = useState('');
    const [Email, setEmail] = useState('');
   // const [error,setError] =useState('error');
    //const [Success,setSuccess] =useState('Success');
    //const [loading , setLoading] = useState(false);

    //const navigate =useNavigate();
    //{ loading ? ()
    async function Signup() {
        try {


           /* const data = {
                Username,
                Password,
                Confirmpassword,
                Email,
            };*/

            //    setLoading(true)

            //axios.get("http://localhost:5000/registrations");


            //Alert(setUsername)
            try {
                if (!Username || !Password || !Confirmpassword || !Email) {
                    alert("Please enter all fields.");
                    
                    return;
                }
    
                if (Password !== Confirmpassword) {
                    alert("Password and Confirm Password don't match.");
                    setPassword('');
                    setConfirmpassword('');
                    return;
                }
    
                const data = { Username, Password, Confirmpassword,Email };
                await axios.post('http://localhost:5000/registrations', data);
                alert("Registration successful!");
                //setError('');
                Clrdata();
            } catch (error) {
                alert("An error occurred during registration.");
                console.error(error);
            }
    }
    catch(error){
        
    }
};
    
            
    //:()=>{}
    //router=item;

    async function Clrdata() {
        setUsername('');
        setPassword('');
        setConfirmpassword('');
        setEmail('');

    }

    return (
        <div className='col-sm-12 offset-sm-0' style={{ height: 50 }}>
            <h2 style={{ textAlign: 'center', backgroundColor: 'lightyellow' , color:'purple' }}>User Registeration</h2>
            <Container>
                <Row>
                    <Col xs={5}>
                        <img src={logimg} style={{ width: 550, height: 525, top: -8, left: -125, position: 'relative' }} alt="Login" />
                    </Col>
                    <Col xs={7}>
                        <br />
                        <br />
                        <label for='Username' style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Enter User Name</label>
                        <br />

                        <input
                            type='text'
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='form-control' style={{ width: 500 }} />
                        <br />
                        <label for='Password' style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Enter Password</label>
                        <br />
                        <input
                            type='text'
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='form-control' style={{ width: 500 }} />
                        <br />
                        <label for='Confirmpassword' style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Confirm Password</label>
                        <br />
                        <input type='text' value={Confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} className='form-control' style={{ width: 500 }} />
                        <br />
                        <label for='Email' style={{ fontFamily: 'serif', fontWeight: 'bold' }}>Enter Eamil</label>
                        <br />
                        <input type='text' value={Email} onChange={(e) => setEmail(e.target.value)} className='form-control' style={{ width: 500 }} />
                        <br />
                        <button className='bin-bin-primary' onClick={Signup} >Sign Up</button>
                        <button className='bin-bin-primary' onClick={Clrdata} style={{ marginLeft: 100 }}>Cancel</button>

                    </Col>
                </Row>
            </Container>


        </div>


    )
}
export default Register;