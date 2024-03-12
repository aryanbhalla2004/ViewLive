import React, {useContext, useState, useRef, useEffect} from 'react';
import { TextInput } from '../../../../../common/Components/textInput/TextInput';
import { DataStore } from '@aws-amplify/datastore';
import { useSelector } from "react-redux";
import { IProfileInterface } from '../interface/IProfileInterface';


interface prop {
  setData: (data: any) => void,
  data: IProfileInterface,
  error: any
}
export const FileUpload = (props: prop) => {

  const changeValue = (field: any) => {
    props.setData((prev: any) => {
      return {...prev, business: {...prev.business, documentProof: {...prev.business.documentProof, ...field}}}
    })
  }

  const fileUpload = (e: any) => {
    props.setData((prev: any) => {
      return {...prev, business: {...prev.business, documentProof: {...prev.business.documentProof, [e.target.name]: e.target.files[0] }}}
    })
  }

  const deleteFile = (name: any) => {
    props.setData((prev: any) => {
      return {...prev, business: {...prev.business, documentProof: {...prev.business.documentProof, [name]: null}}}
    })
  }

  
  return (
    <>
      <div className='file_upload_modal animated-entry-form-signup'>
        <div className='modal-form-header mb-3'>
          <h2>Proof of Identity and Business Information Upload</h2>
          <p>To confirm you legally own the business and verify your identity we need the documents listed below. Please upload digital photo/files of the following documents. Your documents are safe with us, we have multiple security layers that protect you documents.</p>
        </div>
        <div className='file-upload-container'>
          <div className={props.error.for === "oneType" ? 'invalid-input single-file-upload-box' : 'single-file-upload-box'}>
            <i className="bi bi-cloud-upload"></i>
            <h3>Identify / Address Proof</h3>
            <p>Please upload a document as proof of your Identify / Address Proof.</p>
            {props.data.business?.documentProof.oneFile === null && <>
            <div className="full-width select-input-sign-up">
              <select name="oneType" value={props.data.business.documentProof.oneType} onChange={(e: any) => changeValue({[e.target.name]: e.target.value})}>
                <option defaultValue="Select Document Type" disabled>Select Document Type</option>
                <option value="Bank Statement">Bank Statement</option>
                <option value="Utility Bill">Utility Bill</option>
                <option value="Driving Licence">Driving Licence</option>
                <option value="Passport">Passport</option>
              </select>
            </div>
            {props.data.business?.documentProof.oneType !== "Select Document Type" && <input accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" name="oneFile" onChange={fileUpload} type="file" className='form-control'/>}</>}
            {props.data.business?.documentProof.oneFile !== null && <div className='sucess-file-upload' onClick={e => deleteFile("oneFile")}>File Uploaded <i className="bi bi-trash3"></i></div>}

            <span className={props.error.for === "oneType" ? "note-small-text error-text" : "note-small-text"}>{props.error.for === "oneType" && "oneType" && <><i className="bi bi-exclamation-triangle-fill"></i> {props.error.note}</>}</span>
          </div>
          <div className={props.error.for === "twoType" ? 'invalid-input single-file-upload-box' : 'single-file-upload-box'}>
            <i className="bi bi-cloud-upload"></i>
            <h3>Business Proof</h3>
            <p>Please upload a document as proof of your Business.</p>
            {props.data.business?.documentProof.twoFile === null && <>
            <div className="full-width select-input-sign-up">
              <select name="twoType" value={props.data.business.documentProof.twoType} onChange={(e: any) => changeValue({[e.target.name]: e.target.value})}>
                <option defaultValue="Select Document Type" disabled>Select Document Type</option>
                <option value="Company Registration Document">Company Registration Document</option>
                <option value="Company Tax Returns">Company Tax Returns</option>
              </select>
            </div>
            {props.data.business?.documentProof.twoType !== "Select Document Type" && <input accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" name="twoFile" onChange={fileUpload} type="file"  className='form-control' />}</>}
            {props.data.business?.documentProof.twoFile !== null && <div className='sucess-file-upload' onClick={e => deleteFile("twoFile")}>File Uploaded <i className="bi bi-trash3"></i></div>}
            <span className={props.error.for === "twoType" ? "note-small-text error-text" : "note-small-text"}>{props.error.for === "twoType" && "twoType" && <><i className="bi bi-exclamation-triangle-fill"></i> {props.error.note}</>}</span>
          </div>
        </div>
      </div>
    </>
  )

  }