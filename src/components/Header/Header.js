import React from 'react'
import {Row, Col } from 'react-bootstrap';
import classes from './Header.module.css'
import Logo from './../Logo/Logo';
import Welcome from './../Welcome/Welcome';



const header = (props) => {
     
    return(
        <div>
    <Row className={classes.Header}>
        <Col className={classes.HeaderText}>Engagement Complexity Tool</Col>

        <Col md={3} className={classes.Welcome}>{ props ? <Welcome showSaveConfirmationModal={props.showSaveConfirmationModal} userName={props?props.name:''} openModal={props.openModal}  
        modalVisible={props.modalVisible} onBackDropClicked={props.onBackDropClicked} close={props.close} buttonFunction={props.buttonFunction} logout={props.logout}
        openSaveConfirmationModal={props.openSaveConfirmationModal}
        closeSaveConfirmationModal={props.closeSaveConfirmationModal}
        showSaveConfirmationModal={props.showSaveConfirmationModal}
        persistDataAndLogout={props.persistDataAndLogout}
        processLogout={props.processLogout}/> : ''}</Col> 
        
    </Row>
    <Row>
    {props.showMar ==="true" ? <marquee width="100%" style={{padding :"0px"}} bgcolor = "crimson" color = "white"><span style={{color:"white"}}>This is the Engagement Complexity Tool PRE-PRODUCTION Environment – this a controlled TEST environment</span></marquee> : null}

    </Row>
    </div>
)
}
export default header;