import React, { useEffect, useState } from 'react'
import { Button } from '../../../../../common/Components/button/Button'
import { Link, useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import { CountDown } from '../../../../../common/Components/count-down/CountDown';
import { Message } from '../../../../../common/Components/message/Message';

interface messageType {
  password: string,
  form: string,
  type: string,
  header: string,
}

interface prop {
  ConfirmOTPCOde: (code: string) => void,
  message: messageType,
  formSubmitted: boolean,
  setStep: (data: any) => void
  setMessage: (data: any) => void,
}

export const MFAForm = (props: prop) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [timeRunning, setTimeRunning] = useState<boolean>(true);
  const [defaultTime, setDefaultTime] = useState<number>(90);

  const onSubmit = () => {
    if(otp.length === 6) {
      props.ConfirmOTPCOde(otp);
    } else {
      setError('Invalid OTP Code');

      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }

  useEffect(() => {
    if(!timeRunning) {
      props.setMessage((prev: any) => {
        return {...prev, form: `User session expires, please login and try again.`,
        type: 'WARNING',
        header: 'Session Expires',}
      })
      props.setStep(1000);
    }
  }, [timeRunning]);

  return (
    <div className='animated-entry-form-signup'>
    <h3 className="title-auth">Validate OTP</h3>
    <p>Please enter the OTP (one time password) to verify your account. This feature will keep you information and account safe.</p>
    <div className={error != null ? 'opt-container shake' : "opt-container"}>
      {props.message.form && <Message type={props.message.type} header={props.message.header} message={props.message.form}/>}
      <OtpInput
        value={otp}
        onChange={setOtp}
        inputType = "number"
        numInputs={6}
        renderInput={(props) => <input {...props} className='otp-field'/>}
      />
    </div>
    <Button type='button' loading={props.formSubmitted} text="Verify" onClick={onSubmit}/>
    <p className="text-2 text-dark form-label">Session Expires In  <CountDown seconds={defaultTime} setTimeRunning={setTimeRunning}/></p>

    {/* {!props.userExist && <>
      <div className="social-login-button">
        <Link to="" className='hover-social-icon'><img src={googleIcon} width="25"/> <span className="mx-3">Sign in with Google</span></Link>
      </div>
      <div className="divider-line">
        <hr className="small-line" />
        <span className="mx-3 text-muted">Sign in with Email Instead</span>
        <hr className="big-line" />
      </div>
      
    </>} */}
    </div>
  )
}
