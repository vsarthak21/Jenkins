import React, { Component } from 'react'
import {Form, Row, Col,FormControl } from 'react-bootstrap';
import classes from './FastTrackAssessmentResult.module.css'
import CustomeButton from '../../UIComponent/Button/CustomeButton';
import litral from '../../litral/litral'
import ToolBarContainer from '../ToolBar/ToolBar'
import ReactSpeedometer from "react-d3-speedometer";
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import SelectBox from '../../UIComponent/SelectBox/SelectBox';
import TextArea from '../../UIComponent/TextArea/TextArea';
import TitleBar from '../TitleBar/TitleBar'
import Newtable from '../../UIComponent/newTable/newTable'
import ButtonPanel from '../../UIComponent/ButtonPanel/ButtonPanel'
import {connect} from 'react-redux';
import {axiosInstance} from '../../AxiosHandler'
import { oppSerch } from "../../store/Action/OpportunitySerchAction";
import ConfirmationModal from '../../UIComponent/ConfirmationModal/ConfirmationModal'
import { onEditInspection } from '../../store/Action/LoginAction'
import { onFastTrack } from "../../store/Action/LoginAction";
import { tsConstructorType } from '@babel/types';
class  FastTrackAssessmentResult extends React.Component {
    assessmentGate = [{name:'Low',id:1},{name:'Moderate',id:2},{name:'High',id:3},{name:'Very High',id:4}]
    assessmentGateForFastTrack = [{name:'Low',id:1},{name:'Moderate',id:2},{name:'High',id:3}]
    totalComplexity=0
    constructor(props){
        super(props)
        
   
        const {NORMAL,OPPORTUNITY,CREATEASSESSEMENT} = this.props.payload
        const {factors,subFactorName,tblAssessmentEntriesData} = NORMAL?NORMAL:[]
        const {selectedOperation} = OPPORTUNITY?OPPORTUNITY:''
        const {remarks,moderationReason,moderatedComplexity}=CREATEASSESSEMENT?CREATEASSESSEMENT:''
        
        if(selectedOperation=='create'){
            this.props.getAndSetIsDirty(true);
        }
        this.state={
            suggestionTextArea:false,
            level:-1,
            factors:factors?factors:[],
            moderationReason:moderationReason?moderationReason:'',
            remarks:remarks,
            moderatedComplexity:moderatedComplexity?moderatedComplexity:'',
            showTrialModal:false,
            subFactorName:subFactorName?subFactorName:[],
            showTrialModalForSubmission:false,
            selectedOperation:selectedOperation,
            showFailedValidation:false,
            tblAssessmentEntriesData:tblAssessmentEntriesData,
            showAckMsg : false,
            data : "",
            compDic :{
                "1":"Low",
                "2":"Moderate",
                "3":"High",
                "4":"Very High"
            },
            fastToFull : false,
            
        }
        this.state.tblAssessmentEntriesData?this.state.tblAssessmentEntriesData.map((res)=>{
        this.totalComplexity=this.totalComplexity+res.wComplexityScore}):console.log()
       
    }

    componentWillUnmount() {
        if(this.props.saveDataOnLogout()){
            console.log("saving data")
            this.getDataStrore(0)
        }
        this.props.saveDataOnLogout(false)
    }

    ceratFastTrack(){
            const Question=litral.fastrackQuestion.map((Q,index)=>{
            return (
            <div key={index} className={classNames(classes.ContainerRow,classes.AssessmentResult)}><div className={classes.Question} >{Q}</div>
            <div><FontAwesomeIcon   icon={faCheck} style={{ color: 'black' }} transform='down-3 grow-6' /></div>Yes</div>)
        })
        return(Question)
    }

