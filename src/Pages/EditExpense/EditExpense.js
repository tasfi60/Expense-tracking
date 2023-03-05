import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/Authprovider';
import './EditExpense.css'

const EditExpense = () => {
  
  const {user} = useContext(AuthContext);
  const update = useLoaderData();
  
  const [newExpense, setNewExpense] = useState(update);

  
  const handleInputChange = event =>{
     const field = event.target.name;
     const value = event.target.value;
     const updatedExpense = {...newExpense}
     updatedExpense[field] = value;
     setNewExpense(updatedExpense);

  }

  const handleUpdateReview = event =>{
     event.preventDefault();
     console.log(newExpense);
     fetch(`http://localhost:5000/expense/${update._id}`,{
           method: 'PUT',
           headers:{
             'content-type': 'application/json'
           },
           body: JSON.stringify(newExpense)
     })
     .then(res => res.json())
     .then(data =>{
         if(data.modifiedCount > 0){
             alert('Edited Successfully!')
             console.log(data);
             event.target.reset();
         }
            
     })
 }
     
  


    return (
        <div>
           




      <form onSubmit={handleUpdateReview} class="font-style mt-5">
          <label for="option" class="grid-whole padded fs-4 font-style fw-bold me-4">Expense Category:</label>
          <select id="option" class="p-2 fs-5" name="category" onChange={handleInputChange} defaultValue={update.Category} required>
            <option value="Housing and utilities">Housing and utilities</option>
            <option value="Grocery">Grocery</option>
            <option value="Transportation">Transportation</option>
            <option value="Personal care">Personal care</option>
            <option value="Health and fitness">Health and fitness</option>
            <option value="Education">Education </option>
            <option value="Gifts and donations">Gifts and donations</option>
            <option value="Travel">Travel </option>
            <option value="Insurance">Insurance</option>
            <option value="Taxes">Taxes</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
          <br/>
          <label for="option" class="grid-whole padded fs-4 font-style fw-bold me-4">Price:</label>
          <select id="currency" name="currency" class='p-2' onChange={handleInputChange} defaultValue={update.Currency} required>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          <option value="GBP">GBP</option>
          <option value="BDT">BDT</option>
        </select>
        <input type="number" id="price" name="price" onChange={handleInputChange} 
        defaultValue={update.Price} min="1.00" step="1" class="w-25 h-25 ms-3 border border-dark" required/>
          <br/>

        

        <br/>
        <div class="buttons mx-auto">
        <button type="submit" class="form-button btn mt-3 btn-md margin-b w-25  fs-6 rounded fs-6"><small>Save changes</small></button>
        <button class="form-button btn mt-3 btn-md margin-b w-25 px-4 fs-6 rounded fs-6"><small><Link class="nav-style  " to='/dashboard'>Go Back</Link></small></button>
        </div>
        
        </form>
      </div>
      
  
    );
};

export default EditExpense;