import React, { Component } from 'react';
import { Row, Col, Form, Modal, Button } from 'react-bootstrap';
import './Factory.module.css';
import classes from './Factory.module.css';
import TextArea from '../../UIComponent/TextArea/TextArea';
import CustomeButton from '../../UIComponent/Button/CustomeButton'
import close from '../../assets/images/close.png'
import Tooltip from 'react-tooltip-lite';
import litral from '../../litral/litral';
import ConfirmationModal from '../../UIComponent/ConfirmationModal/ConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";


class Factory extends Component {
    updateSubfactor = [{ name: '', score: '' }]
    constructor(props) {
        super(props)

        const { inputAndTexDta, updateData, data } = this.props
        const { selectBox, Remark } = inputAndTexDta ? inputAndTexDta : ''
        const { remark, uwComplexityScore } = updateData ? updateData : ''
        const { complexityScore } = data ? data : []

        this.updateSubfactor = uwComplexityScore ? complexityScore.filter((res) => { return res.score == uwComplexityScore }) : this.updateSubfactor
        const { name, score } = this.updateSubfactor ? this.updateSubfactor[0] : ''

        this.state = {

            medium: selectBox ? selectBox : name,
            text: Remark ? Remark : remark,
            modalVisible: false,
            score: score ? score : Number,
            showFullDesc:false
            // cls:""
        }

        this.openModal = this.openModal.bind(this);

    }
    handleChange = (res, score1, event) => {

        const { inputTex, data, index, length } = this.props;
        inputTex(data.id, score1, data.impactDetails.score, index, length, res, data.name, 'SelectBox')
        this.setState({ medium: res, score: score1 });
        
        //data save confirmation on logout changes
        this.props.getAndSetIsDirty(true);
        
        this.close()
    }

    openModal() {

        const modalVisible = !this.state.modalVisible;
        this.setState({
            modalVisible
        });
    }

    close() {

        const modalVisible = !this.state.modalVisible;
        this.setState({
            modalVisible
        });
    }

    onBackDropClicked() {

        const modalVisible = !this.state.modalVisible;
        this.setState({
            modalVisible
        });
    }

    // changeClass(){
    //     this.setState({
    //         cls:
    //     })
    // }

    toggleDesc(){
        this.setState({
            showFullDesc : !this.state.showFullDesc
        })
    }

    ceratModalData() {

        const factory = this.props.data.complexityScore.map((x, index) => {
            return <Button variant="outline-secondary" key={index} className={classes.buttonStyle} onClick={this.handleChange.bind(this, x.name, x.score)}>
                <Row className="p-2" >
                    <Col md={2}>{x.name} </Col>
                    <Col md={10}>{x.description}</Col>
                </Row>
            </Button>

        })

        return <div className={'p-2'}>
            <span><b> {this.props.data.name}</b> </span><label> &nbsp; Please select one  &nbsp;</label> <label style={{ float: "right" }} onClick={this.close.bind(this)}>
                <img src={close} className={classes.imageStyle} alt="Sopra Steria" /></label>
            {factory}
        </div>
    }

    render() {

        const { inputTex, data, index, length } = this.props;
        const ceratModalData = <div className="p-3">{this.ceratModalData()}</div>
        var colorCls = ""
        switch (this.state.medium) {
            case "Low":
               colorCls = classes.Low
                break;
            case "Moderate":
               colorCls = classes.Moderate
                break;
            case "High":
                colorCls = classes.High
                break;
            case "Very High":
                colorCls = classes.VeryHigh
                break;
            default:
                break;
        }
        return (
            <div className="mb-3">
                <Modal onHide={this.onBackDropClicked.bind(this)} id={index} show={this.state.modalVisible} size="xl">{ceratModalData}</Modal>
                <Col >
                    {/* <Tooltip content={data.description} distance={0}  direction="down" hoverDelay={400} background="black" color="aliceblue" width="300px">   </Tooltip> */}
                    <Row>
                        <Col md={2}><b className="float-left">{data.name}  </b> </Col>
                        <Col md={3}>  ( Impact: {data.impactDetails.name} ) </Col>
                        <Col></Col>
                    </Row>

                    <Row>
                        <Col md={2}>{litral.complexityScore}</Col>
                        <Col md={2} >
                            {/* onChange={this.changeClass.bind(this)} */}
                            {/* <input type="text"  className="form-control" placeholder="Press Select"  value={}   required ></input> */}
                            <span className={colorCls}><b>{this.state.medium ? this.state.medium : ""}</b></span>
                        </Col>
                        {/* <Tooltip content={litral.selectText} distance={10} direction="up" hoverDelay={400}> */}
                        <Col> 
                            <Row>
                                <Col md={1}>
                                    <CustomeButton key={index} onClick={this.openModal} data={{variant:'secondary',size:'md',buttonText:'Select',type:'button'}} />
                                </Col>

                                <Col md={1}>
                                    <div><FontAwesomeIcon className={classes.questbtn} icon={faQuestionCircle} transform='down-3 grow-15' onClick={this.toggleDesc.bind(this)} /></div>
                                </Col>
                            </Row>

                        </Col>
                        {/* </Tooltip> */}
                    </Row>


                    <Row>
                        <Col md={2}>{litral.complexityRationle}</Col>
                        <Col md={4} className="mt-1">
                            <div style={{ height: '30vh' }}>
                                <TextArea maxLength="400" disabled={this.state.medium ? false : true} onChange={inputTex.bind(this, data.id, this.state.score, data.impactDetails.score, index, length,
                                    this.state.medium, data.name)} text={this.state.text} cols='80' rows='5'> </TextArea>
                            </div>
                        </Col>
                        <Col className="mt-1">
                            {/* <TextArea maxLength="200"  text={data.description} disabled={true}  cols='80' rows='5'> </TextArea> */}
                            <div className={classes.textStyle}>{data.shortDesc}</div>
                            <ConfirmationModal modalClass = {true} modalFooter="singleButton" rawTextInTextarea={data.description} showModal={this.state.showFullDesc} onClick={()=>{this.setState({showFullDesc:false})}} onHide={()=>{this.setState({showFullDesc:false})}} />
                            
                        </Col>
                    </Row>
                </Col>
            </div>
        )
    }

}
export default Factory