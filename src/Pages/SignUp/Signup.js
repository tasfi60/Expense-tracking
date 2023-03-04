import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/Authprovider';


const Signup = () => {

    const [error, setError] = useState('');
    const [accepted, setAccepted] = useState(false);
    const { createUser, updateUserProfile, verifyEmail } = useContext(AuthContext);
 


    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('');
                form.reset();
                handleUpdateUserProfile(name);
              
            })
            .catch(e => {
                console.error(e);
                setError(e.message);
            });
    }

    const handleUpdateUserProfile = (name, photoURL) => {
        const profile = {
            displayName: name,
            photoURL: photoURL
        }

        updateUserProfile(profile)
            .then(() => { })
            .catch(error => console.error(error));
    }

    

    const handleAccepted = event => {
        setAccepted(event.target.checked)
    }

  

    return (
        <div>
            <div class="login-container text-c animated flipInX main-bg mt-5 rounded shadow-lg p-3 mb-5 bg-body font-style">
                <div>
                    <h1 class="logo-badge text-whitesmoke"><span class="fa fa-user-circle"></span></h1>
                </div>
                    <h3 class="text-capitalize text-center fs-3 my-5">Welcome to Sign Up</h3>
                <div class="container-content">
                    <form onSubmit={handleSubmit} class="margin-t">
                        <div class="form-group">
                            <input type="text" class="form-control rounded-pill shadow-lg bg-body mb-3" placeholder="Username" name="name" required=""/>
                        </div>
                        <div class="form-group">
                            <input type="email" class="form-control rounded-pill shadow-lg bg-body mb-3" placeholder="email" name="email" required=""/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control rounded-pill shadow-lg bg-body" placeholder="Password" name="password" required=""/>
                        </div>
                        <button type="submit" class="form-button btn mt-3 btn-md margin-b">Sign Up</button>
        
                    
                        <p class="text-whitesmoke text-center"><small>Do you have an account?</small></p>
                       <Link to="/login" class='text-light'> Log in </Link>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default Signup;