    moderateLevel(e){
        if(!e.target.value || '-1'===e.target.value){
            this.setState({moderationReason:''})
           this.setState({level:-1,suggestionTextArea:false})
           return
        }
        this.setState({level:e.target.value,moderationReason:''})
        //data save confirmation on logout changes
        this.props.getAndSetIsDirty(true)
        
    }
    createGraph=(value,level)=>(
    <ReactSpeedometer
        height={120}
        width={175}
        needleHeightRatio={0.75}
        maxSegmentLabels={0}
        segments={4}
        value={value}
        segmentColors={[
            
            '#138808','yellow',
            '#FF9933',
            '#EF4135'
          ]}
        needleColor="#D8DEE9"
        currentValueText={level}
      />)

   
    nextButton(event){
        event.preventDefault();
        event.stopPropagation();
        
        this.getDataStrore(1)
    }
    componentDidMount(){
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function() {
            window.history.pushState(null, "", window.location.href);
        };
        const {OPPORTUNITY}=this.props.payload
        const {selectedOperation,occodRefNumber,assessmentGateId,assessmentId} =OPPORTUNITY?OPPORTUNITY:''
        selectedOperation=="update"? this.getUpdatedNormalComplexity(assessmentId):console.log()
        if(this.props.match.params.id == 'FastTrack'){
            this.props.onFastTrack({isFastTrackSaved:true});
        }
    }
    getUpdatedNormalComplexity(assessmentId){
        const {NORMAL} = this.props.payload
        const {tblAssessmentEntriesData} =NORMAL?NORMAL:[]
        const {isFastrack} = this.props.payload.CREATEASSESSEMENT
        axiosInstance.get(`Assessment/GetById/${assessmentId}`)
            .then(res => {
                const resdata = res.data.data
                const resFastTrack = resdata.isFastrack
                const fastNotEqual = (isFastrack !== resFastTrack)
                // console.log(140, resFastTrack, fastNotEqual );
                //const data =res.data.data;
                const {remarks,moderatedComplexity,moderationReason}=res.data.data
                let moderationLevel = moderatedComplexity;
                //showing cached data irrespective of what server sent
                if(this.props.payload.CREATEASSESSEMENT.moderatedComplexity){
                    moderationLevel = this.props.payload.CREATEASSESSEMENT.moderatedComplexity
                }
                let moderationText = moderationReason;
                if(this.props.payload.CREATEASSESSEMENT.moderationReason){
                    moderationText = this.props.payload.CREATEASSESSEMENT.moderationReason
                }
                this.setState({ moderationText,remarks,level: moderationLevel.toString()})

                // console.log(149,this.props.payload.CREATEASSESSEMENT.isFastTrack,res.data.data.isFastTrack)
                if(fastNotEqual){
                    this.setState({moderationReason: "", remarks:"",fastToFull : true, level:this.props.payload.CREATEASSESSEMENT.calculatedComplexity})
                }
                this.setState({loading:false})

            }).catch(error => {
                console.log(error);
                this.setState({loading:false})
            });
       }
  
