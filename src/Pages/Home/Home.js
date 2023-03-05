import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        
        <div class="container">
        <div class="bg-image">
          <button class='form-button fs-1 bg-secondary  font-style mb-5 shadow-lg'><Link to="/settings" class='nav-style text-white'>Manage Your Expense</Link> </button>
        </div>
      </div>
      
             
        
    );
};

export default Home;