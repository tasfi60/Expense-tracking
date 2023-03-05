import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authprovider';


const Dashboard = () => {

    const {user} = useContext(AuthContext);
    const [expense,setExpense] = useState([])

    const navigate = useNavigate();

    function handleNavigate(e) {
        navigate(`/Editexpense/${e}`);
    }
     console.log(user.uid);

    useEffect(() => {
      if (!user?.uid) {
        setExpense([]);
        return;
      }
    
      fetch(`http://localhost:5000/expense?uid=${user.uid}`)
        .then(res => res.json())
        .then(data => {

          
            if(user.uid)
            {
                const exp = data.filter(rev => rev.uid === user.uid && !rev.is_deleted);
                setExpense(exp);
            }
        
         
        })
        .catch(err => {
          console.error(err);
          alert('Unable to fetch expenses');
        });
    }, [user?.uid]);
    
    
    
    
    

  const handleDelete = async (expenseId) => {
    const confirm = window.confirm('Are you sure you want to delete this expense?');
    if (confirm) {
      try {
        await axios.delete(`http://localhost:5000/expense/${expenseId}`);
        const updatedexpenses = expense.filter((exp) => exp._id !== expenseId);
        setExpense(updatedexpenses);
        alert('Expense deleted successfully');
      } catch (err) {
        console.error(err);
        alert('Unable to delete expense');
      }
    }
  };
                
    
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
            <td><button type="button" onClick={() => handleNavigate(e._id)} class="form-button btn mt-3 btn-md margin-b w-25 fs-6 rounded">
            Edit
          </button></td>
            <td><button type="button" onClick={() => handleDelete(e._id)} class="form-button btn mt-3 btn-md margin-b w-25 fs-6 rounded">
            Delete
          </button></td>
         

          </tr>)
          

        }
        
      
    
  
  </tbody>
</table>
        </div>
    );
};

export default Dashboard;