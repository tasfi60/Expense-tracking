import React from 'react';
import { useContext } from 'react';
import {Navigate,useLocation} from 'react-router-dom';
import { AuthContext } from '../../Context/Authprovider';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    }
    
    if(!user)
    {
        return <Navigate to='/Login' state={{from:location}} replace></Navigate>
    }
    return children;
};

export default PrivateRoute;