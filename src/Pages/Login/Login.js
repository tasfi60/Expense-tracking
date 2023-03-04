import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Authprovider';
import './Login.css';

const Login = () => {
    const {providerLogin,signIn,setLoading,setUser} = useContext(AuthContext);
    const navigate = useNavigate();

  

    const [error , setError] = useState('');
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';





 
    const handleSubmit = event => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      signIn(email, password)
          .then(result => {
              const user = result.user;
              setUser(user);
              console.log(user);
              form.reset();
              setError('');
              
               navigate(from, {replace: true});
              
              })
          .catch(error => {
              console.error(error)
              setError(error.message);
          })
          .finally(() => {
              setLoading(false);
          })
  }
    return (
        <div class="login-container text-c animated flipInX main-bg mt-5 rounded shadow-lg p-3 mb-5 bg-body font-style">
           
                
                    <h3 class="text-capitalize text-center fs-3 my-5">Login Here!</h3>
                <div class="container-content">
                    <form class="margin-t" onSubmit={handleSubmit}>
                        <div class="form-group">
                            <input type="email" class="form-control rounded-pill mb-3 shadow-lg bg-body " placeholder="Email" name='email' required=""/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control rounded-pill shadow-lg  bg-body " placeholder="Password" name='password' required=""/>
                        </div>
                        <button type="submit" class="form-button btn mt-3 btn-md margin-b">Log In</button>
                        <p class="text-danger"> {error} </p>
        
                    
                        <p class="text-whitesmoke text-center"><small>Do not have an account?</small></p>
                        <Link to="/signup" class='text-light'>Sign Up</Link>
                    </form>
                    
                </div>
            </div>
    );
};

export default Login;