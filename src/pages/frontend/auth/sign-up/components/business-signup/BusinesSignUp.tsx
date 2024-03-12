import React, {useState} from 'react'
import { TextInput } from '../../../../../../common/Components/textInput/TextInput';
import { Button } from '../../../../../../common/Components/button/Button';
import PasswordStrengthBar from 'react-password-strength-bar';
import { Link } from 'react-router-dom';

interface message { 
  fName: string,
  lName: string,
  email: string,
  password: string,
  form: string,
  type: string,
  header: string,
  accountType: string,
}

interface props {
  onSubmit: (e: React.BaseSyntheticEvent) => void,
  formSubmitted: boolean,
  message: message,
  error: any,
}

export const BusinessSignUp = (props: props) => {
  const [password, setPassword] = useState<string>();
  const [score, setScore] = useState<number>();

  const changeScore = (score: number) => {
    setScore(score);
  }

  const passwordUpdate = (fields: any) => {
    setPassword(fields.password);
  }
  
  return (
    <div className='animated-entry-form-signup'>
      <h4 className="title-auth"><span></span>Sign up</h4>
      <p className="mb-3 remove-mt light-small-text-below-header">As soon as you join up, you will explore more options and personalise your settings to meet your specific needs.</p>
      <form onSubmit={props.onSubmit}>
        <div className="d-flex col-2">
          <div className="full-width">
            <TextInput name="fName" type="Name" pattern="[a-zA-Z]+" error={props.message.fName} placeholder="First Name" required={true} label="First Name *"/>
          </div>
          <div className="full-width">
            <TextInput name="lName"  type="Name" pattern="[a-zA-Z]+" error={props.message.lName} placeholder="Last Name" required={true} label="Last Name *"/>
          </div>
        </div>
        <small id="passwordHelpBlock" className="form-text text-muted light-under-field-text">Please use your Legal First & Last Name as it appears on your legal documents.</small>
        <div className="mb-3 mt-3">
          <TextInput name="businessName" type="text" error={props.error.for} note={props.error.note} placeholder="Enter business name or number" required={true} label="Business Name / Number *"/>
        </div>
        <div className="">
          <TextInput name="password" type="password" pattern=".{8,}" error={props.error.for} note={props.error.note} changeValue={passwordUpdate}  placeholder="Min 8. Characters" required={true} label="Password *"/>
          <small id="passwordHelpBlock" className="form-text text-muted light-under-field-text">Your password must be 8-20 characters long.</small>
          <PasswordStrengthBar password={password} className="mt-2" onChangeScore={changeScore}/>
        </div>
        
        <div className="mb-3">
          <TextInput name="rePassword" type="password" pattern=".{8,}" error={props.error.for} note={props.error.note} onlyOutline={true} placeholder="Min 8. Characters" required={true} label="Re-Password *"/>
        </div>
        
        <Button loading={props.formSubmitted} text="Sign up"/>
        <p className="text-2 text-dark form-label"><Link className="text-link" to="/auth"><i className="bi bi-arrow-left"></i> Go Back</Link></p>
      </form>
    </div>
  )
}
