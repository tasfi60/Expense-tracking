import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/Authprovider';

const EditExpense = () => {
    const{user} = useContext(AuthContext);
    const [update,setUpdate] = useState([]);

    useEffect(() => {
        const url = `http://localhost:5000/expense/${user.uid}`;
    
        fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => setUpdate(data))
          .catch(error => console.error(error));
      }, [user.uid]);


    const [ newExpense, setNewExpense] = useState(update);

    const handleInputChange = event =>{
       const field = event.target.name;
       const value = event.target.value;
       const newReview = {...newExpense}
       newReview[field] = value;
       setNewExpense(newReview);

    }

    const handleUpdateReview = event =>{
       event.preventDefault();
       console.log(newExpense);
       fetch(`http://localhost:5000/expense/${user.uid}`,{
             method: 'PUT',
             headers:{
               'content-type': 'application/json'
             },
             body: JSON.stringify(newExpense)
       })
       .then(res => res.json())
       .then(data =>{
           if(data.modifiedCount > 0){
               alert('Review Updated!')
               console.log(data);
               event.target.reset();
           }
              
       })
   }
       


    return (
        <div>
           
<button type="button" class="form-button btn mt-3 btn-md margin-b w-25 fs-6 rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Edit
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit here</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form onSubmit={handleUpdateReview} class="font-style">
          <label for="option" class="grid-whole padded fs-4 font-style fw-bold me-4">Expense Category:</label>
          <select id="option" class="p-1" name="category" onChange={handleInputChange} defaultValue={update.Category}>
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
          <select id="currency" name="currency" onChange={handleInputChange}
          defaultValue={update.Currency}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          <option value="GBP">GBP</option>
          <option value="BDT">BDT</option>
        </select>
        <input type="number" id="price" name="price" onChange={handleInputChange} 
        defaultValue={update.Price} min="1.00" step="1" class="w-50 h-25 ms-3 border border-dark" required/>
          <br/>

        

        <br/>
        <button type="submit" class="form-button btn mt-3 btn-md margin-b w-50 fs-6 rounded fs-6"><small>Save changes</small></button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="form-button btn mt-3 btn-md margin-b w-25 fs-6 rounded" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
            
        </div>
    );
};

export default EditExpense;