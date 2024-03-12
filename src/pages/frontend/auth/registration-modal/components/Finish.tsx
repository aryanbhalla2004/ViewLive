import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AccountContext, AccountProvider } from "../../../../../setup/context-manager/AuthContext";
interface prop {
  mainFormSubmitted: boolean,
  mainFormSubmitResponse: any
}

export const Finish = (props: prop) => {
  const navigate = useNavigate();
  const {getSession} = useContext(AccountContext);
  
  const redirectHome = async () => {
    try {
      const user = await getSession();
      await navigate('/');
    } catch(e: any) {
      console.log(e);
    } 
  }

  return (
    <>
    <div className='personal_info_modal animated-entry-form-signup'>
      <div className='modal-form-header'>
        <h2>User Agreement and Terms of Service: Your Guide to Using Views.Live</h2>
        <p>Our User Agreement and Terms of Service outline the rules and guidelines for using our product/service. By accessing and using our platform, you agree to abide by these terms and conditions. This document covers important information such as user responsibilities, intellectual property rights, privacy policy, payment terms, disclaimers, and limitations of liability. It is important to read and understand these terms before using our product/service.</p>
      </div>
      <div className="form-check-agreement-check">
        <input id="remember-me" name="remember" className="form-check-input" type="checkbox" defaultChecked/>
        <label className="form-label" htmlFor="remember-me">I Agree with all the Terms and Agreements</label>
      </div>
    </div>
    {props.mainFormSubmitted && 
      <div className='full-screen-modal animated-entry-form-signup'>
        <div className='modal-center-content final-submit-regis-modal-popup'>
          {props.mainFormSubmitResponse === null ? <div className="loading-inside">
          <span className="loader-spin"></span>
          <p>Applying Changes</p></div> : 
          <>
            <i className="bi bi-check2-circle"></i>
            <h2>You're All Set!</h2>
            <p>Your registration for Views.Live is complete, and you are now ready to start using our platform to its fullest potential.</p>
            <button className="success-button-portal" type="button" onClick={redirectHome}>Get Started <i className="bi bi-arrow-right"></i></button>
          </>}
        </div>
      </div>}
    </>
  )
}