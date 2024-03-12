import React, {useEffect, useState} from 'react';
import "./style.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface inputType {
  name: string,
  type: string,
  label: string,
  placeholder: string,
  required?: boolean,
  error: string,
  pattern?: string | '',
  changeValue?: (fields: Partial<any>) => void,
  onlyOutline?: boolean,
  value?: any;
  note?: any,
  wordCount?: boolean,
  wordsAllowed?: number,
  disabled?: boolean,
  autoComplete?: string, 
  defaultValue?: string, 
}

export const TextInput = (props: inputType) => {
  const [wordCount, setWordCount] = useState<number>(0);
  useEffect(() => { 
    if(props.defaultValue != "" && props.defaultValue != undefined) {
      setWordCount(props.defaultValue.length);
    }
  }, []);

  const changeInput = (e: any) => {
    if(props.wordCount && props.wordsAllowed) {
      if(e.target.value.length <= props.wordsAllowed) {
        if(props.changeValue) {
          props.changeValue({[e.target.name]: e.target.value});
        }
    
        setWordCount(e.target.value.length);
      } else {
        //! make the user stop writing
        e.target.value = e.target.value.slice(0, props.wordsAllowed);
      }
    } else {
      if(props.changeValue) {
        props.changeValue({[e.target.name]: e.target.value});
      }
    }
  };

  return (
    <div>
      <label htmlFor={props.name} className="form-label">{props.label}</label>
      <input disabled={props.disabled} autoComplete={props.autoComplete} defaultValue={props.defaultValue} name={props.name} value={props.value} id={props.name} placeholder={props.placeholder} required={props.required} pattern={props.pattern} type={props.type} onChange={changeInput} className={props.error === props.name ? 'form-control invalid-input' : 'form-control'}/>
      <div className='words-allowed-container'>
        <span className={props.error === props.name ? "note-small-text error-text" : "note-small-text"}>{props.error === props.name && props.note && <><i className="bi bi-exclamation-triangle-fill"></i> {props.note}</>}</span>
        {props.wordCount && <span className='word-count'>{wordCount} / {props.wordsAllowed}</span>}
      </div>
    </div>
  )
};

export const TextLinkInput = (props: inputType) => {

  const changeInput = (e: any) => {
    if(props.wordCount && props.wordsAllowed) {
      if(e.target.value.length <= props.wordsAllowed) {
        if(props.changeValue) {
          props.changeValue({[e.target.name]: e.target.value});
        }
      } else {
        //! make the user stop writing
        e.target.value = e.target.value.slice(0, props.wordsAllowed);
      }
    } else {
      if(props.changeValue) {
        props.changeValue({[e.target.name]: e.target.value});
      }
    }
  };

  return (
    <div >
    <label htmlFor={props.name} className="form-label">{props.label}</label>
    <div className={props.error === props.name ? 'url-link-container invalid-input' : 'url-link-container'}> 
      <p>https://</p>
      <input disabled={props.disabled} autoComplete={props.autoComplete} defaultValue={props.defaultValue} name={props.name} value={props.value} id={props.name} placeholder={props.placeholder} required={props.required} pattern={props.pattern} type={props.type} onChange={changeInput} className={props.error === props.name ? 'form-control invalid-input' : 'form-control'}/>           
    </div>
    <span className={props.error === props.name ? "note-small-text error-text" : "note-small-text"}>{props.error === props.name && props.note && <><i className="bi bi-exclamation-triangle-fill"></i> {props.note} </>}</span>
  </div>
  )
}

export const TextAreaInput = (props: inputType) => {
  
  const [wordCount, setWordCount] = useState<number>(0);

  useEffect(() => {
    if(props.defaultValue != "" && props.defaultValue != undefined) {
      setWordCount(props.defaultValue.length);
    }
  }, [])
  const changeInput = (e: any) => {
    if(props.wordCount && props.wordsAllowed) {
      if(e.target.value.length <= props.wordsAllowed) {
        if(props.changeValue) {
          props.changeValue({[e.target.name]: e.target.value});
        }
    
        setWordCount(e.target.value.length);
      } else {
        //! make the user stop writing
        e.target.value = e.target.value.slice(0, props.wordsAllowed);
      }
    } else {
      if(props.changeValue) {
        props.changeValue({[e.target.name]: e.target.value});
      }
    }
    
  };

  return (
    <div className='text-area-box'>
      <label htmlFor={props.name} className="form-label">{props.label}</label>
      <textarea  defaultValue={props.defaultValue} value={props.value} name={props.name} id={props.name} placeholder={props.placeholder} required={props.required} onChange={changeInput} className={props.error === props.name ? 'form-control invalid-input textarea-field' : 'form-control textarea-field'}></textarea>
      <div className='words-allowed-container'>
        <span className={props.error === props.name ? "note-small-text error-text" : "note-small-text"}>{props.error === props.name && props.note && <><i className="bi bi-exclamation-triangle-fill"></i> {props.note}</>}</span>
        {props.wordCount && <span className='word-count'>{wordCount} / {props.wordsAllowed}</span>}
      </div>
    </div>
  )
};

export const PhoneInputCustom = (props: inputType) => {
  const [number, setNumber] = useState<any>();
  useEffect(() => {
    if(props.defaultValue != "" && props.defaultValue != undefined) {
      setNumber(props.defaultValue);
    }
  }, [])

  useEffect(() => {
    if(props.changeValue) {
      props.changeValue({[props.name]: number});
    }
  }, [number])

  // const CustomInputComponent = React.forwardRef((props, ref:any) => {
  //   // Customize the input component as needed
  //   return <input {...props} onKeyDown={submit}/>;
  // });

  // const submit = (e: any) => {
  //   //e.preventDefault();
  // }

  const handleKeyPress = (event: any) => {
    console.log(event);
    // Prevent Enter key from triggering form submission
    // if (event.key === 'Enter') {
    //   event.preventDefault();
    // }
  };



  return (
    <div className="field-container-comp-input">
      <label className="form-label">{props.label}</label>
      <PhoneInput defaultCountry="CA" placeholder={props.placeholder} value={props.value} className={props.error === props.name ? "error-phoneNumber phoneContainer" : "phoneContainer"} onChange={setNumber}/>
      <span className={props.error === props.name ? "note-small-text error-text" : "note-small-text"}>{props.error === props.name && props.note && <><i className="bi bi-exclamation-triangle-fill"></i> {props.note} </>}</span>
    </div>
  )
}


// export const TextInput = React.forwardRef<HTMLInputElement, inputType>((props, ref) => {
//   return (
//     <div className='mb-3'>
//       <label htmlFor={props.name} className="form-label">{props.label}</label>
//       <input name={props.name} id={props.name} ref={ref} placeholder={props.placeholder} required={props.required} type={props.type} className='form-control'/>
//     </div>
//   )
// });