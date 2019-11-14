import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import litral from '../../litral/litral'
import classes from './OpportunitySearch.module.css'
import { Form, Modal, Row, Col, Button } from 'react-bootstrap';
import AutoSuggest from '../Suggestion/Suggestion'
import TitleBar from '../TitleBar/TitleBar'
import SearchModal from '../SearchModal/SearchModal'
import SelectBox from '../../UIComponent/SelectBox/SelectBox'
import classNames from 'classnames';
import ButtonPanel from '../../UIComponent/ButtonPanel/ButtonPanel'
import { oppSerch } from "../../store/Action/OpportunitySerchAction";
import { onEditInspection } from '../../store/Action/LoginAction'
import { axiosInstance } from '../../AxiosHandler';
import { showSpinner } from '../../HelperFunctions';
import Tooltip from 'react-tooltip-lite';
import ConfirmationModal from '../../UIComponent/ConfirmationModal/ConfirmationModal'
import LoadingOverlay from 'react-loading-overlay';

class Opportunitysearch extends Component {
    constructor(props) {
        super(props);
        const { OPPORTUNITY ,CREATEASSESSEMENT} = this.props.opportunity
        const { nickName, assessmentGateId, assessmentGateName, occodRefNumber, opportunityName, isFastTrack,selectedOperation } = OPPORTUNITY ? OPPORTUNITY : ""
        const {isFastrack}=CREATEASSESSEMENT?CREATEASSESSEMENT:1
        this.child = React.createRef();
        this.state = {
            occodRefNumber: occodRefNumber,
            isAssessmentWithOppExist:false,
            opportunityName: opportunityName,
            nickName: nickName,
            assessmentGateId: assessmentGateId,
            assessmentGateName: assessmentGateName,
            changeAssessmentGateId:assessmentGateId,
            sector: '',
            account: '',
            modalVisible: false,
            tabledataDesplay: false,
            data: [],
            assessmentGate: [],
            typeOfStassesment: "",
            tabledata: { theader: ["Opportunity name", "Account", "Primary horizontal", "Owner", "Sales stage", ""], tbody: [] },
            opportnityId: [],
            isOppEditable: occodRefNumber ? false : true,
            isNicknameEditable: nickName ? false : true,
            confirmationModalVisible: false,
            assessementGetIdChange:false,
            fastTrackNotSaved:false,
            isTrialMode: false,
            showTrialMessage: false,
            autoSuggest: true,
            isFastTrack: isFastrack?isFastrack:isFastTrack,
            getaccounts: [],
            getsectors: [],
            loading: false,
            showModalForExistingOpp : false,
            showMessage: false,
            trialMessege315A : false,
            labelError: false
        }
        this.openModal = this.openModal.bind(this);
     
    }
    componentWillMount() {

    }
    componentWillUnmount() {
        if(this.props.saveDataOnLogout() ){
            const isTrial = this.props.oppSerch.OPPORTUNITY!=undefined ? this.props.oppSerch.OPPORTUNITY.selectedOperation === 'trial' : false;
            const {CREATEASSESSEMENT,FASTTRACK,OPPORTUNITY} = this.props.opportunity
            const data = CREATEASSESSEMENT
            if(!data.nickName && this.state.nickName){
                data.nickName = this.state.nickName
            }
            const {selectedOperation} = OPPORTUNITY
            const {isFastrack} = CREATEASSESSEMENT
            const {isFastTrackSaved} = FASTTRACK
            /*
                Checks if user have clicked next and opportunity for corressponding assessment 
                exist(create journey), in this don't save data when logout is press."isFastrack" will be undefined
                when user lands in this page as a part of create journey.

                selectedOperation=='create' && !isFastrack=='0' && !isFastTrackSaved : to check if user have reached to Fastrack Moderation Page in create journey,
                                                                                        in that case we need to save assessement otherwise we don't
            */
            if(!(isFastrack===undefined) && data && !isTrial && !(selectedOperation=='create' && !isFastrack=='0' && !isFastTrackSaved)){
                axiosInstance.post('Assessment/Persist', data)
                .then(res => {
                    const data = res.data.data;
                }).catch(error => {
                    console.log(error);
                });
            }                   
        }
        this.props.saveDataOnLogout(false)
        
    }
    
