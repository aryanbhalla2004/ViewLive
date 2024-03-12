import React, { useContext, useEffect, useState } from 'react';
import { PhoneInputCustom, TextInput } from '../../../../../common/Components/textInput/TextInput';
import MFA from "../../../../../assets/SVG/MFA.svg";
import { IProfileInterface } from '../interface/IProfileInterface';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { Button } from '../../../../../common/Components/button/Button';
import { MFAInititalSetup } from './mfa-setup/MFAInititalSetup';
import { Toast } from 'react-toastify/dist/components';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { MFAVerifyCode } from './mfa-setup/MFAVerifyCode';
import { AccountContext } from '../../../../../setup/context-manager/AuthContext';
import { getErrorMessage } from '../../../../../common/util/errorUtility';


interface prop {
  setData: (data: IProfileInterface) => void,
  data: IProfileInterface
}

const INITIAL_ERROR = {
  for: "",
  note: ""
}

export const PersonalSetting = (props: prop) => {
  const [phone, setPhone] = useState<string>("");
  const [step, setStep] = useState<Number>(1000);
  const [showModal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<any>(INITIAL_ERROR);
  const [message, setMessage] = useState<any>({ 
    code: '',
    form: '',
    type: '',
    header: '',
  });
  const {getUser} = useContext(AccountContext);
  const [mfaComplete, setMFAComplete] = useState<boolean>(true);

  useEffect(() => {
    checkMFANeeded();
  }, []);

  const checkMFANeeded = () => {
    const user = getUser();

    if(user.preferredMFA === "SMS_MFA") {
      setMFAComplete(false);
    }

    setLoading(false);
  }


  const setupVerify = async () => {
    // try {
      
      
    //   console.log(result);
    //   //console.log('SMS MFA enabled successfully');
    // } catch (error) {
    //   console.log('Error enabling SMS MFA:', error);
    // }
  }

  const setAccountAttribute = async () => {
    setError(INITIAL_ERROR);
    setLoading(true);
 
    if(isValidPhoneNumber(phone)) {
      setTimeout(() => {
        Auth.currentAuthenticatedUser()
          .then((cognitoUser) => {
            Auth.updateUserAttributes(cognitoUser, {
              'phone_number': phone
            }).then(res => {
              Auth.verifyCurrentUserAttribute('phone_number')
                .then(() => {
                  setStep(2000);
                  setLoading(false);
                }).catch((e) => {
                  const errorMessage:any = getErrorMessage(e.code, e.message);
                  setMessage(errorMessage);
                  setLoading(false);
                });
            }).catch((e) => {
              const errorMessage:any = getErrorMessage(e.code, e.message);
              setMessage(errorMessage);
              setLoading(false);
            });
          }).catch((e) => {
            const errorMessage:any = getErrorMessage(e.code, e.message);
            setMessage(errorMessage);
            setLoading(false);
          });
      }, 2000);
      
    } else {
    
      setError({for: "phone", note: "Invalid Phone Number"});
      setLoading(false);
    
    }

    
  }

  const verifyCode = async () => {
    setLoading(true);
    if(otp.length != 6) {
      return;
    }

      
    Auth.verifyCurrentUserAttributeSubmit("phone_number", otp)
      .then(item => {
        if(item === 'SUCCESS') {
          Auth.currentAuthenticatedUser()
            .then((cognitoUser) => {
              Auth.setPreferredMFA(cognitoUser, "SMS")
                .then(res => {
                  //! Set MFA to Valid
                  //! Close Block
                }).catch(err => {
                  console.log(err);
                })
            })
            .catch((err) => {
              console.error('Error getting the current authenticated user', err);
            });
        }
      }).catch(error => {
        console.log(error);
      })
    

   

  
    setLoading(false);
  }
  const setNumber = async () => {
    

    // try {
    //   const user = await Auth.currentAuthenticatedUser();
    //   if(user != undefined) {
    //     //const data = await Auth.setupTOTP(user);
    //     const attributes = await Auth.updateUserAttributes(user, {
    //       'phone_number': phone
    //     });

    //     const result = await Auth.verifyCurrentUserAttribute('phone_number');
    //     console.log(result);
    //   }
    // } catch(e: any) {
    //   console.log(e);
    // }

    
  //     Auth.currentAuthenticatedUser().then(user => {
  //   Auth.updateUserAttributes(user, {
  //     'phone_number': 'c'
  //   });
  //     .then(result => console.log(result))
  //     .catch(error => console.log(error));
  // })
  }

  const changeValuePhone = (field: any) => {
    if(field.phone !== undefined) {
      setPhone(field.phone);
    }
  }

  const setOTP = (field: any) => {
    setOtp(field);
  }

  return (
    <>
      <div className='personal_info_modal animated-entry-form-signup'>
        <div className='mfa-modal-container'>
          <img src={MFA} width="300"></img>
          <div className='container-mfa-field'>
            <h2>Enable MFA (Recommended)</h2>
            <p>By enabling MFA, you can significantly reduce the risk of unauthorized access to your sensitive information and protect yourself against cyber attacks.</p>
            <div className='mfa-verification-field'>
              {mfaComplete ? <button type='button' className='complete-mfa mfa-button '><i className="bi bi-shield-check"></i> MFA Setup Confirmed</button> : <button type='button' className='mfa-button incomplete-mfa' onClick={e => setModal(true)}><i className="bi bi-shield-lock"></i> Setup MFA</button> }
            </div>
          </div>
        </div>
      </div>
      {showModal && step === 1000 && <MFAInititalSetup message={message} setModal={setModal} loading={loading} setAccountAttribute={setAccountAttribute} error={error} phone={phone} changeValuePhone={changeValuePhone} />}
      {showModal &&  step === 2000 && <MFAVerifyCode otp={otp} setOTP={setOTP} loading={loading} verifyCode={verifyCode} error={error} phone={phone}/>}
    </>
  )
}
