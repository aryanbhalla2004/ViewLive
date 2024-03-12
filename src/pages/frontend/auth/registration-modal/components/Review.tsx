import React, {useContext, useState, useRef, useEffect} from 'react';
import { TextInput } from '../../../../../common/Components/textInput/TextInput';
import { DataStore } from '@aws-amplify/datastore';
import { API } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

import { IProfileInterface } from '../interface/IProfileInterface';
import { IUserAttributes } from '../../../../../common/Interfaces/IUserAttributes';
import { AccountContext } from '../../../../../setup/context-manager/AuthContext';

interface prop {
  setData: (data: IProfileInterface) => void,
  data: IProfileInterface,
}

interface pop {
  data: IProfileInterface,
}

// export const BusinesInfo = (props: pop) => {
//   return (
//     <div className='mb-3'>
//       <div className='dividing-line'>
//         <div className='line-small'/>
//           <span>Business Information</span>
//         <div className='line-big'/>
//       </div>
//       <div className='mt-3 single-row-2'>
//         <div className="mb-3 col-md-6">
//           <label htmlFor="emailAddress" className="form-label review-form-lable">Business Name *</label>
//           <p>{props.data.business?.name}</p>
//         </div>
//         <div className="mb-3 col-md-6 ">
//           <label htmlFor="emailAddress" className="form-label review-form-lable">Business Number *</label>
//           <p>{props.data.business?.number}</p>
//         </div>
//       </div>
//       <div className="d-flex mt-3 single-row-2">
//         <div className="mb-3">
//           <label htmlFor="emailAddress" className="form-label review-form-lable">Business Phone Number *</label>
//           <p>{props.data.business?.phone}</p>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="emailAddress" className="form-label review-form-lable">Business Email Address *</label>
//           <p>{getUser().attributes['custom:account_type']}</p>
//         </div>
//       </div>
//       <div className='d-flex mt-3 single-row'>
//         <div className="mb-3 col-md-6 rm-padding-left box-container-field">
//           <label htmlFor="emailAddress" className="form-label review-form-lable">Address *</label>
//           <p>{props.data.business?.address.address}, {props.data.business?.address.city} {props.data.business?.address.state}, {props.data.business?.address.country} {props.data.business?.address.postalcode}</p>
//         </div>
//         <div className="mb-3 col-md-6 rm-padding-left box-container-field">
//           <label htmlFor="emailAddress" className="form-label review-form-lable">Website URL</label>
//           <p>{props.data.business?.websiteUrl != "" ? props.data.business?.websiteUrl : "N/a"}</p>
//         </div>
//       </div>
//       <div className="d-flex mt-3 single-row-2">
//         <div className="mb-3 col-md-6 rm-padding-left box-container-field">
//           <label htmlFor="emailAddress" className="form-label review-form-lable">Business Size * </label>
//           <p>{props.data.business?.size}</p>
//         </div>
//         <div className="mb-3 col-md-6  rm-padding-left rm-padding-right  box-container-field">
//           <label htmlFor="emailAddress" className="form-label review-form-lable">Business Type *</label>
//           <p><p>{props.data.business?.type}</p></p>
//         </div>
//       </div>
//       <div className="d-flex mt-3 single-row full-width-review">
//         <div className="mb-3 col-md-6 rm-padding-left box-container-field">
//           <label htmlFor="emailAddress" className="form-label review-form-lable">About your Business *</label>
//           <p>{props.data.business?.description}</p>
//         </div>
//       </div>  
      
//       <div className='mb-3'>
//         <div className='dividing-line'>
//           <div className='line-small'/>
//             <span>Document Proof File</span>
//           <div className='line-big'/>
//         </div>
//         <div className="d-flex mt-3 single-row-2">
//           <div className="mb-3 col-md-6 rm-padding-left box-container-field">
//             <label htmlFor="emailAddress" className="form-label review-form-lable">{props.data.business?.documentProof.oneType}</label>
//             <p className='file-uploaded-message'>{props.data.business?.documentProof.oneFile != null && <><i className="bi bi-file-earmark-check-fill"></i> File Uploaded</>}</p>
//           </div>
//           <div className="mb-3 col-md-6  rm-padding-left rm-padding-right  box-container-field">
//             <label htmlFor="emailAddress" className="form-label review-form-lable">{props.data.business?.documentProof.twoType}</label>
//             <p className='file-uploaded-message'>{props.data.business?.documentProof.twoFile != null && <><i className="bi bi-file-earmark-check-fill"></i> File Uploaded</>}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

