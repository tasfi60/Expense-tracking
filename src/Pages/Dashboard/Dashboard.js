import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authprovider';


const Dashboard = () => {

    const {user} = useContext(AuthContext);
    const [expense,setExpense] = useState([])

    const navigate = useNavigate();

    function handleNavigate(e) {
        navigate(`/Editexpense/${e}`);
    }
     

    fetch(`http://localhost:5000/expense?uid=${user.uid}}`,{
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
            <td><button type="button" onClick={() => handleNavigate(e._id)} class="form-button btn mt-3 btn-md margin-b w-25 fs-6 rounded">
            Edit
          </button></td>
          </tr>)
          

        }
        
      
    
  
  </tbody>
</table>
        </div>
    );
};

export default Dashboard;