import React from 'react'
// import "./styles.css";
import "./styles.css"

const WebButton = (props) => {
  return (
    <button className={props?.className} type={props?.type} onClick={props?.onClick}><>{props?.text}</></button>
  )
}

export default WebButton
