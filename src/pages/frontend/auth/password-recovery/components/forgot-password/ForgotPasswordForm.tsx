import React from 'react'
import { Message } from '../../../../../../common/Components/message/Message';
import { Button } from '../../../../../../common/Components/button/Button';
import { TextInput } from '../../../../../../common/Components/textInput/TextInput';
import { Link } from 'react-router-dom';

interface messageType {
  email: string,
  form: string,
  type: string,
  header: string,
}

interface prop {
  message: messageType,
  formSubmitted: boolean
  onSubmit: (e: React.BaseSyntheticEvent) => void,
  error: any,
}

export const ForgotPasswordForm = (props: prop) => {
  return (
    <>
      <h3 className="title-auth">Forgot password?</h3>
      <p className='mb-3 space-text'>If you can't access your account or have forgotten your password, don't get upset. Our "forgotten password" feature can help. Click Reset Password and wait for further information, then enter the email address linked to the account you wish to reset the password for.</p>
      {props.message.form && <Message type={props.message.type} header={props.message.header} message={props.message.form}/>}
      <form onSubmit={props.onSubmit}>
        <div className='mb-3'>
          <TextInput name="email" type="email" error={props.error?.for} note={props.error?.note} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder="mail@example.com" required={true} label="Email Address *"/>
        </div>
        <Button text="Reset Password" loading={props.formSubmitted}/>
        <p className="text-2 text-dark form-label">Go Back to <Link className="text-link" to="/auth">Login</Link></p>
      </form> 
    </>
  )
}