    getDataStrore(status){
        //data save confirmation on logout changes
        this.props.getAndSetIsDirty(false);


        const {NORMAL,OPPORTUNITY,LOGIN,CREATEASSESSEMENT} = this.props.payload;
        const { assessmentGateId,nickName,occodRefNumber,selectedOperation} = OPPORTUNITY?OPPORTUNITY:'';
        const {remarks,moderationReason}=this.state

        const isFastTrack = this.props.match.params.id === 'FastTrack' ?true:false
        const complexityText = this.getComplexityText(isFastTrack);


        this.props.onEditInspection({
            remarks,moderationReason
        })

        const calc=this.assessmentGate.filter((x)=>{ 
        return x.name==this.getComplexityText(isFastTrack)
        });
        const data = this.getModeratedValueText()!=-1?this.getModeratedValueText():complexityText
            const mod=this.assessmentGate.filter((x)=>{ 
                return x.name== data
            });
        litral.creatAssessement.IsFastrack= this.props.match.params.id == 'FastTrack'?1:0;
        litral.creatAssessement.OpportunityId=occodRefNumber;
        litral.creatAssessement.NickName=nickName;
        litral.creatAssessement.GateId=assessmentGateId;
        litral.creatAssessement.CompletedBy=localStorage.getItem('userid');
        litral.creatAssessement.CreatedBy=localStorage.getItem('userid');
        litral.creatAssessement.ModifiedBy=localStorage.getItem('userid');
        litral.creatAssessement.IsActive=1;
        litral.creatAssessement.CalculatedComplexity= calc[0]?calc[0].id:Number
        litral.creatAssessement.ModeratedComplexity=mod[0]?mod[0].id:Number
        litral.creatAssessement.ModerationReason=moderationReason;
        litral.creatAssessement.Status=status;
        litral.creatAssessement.Remarks= remarks;
        litral.creatAssessement.tblAssessmentEntries= this.state.tblAssessmentEntriesData
        litral.creatAssessement.tblAssessmentEntries?this.creatAssessement(litral.creatAssessement,status):console.log(litral.creatAssessement)
        litral.creatAssessement.IsFastrack==1?this.creatAssessement(litral.creatAssessement,status):console.log(litral.creatAssessement)

    }

showAckMsg = ()=>{
    this.setState({showAckMsg:true})}


creatAssessement(data,status){
    if(this.state.selectedOperation==="trial")
        {
            this.setState({showTrialModalForSubmission:true})
           
        }

    else{
        if(status===0 || this.validateData())
        {   
            const isFastTrack = this.props.match.params.id === 'FastTrack'?true:false
            const complexityText = this.getComplexityText(isFastTrack);
            const moderatedValueText = this.getModeratedValueText()!=-1?this.getModeratedValueText():complexityText;
            let showModal = complexityText !== moderatedValueText
            // if(this.state.selectedOperation==="create"){
            //     showModal =  complexityText !== moderatedValueText 
            // }else if(this.state.selectedOperation==="update"){
            //     if(this.state.fastToFull){
            //         let OrignalValue = complexityText
            //         showModal = (OrignalValue!==moderatedValueText)
            //     }
            //     else{
            //         let OrignalValue = moderatedValueText
            //         showModal = (OrignalValue!==complexityText)
            //     }
            // }
            // console.log(238, showModal)
            axiosInstance.post('Assessment/Persist',data)
            .then(res => {
                const data =res.data.data;
                this.props.oppSerch ({data})
                this.props.oppSerch ({assessmentId: data.id})
                if(status==1 && showModal){
                    this.setState({data:data})
                    this.showAckMsg();
                    // data?this.props.history.push(`/download/report/${data.id}`):console.log()
                }
                else if(status == 1 && !showModal){
                    data?this.props.history.push(`/download/report/${data.id}`):console.log()
                }
                else if(status==0){

                }

            }).catch(error => {
                console.log(error);
            })
        }
    
    else{
    this.setState({showFailedValidation:true})
    }
}
}


    backButton(){
        const {remarks,moderationReason,level}=this.state
        this.props.onEditInspection({
            remarks,moderationReason,moderatedComplexity:level
        })
        this.props.history.push(`/${this.props.match.params.id}`)
    }

    getLevel=()=>{ 
        
        switch(this.state.level) {
            case '1' : {  return litral.complexityLevel.low };
            case '2' : {  return litral.complexityLevel.moderate};
            case '3' : {  return litral.complexityLevel.high};
            case '4' : {  return litral.complexityLevel.veryHigh};
            default : {  return -1};
        }
    }
    saveButton(){
        this.setState({showTrialModal:true})
        this.getDataStrore(0)
    }

    hendalChangeRationale(event){
        const moderationReason= event.target.value
        this.setState({
            moderationReason
        })
        //data save confirmation on logout changes
        this.props.getAndSetIsDirty(true);
    }
    hendalChangeComplexity(event){
        const remarks= event.target.value
        this.setState({
            remarks
        })
        //data save confirmation on logout changes
        this.props.getAndSetIsDirty(true);
    }


    buttonFunction=[
        this.backButton.bind(this),
        this.nextButton.bind(this),
        this.saveButton.bind(this)
    ]
   
    getComplexityLevel=(isFastTrack)=>{
        if(isFastTrack)
            return litral.complexityLevel.low;
        else {
            if(this.totalComplexity<=49)
                return litral.complexityLevel.low;
            if(this.totalComplexity>49 && this.totalComplexity<=70)
                return litral.complexityLevel.moderate;
            if(this.totalComplexity>70 && this.totalComplexity<=90)
                return litral.complexityLevel.high;
            if(this.totalComplexity>90)
                return litral.complexityLevel.veryHigh;
        }
    };

    getComplexityText=(isFastTrack)=>{
        if(isFastTrack)
            return litral.complexityLevelText.low;
        else {
            if(this.totalComplexity<=49)
                return  litral.complexityLevelText.low;
            if(this.totalComplexity>49 && this.totalComplexity<=70)
                return litral.complexityLevelText.moderate;
            if(this.totalComplexity>70 && this.totalComplexity<=90)
                return litral.complexityLevelText.high;
            if(this.totalComplexity>90)
                return litral.complexityLevelText.veryHigh;;
        }
    };

