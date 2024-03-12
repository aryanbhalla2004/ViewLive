import React, { useState } from 'react'
import "./style.css";
import { ReactComponent as Logo } from "../../../assets/SVG/heart.svg";
interface prop {
  liked: boolean
}
export const LikedButton = (props: prop) => {
  
  return (
    <div className='like-button'>
      <Logo className={props.liked ? 'home__icon active-liked' : 'home__icon '}/>
    </div>   
  )
}
