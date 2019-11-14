import React,{Component} from 'react'
import classes from './Button.module.css';
import {Button} from 'react-bootstrap' 
import classNames from 'classnames'


const CustomeButton =  (props)=>{
  return(
  <Button onClick={props.onClick} className={classNames(classes.buttonPadding,props.data.className,props.floatRight,(!props.disabled|| !props.data.disabled) && 
    (props.data.buttonText=="Next" || props.data.buttonText=="Submit" || props.data.buttonText=="Search" || props.data.buttonText=="Home" || props.data.buttonText.includes("Continue") )? classes.buttonColor1: classes.marginLeft )} 
  style={{width:props.width,borderStyle:'none',backgroundColor:props.disabled||props.data.disabled?'#b5b3b3':'',margin:props.margin}} tabIndex={props.data.tabindex}  
  variant={props.data.variant} size={props.data.size} type={props.data.type} disabled={props.disabled?props.disabled:props.data.disabled} autoFocus={props.data.autoFocus}> {props.data.buttonText}</Button> 
  )
}

export default CustomeButton;