    getModeratedValueText = ()=>{
            switch(this.state.level) {
                case '1' : return litral.complexityLevelText.low;
                case '2' : return litral.complexityLevelText.moderate;
                case '3' : return litral.complexityLevelText.high;
                case '4' : return litral.complexityLevelText.veryHigh;
                default : return -1;
            
        }
    }

    closeTrialModal = ()=>this.setState({showTrialModal:false})
    closeFailedValidation = ()=>this.setState({showFailedValidation:false})
    closeAckMsg = (event) => {
        event.preventDefault();
        this.setState({showAckMsg : false})
        this.state.data?this.props.history.push(`/download/report/${this.state.data.id}`):console.log()
        
    }
    closeTrialModalForSubmission= (event)=>{
        event.preventDefault();
        this.setState({showTrialModalForSubmission:false});
        this.props.history.push(`/download/report/test`)
    }

    validateData = ()=>{
        const {OPPORTUNITY} = this.props.payload;
        const {selectedOperation} = OPPORTUNITY?OPPORTUNITY:'';
        const isFastTrack = this.props.match.params.id === 'FastTrack'?true:false
        const complexityText = this.getComplexityText(isFastTrack);
        const moderatedValueText = this.getModeratedValueText()!=-1?this.getModeratedValueText():complexityText;
        let returnValue = true;
        if((this.state.moderationReason==null || this.state.moderationReason==='')&&(complexityText!==moderatedValueText))
            returnValue = false;
        if((this.state.remarks==null || this.state.remarks==='')){
            returnValue = false;
        }
            return returnValue;
    }


    creatRationalTextArae=()=>{

        const {moderationReason,selectedOperation} =this.state
        const isFastTrack = this.props.match.params.id === 'FastTrack'?true:false
        const complexityLevel = this.getComplexityLevel(isFastTrack);
        const moderatedValue = this.getLevel()===-1?complexityLevel:this.getLevel();
       return  <div><h6>{ `Complexity assessment moderated because:`}</h6><FormControl as="textarea" rows='4' onChange={this.hendalChangeRationale.bind(this)} 
       maxLength="500" cols="100" value={moderationReason} disabled={(selectedOperation!=='trial' && complexityLevel===moderatedValue && moderationReason=='')} /></div>
    
    }

    creatRemarks=()=>
        <TextArea onChange={this.hendalChangeComplexity.bind(this)} value={this.state.remarks} text={this.state.remarks}
                            header='The actions required to reduce complexity and risk for this engagement are: ' cols='100' rows='4' maxLength="500" ></TextArea>
    

