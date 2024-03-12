import React, { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../../../setup/context-manager/AuthContext';
import "./style.css";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Loading from '../../../../common/Components/pre-loader/Loading';




interface IUserAccount {
  family_name: String,
  given_name: String,
  'custom:account_type': String,
  email:String
  Enabled: Boolean,
  UserCreateDate: String
  Username: String,
}

export const UserManagement = () => {
  const {getUser} = useContext(AccountContext);
  const [userAccounts, setUserAccounts] = useState<IUserAccount[] | null>(null);
  
  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    const user: any = getUser();

    const itm = await fetch("https://boi09qqsmh.execute-api.ca-central-1.amazonaws.com/Dev",
      {
        mode: "cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': user.signInUserSession.idToken.jwtToken,
        },
        body: JSON.stringify({
          date: user.username,
        }),
        
    });

    const data = await itm.json();
    setUserAccounts(data.body);
    console.log(data);
  }
  
  return (
    <div className='bbView-container'>
      <div className='dash-header-page'>
        <div className='name-path-dash-page'>
          <h2>User Management</h2>
          <p className='path-style'>Dashboard <i className="bi bi-chevron-right"></i> User Management</p>
        </div>
        <div className='action-button-container-dash'>
          {/*add action button*/ }
        </div>
      </div>
      <table className='table-of-items user-management-table'>
        <thead>
          <th>Name <i className="bi bi-arrow-down"></i></th>
          <th>Group</th>
          <th>Created Date</th>
          <th>Status</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {userAccounts === null ? <Loading/> : <>
          {userAccounts && userAccounts.map(item => (
            <tr>
              <td>
                <div>

                  <div>
                    <h4>{item.given_name} {item.family_name}</h4>
                    <p>{item.email}</p>
                  </div>
                </div>
              </td>
              <td><div className={item['custom:account_type'] == "ADMIN" ? "admin-group group-box" : "group-box"}>{item['custom:account_type']}</div></td>
              <td><Moment format='DD MMM YYYY'>{item.UserCreateDate.toString()}</Moment></td>
              <td><div className={item.Enabled ? "user-manage-success" : "user-manage-suspended"}>{item.Enabled ? "Active" : "Suspended"}</div></td>
              <td><Link to={`/dashboard/admin/user-management/${item.Username}`}  className='light-button link-button'><i className="bi bi-pencil-square"></i> Manage User</Link></td>
            </tr>
          ))}</>}
        </tbody>
      </table>
    </div>
  )
}
