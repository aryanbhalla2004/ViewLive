import React from 'react'
import "./style.css";

interface opt {
  name: string,
  value: number
}

interface prop {
  name: string,
  label: string
  default: string,
  options: opt[],
  changeValue?: (fields: Partial<any>) => void,
}

export const SelectInput = (props: prop) => {

  const changeInput = (e: any) => {
    if(props.changeValue) {
      props.changeValue({[e.target.name]: e.target.value});
    }
  };

  return (
    <div>
      <label htmlFor={props.name} className="form-label">{props.label}</label>
      <select name={props.name} id={props.name} onChange={changeInput} className="select-field">
        {props.options.map(item => (
          <option value={item.value}>{item.name}</option>
        ))}
      </select>
    </div>
  )
}
