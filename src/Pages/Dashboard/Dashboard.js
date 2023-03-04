import React, { useState } from 'react';
import EditExpense from '../EditExpense/EditExpense';

const Dashboard = () => {


    const [expense,setExpense] = useState([])

    fetch('http://localhost:5000/expense',{
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
                
            })
                .then(res => res.json())
                .then(data => {
                    setExpense(data)
                    
                })
                .catch(error => console.error(error));

    
    return (
        <div class="font-style my-4">
            <h3>Expense & Budget summary</h3>
            <table class="table table-success table-striped">
                
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Budget</th>
      <th scope="col">Expense Category</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    
        { 
          expense.map((e,i) => <tr>
            <th scope="row">{i + 1}</th>
            <td>{e.Price} {e.Currency}</td>
            <td>{e.Category}</td>
            <td><EditExpense></EditExpense></td>
            <td><EditExpense></EditExpense></td>
          </tr>)
          

        }
      
    
  
  </tbody>
</table>
        </div>
    );
};

export default Dashboard;