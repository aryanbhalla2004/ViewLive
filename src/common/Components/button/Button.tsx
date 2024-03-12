import React from 'react'
import "./style.css";

interface props {
  text: string,
  loading: boolean,
  type?: any
  onClick?: () => void,
  checked?: boolean
}

export const Button = (props: props) => {
  return (
    <button type={props.type === "" ? "submit" : props.type} onClick={props.onClick} className="btn btn-primary mb-3"  disabled={props.loading ? true : false}>{props.loading ? <span className="loader"></span> : props.text}</button>
  )
}

export const GhostButton = (props: props) => {
  return (
    <button type={props.type === "" ? "submit" : props.type} onClick={props.onClick} className="btn btn-ghost mb-3" disabled={props.loading ? true : false}>{props.loading ? <span className="loader"></span> : props.text}</button>
  )
}

export const ToggleButton = (props: props) => {
  return (
    <div className="check-box">
      <input type="checkbox" checked={props.checked} onClick={props.onClick} />
    </div>
  )
}