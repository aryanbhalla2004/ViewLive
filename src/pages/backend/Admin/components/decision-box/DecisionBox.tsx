import React, { useState } from 'react'
import Select from 'react-select';
import "./style.css";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TextAreaInput } from '../../../../../common/Components/textInput/TextInput';
import Loading from '../../../../../common/Components/pre-loader/Loading';
import { Status } from '../../../../../API';

interface prop {
  boxType: String,
  changeStatus: (data: any, reason?: any) => void
  setShowBox: (data: any) => void
}


export const DecisionBox = (props: prop) => {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setError("");
    setFormSubmitted(true);
  
    const { boxType, changeStatus, setShowBox } = props;
    const isApprove = boxType === "APPROVE";
  
    if (isApprove) {
      const responseCode:any = await changeStatus(Status.APPROVED);
      if (responseCode === 200) {
        setShowBox(false);
        navigate('/dashboard/admin/business-inquiries');
        toast.success(`[Business Name] has been approved and an email has been sent.`);
      }
    } else {
      const data = new FormData(e.target);
      const reason = data.get('reasonRejection');

      if (reason != "") {
        const responseCode:any  = await changeStatus(Status.REJECTED, reason);
        if (responseCode === 200) {
          setShowBox(false);
          navigate('/dashboard/admin/business-inquiries');
          toast.success(`[Business Name] has been rejected and an email has been sent with the reasoning.`);
        }
      } else {
        setError("reasonRejection")
      }
    }
  
    setFormSubmitted(false);
  };

  return (
    <form onSubmit={onSubmit}>
      {props.boxType === "APPROVE" && <div className='content-box-business-inquire-post'>
        <h2>Confirm to Approve Business</h2>
        <p>by approving the business, the business will be able to post multiple location and start advertising them self. Please make sure to double check infromation before approving</p>
        <div className='action-buttons-pop'>
          <button onClick={e => props.setShowBox(false)} className='button-apro-dash' type='button'>Close</button>
          <button className='button-apro-dash approve-button' type='submit'>Approve</button>
        </div>
        {formSubmitted && <div className='loading-screen-form-submited'><Loading /></div>}
      </div>}

      {props.boxType === "DECLINE" && <div className='content-box-business-inquire-post decline-box'>
        <h2>Confirm to Decline Business</h2>
        <p>by declining the business, the business will be able to post multiple location and start advertising them self. Please make sure to double check infromation before approving</p>
        <TextAreaInput name="reasonRejection" type="" label='Reason of Decline' placeholder='Type Your Reasons' error={error} note={"Please entre a valid reason."}/>
        <div className='action-buttons-pop'>
          <button onClick={e => props.setShowBox(false)} className='button-apro-dash' type='button'>Close</button>
          <button className='button-apro-dash reject-button' type='submit'>Reject</button>
        </div>
        {formSubmitted && <div className='loading-screen-form-submited'><Loading /></div>}
      </div>}
    </form>
  )
}
