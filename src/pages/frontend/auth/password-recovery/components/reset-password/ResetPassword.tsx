import React, { useState, useContext } from 'react';
import { AccountContext } from '../../../../../../setup/context-manager/AuthContext';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Message } from '../../../../../../common/Components/message/Message';
import { TextInput } from '../../../../../../common/Components/textInput/TextInput';
import { Button } from '../../../../../../common/Components/button/Button';
import { CountDown } from '../../../../../../common/Components/count-down/CountDown';

interface prop {
  userEmail: string
}

export const ResetPassword = (props: prop) => {
  const navigate = useNavigate();
  const {forgotPassword, createNewPassword} = useContext(AccountContext);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [timeRunning, setTimeRunning] = useState<boolean>(false);
  const [defaultTime, setDefaultTime] = useState<number>(30);
  const [message, setMessage] = useState({
    code: '',
    password: '',
    form: '',
    type: '',
    header: '',
  });

  const onSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setMessage({code: '', password: '', form: '', type: '', header: ''});
    const data = new FormData(e.target);
    const code = Object.fromEntries(data.entries()).code;
    const password = Object.fromEntries(data.entries()).password;
    const rePassword = Object.fromEntries(data.entries()).rePassword;

    if(password === rePassword) {
      try {
        const response = await createNewPassword({username: props.userEmail, code, password});
        if(response === "SUCCESS") {
          navigate('/auth');
          toast.success(`Password for your account has changed successfully. Please login with your new password`, {toastId: "PASSWORD_CHANGE_MESSAGE"});
        }
        console.log(response);
      } catch (e: any) {
        if(e.code === "CodeMismatchException") {
          setMessage((prev) => {
            return {...prev, code: e.message}
          });
        }

        if(e.code === "LimitExceededException") {
          setMessage((prev) => {
            return {...prev, form: e.message, type: "ERROR", header: "Limit Exceeded"}
          });
        }

        if(e.code === "ExpiredCodeException") {
          setMessage((prev) => {
            return {...prev, form: `The code that you entered was expired. Click the resend button to get a new code`, type: "WARNING", header: "Code Expired"}
          });
        }

        if(e.code === "InvalidPasswordException") {
          setMessage((prev) => {
            return {...prev, form: e.message, type: "ERROR", header: "Invalid Password"}
          });
        }
        
        console.log(e);
      }
    } else {
      setMessage((prev) => {
        return {...prev, password: "Passwords don't match"}
      });
    }

    setFormSubmitted(false);
  }

  const timeRun = async () => {
    setTimeRunning(true);
    setDefaultTime(prev => prev + 30);
    try {
      await forgotPassword(props.userEmail);
      toast.success(`Email sent successfully to ${props.userEmail}`, {toastId: "EMAIL_SENT"});
    } catch (e: any) {
      if(e.code === 'LimitExceededException') {
        setDefaultTime(prev => prev + 300);
      }
      toast.error(e.message, {toastId: "ERROR_RESEND_EMAIL_TOAST"});
    }
  }

  return (
    <>
      <h3 className="title-auth">Confirm Reset Password</h3>
      <p className='mb-3 space-text'>Please Check the inbox of <span className='selective-box'>{props.userEmail}</span> for a 6-digit verification code. More further instruction will be included in the email.</p>
      {message.form && <Message type={message.type} header={message.header} message={message.form}/>}
      <form onSubmit={onSubmit} autoComplete="false">
        <div className='mb-3'>
          <TextInput name="code" type="number" error={message.code} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="6-Digit Code" required={true} label="Verification Code *"/>
          <small id="passwordHelpBlock" className="form-text text-muted light-under-field-text">A 6-digit code that you received via email</small>
        </div>
        <div className='mb-3'>
          <TextInput name="password" type="password" error={message.password} pattern=".{8,}" placeholder="New Password" required={true} label="New Password"/>
        </div>
        <div className='mb-3'>
          <TextInput name="rePassword" type="password" error={message.password} onlyOutline={true} pattern=".{8,}" placeholder="Confirm New Password" required={true} label="Confirm New Password"/>
        </div>
        <Button text="Change Password" loading={formSubmitted}/>
        <p className="text-2 text-dark form-label">Didn't receive the Code? {!timeRunning ? <Link className="text-link" to="" onClick={timeRun}>Resend Code</Link> : <CountDown seconds={defaultTime} setTimeRunning={setTimeRunning}/>}</p>
      </form>
    </>
  )
}
