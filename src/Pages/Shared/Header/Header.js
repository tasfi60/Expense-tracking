import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/Authprovider';
import {FaUser,FaIdCard,FaSignOutAlt} from 'react-icons/fa';
import './Header.css';

const Header = () => {

    const {user,logOut} = useContext(AuthContext);
    console.log(user);

    const handleLogOut = () =>{
      logOut()
       .then( () => {})
       .catch( error => console.error(error))
    }
   
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg font-style">
  <div class="container-fluid">
    <p class="navbar-brand fw-bold nav-style fs-1">Expense Manager</p>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ms-auto ">
        <Link to="/" class='nav-style ms-3 fw-bold fs-4 text-black-50'>Home</Link>
        <Link to="/settings" class='nav-style ms-3 fw-bold fs-4 text-black-50'>settings</Link>

       
             <div class="ms-5 ps-5">
             {
                      user?.uid?
                      <>
                       <Link to="/" class='nav-style ms-3 fw-bold fs-4 text-black-50'>Dashboard</Link>
                       <span class='fw-bold fs-4 text-end ms-5 text-success'>{user?.displayName}</span>
                       <Link onClick={handleLogOut} class='nav-style  ms-3 fw-bold fs-4 text-end text-black-50' >Logout</Link>

                       
                       </>
                      :

                      <>
                      <Link to="/login" class='nav-style  ms-3 fw-bold fs-4 text-end text-black-50' >Login</Link>
                      <Link to="/signup" class='nav-style  ms-3 fw-bold fs-4 text-black-50'>Signup </Link>  
                      </>
                     
                    }
                

             </div>
                  
        
        
      </div>
    </div>
  </div>
</nav>
        </div>
    );
};

export default Header;