export const Review = (props: prop) => {
  const nav = useNavigate();
  const {getUser} = useContext(AccountContext);
  const finish = ()=> {
    nav("/");
  }

  return (
    <div className='personal_info_modal bottom-space-fix animated-entry-form-signup'>
      <div className='modal-form-header'>
        <h2>Review and Finalize your Information </h2>
        <p>This information will help us help you provide that things your interested in.</p>
      </div>
      <div className='mb-3'>
      <div className='dividing-line'>
        <div className='line-small'/>
          <span>Business Information</span>
        <div className='line-big'/>
      </div>
      <div className='mt-3 single-row-2'>
        <div className="mb-3 col-md-6">
          <label htmlFor="emailAddress" className="form-label review-form-lable">Business Name *</label>
          <p>{props.data.business?.name}</p>
        </div>
        <div className="mb-3 col-md-6 ">
          <label htmlFor="emailAddress" className="form-label review-form-lable">Business Number *</label>
          <p>{props.data.business?.number}</p>
        </div>
      </div>
      <div className="d-flex mt-3 single-row-2">
        <div className="mb-3">
          <label htmlFor="emailAddress" className="form-label review-form-lable">Business Phone Number *</label>
          <p>{props.data.business?.phone}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="emailAddress" className="form-label review-form-lable">Business Email Address *</label>
          <p>{getUser().attributes['email']}</p>
        </div>
      </div>
      <div className='d-flex mt-3 single-row'>
        <div className="mb-3 col-md-6 rm-padding-left box-container-field">
          <label htmlFor="emailAddress" className="form-label review-form-lable">Address *</label>
          <p>{props.data.business?.address.address}, {props.data.business?.address.city} {props.data.business?.address.state}, {props.data.business?.address.country} {props.data.business?.address.postalcode}</p>
        </div>
        <div className="mb-3 col-md-6 rm-padding-left box-container-field">
          <label htmlFor="emailAddress" className="form-label review-form-lable">Website URL</label>
          <p>{props.data.business?.websiteUrl != "" ? props.data.business?.websiteUrl : "N/a"}</p>
        </div>
      </div>
      <div className="d-flex mt-3 single-row-2">
        <div className="mb-3 col-md-6 rm-padding-left box-container-field">
          <label htmlFor="emailAddress" className="form-label review-form-lable">Business Size * </label>
          <p>{props.data.business?.size}</p>
        </div>
        <div className="mb-3 col-md-6  rm-padding-left rm-padding-right  box-container-field">
          <label htmlFor="emailAddress" className="form-label review-form-lable">Business Type *</label>
          <p><p>{props.data.business?.type}</p></p>
        </div>
      </div>
      <div className="d-flex mt-3 single-row full-width-review">
        <div className="mb-3 col-md-6 rm-padding-left box-container-field">
          <label htmlFor="emailAddress" className="form-label review-form-lable">About your Business *</label>
          <p>{props.data.business?.description}</p>
        </div>
      </div>  
      <div className='mb-3'>
        <div className='dividing-line'>
          <div className='line-small'/>
            <span>Personal Settings</span>
          <div className='line-big'/>
        </div>
        <div className="d-flex mt-3 single-row-2">
          <div className="mb-3 col-md-6 rm-padding-left box-container-field">
            <label htmlFor="emailAddress" className="form-label review-form-lable">Multi-Factor Authentication</label>
            <p className='file-uploaded-message'>{props.data.business?.documentProof.oneFile != null && <><i className="bi bi-file-earmark-check-fill"></i> File Uploaded</>}</p>
          </div>
          <div className="mb-3 col-md-6  rm-padding-left rm-padding-right  box-container-field">
            <label htmlFor="emailAddress" className="form-label review-form-lable">Remember Device</label>
            <p className='file-uploaded-message'>{props.data.business?.documentProof.twoFile != null && <><i className="bi bi-file-earmark-check-fill"></i> File Uploaded</>}</p>
          </div>
        </div>
      </div> 
      <div className='mb-3'>
        <div className='dividing-line'>
          <div className='line-small'/>
            <span>Document Proof File</span>
          <div className='line-big'/>
        </div>
        <div className="d-flex mt-3 single-row-2">
          <div className="mb-3 col-md-6 rm-padding-left box-container-field">
            <label htmlFor="emailAddress" className="form-label review-form-lable">{props.data.business?.documentProof.oneType}</label>
            <p className='file-uploaded-message'>{props.data.business?.documentProof.oneFile != null && <><i className="bi bi-file-earmark-check-fill"></i> File Uploaded</>}</p>
          </div>
          <div className="mb-3 col-md-6  rm-padding-left rm-padding-right  box-container-field">
            <label htmlFor="emailAddress" className="form-label review-form-lable">{props.data.business?.documentProof.twoType}</label>
            <p className='file-uploaded-message'>{props.data.business?.documentProof.twoFile != null && <><i className="bi bi-file-earmark-check-fill"></i> File Uploaded</>}</p>
          </div>
        </div>
      </div>
    </div>
    </div> 
  )
}