    componentDidMount() {
        this.setState({ loading: true })
        this.getAssessmentGateApi();
        this.getOpportunityNameApi();
        this.getOcodSectors();
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };
       
    }


    getUpdatedNormalComplexity(assessmentId){
            axiosInstance.get(`Assessment/GetById/${assessmentId}`)
            .then(res => {
                const data =res.data.data;
                let {opportunityId,nickName,isFastrack,gateId,completedBy,calculatedComplexity,moderatedComplexity,moderationReason,status,remarks,createdBy,modifiedBy,
                    isActive,tblAssessmentEntries} = data ;
                     tblAssessmentEntries= tblAssessmentEntries.map((x)=>{
                        delete x.id;
                        delete x.assessmentId;
                        return   x ;
                    })
               this.props.onEditInspection({
                opportunityId,nickName,isFastrack,gateId,completedBy,calculatedComplexity,moderatedComplexity,moderationReason,status:0,remarks,createdBy,modifiedBy,
                isActive,tblAssessmentEntries
               })

                this.setState({loading:false})
            }).catch(error => {
                console.log(error);
                this.setState({loading:false})
            });
       }



    getAssessmentData(id) {
        let getSelectedData = []
        getSelectedData = this.state.data.filter((res) => {
            return res.rowId == id
        })
        const { rowId, opportunityName } = getSelectedData.length > 0 ? getSelectedData[0] : ''
        this.setState({
            occodRefNumber: rowId,
            opportunityName: opportunityName,
        })

        this.props.oppSerch({
            occodRefNumber: rowId,
            opportunityName: opportunityName,
        });
    }
    getAssessmentGateApi() {
        const {OPPORTUNITY,CREATEASSESSEMENT}=this.props.opportunity
        const {selectedOperation,occodRefNumber,assessmentId} =OPPORTUNITY?OPPORTUNITY:''

        axiosInstance.get('AssessmentGate/GetAllGates')
            .then(res => {
                const data = res.data;
                this.setState({ assessmentGate: data.data.map((gate) => { return { 'name': gate.gateName, 'id': gate.gateId } }) });
                if (this.state.assessmentGateName) {
                    const data = this.state.assessmentGate.filter((gate) => gate.name == this.state.assessmentGateName)
                    const { id } = data ? data[0] : ''
                    this.setState({ assessmentGateId: id,changeAssessmentGateId:id })
                } else if(this.state.assessmentGateId) {
                    const data = this.state.assessmentGate.filter((gate) => gate.id == this.state.assessmentGateId)
                    const { name } = data ? data[0] : ''
                    this.setState({ assessmentGateName: name })
                }

                this.state.assessmentGateId ? this.state.assessmentGate = this.state.assessmentGate.filter((res) => {
                    return res.id >= this.state.assessmentGateId
                }) : console.log()
                console.log("138"+assessmentId)
                if(assessmentId){
                    if(!CREATEASSESSEMENT){
                        this.getUpdatedNormalComplexity(assessmentId)
                    }else{
                        let {opportunityId,nickName,isFastrack,gateId,completedBy,calculatedComplexity,moderatedComplexity,moderationReason,status,remarks,createdBy,modifiedBy,
                            isActive,tblAssessmentEntries} = CREATEASSESSEMENT ;
                            this.props.onEditInspection({
                                opportunityId,nickName,isFastrack,gateId,completedBy,calculatedComplexity,moderatedComplexity,moderationReason,status:0,remarks,createdBy,modifiedBy,
                                isActive,tblAssessmentEntries
                            })
                    }
                }
                this.setState({ loading: false })
            }).catch(error => {
                //alert("Assessment Gate loading error !\nPlease go back and try again.")
                console.log(error);
                this.setState({ loading: false, labelError: true })
            });
    }

    getOpportunityNameApi() {
        axiosInstance.get('OCOD/GetOpenOpportunities')
            .then(res => {
                const data = res.data.data;
                this.state.data = data;
                this.setState({ ...data })
                this.setState({ loading: false })
            }).catch(error => {
                console.log(error);
                this.setState({ loading: false })
            });
    }

    getOcodSectors = () => {
        axiosInstance.get('OCOD/GetOcodSectors')
            .then(res => {
                const sectors = res.data.data;
                this.state.getsectors = sectors;
                this.setState({ loading: false })
              
            }).catch(error => {
                console.log(error);
                this.setState({ loading: false })
            });
    }

    getId = (id, e) => {
        // this.child.current.setStateData()
        this.getAssessmentData(id)
        this.close();
    }



    openModal() {
        const modalVisible = !this.state.modalVisible;
        const autoSuggest = !this.state.autoSuggest
        this.setState({ modalVisible, autoSuggest, sector: '', account: '', getaccounts: [] });
    }

    openConfirmationModal = () => {
        this.setState({ confirmationModalVisible: !this.state.confirmationModalVisible })
    }

    closeConfirmationModal = () => {
        this.setState({ confirmationModalVisible: false })
        this.setState({ showTrialMessage: false })
    }
    
    closeFastTrackNotSavedModal = () => {
        this.setState({ fastTrackNotSaved: false })
    }

    closeModalForExistingOpp= () =>{
        this.setState({showModalForExistingOpp:false})
    }

    backToAssessmentFromConfirmationModal = (e) => {
        this.closeConfirmationModal();
        this.props.history.push('/Assessment')
    }



    persistData = () => {
        const isTrial = this.props.opportunity.OPPORTUNITY ? this.props.opportunity.OPPORTUNITY.selectedOperation === 'trial' : false;
        const { occodRefNumber, nickName, assessmentGateId } = this.state;
        const {CREATEASSESSEMENT} = this.props.opportunity
        const data = CREATEASSESSEMENT
        if(!data.nickName && this.state.nickName){
            data.nickName = this.state.nickName
        }
        data && !isTrial ? this.creatAssessement(data) : this.backToAssessmentFromConfirmationModal()
            
    }

    creatAssessement(data) {
        axiosInstance.post('Assessment/Persist', data)
            .then(res => {
                const data = res.data.data;
                this.backToAssessmentFromConfirmationModal()
            }).catch(error => {
                console.log(error);
            });
    }

    close = () => {
        const autoSuggest = !this.state.autoSuggest
        const modalVisible = !this.state.modalVisible;
        this.setState(prevState => ({
            tabledata: {
                ...prevState.tabledata,
                tbody: []
            },
            modalVisible,
            autoSuggest
        }),
        this.setState({
            showMessage: false
        }))
    }
  
    
    onBackDropClicked(){
      //this.close.bind(this)

    }

    checkIfOpportunityExistsAlready = ()=>{
        
        this.setState({loading:true})
        const{OPPORTUNITY} = this.props.opportunity
        const {isFastTrack,occodRefNumber } = OPPORTUNITY
        let opportunityId = this.state.occodRefNumber;
        let gateId = this.state.changeAssessmentGateId;
        axiosInstance.get(`Assessment/${opportunityId}/${gateId}`)
        .then(res => {
            this.setState({loading:false})
            
            if(res.data.data.isActive===1)
            {
                this.setState({showModalForExistingOpp:true})
                this.setState({isAssessmentWithOppExist:true}); 
            }
            else{
                if(isFastTrack==0 && occodRefNumber==opportunityId){
                    this.setState({isAssessmentWithOppExist:false}); 
                    this.props.history.push('/Normal')
                }else{
                    this.setState({isAssessmentWithOppExist:false}); 
                    this.props.history.push('/FastTrack')
                }

            }
            
        }).catch(error => {
            console.log(error);
            this.setState({loading:false})
            if(isFastTrack==0 && occodRefNumber==opportunityId){
                this.props.history.push('/Normal')
            }else{
                this.props.history.push('/FastTrack')
            }
        });    
    }

    nextButton() {
        const { OPPORTUNITY } = this.props.opportunity
        const { isFastTrack,selectedOperation } = OPPORTUNITY ? OPPORTUNITY : ""
        switch (selectedOperation) {
            case "create":  {
                this.checkIfOpportunityExistsAlready()

                break;
            }
            case "update":{
                if(this.state.assessmentGateId !== this.state.changeAssessmentGateId){
                  this.setState({assessementGetIdChange:!this.state.assessementGetIdChange})

                }
                  else
                  isFastTrack == 1 ? this.props.history.push('/FastTrack') : this.props.history.push('/Normal');
                break;
            }
            default: isFastTrack == 1 ? this.props.history.push('/FastTrack') : this.props.history.push('/Normal');
        }

    }

    

    backButton() {
        const {CREATEASSESSEMENT,FASTTRACK,OPPORTUNITY} = this.props.opportunity
        const {isFastTrackSaved} = FASTTRACK
        const {isFastrack} = CREATEASSESSEMENT
        const {selectedOperation} = OPPORTUNITY
        const data = CREATEASSESSEMENT
        const isTrial = this.props.opportunity.OPPORTUNITY ? this.props.opportunity.OPPORTUNITY.selectedOperation === 'trial' : false;
        //data && !isTrial ? this.openConfirmationModal() : this.backToAssessmentFromConfirmationModal()
        
        if(isTrial){
            this.setState({
                trialMessege315A : true
            })
            // this.backToAssessmentFromConfirmationModal()
        }else{
            if(selectedOperation=='create' && !isFastrack=='0' && !isFastTrackSaved){
                this.setState({fastTrackNotSaved:true})
            }else if(data && !this.state.isAssessmentWithOppExist && this.props.getAndSetIsDirty()){
                this.openConfirmationModal()
            }else{
                this.backToAssessmentFromConfirmationModal()
            }
        }
        
    }
    suggestionsOccod = []; suggestionsOpport = []

    getOCODRefNumber(suggestion) {
        this.setState({ occodRefNumber: suggestion })


    }

    getOpportunityName(suggestion) {
        this.setState({ opportunityName: suggestion })


    }


    getNickName = (event) => {
        const data = event.target.value
            //data save confirmation on logout changes
        let isTrial = false
        let selectedOperation
        if(this.props.opportunity.OPPORTUNITY ){
            selectedOperation = this.props.opportunity.OPPORTUNITY.selectedOperation;
            isTrial = this.props.opportunity.OPPORTUNITY.selectedOperation === 'trial';
        }
        if(data!=='' && isTrial===false && selectedOperation==='update' ){
                this.props.getAndSetIsDirty(true);
        }
        this.setState({ nickName: data })
    }

    getAssessmentGate = (value) => {
        const data = value.target.value
        const getSelectedData = this.state.assessmentGate.filter((res) => {
            return res.id == data
        })
        const { id, name } = getSelectedData ? getSelectedData[0] : ''

        if(this.state.assessmentGateId)
           { 

            this.setState({ changeAssessmentGateId: id,assessmentGateName:name});
           }
        else{
            this.setState({ assessmentGateId: id, changeAssessmentGateId: id,assessmentGateName:name});
        }

        //data save confirmation on logout changes
        let isTrial = false
        let selectedOperation
        if(this.props.opportunity.OPPORTUNITY ){
            selectedOperation = this.props.opportunity.OPPORTUNITY.selectedOperation;
            isTrial = this.props.opportunity.OPPORTUNITY.selectedOperation === 'trial';
        }
        if(isTrial===false && selectedOperation==='update' ){
            this.props.getAndSetIsDirty(true);
        }
        


    }



    submit(e) {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        const isTrial = this.props.opportunity.OPPORTUNITY ? this.props.opportunity.OPPORTUNITY.selectedOperation === 'trial' : false;

        const { occodRefNumber, opportunityName, nickName, assessmentGateId, changeAssessmentGateId, assessmentGateName, sector, account, modalVisible, typeOfStassesment,isFastTrack } = this.state;
        this.props.oppSerch({ occodRefNumber, opportunityName, nickName, assessmentGateId : changeAssessmentGateId, assessmentGateName, sector, account, modalVisible, typeOfStassesment, });
        this.props.onEditInspection({
            opportunityId: occodRefNumber,nickName, gateId: changeAssessmentGateId, isActive: 1, isFastrack: isFastTrack, completedBy: localStorage.getItem('userid'),
            createdBy: localStorage.getItem('userid'),
            modifiedBy: localStorage.getItem('userid'),
            status: 0
        })

        if (!isTrial) {
            this.nextButton()
        }
        else {
            this.setState({ showTrialMessage: true })
        }

    }

    SearchHideData = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.searchDataForSectorAndAccount();
    }

    searchDataForSectorAndAccount = () => {

        const filteredData = this.state.data.filter((res) => {
            if (this.state.sector == '' || this.state.sector === '-1') {
                return res;
            }
            else {
                if (this.state.account === '' || this.state.account === '-1') {
                    return res.sector == this.state.sector;
                }
                else {
                    return res.account === this.state.account && res.sector === this.state.sector
                }
            }
        })

        const tbody = filteredData.map((x) => {
            return { opportunityName: x.opportunityName, Account: x.account, primaryHorizontal: x.primaryHorizontal, ownerFullName: x.ownerFullName, salesStage: x.salesStage, update: 'update' }
        })

        if(tbody.length===0){
            this.setState({
                showMessage: true
            })
        }
        else {
            this.setState({
                showMessage: false
            })
        }

        const opportnityId = filteredData.map((x) => x.rowId)
        this.setState(prevState => ({
            tabledata: {
                ...prevState.tabledata,
                tbody: tbody,
                theader: ["Opportunity name", "Account", "Primary horizontal", "Owner", "Sales stage", ""]
            },
            opportnityId: [...opportnityId, opportnityId]
        }))
    }



    handleChange(res, event) {

        const sec = event.target.value;
        switch (res) {
            case 'sector':
                this.setState({
                    sector: sec !== '-1' ? sec : '',
                    getaccounts: [],
                    account: '',
                })

                if (sec !== '-1') {
                    this.setState({ loading: true })
                    this.getAccountsForSelectedSector(sec);
                }
                else
                    this.setState({ loading: false })
                break;
            case 'account':
                this.setState({
                    account: sec
                })

                break;
        }

    }

    getAccountsForSelectedSector = (sec) => {

        axiosInstance.get(`OCOD/GetOcodAccounts/${sec}`)
            .then(res => {
                const accounts = res.data.data;
                this.state.getaccounts = accounts;
                this.setState({ loading: false })
            }).catch(error => {
                console.log(error);
                this.setState({ loading: false })
            });
    }

    getOcodData() {
        return this.state.data;
    }
    buttonFunction = [
        this.backButton.bind(this),
        this.submit.bind(this)
    ]
    buttonFunctionforClose = [this.close.bind(this)]

    checkIfNextButtonDisabled = () => {

        const data = this.getOcodData()
        if (data && data.length>0) {
            
            let validOpp = this.state.opportunityName?
                                    data.filter(lang =>
                                        lang['opportunityName'].toLowerCase() === this.state.opportunityName.toLowerCase()
                                    ):null;
            let validRef = this.state.occodRefNumber?
                                   data.filter(lang =>
                                        lang['rowId'].toLowerCase() === this.state.occodRefNumber.toLowerCase()
                                    ):null;
            
            
            const isTrial = this.props.opportunity.OPPORTUNITY ? this.props.opportunity.OPPORTUNITY.selectedOperation === 'trial' : false;
            let returnValue = (this.state.changeAssessmentGateId && this.state.occodRefNumber && this.state.opportunityName && validOpp.length>0 && validRef.length>0) || isTrial ? false : true;
            
            return returnValue

        } else 
        {
          
            return true;
        }
    }
    updateState=()=> this.setState({assessmentGateId:this.state.changeAssessmentGateId})
    updateGetId(){
            this.props.oppSerch({assessmentGateId:this.state.changeAssessmentGateId});
            this.props.onEditInspection({
                 gateId: this.state.changeAssessmentGateId
            })

        
    }
    goWithFastORNormal=()=>{
        const { OPPORTUNITY } = this.props.opportunity
        const { isFastTrack } = OPPORTUNITY ? OPPORTUNITY : ""
       this.updateGetId(this.updateState())
       isFastTrack == 1 ? this.props.history.push('/FastTrack') : this.props.history.push('/Normal');
    }

    hideAssessementGetChange=()=>{

        const getSelectedData = this.state.assessmentGate.filter((res) => {
            return res.id == this.state.assessmentGateId
        })
        const { id, name } = getSelectedData ? getSelectedData[0] : ''
        this.setState({ assessmentGateId:id,changeAssessmentGateId:id,assessmentGateName:name,assessementGetIdChange:false});

    }

    render() {
        const { nickName, assessmentGateId, occodRefNumber, opportunityName, assessmentGateName } = this.state;
        let selectedOption = assessmentGateName ? assessmentGateName : this.props.opportunity.OPPORTUNITY
        const isTrial = this.props.opportunity.OPPORTUNITY ? this.props.opportunity.OPPORTUNITY.selectedOperation === 'trial' : false;
        const isDisabled = this.checkIfNextButtonDisabled()
        let addDefaultOptionInGate = this.state.assessmentGateId?true:false;
        const helpTextForOcodRef = <p>The complexity assessment needs to be created for a valid opportunity within OCOD.<br/>Please enter a valid OCOD reference here, or enter an Opportunity name.<br/> <b>Hint:</b>You can also use the Search for opportunity button.</p>
        const helpTextForOppName= <p>The complexity assessment needs to be created for a valid opportunity within OCOD.<br/>Please enter a valid Opportunity name here, or enter an OCOD reference.<br/> <b>Hint:</b> You can also use the Search for opportunity button.</p>
    
       
        return (

            <div>
                {showSpinner(this.state.loading)}
                <Modal onHide={this.onBackDropClicked.bind(this)} show={this.state.modalVisible} size="xl">
                    <LoadingOverlay active={this.state.loading && this.state.modalVisible} spinner text='Getting data...' >
                        <SearchModal data={this.state.data} Buttondata={[litral.serchButton]} tabledata={this.state.tabledata ? this.state.tabledata : litral.opportunitySertchTable}
                            header="Search Opportunities" close={this.close} buttonFunction={this.buttonFunctionforClose}
                            accounts={this.state.getaccounts} sectors={this.state.getsectors}
                            SearchHideData={this.SearchHideData} handleChange={this.handleChange.bind(this)} serchButton2={litral.serchButton2} getId={this.getId}
                            findAnOpportunity={this.state.showMessage?litral.findAnOpportunityMessage:litral.findAnOpportunity}  opportnityId={this.state.opportnityId} isAccountDisabled={this.state.sector === '' || this.state.sector === '-1'} id="searchOpportunities"/>
                    </LoadingOverlay>
                </Modal>
                <ConfirmationModal modalFooter="singleButton" message={litral.trialMessege315A} showModal={this.state.trialMessege315A} onClick={() => this.props.history.push('/Assessment')} onHide={this.backToAssessmentFromConfirmationModal} />                
                <ConfirmationModal modalFooter="dualButton" message={litral.saveConfirmation} showModal={this.state.confirmationModalVisible} onClick={this.persistData} onHide={this.backToAssessmentFromConfirmationModal} />
                <ConfirmationModal modalFooter="singleButton" formattedMsg={litral.trialMessageForOppSelection} showModal={this.state.showTrialMessage} onClick={() => this.props.history.push('/FastTrack')} onHide={this.closeConfirmationModal} />
                <ConfirmationModal modalFooter="singleButton" message={litral.existingOppMessage} showModal={this.state.showModalForExistingOpp} onClick={() => this.setState({showModalForExistingOpp:false})} onHide={this.closeModalForExistingOpp} />
                <ConfirmationModal modalFooter="dualButton" message={litral.assessementGetIdChange} showModal={this.state.assessementGetIdChange} onClick={this.goWithFastORNormal.bind(this)}  onHide={this.hideAssessementGetChange.bind(this)}/>
                <ConfirmationModal modalFooter="singleButton" message={litral.fastTrackNotSaved} showModal={this.state.fastTrackNotSaved} onClick={() => this.props.history.push('/Assessment')}  onHide={this.closeFastTrackNotSavedModal} />

                <Form noValidate onSubmit={this.submit.bind(this)}>
                    <TitleBar title="Select Opportunity & Gate" id="selectOpportunity"></TitleBar>

                    <Row className="mt-5">

                        <Col className={classes.outerDivWidth}>
                            {this.state.autoSuggest ? <AutoSuggest OcodFocus={true} toolTipOcod={helpTextForOppName} toolTipOpp={helpTextForOcodRef} tabIndex1={1} tabIndex2={2} isRequired={!isTrial} ref={this.child} isEditable={this.props.match.params.type == 'update' ? false : true} showHelp={this.props.match.params.type == 'update' ? false : true} onClick={this.openModal} data={this.getOcodData.bind(this)} occodRefNumber={occodRefNumber} opportunityName={opportunityName}
                                getOpportunityName={this.getOpportunityName.bind(this)} getOCODRefNumber={this.getOCODRefNumber.bind(this)}></AutoSuggest> : ''}
                        </Col>
                        <Col md={1} className={classes.notDisplay}></Col>
                        <Col className={classes.outerDivWidth}>
                            <Row className="mb-3">
                                <Col  className={classes.textLeft}>Nickname (optional):</Col>
                                <Col>
                                    <Tooltip content={litral.helpTextForNickname} useHover={this.props.match.params.type == 'update' ? this.state.isNicknameEditable : true} distance={10} direction="up" hoverDelay={400} >
                                        <input tabIndex={3} className={classNames(classes.input_box, 'col-md-12')} maxLength="30" size="30" onBlur={this.getNickName} defaultValue={nickName} disabled={this.props.match.params.type == 'update' ? !this.state.isNicknameEditable : false} type="text" />
                                    </Tooltip>
                                </Col>
                            </Row>
                            <Row className="pt-3">
                                <Col className={classes.textLeft}>Next assessment gate:</Col>
                                <Col>

                                    <SelectBox  doNotAddDefault={addDefaultOptionInGate} preventSorting={true} showHelp={true} tabIndex={5} name="Assessment Gate" optiondata={this.state.assessmentGate} size={12} handleChange={this.getAssessmentGate} selectedOption={selectedOption}></SelectBox>
                                    <label className={classes.errorLabel}>{this.state.labelError ? litral.networkError : ''}</label> 
                                </Col>
                            </Row>
                        </Col>
                        <Col md={1}></Col>

                    </Row>
                    <ButtonPanel Buttondata={litral.nextAndBackButton} disabled={isDisabled} buttonFunction={this.buttonFunction} className={classes.buttonPanelWidth} style={{width:'62%'}}></ButtonPanel>
                </Form>
            </div>
        )

    }


}
const mapStateToProps = state => {
    return { opportunity: state.oppSerch };
};
const mapDispatchToProps = dispatch => {
    return {
        oppSerch: data => dispatch(oppSerch(data)),
        onEditInspection: data => dispatch(onEditInspection(data))

    };
};

const Opportunity = connect(mapStateToProps, mapDispatchToProps)(Opportunitysearch);

Opportunitysearch.propTypes = {
    oppSerch: PropTypes.func.isRequired
};

export default Opportunity;