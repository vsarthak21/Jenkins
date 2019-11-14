import React, { Component } from 'react'
import { Form, Alert } from 'react-bootstrap';
import classes from './FastTrack.module.css'
import litral from '../../litral/litral'
import ToolBarContainer from '../ToolBar/ToolBar'
import TitleBar from '../TitleBar/TitleBar'
import ButtonPanel from '../../UIComponent/ButtonPanel/ButtonPanel'
import Globle from '../../GlobleCss.module.css'
import { onFastTrack } from "../../store/Action/LoginAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { oppSerch } from "../../store/Action/OpportunitySerchAction";
import { onEditInspection } from '../../store/Action/LoginAction'
import { axiosInstance } from '../../AxiosHandler';
import { showSpinner } from '../../HelperFunctions';
import ConfirmationModal from '../../UIComponent/ConfirmationModal/ConfirmationModal'
import { onNORMAL } from '../../store/Action/LoginAction'
class FastTrack extends Component {
    constructor(props) {
        super(props)
        const { FASTTRACK, OPPORTUNITY } = props.payload
        const { selectedOperation, isFastTrack } = OPPORTUNITY ? OPPORTUNITY : ''
        const { array } = FASTTRACK ? FASTTRACK : []
        this.state = {
            array: array ? array : ['No', 'No', 'No', 'No', 'No', 'No'],
            urlParam: selectedOperation,
            data: [],
            showModal: false,
            loading: false,
            showTrialModal: false,
            isFastTrack: isFastTrack,
            trialMessege504: false,
            trialMessege505: false
        }
        this.props.onEditInspection({
            isFastrack: 1,
            tblAssessmentEntries: []
        })
        this.props.onNORMAL({
            // This will balnk all 14 quesitions in the when user go back after coming to Fastrack(Create Journey) 
            // and change Opputunity Id and then go to Fasttrack>Normal
        })

    }

    componentWillUnmount() {
        if (this.props.saveDataOnLogout()) {
            this.getDataStrore();
        }
        this.props.saveDataOnLogout(false)
    }



