import React, {useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Message } from '../../../../../../common/Components/message/Message';
import { Button } from '../../../../../../common/Components/button/Button';
import { TextInput } from '../../../../../../common/Components/textInput/TextInput';

interface messageType {
  password: string,
  form: string,
  type: string,
  header: string,
}

interface prop {
  updateUserPassword: (e: React.BaseSyntheticEvent) => void,
  message: messageType,
  formSubmitted: boolean,
}

const SetNewPassword = (props: prop) => {
  const [score, setScore] = useState<number>();
  const [password, setPassword] = useState<string>();
  const changeScore = (score: number) => {
    setScore(score);
  }

  const passwordUpdate = (fields: any) => {
    setPassword(fields.password);
  }

  useEffect(() => {
    toast.success(`It seems like your account needs a new password. Please type in your new password and confirm changes`, {toastId: "NEW_PASSWORD_MESSAGE"});
  }, []);

  return (
    <>
      <h3 className="title-auth">Create New Password</h3>
      <p className=" mb-3">Please enter a new password for your account. The one-time password will be replaced with the password you enter.</p>
      {props.message.form && <Message type={props.message.type} header={props.message.header} message={props.message.form}/>}
      <form onSubmit={props.updateUserPassword}>
        <div className="">
          <TextInput name="password" type="password" pattern=".{8,}" error={props.message.password}  changeValue={passwordUpdate} placeholder="Min 8. Characters" required={true} label="New Password *"/>
          <small id="passwordHelpBlock" className="form-text text-muted light-under-field-text">Your password must be 8-20 characters long.</small>
          <PasswordStrengthBar password={password} className="mt-2" onChangeScore={changeScore}/>
        </div>
        
        <div className="mb-3">
          <TextInput name="rePassword" type="password" pattern=".{8,}" error={props.message.password}  placeholder="Min 8. Characters" required={true} label="Confirm New Password *"/>
        </div>
        <Button loading={props.formSubmitted} text="Change Passwords"/>
      </form>
    </>
  )
}

export default SetNewPassword;