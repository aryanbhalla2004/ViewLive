import React, { useContext, useEffect } from 'react'
import { Link, Outlet, Route, Routes, useParams, useNavigate  } from 'react-router-dom';
import { AccountContext } from '../../../../../setup/context-manager/AuthContext';

export const SingleUserManagement = () => {
  const { id } = useParams();
  const {getUser} = useContext(AccountContext);

  useEffect(() => { 
    pull();
  }, []);

  const pull = async () => {
    const user: any = getUser();

    const itm = await fetch("https://xijqga9mt2.execute-api.ca-central-1.amazonaws.com/dev",
      {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': user.signInUserSession.idToken.jwtToken,
        },
        body: JSON.stringify({
          id: id,
        }),
        
    });

    const data = await itm.json();
    console.log(data);
  }

  return (
    <div>SingleUserManagement</div>
  )
}
