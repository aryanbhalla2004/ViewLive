import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AccountContext } from '../../../../setup/context-manager/AuthContext';
import { ResetPassword } from './components/reset-password/ResetPassword';
import { ForgotPasswordForm } from './components/forgot-password/ForgotPasswordForm';
import "./style.css";

interface messageType {
  email: string,
  form: string,
  type: string,
  header: string,
}

const INITIAL_ERROR = {
  for: "",
  note: "",
}

export const ForgotPassword = () => {
  const {forgotPassword} = useContext(AccountContext);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [error, setError] = useState<any>(INITIAL_ERROR);
  const [message, setMessage] = useState<messageType>({
    email: "", 
    form: "",
    type: "",
    header: "",
  });
  

  const onSubmit = async (e: React.BaseSyntheticEvent) => {
    setError(INITIAL_ERROR);
    setFormSubmitted(true);
    e.preventDefault();
    setMessage({email: "", form: "", type: "", header: ""});
    const data = new FormData(e.target);
    const email = Object.fromEntries(data.entries()).email;
    if(email !== "") {
      try {
        await forgotPassword(email);
        setConfirmReset(true);
        setUserEmail(email.toString());
        toast.success(`Email sent successfully to ${email}`, {toastId: "EMAILSENT"});
        e.target.reset();
      } catch (e: any) {  
        if(e.code === "UserNotFoundException") {
          setError({for: "email", note: e.message});
          // setMessage((prev) => {
          //   return {...prev, email: e.message}
          // });
        }

        if(e.code === "LimitExceededException") {
          setMessage((prev) => {
            return {...prev, form: e.message, type: "WARNING", header: "Limit Exceeded"}
          });
        }

        if(e.code === "NotAuthorizedException") {
          setMessage((prev) => {
            return {...prev, form: "User password cannot be reset in the current state. Please contact Technical Support for further help.", type: "ERROR", header: "Unexpected Error"}
          });
        }

        console.log(e.code);
      }
    } else {
      setError({for: "email", note: 'Please Enter a valid Email'});
    }
    
    setFormSubmitted(false);
  }

  return (
    <>
      {!confirmReset && <ForgotPasswordForm error={error} onSubmit={onSubmit} message={message} formSubmitted={formSubmitted}/>}
      {confirmReset && <ResetPassword userEmail={userEmail}/>}
    </>
  )
}

export default ForgotPassword;