import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../../../../common/Components/button/Button';
import businessSVG from "../../../../../../assets/SVG/business.svg";
import regularSVG from "../../../../../../assets/SVG/regular.svg";

interface user {
  accountType: string,
  gender?: string,
  phone_number?: string,
  dob?: Date,
  address?: string,
  businessName?: string,
  businessType?: string,
  businessAddress?: string,
  businessEmail?: string,
  businessPhone?: number,
  businessDescription?: string,
  businessSize?: string,
  businessWebsite?: string,
  business?: object,
  businessNumber?: number,
  businessDocs?: businessDocuments
}

interface businessDocuments {
  bankStatements?: string,
  businessDoc?: string,
  utilityBill?: string,
  ID?: string,
}

interface prop {
  userInfo: user | undefined,
  changeAccountType: (name: string) => void,
  formSubmitted: boolean,
  AccountTypeSubmit: (e: React.BaseSyntheticEvent) => void,
  message: string | undefined
}

export const AccountSelection = (props: prop) => {

  return (
    <div className='animated-entry-form-signup'>
      <h4 className="title-auth">Get Started With Us</h4>
      <p className="mb-3 remove-mt light-small-text-below-header">Choose the account that best describes your needs. Remember that once an account is registered, its type cannot be modified.</p>
      <form onSubmit={props.AccountTypeSubmit}>
        <div className='account-selection-container mb-3'>
          <div onClick={(e) => props.changeAccountType("REGULAR")} className={props.userInfo?.accountType === "REGULAR" ? 'single-account-selection mb-3 active-selection' : 'single-account-selection  mb-3'}>
            <img src={regularSVG}></img>
            <div>
              <h3>Individual<span className='highlight success-highlight'>FREE</span></h3>
              <p>Use on a regular basis and offers deals and discounts.</p>
            </div>
            {props.userInfo?.accountType === "REGULAR" && <div className='selected-check'> <i className="bi bi-check-circle-fill"></i></div>}
          </div>
          <div onClick={(e) => props.changeAccountType("BUSINESS")} className={props.userInfo?.accountType === "BUSINESS" ? 'single-account-selection active-selection' : 'single-account-selection'}>
            <img src={businessSVG}></img>
            <div>
              <h3>Business<span className='highlight warning-highlight'>50% Off</span></h3>
              <p>Allows you to use our platform to advertise your business.</p>
            </div>
            {props.userInfo?.accountType === "BUSINESS" && <div className='selected-check'> <i className="bi bi-check-circle-fill"></i></div>}
          </div>
        </div>
        
        <Button loading={props.formSubmitted} text="Continue"/>
      </form>
      <p className="text-2 text-dark form-label">Already have an account? <Link className="text-link" to="/auth">Login</Link></p>
    </div>
  )
}
