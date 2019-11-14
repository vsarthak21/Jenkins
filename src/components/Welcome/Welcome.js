import React from 'react'
import { Row, Col } from 'react-bootstrap';
import classes from './../Welcome/Welcome.module.css'
import logOut from '../../assets/images/logOut.svg'
import LogOut from '../LogOut/LogOut';
import Tooltip from 'react-tooltip-lite'
import litral from '../../litral/litral'
import ConfirmationModal from '../../UIComponent/ConfirmationModal/ConfirmationModal'

const welcome = (props) =>{
    return <div >
        
        <ConfirmationModal message={litral.logoutText} showModal={props.modalVisible} onClick={props.close} onHide={props.close} />
        <ConfirmationModal modalFooter="dualButton" message={litral.saveConfirmation} showModal={props.showSaveConfirmationModal} onClick={props.persistDataAndLogout} onHide={props.logout} />
    
   
    <div className={classes.Welcome} >
        <span > {props.userName ? <div className="mr-3">Welcome {props.userName}</div> :''}</span>
        {props.userName? <u><Tooltip content={litral.helpTextForLogout} distance={10}  direction="up" hoverDelay={400} ><a href="#" onClick={props.processLogout} >log out</a> </Tooltip></u>:''}
     </div>
    </div>
} 

export default welcome;