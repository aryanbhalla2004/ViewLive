import React from 'react'
import { TextInput } from '../../../../../../common/Components/textInput/TextInput';
import { Button } from '../../../../../../common/Components/button/Button';
import { Link } from 'react-router-dom';

interface prop {
  error: any,
  businessSubmitForm: (e: React.BaseSyntheticEvent) => void,
  formSubmitted: boolean,
}

export const BusinessForm = (props: prop) => {
  return (
    <>
      <h4 className="title-auth mb-3">Lets start by getting your business email address</h4>
      <form onSubmit={props.businessSubmitForm} className="mt-3">
        <div>
          <div className="full-width mb-3">
            <TextInput name="bEmail" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$+" error={props.error.for} note={props.error.note} placeholder="mail@business.com" required={true} label="Business Email *"/>
          </div>
          <p className='light-small-text-below-header mb-3'>Please ensure that you enter the correct email address for your View.Live account. This email will serve as the primary means of communication for important updates and information about your account.</p>

          <Button loading={props.formSubmitted} text="Next"/>
          <p className="text-2 text-dark form-label"><Link className="text-link" to="/auth"><i className="bi bi-arrow-left"></i> Go Back</Link></p>
        </div>
      </form>
    </>
  )
}