    componentDidMount() {
        const { FASTTRACK } = this.props.payload
        const { array, isFastTrackSaved } = FASTTRACK ? FASTTRACK : []
        if (!isFastTrackSaved) {
            this.props.onFastTrack({ isFastTrackSaved: false });
        }
        this.setState({ loading: true })
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };
        this.getFastTrack()
        litral.buttonType2.map((x) => {
            if (this.state.urlParam == "trial" && x.buttonText == 'Save') { x.disabled = true } else {
                x.disabled = false
            }
        })
        litral.buttonType3.map((x) => {
            if (this.state.urlParam == "trial" && x.buttonText == 'Save') { x.disabled = true } else {
                x.disabled = false
            }
        })
        if (this.state.urlParam == "update" && this.state.isFastTrack == 1) {
            this.state.array = array ? array : ['Yes', 'Yes', 'Yes', 'Yes', 'Yes', 'Yes']
        } else { }

    }
    getFastTrack() {
        axiosInstance.get('FastrackQuestions')
            .then(res => {
                const data = res.data.data
                this.state.data = res.data.data;
                this.setState({ ...data })
                this.setState({ loading: false })
            }).catch(error => {
                console.log(error);
                this.setState({ loading: false })
            });
    }
    arryDta = [];
    checkBox(res, groupName) {
        this.arryDta = this.state.array;
        this.arryDta[groupName] = res;
        this.setState({ array: this.arryDta })
        const { array } = this.state;
        this.props.onFastTrack({ array });
    }

    createRadio(groupName, data) {
        const redio = litral.redioButonText.map((x, index) => {
            return (<div key={index} className={classes.RadioButton}> <Form.Check name={groupName} inline label={x} type='radio' defaultChecked={data ? data == x : x == 'No'} onChange={this.checkBox.bind(this, x, groupName)} /></div>)
        })
        return (<div className={classes.RadioButtonContainer}>{redio}</div>)
    }
    ceratFastTrack() {
        const Question = this.state.data.map((q, index) => {
            const createRadio = this.createRadio(index, this.state.array[index])
            return (
                <div key={index} className={classes.ContainerRow}><div className={classes.Question} >{q ? q.question : ''}</div>{createRadio ? createRadio : ''}</div>)
        })
        return (Question)
    }

    getDataStrore() {
        const { CREATEASSESSEMENT } = this.props.payload;
        const { opportunityId, nickName, isFastrack, gateId, completedBy, calculatedComplexity, moderatedComplexity, moderationReason, status, remarks, createdBy, modifiedBy,
            isActive, tblAssessmentEntries } = CREATEASSESSEMENT ? CREATEASSESSEMENT : '';
        const data = { opportunityId, nickName, gateId, isActive, status, isFastrack: isFastrack ? isFastrack : 1, completedBy, createdBy, modifiedBy, moderatedComplexity, moderationReason, remarks };
        data ? this.creatAssessement(data) : console.log()
    }

    creatAssessement(data) {
        axiosInstance.post('Assessment/Persist', data)
            .then(res => {
                const data = res.data.data;
                this.setState({ showTrialModal: true })
                this.props.oppSerch({ assessmentGateId: data.id });
            }).catch(error => {
                console.log(error);
            });
    }

    nextButton(event) {
        const isTrial = this.state.urlParam == "trial" ? true : false;
        console.log(isTrial)
        if (isTrial) {
            event.preventDefault();
            event.stopPropagation();
            this.props.onFastTrack({ isFastTrackSaved: false });
            const result = this.state.array.find((x) => x == 'No')
            result == 'No' ? this.setState({ trialMessege504: true }) :  this.setState({ trialMessege505: true })

        }
        else{
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        this.props.onFastTrack({ isFastTrackSaved: false });
        const result = this.state.array.find((x) => x == 'No')
        result == 'No' ? this.setState({ showModal: true }) : this.props.history.push('/assessmentresult/FastTrack')
        }
    }
    saveButton() {
        this.props.onFastTrack({ isFastTrackSaved: true });
        this.getDataStrore();
    }

    backButton() {
        this.props.history.push(`/opportunitysearch/${this.state.urlParam}`);
    }

    closeModal = () => this.setState({ showModal: false })
    closeTrialModal = () => this.setState({ showTrialModal: false })
    closeTrialModal504 = () => this.setState({ trialMessege504: false })
    closeTrialModal505 = () => this.setState({ trialMessege505: false })


    buttonFunction = [
        this.backButton.bind(this),
        this.nextButton.bind(this),
        //this.saveButton.bind(this)
    ]



    render() {
        const ceratFastTrack = <Form.Group className={classes.ContainerVertical}>{this.ceratFastTrack()}</Form.Group>
        return (
            <div >
                <ConfirmationModal modalFooter="singleButton" message={litral.trialMessege504} showModal={this.state.trialMessege504} onClick={() => this.props.history.push('/Normal')} onHide={this.closeTrialModal504} />
                <ConfirmationModal modalFooter="singleButton" message={litral.trialMessege505} showModal={this.state.trialMessege505} onClick={() => this.props.history.push('/assessmentresult/FastTrack')} onHide={this.closeTrialModal505} />                
                <ConfirmationModal modalFooter="singleButton" message={litral.msgAssesmentNotFasttrack} showModal={this.state.showModal} onClick={() => this.props.history.push('/Normal')} onHide={this.closeModal} />
                <ConfirmationModal modalFooter="singleButton" message={litral.saveConfirmationMessage} showModal={this.state.showTrialModal} onClick={this.closeTrialModal} onHide={this.closeTrialModal} />
                <TitleBar title="“Fast Track” Complexity Assessment" id="fastTrack"></TitleBar>
                <ToolBarContainer type='readonly' redOnlydataForToolBar={litral.redOnlydataForToolBar} />
                <Alert className={Globle.normalText} style={{ padding: '0px 0px', marginLeft: "15px" }}>{litral.fastTrackSubHeader}
                </Alert>
                <Form noValidate className={classes.FastTrack} onSubmit={this.nextButton.bind(this)}>
                    {ceratFastTrack ? ceratFastTrack : ''}
                    <ButtonPanel Buttondata={litral.nextAndBackButton} buttonFunction={this.buttonFunction}></ButtonPanel>
                </Form>
                {showSpinner(this.state.loading)}
            </div>

        )
    }
}

const mapStateToProps = state => {
    return { payload: state.oppSerch };
};

const mapDispatchToProps = dispatch => {
    return {
        onFastTrack: data => dispatch(onFastTrack(data)),
        oppSerch: data => dispatch(oppSerch(data)),
        onEditInspection: data => dispatch(onEditInspection(data)),
        onNORMAL: data => dispatch(onNORMAL(data)),
    };
};

const FastTrackData = connect(mapStateToProps, mapDispatchToProps)(FastTrack);
FastTrack.propTypes = {
    onFastTrack: PropTypes.func.isRequired
};

export default FastTrackData;