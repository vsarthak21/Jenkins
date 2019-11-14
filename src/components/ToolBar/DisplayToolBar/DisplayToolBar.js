
import React from 'react';
import classes from './DisplayToolBar.module.css'
import { Row,Col } from 'react-bootstrap';
import { connect } from "react-redux";
import PropTypes from "prop-types";

const mapStateToProps = state => {
    return { oppSerch: state.oppSerch};
};

const  ToolBarReadOnly = (props)=> {
    const key = Object.keys(props.redOnlydataForToolBar);
   if ('OPPORTUNITY' in props.oppSerch)
    {
        const { opportunityName,nickName,assessmentGateName,occodRefNumber} = props.oppSerch.OPPORTUNITY

        return <div className={classes.Label}>  
                    <Col lg="2">
                        OCOD reference: 
                        <p className={classes.Heading}>{occodRefNumber?occodRefNumber:''}</p>
                    </Col>
                    
                    <Col>
                        Opportunity name: 
                        <p className={classes.Heading}>{opportunityName?opportunityName:''}</p>
                    </Col>
                    
                    <Col lg="2">
                        Nickname: 
                        <p className={classes.Heading}>{nickName?nickName:''}</p>
                    </Col>
                    
                    <Col lg="3">
                        Next assessment gate: 
                        <p className={classes.Heading}>{assessmentGateName?assessmentGateName:''}</p>
                    </Col> 
                </div>
    }
    return <div className={classes.Label}>{key.map((x,index)=>{return <Col key={x}> {x}:{props.redOnlydataForToolBar[x]}</Col>})}</div>
}

const ToolBarreadOnly = connect(mapStateToProps)(ToolBarReadOnly);

ToolBarReadOnly.propTypes = {
    oppSerch: PropTypes.object.isRequired
};

export default ToolBarreadOnly;