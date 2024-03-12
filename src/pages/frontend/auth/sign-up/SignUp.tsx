import React, { useRef, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SignUpForm } from './components/signup-form/SignupForm';
import { CognitoUser } from '@aws-amplify/auth';
import { AccountContext } from '../../../../setup/context-manager/AuthContext';
import { AccountSelection } from './components/account-selection/AccountSelection';
import "./style.css";
import { BusinessForm } from './components/bussiness-form/BusinessForm';
import { isWorkEmail } from '../../../../common/Form_Validator/Form_validator';
import { BusinessSignUp } from './components/business-signup/BusinesSignUp';
import { DatabaseContext } from '../../../../setup/context-manager/dbContext';

interface user {
  accountType: string,
  businessEmail?: string,
}

interface message { 
  fName: string,
  lName: string,
  email: string,
  password: string,
  form: string,
  type: string,
  header: string,
  accountType: string,
  businessName: string,
  businessEmail: string,
  businessAddress: string,
}

const INITIAL_ERROR = {
  for: "",
  note: ""
}

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<any>(INITIAL_ERROR);
  // const [tempUser, setTempUser] = useState<CognitoUser>();
  const [currentStep, setCurrentStep] = useState<number>(1001);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<user>();
  const {register, login, businessRegister} = useContext(AccountContext);
  const {checkBusinessAvailability} = useContext(DatabaseContext);
  const [message, setMessage] = useState<message>({
    fName: '',
    lName: '',
    email: '',
    password: '',
    form: '',
    type: '',
    header: '',
    accountType: '',
    businessName: '',
    businessEmail: '',
    businessAddress: '',
  });

 
  const onSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setError(INITIAL_ERROR);
    setFormSubmitted(true);

    setMessage({
      fName: '', 
      lName: '', 
      email: '', 
      password: '', 
      form: '', 
      type: '', 
      header: '', 
      accountType: '', 
      businessName: '',
      businessEmail: '',
      businessAddress: '',
    })

    const data = new FormData(e.target);
    const email = Object.fromEntries(data.entries()).email;
    const password = Object.fromEntries(data.entries()).password;
    const rePassword = Object.fromEntries(data.entries()).rePassword;
    const fName = Object.fromEntries(data.entries()).fName;
    const lName = Object.fromEntries(data.entries()).lName;
    const accountType = userInfo?.accountType;
    if(password === rePassword && email != "" && fName != "" && lName != "") {
      try {

        const response = await register({email, password, fName, lName, accountType, bEmail: userInfo?.businessEmail});
        //! check accountType if its businnes then push the proposal
        const redirectPassedState = {
          userConfirmed: response.userConfirmed, 
          userSub: response.userSub,
          username: response.user.username,
          from: "SIGNUP"
        }

        //? Activate
        if(response != undefined) {
          navigate("/auth/sign-up/activate", {state: redirectPassedState});
        }
        
        //? Toast to redirect and send email
      } catch (e: any) {
        if(e.code === "UsernameExistsException") {
          setError({for: "email", note: e.message});
        }

        if(e.code === "InvalidPasswordException") {
          setError({for: "password", note: e.message});
        }
      }
    } else {
      if(password !== rePassword) {
        setError({for: "password", note: "Passwords don't match"});
      } else {
        console.log("form Problem");
      }
    }

    setFormSubmitted(false);
  }

  const changeAccountType = (name: string) => {
    setUserInfo((prev: any) => {
      return {...prev, accountType: name}
    })
  }

  const AccountTypeSubmit = (e: React.BaseSyntheticEvent) => {
    toast.dismiss('ACCOUNT_TYPE_ERROR');
    e.preventDefault();
    setFormSubmitted(true);
    if(userInfo?.accountType === "REGULAR") {
      setCurrentStep(1002);
    } else if (userInfo?.accountType === "BUSINESS"){
      setCurrentStep(1003);
    } else {
      toast.error("Please select an account type", {toastId: "ACCOUNT_TYPE_ERROR"})
    }

    setFormSubmitted(false);
  }
  
  //! This is just for the email at the beginning
  const businessSubmitForm = async (e: React.BaseSyntheticEvent) => {
    setError(INITIAL_ERROR);
    setFormSubmitted(true);
    e.preventDefault();
    const data = new FormData(e.target);
    const email = Object.fromEntries(data.entries()).bEmail.toString();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailformat)) {
      try {
        await login(email, "P@44w0rasdd123234");
      } catch(e: any) {
        if(e.code === "UserNotFoundException") {
          setUserInfo((prev: any) => {
            return {...prev,  businessEmail: email}
          });
          setCurrentStep(1004);
        } else {
          setError({for: "bEmail", note: "Email address is already in use"});
        }
      }
    } else {
      if(!isWorkEmail(email)) {
        setError({ for: "bEmail", note: "Please enter a valid work email that ends with your company's domain name."});
      } else {
        setError({
          for: "bEmail",
          note: "Invalid Email Address"
        });
      }
    }

    setFormSubmitted(false);
  }

  const onBusinessSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setError({});
    const data = new FormData(e.target);
    const businessName = Object.fromEntries(data.entries()).businessName.toString();
    const password = Object.fromEntries(data.entries()).password.toString();
    const rePassword = Object.fromEntries(data.entries()).rePassword.toString();
    const fName = Object.fromEntries(data.entries()).fName.toString();
    const lName = Object.fromEntries(data.entries()).lName.toString();

    if(password === rePassword && businessName != "" && validateBusinessField(businessName) && fName != "" && lName != "" && userInfo != null) {
      try {
        console.log(await checkBusinessAvailability(businessName));
        const response = await businessRegister({email: userInfo.businessEmail, password, fName, lName, accountType: userInfo.accountType, businessName});
        const redirectPassedState = {
          userConfirmed: response.userConfirmed, 
          userSub: response.userSub,
          username: response.user.username,
          from: "SIGNUP"
        }

        //? Activate
        if(response != undefined) {
          navigate("/auth/sign-up/activate", {state: redirectPassedState});
        }
        
        //? Toast to redirect and send email
      } catch (e: any) {
        if(e.code === "InvalidPasswordException") {
          setError({for: "password", note: e.message});
        }
      }
    } else {
      if(!validateBusinessField(businessName)) {
        setError({for: "businessName", note: "Invalid Business Name / Number"});
        return;
      }

      if(password !== rePassword) {
        setError({for: "rePassword", note: "Passwords don't match"});
        return;
      }
    }
  }

  function validateBusinessField(field: string): boolean {
    // Regex pattern to match valid business names or numbers
    const pattern = /^[a-zA-Z0-9\s&.,-]+$/;
  
    // Check if the field matches the pattern
    if (pattern.test(field)) {
      return true;
    } else {
      return false;
    }
  }
  
  return (
    <>    
      {currentStep === 1001 && <AccountSelection userInfo={userInfo} message={message.accountType} AccountTypeSubmit={AccountTypeSubmit} changeAccountType={changeAccountType} formSubmitted={formSubmitted}/>}
      {currentStep === 1002 && <SignUpForm onSubmit={onSubmit} error={error} formSubmitted={formSubmitted}/>}
      {currentStep === 1003 && <BusinessForm error={error} businessSubmitForm={businessSubmitForm} formSubmitted={formSubmitted}/>}
      {currentStep === 1004 && <BusinessSignUp error={error} onSubmit={onBusinessSubmit} message={message} formSubmitted={formSubmitted}/>}
    </>
  )
}

export default SignUp;