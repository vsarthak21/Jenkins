import React ,{Component} from 'react'
import ButtonPanel from '../../UIComponent/ButtonPanel/ButtonPanel';
import litral from '../../litral/litral';
import {Modal,Form,Alert,Row,Col} from 'react-bootstrap'
import close from '../../assets/images/close.png'
import classes from './LogOut.module.css'
import { BrowserRouter as Router, Route,Switch, Redirect} from 'react-router-dom'

class LogOut extends Component{
    constructor(props){
        super(props)
    }
    render(){

        return <Modal onHide={this.props.close}  show={this.props.modalVisible} size="xs">
           
           <div className="p-2">
           <span className={classes.topRight} onClick={this.props.close}>
                Close<img src={close}  className={classes.imageStyle} alt="Sopra Steria"></img>
              </span>  
                <Col md={11}>Are you sure that you want to exit the Engagement Complexity Tool?</Col> 
                <ButtonPanel Buttondata={litral.logOutButton} buttonFunction={this.props.buttonFunction} ></ButtonPanel>
            
            </div> 
         
        </Modal>

    }
}

export default LogOut;