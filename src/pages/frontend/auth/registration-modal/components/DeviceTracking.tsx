import React, { useContext, useEffect, useState } from 'react';
import { PhoneInputCustom, TextInput } from '../../../../../common/Components/textInput/TextInput';
import memorize from "../../../../../assets/SVG/memorize.svg";
import { IProfileInterface } from '../interface/IProfileInterface';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';
import { Button, ToggleButton } from '../../../../../common/Components/button/Button';
import { MFAInititalSetup } from './mfa-setup/MFAInititalSetup';
import { Toast } from 'react-toastify/dist/components';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { MFAVerifyCode } from './mfa-setup/MFAVerifyCode';
import { AccountContext } from '../../../../../setup/context-manager/AuthContext';


interface prop {
  setData: (data: IProfileInterface) => void,
  data: IProfileInterface
}

const INITIAL_ERROR = {
  for: "",
  note: ""
}

export const DeviceTracking = (props: prop) => {
  const [phone, setPhone] = useState<string>("");
  const [step, setStep] = useState<Number>(1000);
  const [showModal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<any>(INITIAL_ERROR);
  const {getUser} = useContext(AccountContext);
  const [mfaComplete, setMFAComplete] = useState<boolean>(true);

  
  const rememberDevice = async () => {
    try {
      // const rew = await Auth.forgetDevice();
      // console.log(rew);
      const res = await Auth.rememberDevice();
      console.log(res);
      const result = await Auth.fetchDevices();
      console.log(result);
      // const re = await Auth.forgetDevice();
      // console.log(re);
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className='personal_info_modal animated-entry-form-signup'>
        <div className='mfa-modal-container'>
          <img src={memorize} width="300"></img>
          <div className='container-mfa-field'>
            <h2>Configure Device Settings</h2>
            <p>Enabling this option allows you to streamline your future logins. By selecting 'Remember This Device,' you won't need to verify your identity every time you sign in from this device. Ensure you only use this feature on personal and secure devices.</p>
            {/* <div className='mfa-verification-field'>
              {mfaComplete ? <button type='button' className='complete-mfa mfa-button '><i className="bi bi-shield-check"></i> MFA Setup Confirmed</button> : <button type='button' className='mfa-button incomplete-mfa' onClick={e => setModal(true)}><i className="bi bi-shield-lock"></i> Setup MFA</button> }
            </div> */}
            <div className='memorize-device'>
              <p>Remember This Device</p>
              <ToggleButton text="hello" loading={false} onClick={() => rememberDevice()}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
