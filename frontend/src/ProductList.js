
import './index.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { useParams } from 'react-router-dom';
//import { response } from 'express';
//import Productlist from '../../Backend/models/ProductList';
//import Orderdisplay from './Orderdisplay.js';
import { Link } from 'react-router-dom';
//import { now, set } from 'mongoose';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

//export const Orderid = new String;

function ProductList() {


  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/productlists');
        
        if (Array.isArray(response.data.data)) {
          setItems(response.data.data);
          console.log(items.keys);
          fetchData();
          return;
        } else {
          console.error('Unexpected data format:', response.data.data);
          return;
          ///  setItems([]);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', error);
        return;
      }
    };

    fetchData();
  }, [error, items.keys]);

  const [allchecked, setAllChecked] = React.useState([]);
  const [totamt, setTotamt] = useState(0);
  function handleChange(e, i) {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
      setTotamt((parseFloat(totamt) + parseFloat(i)));
    } else {
      setAllChecked(allchecked.filter((item) => item !== e.target.value));
      setTotamt((parseFloat(totamt) - parseFloat(i)));
    }

  }

  /*const [Username, setUsername] = useState('');
  const [Address, setAddress] = useState('');

  const [Phoneno, setPhoneno] = useState('');*/

  //const [Orderno, setOrderno] = useState(0);
  //const [Totalbooks, setTotalbooks] = useState(0);
  //const [Orderdate, setOrderdate] = useState('');
  //const [Totalamt, setTotalamt] = useState('');
  //const [Orderstatus, setOrderstatus] = useState('');




  async function PlaceOrder() {
    
  
  try{
    if (allchecked.length === 0) {
      alert('Please select atleast one item from list...');
      return;
    }
    else{
      //alert("hello");
      const today = new Date();
      
      const response = await axios.get("http://localhost:5000/maxorderno");

     // alert(response.data[0].Orderno);
      const Orderno =parseInt(response.data[0].Orderno) + 1;
      const Orderdate =today;
      const Totalbooks=allchecked.length;
      
      //alert(parseInt(response.data[0].Orderno) + 1);
      //alert(Orderno + Orderdate + Totalbooks + totamt) ;
     
      const Totalamt =totamt;
      
      
      if (!Orderno || !Orderdate || !Totalbooks || !Totalamt) {
        alert("Please select books.");
        
        return;
      }
      else{
      const data = { Orderno, Orderdate, Totalbooks,Totalamt };
      //console.log(data);
      //const result =await axios.post("http://localhost:5000/orderdisplay",data);
      await axios.post("http://localhost:5000/orderdisplay",data);
      //const Orderid =(JSON.stringify(result.data._id));
      //alert(Orderid);
      alert(" Books selection done. Please fill other information.");
      //Orderdisplay(Orderid);
      return;
      }
    }
  }catch (error) {
    console.log(error.mesaage);
   
}
  }


  return (
    <div className='col-sm-12 offset-sm-0' style={{ height: 50 }}>
      <h2 style={{ textAlign: 'center', backgroundColor: 'lightyellow', color: 'purple' }}>Books List</h2>


      <div >
        <table className='col-sm-5 offset-sm-1' style={{ backgroundColor:'lightcyan' ,width: 1100, left: 50, textAlign: 'center' }}>
          <thead>
            <tr className='tr'>
              <th className='th' style={{ width: 100 }}>SrNo</th>
              <th className='th'>Book Name</th>
              <th className='th'>Author</th>
              <th className='th'>Edition</th>
              <th className='th'>Price</th>
              <th className='th'>In Stock</th>
              <th className='th'>Add to Cart</th>
              <th className='th'>Ratings</th>
            </tr>
          </thead>
          <tbody>

            {items.length === 0 ? (
              <tr>
                <td colSpan="6">No items found.</td>
              </tr>
            ) :
              (

                items.map((item => { // Add index for SrNo
                  return (

                    <tr >

                      <td className='td'>{items.indexOf(item) + 1} </td>

                      <td className='td'>{item.Bookname}</td>
                      <td className='td'>{item.Author}</td>
                      <td className='td'>{item.Edition}</td>
                      <td className='td'>{item.Price}</td>
                      <td className='td'>{item.Stock}</td>
                      <td className='td'><input type="checkbox" value={item.Bookname}
                        onChange={(e) => handleChange(e, item.Price)} /> </td>
                      <td className='td'>{item.Ratings}</td>
                    </tr>)
                }
                )))}
          </tbody>

        </table>




      </div>
      <div><h3 style={{ textAlign: 'center', color: 'black' }}>The books are added to card =  {allchecked.length} </h3>

        <h3 style={{ textAlign: 'center', color: 'black' }}>{allchecked.join(" , ")}</h3>
        <h3 style={{ textAlign: 'center', color: 'black' }}>{totamt}</h3>
      </div>
      <div>
        {allchecked.length === 0 ? (

          <h3 style={{textAlign:'center'}}>No items selected.</h3>

        ) :
          (
            
            <Link to={'/orderdisplay'}>
              <button className='bin-bin-primary' onClick={PlaceOrder}>Place Order</button>
            </Link>
          )}
      </div>
    </div>

  )
}
 
export default ProductList;