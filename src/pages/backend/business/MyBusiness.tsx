import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { getBusiness, listBusinesses } from '../../../graphql/queries';
import { Business, Status } from '../../../API';
import { DatabaseContext } from '../../../setup/context-manager/dbContext';
import "./style.css";
import { AccountContext } from '../../../setup/context-manager/AuthContext';

export const MyBusiness = () => {
  const navigate = useNavigate();
  const [business,setBusiness] = useState<Business | null>(null);
  const {pullObj, fetchProtectedObject} = useContext(DatabaseContext);
  const {getUser} = useContext(AccountContext);
  const [allFile, setAllFile] = useState<any>([]);
  
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    pullFilesForBusiness();
  }, [business]);

  const getData = async () => {
    try{
      const userAttributes = await getUser();
      const id = userAttributes.attributes["custom:buisnessId"];
      let response = await pullObj(getBusiness, id);
      await setBusiness(response.data.getBusiness);
    }catch(response){
      console.log(response);
    } 
  }

  const pullFilesForBusiness = async() => {
    if(business === null) {
      return
    }

    const tempAllFile = [];
   
    for(let i = 0; i < business?.documents.length; i++) {
      const file = await fetchProtectedObject(business?.documents[i].document, business?.identityId);
      const fileObj:any = {
        link: file,
        type: business?.documents[i].documentType
      }
      
      tempAllFile.push(fileObj);
    }

    setAllFile(tempAllFile);
  }

  const resubmitBusiness = () => {
    navigate('resubmit', {state: business});
  }

  return (
    <div className='bbView-container'>
      <div className='dash-header-page'>
        <div className='name-path-dash-page'>
          <h2>{business?.name}</h2>
          <p className='path-style'>Dashboard <i className="bi bi-chevron-right"></i> Business <i className="bi bi-chevron-right"></i> Manage</p>
        </div>
        <div className='action-button-container-dash'>
          <Link to="/dashboard" className='link-button btn-primary'><i className="bi bi-arrow-left"></i> Back</Link>
        </div>
      </div>
      <div className='manage-bb-content-box'>
        <ul>
          <li><Link to={"/dashboard/business"}>General</Link></li>
          <li><Link to={"/dashboard/business/settings"}>Settings</Link></li>
        </ul>
        <div className='page-content-for-managing'>
        {business?.type === "Pending" && 
          <div className='currentStatus-business-status'>
            <div className='icon-wait'>
              <i className="bi bi-hourglass"></i>
            </div>
            <div className='status-pending'>
              <h3>Business Status: Pending</h3>
              <p>Our works are viewing your business profile. We will make a decision shorty!!</p>
            </div>
          </div>}
          {business?.status === Status.WAITING && 
          <div className='currentStatus-business-status'>
            <div className='icon-wait'>
              <i className="bi bi-hourglass"></i>
            </div>
            <div className='status-pending'>
              <div>
                <h3>Business Status: Pending</h3>
                <p>Our works are viewing your business profile. We will make a decision shorty!!</p>
              </div>
            </div>
          </div>}

          {business?.status === Status.APPROVED && 
          <div className='currentStatus-business-status accepted-status'>
            <div className='icon-wait'>
              <i className="bi bi-check2-all"></i>
            </div>
            <div className='status-pending'>
              <div>
                <h3>Business Status: Approved</h3>
                <p>Your business is fully verified, You can <Link to="/dashboard/locations/create">click here</Link> to start creating your location</p>
              </div>
            </div>
          </div>}

          {business?.status === Status.REJECTED && 
          <div className='currentStatus-business-status rejected-status'>
            <div className='icon-wait'>
              <i className="bi bi-exclamation-diamond"></i>
            </div>
            <div className='status-pending'>
              <div>
                <h3>Business Status: Rejected</h3>
                <p>Your business application was regrettably rejected. I recommend trying again with revised information.</p>
              </div>
              <button onClick={() => resubmitBusiness()} className='resubmit-btn'>Resubmit Application</button>
            </div>
          </div>}
          <Outlet context={[business, allFile]}/>
        </div>
      </div>
    </div>
  )
}
