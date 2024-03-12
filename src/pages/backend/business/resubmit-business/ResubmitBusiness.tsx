import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DatabaseContext } from '../../../../setup/context-manager/dbContext';
import { Business, Status, UpdateBusinessInput } from '../../../../API';
import "./style.css";
import { PhoneInputCustom, TextAreaInput, TextInput } from '../../../../common/Components/textInput/TextInput';
import { AddressAutofill } from '@mapbox/search-js-react';
import Select from 'react-select';
import { Button } from '../../../../common/Components/button/Button';
import { CategoriesSelect } from '../../../../common/util/categories';
import { business } from '../../../frontend/auth/registration-modal/interface/IProfileInterface';
import { updateBusiness } from '../../../../graphql/mutations';

const sizeOption = [
  {value: "1 - 10+ Employees", label: "1 - 10+ Employees"},
  {value: "100 - 500+ Employees", label: "100 - 500+ Employees"},
  {value: "500 - 1000+ Employees", label: "500 - 1000+ Employees"}
];

const idAddOption = [
  {value: "Bank Statement", label: "Bank Statement"},
  {value: "Utility Bill", label: "Utility Bill"},
  {value: "Driving Licence", label: "Driving Licence"},
  {value: "Passport", label: "Passport"},
]

const businessOption = [
  {value: "Company Registration Document", label: "Company Registration Document"},
  {value: "Company Tax Returns", label: "Company Tax Returns"},
]


