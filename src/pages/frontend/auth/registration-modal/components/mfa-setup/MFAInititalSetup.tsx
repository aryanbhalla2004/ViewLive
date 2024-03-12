import React from 'react'
import { PhoneInputCustom } from '../../../../../../common/Components/textInput/TextInput'
import { Button } from '../../../../../../common/Components/button/Button'
import { Message } from '../../../../../../common/Components/message/Message'

interface props {
  phone: String,
  changeValuePhone: (field: any) => void,
  error: any,
  loading: boolean,
  setModal: (field: any) => void,
  setAccountAttribute: () => void,
  message: any
}

export const MFAInititalSetup = (props: props) => {
  
  return (
    <div className='full-screen-modal'>
      <div className='modal-center-content'>
        <i className="bi bi-shield-lock"></i>
        <h2>Security Verification</h2>
        <p>Let's begin by setting up a contact number for your account to ensure smooth communication.</p>
        {props.message.form && <Message type={props.message.type} header={props.message.header} message={props.message.form}/>}
        <div className="full-width mt-1 mb-3">
          <PhoneInputCustom changeValue={props.changeValuePhone} value={props.phone} type="text" label="" placeholder='+1 (XXX)-XXX-XXXX' name="phone" error={props.error.for} note={props.error.note} required={false}/>
        </div>
        <Button onClick={props.setAccountAttribute} text="Send Verification Code" type="button" loading={props.loading}/>
        <button type="button" className='close-button-mfa' onClick={() => props.setModal(false)}><i className="bi bi-x-lg"></i></button>
      </div>
    </div>
  )
}
