import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./style.css";
import { Footer, FooterSmall } from '../../../common/Components/footer/Footer';
import { Header } from '../../../common/Components/header/Header'
import { Outlet } from 'react-router-dom';
import { IUserAttributes } from '../../../common/Interfaces/IUserAttributes';
import { CognitoUser } from "@aws-amplify/auth";
import { AccountContext } from '../../../setup/context-manager/AuthContext';


const Main = () => {
  const [user, setUser] = useState<any>("__LOADING");
  const {getUser} = useContext(AccountContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if(getUser() != "__LOADING") {
      setUser(getUser());
    }
    //console.log(getUser() != "__LOADING");
  }, [getUser()]);
  // useEffect(() => {
  //   if(props.userAttributes != undefined) {
  //     if(props.userAttributes['custom:sign_up_status'] === "pending") {
  //       navigate("/finialize-details");
  //     }
  //   }
    
  // }, [props.userAttributes])
  return (
    <>
     {location.pathname != "/finialize-details" && <>
      <Header/>
        <Outlet/>
      <Footer/>
     </>}
      
     {location.pathname === "/finialize-details" && 
      <div className='flex-with-space-between-main'>
        <Header/>
          <Outlet/>
        <FooterSmall/>
      </div>
    }
    </>
  )
}

export default Main;