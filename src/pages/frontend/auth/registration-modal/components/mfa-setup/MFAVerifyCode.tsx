import React, { useState } from 'react'
import { PhoneInputCustom } from '../../../../../../common/Components/textInput/TextInput'
import { Button } from '../../../../../../common/Components/button/Button'
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { CountDown } from '../../../../../../common/Components/count-down/CountDown';

interface props {
  phone: String,
  error: any,
  loading: boolean,
  otp: any,
  setOTP: (field: any) => void
  verifyCode: () => void
}

export const MFAVerifyCode = (props: props) => {

  const [timeRunning, setTimeRunning] = useState<boolean>(false);
  const [defaultTime, setDefaultTime] = useState<number>(30);
  
  const timeRun = async () => {
    setTimeRunning(true);
    setDefaultTime(prev => prev + 30);
    try {
      //await sendMFACode(currentUserInfo?.username);
      //toast.success(`Email sent successfully to ${currentUserInfo?.username}`, {toastId: "EMAIL_SENT"});
    } catch (e: any) {
      if(e.code === 'LimitExceededException') {
        setDefaultTime(prev => prev + 300);
      }
      //toast.error(e.message, {toastId: "ERROR_RESEND_EMAIL_TOAST"});
    }
  }
  
  return (
    <div className='full-screen-modal'>
      <div className='modal-center-content'>
        <i className="bi bi-shield-lock"></i>
        <h2>Verification Code</h2>
        <p>Please type the verification code sent to {props.phone}</p>
        <div className="mt-1 mb-3 opt-field-container">
          <OtpInput
            value={props.otp}
            onChange={props.setOTP}
            numInputs={6}
            renderInput={(props) => <input {...props} className='otp-field'/>}
          />
        </div>
        <div>
          <Button onClick={props.verifyCode} text="Verify Now" type="button" loading={props.loading}/>
          <p className="text-2 text-dark form-label">Didn't receive the Code? {!timeRunning ? <Link className="text-link" to="" onClick={timeRun}>Resend Code</Link> : <CountDown seconds={defaultTime} setTimeRunning={setTimeRunning}/>}</p>
        </div>
        <button type="button" className='close-button-mfa light-button-mfa'>Skip for now </button>
      </div>
    </div>
  )
}
