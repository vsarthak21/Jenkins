import React , {Component} from 'react';
import {Row,Col,Container} from 'react-bootstrap';
import litral from '../../litral/litral';
import SelectBox from '../../UIComponent/SelectBox/SelectBox';
import classes from './Report.module.css';
import classNames from 'classnames';
import Newtable from '../../UIComponent/newTable/newTable'

import {ContainerRow,RadioButtonContainer,Question,ContainerVertical,FastTrack,RadioButton} from '../FastTrack/FastTrack.module.css';
class Report extends Component {
    constructor(props){
        super(props)
    }
    cerateYes=()=>(<div className={RadioButtonContainer}><div className={RadioButton}>yes</div></div>)

    ceratFastTrack=()=>{
        const cerateYes = this.cerateYes()
        const Question=litral.fastrackQuestion.map((Q,index)=>{
            return (
            <div className={ContainerRow}  key={index}><Container className={Question} style={{fontSize: '14px'}}>{Q}</Container>{cerateYes ? cerateYes: ''}</div>)
        })
        return( <div className={ContainerVertical} >{Question}</div>)

    }

    componentDidMount(){
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };
    }
    handleChange = event => {
        console.log(event)
    };
   
    render(){
        const ceratFastTrack = this.ceratFastTrack()
        return(
            <Container fluid={true}>
            <Row>
                <Col xs={12}><h1>{litral.fastrackHeaderText}</h1></Col>
                <Col style={{textAlign:'center'}}>
                    
                    {/* {ceratFastTrack ? ceratFastTrack :''} */}
                    <Newtable data={litral.pctData}></Newtable>
                </Col>
                <Col className={classes.border}>
                    <Row>
                        <Col md={6} className={classes.boderRight}> {litral.reportBaseOnDataInput}</Col>
                        <Col md={3} className={classes.boderRight}>Low</Col>
                        <Col md={3}>complexity</Col>
                    </Row>
                    <Row className={classes.boderTop}>
                        <Col md={6} className={classes.boderRight}> {litral.reportBaseOnDataInput}</Col>
                        <Col md={3} className={classNames(classes.boderRight,classes.backgroundYellow)}><SelectBox name="data" optiondata={litral.dropdowhdata} size={11}  handleChange={this.handleChange.bind(this)}></SelectBox></Col>
                        <Col md={3}>complexity</Col>
                    </Row>
                    <Row className={classNames(classes.boderTop,classes.textBoxHeight,classes.backgroundYellow)}>
                        <b>{litral.textReport1}</b>
                    </Row>
                    <Row className={classNames(classes.boderTop,classes.textBoxHeight,classes.backgroundYellow)}>
                    <b>{litral.textReport2}</b>
                    </Row>
                </Col>
            </Row>
            </Container>
        )
    }
}
export default Report 