export const ResubmitBusiness = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [business,setBusiness] = useState<Business>();
  const {updateBusinessFunction} = useContext(DatabaseContext);

  useEffect(() => {
    if(location.state) {
      setBusiness(location.state);
      console.log(business);
    } else {
      navigate("/dashboard/business");
    }
  }, [location.state]);

  const changeValue = (field: any) => {
    setBusiness((prev: any) => {
      return {...prev, ...field};
    });
  }

  const changeValueAddress = (field: any) => {
    setBusiness((prev: any) => {
      return {...prev, address: {...prev.business.address, ...field}};
    });
  }

  const changeValuePhone = (field: any) => {
    if(field.phone !== undefined) {
      setBusiness((prev: any) => {
        return {...prev, ...field};
      });
    }
  }

  const handelURLChange = (e: any) => {
    setBusiness((prev: any) => {
      return {...prev,  websiteUrl: e.target.value};
    });
  }
  
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      let businessCopy:Business | undefined = business;
      if(businessCopy) {
        
        const businessDetails: UpdateBusinessInput = {
          id: businessCopy.id,
          description: businessCopy.description,
          address: {
            address: businessCopy.address.address,
            unit: "",
            city: businessCopy.address.city,
            country: businessCopy.address.country,
            state: businessCopy.address.state,
            postalcode: businessCopy.address.postalcode,
            geoLocation: {
              lat: businessCopy.address.geoLocation?.lat || 0.0,
              lng:  businessCopy.address.geoLocation?.lng || 0.0,
            },
          },
          name:businessCopy.name,
          number: businessCopy.number,
          phone: businessCopy.phone,
          size: businessCopy.size,
          type: businessCopy.type,
          websiteUrl: businessCopy.websiteUrl,
          createdDate: businessCopy.createdDate,
          status: Status.WAITING,
          cognitoUser: businessCopy.cognitoUser,
          documents:businessCopy.documents,
          identityId: businessCopy.identityId,
          email: businessCopy.email,
          searchField: businessCopy.searchField,
        };
        const updateDataBase = await updateBusinessFunction(updateBusiness, businessDetails);
        console.log(updateDataBase);
        //navigate("/dashboard/business");
      } else {
        console.log("no object");
      }
    } catch(e) {
      console.log(e);
    }
    setFormSubmitted(false);
  }

  //const [categories, setCategories] = useState<any>(null);

  const handleChange = (selectedOption: any) => {
    console.log(selectedOption);
    //setCategories(selectedOption);
  };

  return (
    business ? 
    <div className='bbView-container'>
      <div className='dash-header-page'>
        <div className='name-path-dash-page'>
          <h2>Resubmit Business Application</h2>
          <p className='path-style'>Dashboard <i className="bi bi-chevron-right"></i> Business <i className="bi bi-chevron-right"></i> Re-submit Application<i className="bi bi-chevron-right"></i> {business?.number}</p>
        </div>
        <div className='action-button-container-dash'>
          <Link to="/dashboard/business" className='link-button btn-primary'><i className="bi bi-arrow-left"></i> Back</Link>
        </div>
      </div>
      <form className='form-information-resubmit' autoComplete='false' autoCorrect='false' autoSave="false" onSubmit={onSubmit}>
        <div className="d-flex col-2 mb-3">
          <div className="full-width">
            <TextInput changeValue={changeValue} name="name" value={business?.name} type="text" error={""} note={""} placeholder="Buisness Name" required={true} label="Buisness Name *"/>
          </div>
          <div className="full-width">
            <TextInput changeValue={changeValue} name="number" value={business?.number} type="number" error={""} note={""} placeholder="2348128" required={true} label="Buisness Number *"/>
          </div>
        </div>

        <div className="d-flex full-small-width mb-3">
          <div className="full-width">
            <AddressAutofill accessToken="pk.eyJ1IjoiYXJ5YW5iaGFsbGEiLCJhIjoiY2ttbWMxYjN0MG4zNzJ2b2RzenNtNHloeCJ9.D28HxdUCUpf7YpvsQZ26AQ">
              <TextInput autoComplete="address-line1" changeValue={changeValueAddress} name="address" type="text" value={business?.address.address} error={""} note={""} placeholder="123 Main St" required={true} label="Address *"/>
            </AddressAutofill>
          </div>
          <div className="full-width">
            <TextInput autoComplete="postal-code" changeValue={changeValueAddress} name="postalcode" type="text" value={business?.address.postalcode} error={""} note={""} placeholder="Type" required={true} label="Postal Code"/>
          </div>
        </div>
        <div className="d-flex col-2 mb-3">
          <div className="full-width">
            <TextInput autoComplete="address-level2" changeValue={changeValueAddress} name="city" type="text" value={business?.address.city} error={""} note={""} placeholder="Los Angeles" required={true} label="City"/>
          </div>
          <div className="full-width">
            <TextInput autoComplete="address-level1" changeValue={changeValueAddress} name="state" type="text" value={business?.address.state} error={""} note={""} placeholder="California" required={true} label="State / Province"/>
          </div>
          <div className="full-width">
            <TextInput autoComplete="country" changeValue={changeValueAddress} name="country" type="text" value={business?.address.country} error={""} note={""} placeholder="USA" required={true} label="Country"/>
          </div>
        </div>

        <div className="d-flex col-2 mb-3">
          <div className="full-width">
            <PhoneInputCustom error={""} note={""} value={business?.phone != undefined && business?.phone} changeValue={changeValuePhone} type="text" label="Phone Number" placeholder='+1 (XXX)-XXX-XXXX' name="phone" required={false}/>
          </div>
          <div className="full-width">
            <label className='form-label'>Website URL</label>
            <div className='url-link-container-resubmit'> 
              <p>https://</p>
              <input placeholder='www.example.com' onChange={handelURLChange} value={business?.websiteUrl != null ? business?.websiteUrl : ""}/>
              {/* <TextInput changeValue={changeValue} name="websiteUrl" type="text" value={props.data.business?.websiteUrl} pattern="*" error={""} placeholder="Website" required={true} label="Website *"/> */}
            </div>
          </div>
        </div>

        <div className="d-flex col-2 mb-3">
          <div className="full-width select-input-sign-up select-boundry">
            <label className='form-label'>Company Size</label>
            <Select onChange={handleChange} defaultValue={{value: business?.size, label: business?.size}} options={sizeOption} placeholder="Select your of business size"/>
           {/*
            <select name="size"  onChange={e => changeValue({[e.target.name]: e.target.value})} value={business?.size}>
              <option defaultValue="Select your of business size" disabled>Select your of business size</option>
              <option value="1 - 10+ Employees">1 - 10+ Employees</option>
              <option value="100 - 500+ Employees">100 - 500+ Employees</option>
              <option value="500 - 1000+ Employees">500 - 1000+ Employees</option>
            </select> */}
          </div>
          <div className="full-width select-input-sign-up select-boundry">
            <label className='form-label'>Company Type</label>
            <Select onChange={handleChange} defaultValue={{value: business?.type, label: business?.type}} options={CategoriesSelect} placeholder="Select the type of business"/>
          </div>
        </div>
        
        <div className="d-flex col-2 mb-3">
          <div className="full-width">
            <TextAreaInput changeValue={changeValue} value={business?.description} name="description" type="text" error={""} placeholder="Tell us about your business" required={true} label="Description *"/>
          </div>
        </div>
        
        <div className='document-upload-change'>
          <div className='upload-container-viewlive resubmit-file-upload'>
          
            <i className="bi bi-cloud-upload"></i>
            <h3>Identify / Address Proof</h3>
            <p>Please upload a document as proof of your Identify / Address Proof.</p>
            <Select onChange={handleChange} options={idAddOption} placeholder="Select Identify / Address Proof"/>
            {/* <p>{viewFile ? viewFile.name : "Upload Video File"}</p> */}
            
            {/* <div>
              <input accept="video/*" name="viewLive" onChange={handleFileChange} id="upload" type="file"  hidden/>
              <label htmlFor="upload"><i className="bi bi-upload"></i> {viewFile ? "Change file" : "Choose file" }</label>
            </div> */}
            
          </div>
          <div className='upload-container-viewlive resubmit-file-upload'>
            
            <i className="bi bi-cloud-upload"></i>
            <h3>Business Proof</h3>
            <p>Please upload a document as proof of your Business.</p>
            <Select onChange={handleChange} options={businessOption} placeholder="Select business document"/>
            {/* <p>{viewFile ? viewFile.name : "Upload Video File"}</p> */}
            
            {/* <div>
              <input accept="video/*" name="viewLive" onChange={handleFileChange} id="upload" type="file"  hidden/>
              <label htmlFor="upload"><i className="bi bi-upload"></i> {viewFile ? "Change file" : "Choose file" }</label>
            </div> */}
            
          </div>
        </div>

        <div className='action-button-resubmit'>

          <div className="checkboxes__item">
            <label className="checkbox style-e">
              <input type="checkbox"/>
              <div className="checkbox__checkmark"></div>
              <div className="checkbox__body">I Agree with Terms & Conditions</div>
            </label>
          </div>
          <Button text="Re-Submit Application" loading={formSubmitted}/>
        </div>
      </form>
    </div> : <></>
  )
}
