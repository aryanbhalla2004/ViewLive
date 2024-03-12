import React, {useContext, useState, useRef, useEffect} from 'react';
import { PhoneInputCustom, TextAreaInput, TextInput, TextLinkInput } from '../../../../../common/Components/textInput/TextInput';
import { IBusiness } from '../../../../../common/Interfaces/IBusiness';
import { IProfileInterface } from '../interface/IProfileInterface';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import { AddressAutofill } from '@mapbox/search-js-react';
import { categories } from '../../../../../common/util/categories';

interface prop {
  setData: (data: any) => void,
  data: IProfileInterface,
  error: any
}

export const BusinessInfo = (props: prop) => {
  
  const changeValue = (field: any) => {
    props.setData((prev: any) => {
      return {...prev, business: {...prev.business, ...field}};
    });
  }

  const changeValueAddress = (field: any) => {
    props.setData((prev: any) => {
      return {...prev, business: {...prev.business, address: {...prev.business.address, ...field}}};
    });
  }

  const changeValuePhone = (field: any) => {
    if(field.phone !== undefined) {
      props.setData((prev: any) => {
        return {...prev, business: {...prev.business,  ...field}};
      });
    }
  }

  const handelURLChange = (e: any) => {
    props.setData((prev: any) => {
      return {...prev, business: {...prev.business,  websiteUrl: e.target.value}};
    });
  }
  
  
  return (
    <div className='buisness_info_modal animated-entry-form-signup'>
      <div className='modal-form-header'>
        <h2>Tell Us About Your Business</h2>
        <p>This information will help us help you provide that things your interested in.</p>
      </div>
      <div className='form-input-container'>
        <div className="d-flex col-2 mb-3">
          <div className="full-width">
            <TextInput changeValue={changeValue} name="name" value={props.data.business?.name} type="text" error={props.error.for} note={props.error.note} placeholder="Buisness Name" required={true} label="Buisness Name *"/>
          </div>
          <div className="full-width">
            <TextInput changeValue={changeValue} name="number" value={props.data.business?.number} type="number" error={props.error.for} note={props.error.note} placeholder="2348128" required={true} label="Buisness Number *"/>
          </div>
        </div>
        <div className="d-flex full-small-width mb-3">
          <div className="full-width">
            <AddressAutofill accessToken="pk.eyJ1IjoiYXJ5YW5iaGFsbGEiLCJhIjoiY2ttbWMxYjN0MG4zNzJ2b2RzenNtNHloeCJ9.D28HxdUCUpf7YpvsQZ26AQ">
              <TextInput autoComplete="address-line1" changeValue={changeValueAddress} name="address" type="text" value={props.data.business?.address.address} error={props.error.for} note={props.error.note} placeholder="123 Main St" required={true} label="Address *"/>
            </AddressAutofill>
          </div>
          <div className="full-width">
            <TextInput autoComplete="address-line2" changeValue={changeValueAddress} name="unit" type="text" value={props.data.business?.address.unit} error={props.error.for} note={props.error.note} placeholder="Apt, Suite, etc." required={false} label="Unit #"/>
          </div>
        </div>
        <div className="d-flex col-2 mb-3">
          <div className="full-width">
            <TextInput autoComplete="address-level2" changeValue={changeValueAddress} name="city" type="text" value={props.data.business?.address.city} error={props.error.for} note={props.error.note} placeholder="Los Angeles" required={true} label="City"/>
          </div>
          <div className="full-width">
            <TextInput autoComplete="address-level1" changeValue={changeValueAddress} name="state" type="text" value={props.data.business?.address.state} error={props.error.for} note={props.error.note} placeholder="California" required={true} label="State / Province"/>
          </div>
          <div className="full-width">
            <TextInput autoComplete="country" changeValue={changeValueAddress} name="country" type="text" value={props.data.business?.address.country} error={props.error.for} note={props.error.note} placeholder="USA" required={true} label="Country"/>
          </div>
          <div className="full-width">
            <TextInput autoComplete="postal-code" changeValue={changeValueAddress} name="postalcode" type="text" value={props.data.business?.address.postalcode} error={props.error.for} note={props.error.note} placeholder="Type" required={true} label="Postal Code"/>
          </div>
        </div>
        <div className="d-flex col-2 mb-3">
          <div className="full-width">
            <PhoneInputCustom error={props.error.for} note={props.error.note} value={props.data.business?.phone != undefined && props.data.business?.phone} changeValue={changeValuePhone} type="text" label="Phone Number" placeholder='+1 (XXX)-XXX-XXXX' name="phone" required={false}/>
          </div>
          <div className="full-width">
            <TextLinkInput value={props.data.business?.websiteUrl} changeValue={changeValue} name="websiteUrl" type="link" label='Website URL' placeholder='www.example.com' error={props.error.for} note={props.error.note} required={false}/>
          </div>
        </div>
        <div className="d-flex col-2 mb-3">
          <div className="full-width select-input-sign-up">
            <label className='form-label'>Company Size</label>
            <select name="size" className={props.error.for === "size" ? 'invalid-input' : ''} onChange={e => changeValue({[e.target.name]: e.target.value})} value={props.data.business?.size}>
              <option defaultValue="" disabled>Select Company Size</option>
              <option value="1 - 10+ Employees">1 - 10+ Employees</option>
              <option value="100 - 500+ Employees">100 - 500+ Employees</option>
              <option value="500 - 1000+ Employees">500 - 1000+ Employees</option>
            </select>
            <span className={props.error.for === "size" ? "note-small-text error-text" : "note-small-text"}>{props.error.for === "size" && "size" && <><i className="bi bi-exclamation-triangle-fill"></i> {props.error.note}</>}</span>
          </div>
          <div className="full-width select-input-sign-up">
            <label className='form-label'>Company Type</label>
            <select name="type" className={props.error.for === "type" ? 'invalid-input' : ''} onChange={e => changeValue({[e.target.name]: e.target.value})} value={props.data.business?.type}>
              <option defaultValue="" disabled>Select Business Type</option>
              {Object.entries(categories).map(([category, iconClass]) => (
                 <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <span className={props.error.for === "type" ? "note-small-text error-text" : "note-small-text"}>{props.error.for === "type" && "type" && <><i className="bi bi-exclamation-triangle-fill"></i> {props.error.note}</>}</span>
          </div>
        </div>
        <div className="d-flex col-2 mb-3">
          <div className="full-width">
            <TextAreaInput wordCount={true} wordsAllowed={1500} changeValue={changeValue} value={props.data.business?.description} name="description" type="text" error={props.error.for} note={props.error.note} placeholder="Tell us about your business" required={true} label="Description *"/>
          </div>
        </div>
      </div>
    </div> 
  )
}
