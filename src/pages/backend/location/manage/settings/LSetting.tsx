import React, { useState } from 'react'
import Moment from 'react-moment'
import { Link, useOutletContext } from 'react-router-dom'
import "./style.css";
import { Button, GhostButton } from '../../../../../common/Components/button/Button';
import { ModualPop } from '../../../../../common/Components/module-pop/ModualPop';
import LAddUser from '../../addUser/LAddUser';

export const LSetting = (prop: any) => {
  const [currentLocation]:any = useOutletContext();
  const [showCreateLocationUser, setShowCreateLocationUser] = useState<boolean>(false);

  return (
    <div className='container-for-managment-bb'>
        <div className='access-box-setting'>
          <div className='access-table-header'>
            <div>
              <h3>Access Control</h3>
              <p>You can add custom role for different users in the access control.</p>
            </div>
            <div className='access-button-setting'>
              <button onClick={() => setShowCreateLocationUser(true)}><i className="bi bi-person-add"></i> <p>Add Manager</p></button>
            </div>
          </div>
          <table className='table-of-items'>
              <thead>
                <th>Name <i className="bi bi-arrow-down"></i></th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </thead>
              <tbody> 
                <tr>
                  <td>
                    <div>
                      <div>
                        <h4>Aryan Bhalla</h4>
                        <p>aryanbhalla66@gmail.com</p>
                      </div>
                    </div>
                  </td>
                  <td>Manager</td>
                  <td>Invited</td>
                  <td><Link to=""  className='light-button link-button'><i className="bi bi-pencil-square"></i> Manage User</Link></td>
                </tr>
              </tbody>
            </table>
        </div>
      
      <div className='single-col-management-bb'>
        <h3>Deletion</h3>
        <div className='inputs-holder-below-title-bb location-management-setting-delete'>
          <h3>Delete location <span className='highlight danger-highlight'>Critical Action</span></h3>
          <p>Moving forward with this action will result in the deletion of all location-based data from our platform, encompassing not only email addresses and cached data but also live reviews and pictures associated with these locations.</p>

          <div className='action-delete-location'>
            <button>Delete Permanently</button>
          </div>
        </div>
      </div>
      <ModualPop show={showCreateLocationUser} child={<LAddUser locationId={currentLocation.id} setShowCreateLocationUser={setShowCreateLocationUser}/>} />
    </div>
  )
}
