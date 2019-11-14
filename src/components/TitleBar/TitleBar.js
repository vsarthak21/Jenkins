import React, {Component} from 'react'
import classes from './TitleBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames';

class  TitleBar extends Component {
    raiseInvoiceClicked=()=>{
        var otherWindow = window.open(window.location.origin + `/ect/Help/${this.props.id}.html`, "ectHelpWindow");
        //otherWindow.opener = null;
    }

    render(){
        return(
            <div >
                <div className={classNames(classes.flexRow,classes.TitleBar)}>
                    <div><h4 style={{ marginLeft: '15px',color:'#191970' }}><b>{this.props.title}</b></h4></div>
                    <div>
                        <span  style={{ marginLeft: '15px' }} >
                            <u><a tabIndex={-1} href="#" onClick={this.raiseInvoiceClicked}><b>Help with this page</b></a></u>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
                 
}

export default TitleBar;