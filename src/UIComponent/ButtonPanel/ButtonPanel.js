import React from 'react'
import classes from './ButtonPanel.module.css';
import CustomeButton from '../Button/CustomeButton'

const ButtonPanel = (props) => <div className={classes.buttonpanel}>
{props.Buttondata.map((x,index)=>{return (<CustomeButton floatRight={props.floatRight} key={index} data={x} onClick={props.buttonFunction?props.buttonFunction[index]:()=>{} }
disabled={x.type=='submit'?props.disabled:''}> </CustomeButton>)})}
</div>

export default ButtonPanel;
