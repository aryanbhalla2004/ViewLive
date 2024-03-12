import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet, Route, Routes, useOutletContext, useParams  } from 'react-router-dom';
import { TextInput } from '../../../../../../common/Components/textInput/TextInput';
import "./style.css";
import {getBusiness, listUsers} from "../../../../../../graphql/queries"
import {TextAreaInput} from "../../../../../../common/Components/textInput/TextInput";
import { DatabaseContext } from '../../../../../../setup/context-manager/dbContext';
import { Business } from '../../../../../../API';
import Moment from 'react-moment';
import { business } from '../../../../../frontend/auth/registration-modal/interface/IProfileInterface';
import { GhostButton } from '../../../../../../common/Components/button/Button';

const AdminBGeneral = () => {
  const [data, allFile]: [business, any] = useOutletContext();

  const fetchData = async () => {
    const response = await fetch(`https://searchapi.mrasservice.ca/Search/api/v1/search?fq=keyword:%7B${data.number}%7D&lang=en&location=${data.address.state}&queryaction=fieldquery&sortfield=score&sortorder=desc`)
    const result = await response.json();
    console.log(result);
  }

  useEffect(() => {
    fetchData();
  }, [data]);

  return (
    <div className='container-for-managment-bb-business'>
      <div className='single-col-management-bb-business'>
        <h3>About Your Business</h3>
        <div className='inputs-holder-below-title-bb-business'>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Business Name</span>
              <p>{data?.name}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              <span>Business Number</span>
              <p>{data?.number}</p>
            </div>
          </div>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Category</span>
              <p>{data?.type}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              <span>Size</span>
              <p>{data?.size}</p>
            </div>
          </div>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Website Url</span>
              <p>{data?.websiteUrl}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              <span>Phone Number</span>
              <p>{data?.phone}</p>
            </div>
          </div>
          <div className='col-2-container-bgeneral-business'>
            <div className='single-item-in-bgeneral-business'>
              <span>Address</span>
              <p>{data?.address.address}, {data?.address.city} {data?.address.postalcode}, {data?.address.state} {data?.address.country}</p>
            </div>
            <div className='single-item-in-bgeneral-business'>
              <span>Created Date</span>
              <p><Moment format="YYYY-MM-DD hh:mm:ss">{data?.createdDate}</Moment></p>
            </div>
          </div>
          <div className='single-item-in-bgeneral-business'>
            <span>Description</span>
            <p>{data?.description}</p>
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

export default AdminBGeneral;
