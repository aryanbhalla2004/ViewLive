import React, {useEffect, useContext} from 'react'
import {Link, useNavigate, } from 'react-router-dom';
import {Outlet} from "react-router-dom";
import { AccountContext } from '../../../setup/context-manager/AuthContext';
import "./style.css";

const Auth = () => {
  const {getUser} = useContext(AccountContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(getUser() !== null)
      navigate('/');
  }, [navigate, getUser]);

  return (
    <div className="container-auth">
      <div className="col-information-wrapper">
        <div className="ocean">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
        <div className='background-layer-wrapper'>
          {/* <div className='logo-container-auth-page'>
            
            <img src={bg} width={250} className="bg-logo"></img> 
            <img src={logo} width={190} className="logo"></img> 
          </div> */}
         
          <div className='background-layer-info'>
            <p>We are glad to see you again!</p>
            <h2>Join our next negotiation group in few minutes!</h2>
            <Link to="/" className='ghost-button'>Learn More</Link>
          </div>
        </div>
      </div>
      <div className="col-form-wrapper">
        <div className="max-width-auth-pages animated-entry-form-signup">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Auth;