import React from 'react'
import { Link } from 'react-router-dom';
import { TextInput } from '../../../../../../common/Components/textInput/TextInput';
import { Button, ToggleButton } from '../../../../../../common/Components/button/Button';
import googleIcon from "../../../../../../assets/SVG/google-small.svg";
import userIcon from "../../../../../../assets/SVG/avatar.svg";
import { Message } from '../../../../../../common/Components/message/Message';

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
  outside: string
}

interface prop {
  onSubmit: (e: React.BaseSyntheticEvent) => void,
  onSingleSubmit: (e: React.BaseSyntheticEvent) => void,
  userExist: existingUser | undefined,
  formSubmitted: boolean,
  removeExistingUser: () => void,
  message: messageType,
  error: any,
}

export const LoginForm = (props: prop) => {
  return (
    <div className='animated-entry-form-signup'>
      <h3 className="title-auth">Welcome Back,</h3>
      <p>With our assistance, you may find your favourite eateries near you!</p>
      {!props.userExist && <>
        <div className="social-login-button">
          <Link to="" className='hover-social-icon'><img src={googleIcon} width="25"/> <span className="mx-3">Sign in with Google</span></Link>
        </div>
        <div className="divider-line">
          <hr className="small-line" />
          <span className="mx-3 text-muted">Sign in with Email Instead</span>
          <hr className="big-line" />
        </div>
        {props.message.form && <Message type={props.message.type} header={props.message.header} message={props.message.form}/>}
        <form onSubmit={props.onSubmit}>
          <div className='mb-3'>
            <TextInput name="email" type="email" error={props.error.for} note={props.error.note} placeholder="mail@example.com" required={true} label="Email Address *"/>
          </div>
          <div className='mb-3'>
            <TextInput name="password" type="password" pattern=".{8,}" error={props.error.secondFor} note={props.error.note} onlyOutline={true}  placeholder="Min 8. Characters" required={true} label="Password *"/>
          </div>
          <div className="item-footer-logo mb-3">
            <div className="form-check">
              {/* <ToggleButton text="" loading={false}/> */}
              <label className="form-label" htmlFor="remember-me">Remember Me</label>
            </div>
            <div className="text-link"><Link to="/auth/forgot-password" className="text-link">Forgot password?</Link></div>
          </div>
          <Button loading={props.formSubmitted} text="Login"/>
          <p className="text-2 text-dark form-label">Not registered yet? <Link className="text-link" to="/auth/sign-up">Create an Account</Link></p>
        </form>

        
        {/* remove these */}

        {/* <form onSubmit={props.onSubmit}>
          <div className='mb-3 none'>
            <TextInput name="email" type="email" value = "testregular@gmail.com" error={props.error.for} note={props.error.note} placeholder="mail@example.com" required={true} label="Email Address *"/>
          </div>
          <div className='mb-3 none'>
            <TextInput name="password" value = "TestRegular@12" type="password" pattern=".{8,}" error={props.error.secondFor} note={props.error.note} onlyOutline={true}  placeholder="Min 8. Characters" required={true} label="Password *"/>
          </div>
          <div className="item-footer-logo mb-3 none">
            <div className="form-check none">
              <input id="remember-me" name="remember" className="form-check-input" type="checkbox" defaultChecked/>
              <label className="form-label" htmlFor="remember-me">Remember Me</label>
            </div>
            <div className="text-link none"><Link to="/auth/forgot-password" className="text-link">Forgot password?</Link></div>
          </div>
          <Button loading={props.formSubmitted} text="REGULAR"/>
        </form>

        <form onSubmit={props.onSubmit}>
          <div className='mb-3 none'>
            <TextInput name="email" type="email" value = "testbuisness@gmail.com" error={props.error.for} note={props.error.note} placeholder="mail@example.com" required={true} label="Email Address *"/>
          </div>
          <div className='mb-3 none'>
            <TextInput name="password" value = "TestRegular@12" type="password" pattern=".{8,}" error={props.error.secondFor} note={props.error.note} onlyOutline={true}  placeholder="Min 8. Characters" required={true} label="Password *"/>
          </div>
          <div className="item-footer-logo mb-3 none">
            <div className="form-check none">
              <input id="remember-me" name="remember" className="form-check-input" type="checkbox" defaultChecked/>
              <label className="form-label" htmlFor="remember-me">Remember Me</label>
            </div>
            <div className="text-link none"><Link to="/auth/forgot-password" className="text-link">Forgot password?</Link></div>
          </div>
          <Button loading={props.formSubmitted} text="buisness"/>
        </form>

        <form onSubmit={props.onSubmit}>
          <div className='mb-3 none'>
            <TextInput name="email" type="email" value = "testadmin@gmail.com" error={props.error.for} note={props.error.note} placeholder="mail@example.com" required={true} label="Email Address *"/>
          </div>
          <div className='mb-3 none'>
            <TextInput name="password" value = "TestRegular@12" type="password" pattern=".{8,}" error={props.error.secondFor} note={props.error.note} onlyOutline={true}  placeholder="Min 8. Characters" required={true} label="Password *"/>
          </div>
          <div className="item-footer-logo mb-3 none">
            <div className="form-check none">
              <input id="remember-me" name="remember" className="form-check-input" type="checkbox" defaultChecked/>
              <label className="form-label" htmlFor="remember-me">Remember Me</label>
            </div>
            <div className="text-link none"><Link to="/auth/forgot-password" className="text-link">Forgot password?</Link></div>
          </div>
          <Button loading={props.formSubmitted} text="admin"/>
        </form> */}


        {/* remove these till here*/}
      </>}


      {props.userExist && 
        <>
          <form onSubmit={props.onSingleSubmit}>
            <div className='profile-info'>
              <img src={userIcon} width="90"/>
              <h3>{props.userExist.fullName}</h3>
            </div>
            <div className='mb-3'>
              <div className="input-with-button">
                <TextInput name="password" type="password" pattern=".{8,}" error={props.message.outside} onlyOutline={true}  placeholder="Your Password" required={true} label=""/>
                <button className="btn btn-primary" type="submit"><i className="bi bi-arrow-right"></i></button>
              </div>
              {props.message.outside != "" && <span className='error-message'>{props.message.outside}</span>}
            </div>
            <div className="item-footer-logo mb-3">
              <div className="text-link"><Link to="" className="text-link" onClick={props.removeExistingUser}>Switch User</Link></div>
              <div className="text-link"><Link to="/auth/forgot-password" className="text-link">Forgot password?</Link></div>
            </div>
          </form>
        </>
      }
    </div>
  )
}
