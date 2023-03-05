import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/Authprovider';
import EditExpense from '../EditExpense/EditExpense';
import './Settings.css';

const Settings = () => {
    const{user} = useContext(AuthContext);

    const handleAddExpense = event =>{
            event.preventDefault();
            const form = event.target;
            const category = form.category.value;
            const currency = form.currency.value;
            const price = form.price.value;
            const date = form.date.value;
            const id = user.uid;
            const name = user.displayName;
            

            const expense = {
                Category: category,
                Currency:currency,
                Price: price,
                Date: date,
                User: name,
                uid: id

            }

            fetch('http://localhost:5000/expense',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(expense)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.acknowledged){
                        form.reset();
                    }
                })
                .catch(error => console.error(error));

    }

    return (
        
  <div>
    <div class="max-width">
      <section class="expense turquoise">
        <div class="grid-full padded-reverse">
          <div class="grid-whole padded mt-2">
            <h3>Manage Your Expenses</h3>
            <hr/>
          </div>
          <div class="grid-5 padded m-grid-whole s-grid-whole xs-grid-whole">
            <div class="grid-whole">
              <div class="dark-content-box payment-info">
               
                <hr/>
                <div class="grid-3 s-grid-12 padded">
                  <p class="center">
                    <span class="icon-wallet icon-huge">
                    <img src="http://www.thisisstar.com/images/100UI/002/wallet.svg"/>
                    </span>
                  </p>
                </div>
                <div class="grid-9 s-grid-12 padded">
                  <p>
                    You don't currently have any expenses record. Add one here.
                  </p>
                </div>
                
              </div>
            </div>
          </div>
          <div class="grid-7 padded m-grid-whole s-grid-whole xs-grid-whole">

          <form onSubmit={handleAddExpense} class="font-style">
          <label for="option" class="grid-whole padded fs-4 font-style fw-bold me-4">Expense Category:</label>
          <select id="option" class="p-1" name="category">
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
          <select id="currency" name="currency">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
          <option value="GBP">GBP</option>
          <option value="BDT">BDT</option>
        </select>
        <input type="number" id="price" name="price" min="1.00" step="1" class="w-25 ms-3 border border-dark" required/>
          <br/>

          <label for="date" class="grid-whole padded fs-4 font-style fw-bold me-4">Date:</label>
          <input type="date" id="date" name="date" class="w-25 ms-3 border border-dark"  required/>


        <br/>
          <button type="submit" class="form-button btn mt-3 btn-md margin-b w-25 fs-6 rounded">Add Expense</button>
        
        </form>


            
          </div>
         
        </div>
      </section>
    </div>
  </div>
        
    );
};

export default Settings;