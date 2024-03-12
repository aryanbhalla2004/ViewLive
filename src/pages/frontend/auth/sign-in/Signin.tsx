import React, {useContext, useState, useRef, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { AccountContext } from '../../../../setup/context-manager/AuthContext';
import SetNewPassword from './components/new-password/SetNewPassword';
import { CognitoUser } from '@aws-amplify/auth';
import { LoginForm } from './components/login-form/LoginForm';
import "./style.css";
import { Auth } from 'aws-amplify';
import { MFAForm } from './components/mfa-form';
import { getErrorMessage } from '../../../../common/util/errorUtility';

interface loginCredentials {
  email: React.RefObject<HTMLInputElement>,
  password: React.RefObject<HTMLInputElement>,
  remember: React.RefObject<HTMLInputElement>,
}

interface existingUser {
  email: string,
  fullName: string
}

interface messageType {
  email: string,
  password: string,
  form: string,
  type: string,
  header: string,
  outside: string,
}

const INITIAL_ERROR = {
  for: "",
  secondFor: "",
  note: ""
}


const SignIn = () => {
  const navigate = useNavigate();
  const [tempUser, setTempUser] = useState<CognitoUser>();
  const [requiredAttr, setRequiredAttr] = useState<any>();
  const [step, setStep] = useState<Number>(1000);
  const [allowResetPass, setAllowResetPass] = useState<boolean>(false);
  const [userExist, setUserExist] = useState<existingUser>();
  const {login, completeUserPassword, getSession, confirmMFACode} = useContext(AccountContext);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<any>(INITIAL_ERROR);
  const [message, setMessage] = useState<messageType>({
    email: "", 
    password: "",
    form: "",
    type: "",
    header: "",
    outside: ""
  });

  const [changePasswordMessage, setChangePasswordMessage] = useState({
    password: '',
    form: "",
    type: "",
    header: "",
  })
  
  useEffect(() => {
    const currentImage = localStorage.getItem('user');
    if(currentImage != undefined) {
      setUserExist(JSON.parse(currentImage));
    }
  }, []);

  const onSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setError(INITIAL_ERROR);
    setFormSubmitted(true);
    setMessage({email: "", password: "", form: "", type: "", header: "", outside: ""});
    const data = new FormData(e.target);
    const email = Object.fromEntries(data.entries()).email;
    const password = Object.fromEntries(data.entries()).password;
    const remember = Object.fromEntries(data.entries()).remember;
    
    if(email != "" && password != "") {
      try {
        const response = await login(email, password);        
        if(response.challengeName === "NEW_PASSWORD_REQUIRED") {
          const { requiredAttributes } = response.challengeParam;
          setRequiredAttr(requiredAttributes);
          setTempUser(response);
          setStep(3000);
        } else if (response.challengeName === "SMS_MFA") {
          const requiredAttributes = response.challengeParam;
          setMessage((prev) => {
            return {...prev, form: `A 6-digit OTP code has been sent to you phone number that ends with ${requiredAttributes.CODE_DELIVERY_DESTINATION}`, type: "SUCCESS", header: "Verification Code Sent"}
          });
          setRequiredAttr(requiredAttributes);
          setTempUser(response);
          setStep(2000);
        } else {
          getSession();
          //const userAttributes = await Auth.currentUserInfo();
          //props.setUser({ ...response, attributes: userAttributes.attributes});
          //localStorage.setItem('user', JSON.stringify({ ...response, attributes: userAttributes.attributes}));
          navigate('/');
        }

      } catch (e: any) {
        if(e.code === "UserNotFoundException") {
          setError({for: "email", secondFor: "", note: e.message})
          // setMessage((prev) => {
          //   return {...prev, email: e.message}
          // });
        }

        if(e.code === "NotAuthorizedException") {
          setError({for: "email", secondFor: "password", note: e.message})
        }

        if(e.code === "UserNotConfirmedException") {
          navigate('/auth/sign-up/activate', {state: {username: email, userConfirmed: false, from: "LOGIN"}});
          toast.info("Account needs to be verified before login in.", {toastId: "REMOVE_EXISTING_USER"});
        }
        console.log(e);
      }
    } else {
      console.log("field is empty");
    }

    setFormSubmitted(false);
  }



  const updateUserPassword = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setMessage({email: "", password: "", form: "", type: "", header: "", outside: ""});
    const data = new FormData(e.target);
    const newPass = Object.fromEntries(data.entries()).password;
    const confirmNewPass = Object.fromEntries(data.entries()).rePassword;
    if(newPass === confirmNewPass) {
      try {
        await completeUserPassword(tempUser, newPass, requiredAttr);
        navigate("/");
      } catch(e: any) {
        setChangePasswordMessage((prev) => {
          return {...prev, form: e.message, type: "ERROR", header: "Error"}
        });
      }
    } else {
      setChangePasswordMessage((prev) => {
        return {...prev, password: "Password don't match"}
      });
    }

    setFormSubmitted(false);
  }

  const ConfirmOTPCOde = async (code: string) => {
    setFormSubmitted(true);

    if(code.length === 6) {
      try {
        const res = await confirmMFACode(tempUser, code);
        if(res != null) {
          getSession();
          navigate("/");
        }
      } catch(e: any) {
        const errorMessage:any = getErrorMessage(e.code, e.message);
        setMessage(prev => {
          return {...prev, ...errorMessage}
        });
      }
    }

    setFormSubmitted(false);
  }

  const removeExistingUser = () => {
    localStorage.removeItem('user');
    setUserExist(undefined);
    toast.info("Removed Existing User", {toastId: "REMOVE_EXISTING_USER", autoClose: 2000});
  }

  const onSingleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setMessage({email: "", password: "", form: "", type: "", header: "", outside: ""});
    const data = new FormData(e.target);
    const newPass = Object.fromEntries(data.entries()).password;
    if(newPass != "") {
      try {
        await login(userExist?.email, newPass);
        getSession();
        navigate("/");
      } catch (e: any) {
        if(e.code === "NotAuthorizedException") {
          setMessage((prev) => {
            return {...prev, outside: e.message}
          });
        }
      }
    }
    setFormSubmitted(false);
  }


  return (
    <>
      {step === 3000 && <SetNewPassword updateUserPassword={updateUserPassword} message={changePasswordMessage} formSubmitted={formSubmitted}/>}
      {step === 2000 && <MFAForm ConfirmOTPCOde={ConfirmOTPCOde} setMessage={setMessage} setStep={setStep} message={message} formSubmitted={formSubmitted}/>}
      {step === 1000 && <LoginForm onSubmit={onSubmit} onSingleSubmit={onSingleSubmit} removeExistingUser={removeExistingUser} userExist={userExist} formSubmitted={formSubmitted} message={message} error={error}/>}
    </>
  )
}

export default SignIn;

