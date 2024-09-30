import './index.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import moment from 'moment';

const Orderlist=()=> {


    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
  
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/orderdisplay');
          
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


    return (
        <div className='col-sm-12 offset-sm-0' style={{ height: 50 }}>
          <h2 style={{ textAlign: 'center', backgroundColor: 'lightyellow', color: 'purple' }}>Order List</h2>
    
    
          <div >
            <table className='col-sm-5 offset-sm-1' style={{ width: 1100, backgroundColor:'lightcyan', left: 50, textAlign: 'center' }}>
              <thead>
                <tr className='tr'>
                  <th className='th' style={{ width: 100 }}>SrNo</th>
                  <th className='th'>Order No</th>
                  <th className='th'>Order Date</th>
                  <th className='th'>Name</th>
                  <th className='th'>Address</th>
                  <th className='th'>Phone no</th>
                  <th className='th'>Total Books</th>
                  <th className='th'>Total Amount</th>
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
    
                          <td className='td'>{item.Orderno}</td>
                          
                          <td className='td'>{item.Orderdate}</td>
                          <td className='td'>{item.Username}</td>
                          <td className='td'>{item.Address}</td>
                          <td className='td'>{item.Phoneno}</td>
                          <td className='td'>{item.Totalbooks} </td>
                          <td className='td'>{item.Totalamt}</td>
                        </tr>)
                    }
                    )))}
              </tbody>
    
            </table>
    
    
    
    
          </div>
        </div>
    )
}

export default Orderlist;