    render(){
       const ceratFastTrack =  <div className={classes.ContainerVertical}>{this.ceratFastTrack()}</div>
       const { factors,subFactorName}=this.state;
       const isFastTrack = this.props.match.params.id === 'FastTrack'?true:false
       const complexityLevel = this.getComplexityLevel(isFastTrack);
       const complexityText = this.getComplexityText(isFastTrack);
       const moderatedValue = this.getLevel()===-1?complexityLevel:this.getLevel();
       const moderatedValueText = this.getModeratedValueText()!=-1?this.getModeratedValueText():complexityText;
       const creatRationalTextArae=this.creatRationalTextArae()
       const creatRemarks=this.creatRemarks()
             
       return(
            <div>
                <ConfirmationModal modalFooter="singleButton" message={litral.saveConfirmationMessage} showModal={this.state.showTrialModal} onClick={this.closeTrialModal} onHide={this.closeTrialModal} />
                <ConfirmationModal modalFooter="singleButton" formattedMsg={this.props.match.params.id == 'FastTrack'? litral.trialMessege620 : litral.trialMessege920} showModal={this.state.showTrialModalForSubmission} onClick={this.closeTrialModalForSubmission} onHide={this.closeTrialModalForSubmission} />
                <ConfirmationModal modalFooter="singleButton" message={litral.showValidationFailMessage} showModal={this.state.showFailedValidation}  onClick={this.closeFailedValidation} onHide={this.closeFailedValidation} />
                <ConfirmationModal modalFooter="singleButton" message={ this.props.match.params.id == 'FastTrack' ? litral.fasttrackAckMsg : litral.fullAckMsg} showModal={this.state.showAckMsg}  onClick={this.closeAckMsg} onHide={this.closeAckMsg} />                
                <Form noValidate onSubmit={this.nextButton.bind(this)}>
                    <TitleBar title={this.props.match.params.id == 'FastTrack'?"Moderate & Submit":"Moderate & Submit"} id={this.props.match.params.id == 'FastTrack'?"fastTrackAssessmentModerate":"normalComplexityAssessmentModerate"} ></TitleBar>
                    <ToolBarContainer type='readonly' redOnlydataForToolBar={litral.redOnlydataForToolBar}/>
                    <Row>
                        <Col style={{margin: '5px 0px 0px 14px'}}>
                           <div className={classNames(classes.ContainerRow)}>                {/* SpeedoMeter */}
                                {/* {highMedilLow} */}
                                <div style={{textAlign:"center"}}>
                                    <b style={{fontSize:"12px"}}>Derived Complexity</b>
                                    {this.createGraph(complexityLevel,complexityText)}
                                </div>
                                <span className={classNames(classes.GraphText)}> {this.props.match.params.id == 'FastTrack' ? (<h6>Based on the information you have provided we have assessed this engagement as <b>{complexityText}</b> complexity</h6>) : (<h6>  Based on the information you have provided the overall complexity score for this engagement is <b>{this.totalComplexity}</b>; we have assessed this engagement as <b>{complexityText}</b> complexity   </h6>)}
            
                                </span>
                            </div>     
                            { this.props.match.params.id == 'FastTrack' ? <div>{ceratFastTrack ? ceratFastTrack : ''}</div>: 
                            <div className={classes.heightOfTable}>
                            <Newtable data={litral.dataCheck} getLevel={this.getLevel.bind(this)}  factors={factors} selectBoxName={this.assessmentGate}
                            subFactorName={subFactorName} totalComplexity={this.totalComplexity} tblAssessmentEntriesData={this.state.tblAssessmentEntriesData}></Newtable></div>}
                            
                        </Col>
                    
                        <Col style={{margin: '5px 0px 0px 0px'}}>
                            <div className={classNames(classes.ContainerRow)}>                {/* SpeedoMeter */}
                                
                                {/* {highMedilLow} */}
                                <div style={{textAlign:"center"}}><b  style={{fontSize:"12px"}}>Moderated Complexity</b>{ this.createGraph(moderatedValue,moderatedValueText)}</div>
                                <span className={classNames(classes.GraphText)}><h6> {this.props.match.params.id == "FastTrack" ? <div>If you think that this engagement is of a higher complexity then you can change (<i>moderate</i>) the complexity assessment</div> : <div>If you think that this engagement is of a higher or a lower complexity then you can change (moderate) the complexity assessment</div> } </h6></span>
                            </div>     

                            <div className={classNames(classes.ContainerRow,classes.ModerateSelect)}>
                                <div ><h6>Moderate assessment : </h6></div>
                                <div className={classNames(classes.SelectBox)}>
                                    <div >
                                        <SelectBox selectedOption={moderatedValueText} name="Complexity Level" handleChange={this.moderateLevel.bind(this)} optiondata={isFastTrack?this.assessmentGateForFastTrack:this.assessmentGate} size={11}  preventSorting={true} doNotAddDefault={true}></SelectBox>
                                    </div>
                                </div>
                            </div>
                            {creatRationalTextArae}
                            {creatRemarks}
                            
                        </Col>
                    </Row>
                    <ButtonPanel Buttondata={litral.buttonType3} buttonFunction={this.buttonFunction}></ButtonPanel>
                </Form>
            </div>
        )
    } 
}

const mapStateToProps = state => {
    return {payload: state.oppSerch};
};
const mapDispatchToProps = dispatch => {
    return {
        oppSerch: data => dispatch(oppSerch(data)),
        onEditInspection: data => dispatch(onEditInspection(data)),
        onFastTrack: data => dispatch(onFastTrack(data)),
    };
};
 const FastTrackAssessmentResultData = connect(mapStateToProps,mapDispatchToProps)(FastTrackAssessmentResult);

export default FastTrackAssessmentResultData;