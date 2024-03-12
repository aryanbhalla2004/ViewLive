import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AccountContext } from '../../../../../setup/context-manager/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextInput } from '../../../../../common/Components/textInput/TextInput';
import { Button } from '../../../../../common/Components/button/Button';
import { CountDown } from '../../../../../common/Components/count-down/CountDown';
import { Message } from '../../../../../common/Components/message/Message';
import { getErrorMessage } from '../../../../../common/util/errorUtility';

interface currentUserInfo{
  userConfirmed: boolean, 
  userSub?: string,
  username: string,
  from: string
}

const INITIAL_ERROR = {
  for: "",
  note: "",
}

const ActivateAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {sendMFACode, verifyMFACode} = useContext(AccountContext);
  const [timeRunning, setTimeRunning] = useState<boolean>(false);
  const [defaultTime, setDefaultTime] = useState<number>(30);
  const [currentUserInfo, setCurrentUserInfo] = useState<currentUserInfo>();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<any>(INITIAL_ERROR);
  const [message, setMessage] = useState({
    code: '',
    form: '',
    type: '',
    header: '',
  });


  useEffect(() => {
    const onLoad = async () => {
      if(location.state != null) {
        setCurrentUserInfo(location.state);
        if(location.state?.from === "LOGIN") {
          try {
            await sendMFACode(location.state?.username);
            toast.success(`Email sent successfully to ${location.state?.username}`, {toastId: "EMAIL_SENT"});
          } catch (e: any) {
            setMessage((prev) => {
              return {...prev, form: e.message, type: "ERROR", header: "Limit Exceeded"}
            });
          }
        } else {
          setMessage((prev) => {
            return {...prev, form: `Verification code was sent successfully to ${location.state?.username}`, type: "SUCCESS", header: "Email Sent"}
          });
        }
  
        
      } else {
         navigate("/");
      }
    }

    onLoad();
  }, [location.state, navigate, sendMFACode]);

  

  const confirmCode = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setError(INITIAL_ERROR);
    const data = new FormData(e.target);
    const code = Object.fromEntries(data.entries()).code;
    setMessage({ code: '', form: '', type: '', header: ''});
    if(code !== "") {
      try {
        const response = await verifyMFACode(currentUserInfo?.username, code);
        if(response === 'SUCCESS') {
          toast.success(`Your account ${currentUserInfo?.username} was activated successfully`, {toastId: "EMAIL_SENT"});
          //! Select Account Types
          navigate('/auth');
          //navigate("/auth/sign-up/account-setup", {state: {name: currentUserInfo?.username, response: "SUCCESS"}});
        }
      } catch (e: any) {

        const errorMessage:any = getErrorMessage(e.code, e.message);
        setMessage(errorMessage);
        // if(e.code === "CodeMismatchException") {
        //   setError({for: "code", note: e.message});
        //   // setMessage((prev) => {
        //   //   return {...prev, code: }
        //   // });
        // }

        // if(e.code === "ExpiredCodeException") {
        //   setMessage((prev) => {
        //     return {...prev, form: `The code that you entered was expired. Click the resend button to get a new code`, type: "WARNING", header: "Code Expired"}
        //   });
        // }

        // if(e.code === "LimitExceededException") {
        //   setMessage((prev) => {
        //     return {...prev, form: e.message, type: "ERROR", header: "Limit Exceeded"}
        //   });
        // }

        if(e.code === "NotAuthorizedException") {
          navigate("/");
        }
        console.log(e);
      }
    }

    setFormSubmitted(false);
  }

  const timeRun = async () => {
    setTimeRunning(true);
    setDefaultTime(prev => prev + 30);
    try {
      await sendMFACode(currentUserInfo?.username);
      toast.success(`Email sent successfully to ${currentUserInfo?.username}`, {toastId: "EMAIL_SENT"});
    } catch (e: any) {
      if(e.code === 'LimitExceededException') {
        setDefaultTime(prev => prev + 300);
      }
      toast.error(e.message, {toastId: "ERROR_RESEND_EMAIL_TOAST"});
    }
  }

  return (
    <>
      <h3 className="title-auth">Validation Email Address</h3>
      <p className="text-muted mb-3">Please type the 6-digit code that you received on your email {}.</p>
      {message.form && <Message type={message.type} header={message.header} message={message.form}/>}
      <form onSubmit={confirmCode}>
        <div className='mb-3'>
          <TextInput name="code" type="number" error={error.for} note={error.note} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="6-Digit Code" required={true} label="Verification Code *"/>
        </div>
        <Button loading={formSubmitted} text="Verify Account"/>
        <p className="text-2 text-dark form-label">Didn't receive the Code? {!timeRunning ? <Link className="text-link" to="" onClick={timeRun}>Resend Code</Link> : <CountDown seconds={defaultTime} setTimeRunning={setTimeRunning}/>}</p>
      </form>
    </>
  )
}

export default ActivateAccount;