import React, { useContext, useEffect, useState } from 'react'
import { Business } from '../../../../API';
import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import Moment from 'react-moment';
import "./style.css";

export const BGeneral = () => {
  const navigate = useNavigate();
  const [business, allFile]:[Business, any] = useOutletContext();
  const [itm, setItm] = useState<any>();


  return (
    <div className='container-for-managment-bb-business'>
      <div className='single-col-management-bb-business'>
        <h3>About Your Business</h3>
        <div className='inputs-holder-below-title-bb-business'>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Business Name</span>
              <p>{business?.name}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              <span>Business Number</span>
              <p>{business?.number}</p>
            </div>
          </div>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Category</span>
              <p>{business?.type}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              <span>Size</span>
              <p>{business?.size}</p>
            </div>
          </div>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Website Url</span>
              <p>{business?.websiteUrl}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              <span>Phone Number</span>
              <p>{business?.phone}</p>
            </div>
          </div>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Address</span>
              <p>{business?.address.address}, {business?.address.city} {business?.address.postalcode}, {business?.address.state} {business?.address.country}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              <span>Created Date</span>
              <p><Moment format="YYYY-MM-DD hh:mm:ss">{business?.createdDate}</Moment></p>
            </div>
          </div>
          <div className='single-item-in-bgeneral-business'>
            <span>Description</span>
            <p>{business?.description}</p>
          </div>
        </div>
      </div>
      <div className='single-col-management-bb-business'>
        <h3>Business Documents</h3>
        <div className='inputs-holder-below-title-bb-business'>
          <div className='col-2-container-bgeneral-business file-view-container-admin-dashboard'>
            {allFile != undefined && allFile.map((item:any) => (
              <div className='single-item-in-bgeneral-business'>
                <span>{item.type}</span>
                <iframe src={item.link}></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
