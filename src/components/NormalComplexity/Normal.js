import React, {Component}from 'react';
import CustomeAccordion from '../../UIComponent/Accordion/CustomeAccordion';
import {Accordion, Row, Col} from 'react-bootstrap';
import litelar from '../../litral/litral';
import Factory from '../Factory/Factory';
import CustomeButton from '../../UIComponent/Button/CustomeButton';
import classes from './Normal.module.css';
import ToolBarContainer from '../ToolBar/ToolBar';
import classNames from 'classnames';
import {connect} from 'react-redux'
import {onNORMAL} from '../../store/Action/LoginAction'
import {axiosInstance} from '../../AxiosHandler';
import { showSpinner} from '../../HelperFunctions';
import {onEditInspection} from '../../store/Action/LoginAction'
import litral from '../../litral/litral'
import { oppSerch } from "../../store/Action/OpportunitySerchAction";

import TitleBar from '../TitleBar/TitleBar';
import ConfirmationModal from '../../UIComponent/ConfirmationModal/ConfirmationModal'

class Normal extends Component{
// tableAssessmentLitral=[]
    constructor(props){
        super(props)
        const {NORMAL,OPPORTUNITY} = props.payload
        const {noumberOfQuestionFill,allData,totalFillnumberOfSubfactors,factors,tblAssessmentEntriesData} =NORMAL?NORMAL:[]
        const {selectedOperation,occodRefNumber,assessmentGateId,assessmentId}=OPPORTUNITY?OPPORTUNITY:''
        this.state={
            select:0,
            index:0,
            length:0,
            objectData:{
                name:'',
                selectBox:'',
                Remark:'',
                SubFactorId:Number ,
                UwComplexityScore :Number,
                WComplexityScore:Number,
                IsActive:1,
                CreatedBy:''
            },
            tableAssessmentLitral:[],
            collectData:[],
            allData:allData?allData:[[],[],[],[]],
            factors:factors?factors:[],
            open:false,
            opendata: [false,false,false,false],
            noumberOfQuestionFill:noumberOfQuestionFill?noumberOfQuestionFill:[0,0,0,0],
            totalFillnumberOfSubfactors:totalFillnumberOfSubfactors?totalFillnumberOfSubfactors:'',
            data:[],
            loading:false,
            showTrialModal:false,
           normalComplexityUpdate:'',
           isFastTrack:0,
           showTrialModalForNextScreen:false
        }
        this.props.oppSerch({
            isFastTrack:0
        });
        this.props.onEditInspection({
            isFastrack:0
        })
        
        selectedOperation=='update'?this.getUpdatedNormalComplexity(assessmentId):this.getFactors()
        //data save confirmation on logout changes
        console.log("selectedOperation >> "+selectedOperation)
        if(selectedOperation=='create'){
            this.props.getAndSetIsDirty(true);
        }
       
    }

    closeTrialModal = ()=>this.setState({showTrialModal:false})

    componentWillUnmount() {
        if(this.props.saveDataOnLogout()){
            console.log("saving data")
            this.saveButton()
        }
        this.props.saveDataOnLogout(false)
    }
    componentDidMount(){
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function() {
            window.history.pushState(null, "", window.location.href);
        };
        this.setState({tableAssessmentLitral:[]})
        const {NORMAL} = this.props.payload
        const {tblAssessmentEntriesData} =NORMAL?NORMAL:[]
        this.setState({tableAssessmentLitral:tblAssessmentEntriesData?tblAssessmentEntriesData:JSON.parse(JSON.stringify(litral.tblAssessmentEntries))})

        this.setState({loading:true})
        // this.getFactors()
        
    }
    tblAssessmentEntriesDataforUp=[]
   getUpdatedNormalComplexity(assessmentId){
    const {NORMAL} = this.props.payload
    const {tblAssessmentEntriesData} =NORMAL?NORMAL:[]
        axiosInstance.get(`Assessment/GetById/${assessmentId}`)
        .then(res => {
            const data =res.data.data;
            const {tblAssessmentEntries}=res.data.data
            this.tblAssessmentEntriesDataforUp=tblAssessmentEntriesData?tblAssessmentEntriesData:tblAssessmentEntries
            /*this.tableAssessmentLitral.map((res,index)=>{
                if(res.subFactorId==this.tblAssessmentEntriesDataforUp[index].subFactorId){
                    res.remark=this.tblAssessmentEntriesDataforUp[index].remark;
                    res.uwComplexityScore=this.tblAssessmentEntriesDataforUp[index].uwComplexityScore;
                    res.wComplexityScore=this.tblAssessmentEntriesDataforUp[index].wComplexityScore;
                    res.createdBy=this.tblAssessmentEntriesDataforUp[index].createdBy
                }
                return rest;
                
            })*/

            this.tblAssessmentEntriesDataforUp.map((res,index)=>{
                this.state.tableAssessmentLitral[res.subFactorId-1].remark=res.remark
                this.state.tableAssessmentLitral[res.subFactorId-1].uwComplexityScore=res.uwComplexityScore
                this.state.tableAssessmentLitral[res.subFactorId-1].wComplexityScore=res.wComplexityScore
                this.state.tableAssessmentLitral[res.subFactorId-1].createdBy=res.createdBy
               
                
            })
            this.getFactors();
            this.setState({totalFillnumberOfSubfactors:tblAssessmentEntries.length})
            this.setState({loading:false})
           
        }).catch(error => {
            console.log(error);
            this.setState({loading:false})
        });
   }
    getFactors(){
       
        axiosInstance.get('Factor/GetFactors')
        .then(res => {
            const data =res.data.data;
            this.state.data=res.data.data;
            this.setState({...data})
            console.log("142", this.state.tableAssessmentLitral)
            this.FactorsName=this.state.data.map((x,index)=>{
                this.checkSelectBoxAndTex(index)
                return x.name})

            this.setState({factors:this.FactorsName})
            this.setState({loading:false})
        }).catch(error => {
            console.log(error);
            this.setState({loading:false})
        });
    }

    inputTex(subFactorid,score,impScore,subFactorIndex,numberOfSubfactors,selectedComplexityIdx,subfactor,event){
        const subFacID=subFactorid
        const calScor=impScore*score
        const mediumScore=score
        const i = subFactorIndex
        const l =numberOfSubfactors
        const select=selectedComplexityIdx
         this.setState({
             index: i,
             length:l
         })
         this.state.tableAssessmentLitral.map((res)=>{
            if(res.subFactorId==subFacID){
                res.remark= event=='SelectBox'?res.remark:event.target.value;
                res.selectBox=select;
                res.uwComplexityScore=mediumScore;
                res.wComplexityScore=calScor;
                res.createdBy=localStorage.getItem('userid');
            }
            return res;
            
        })
        this.checkSelectBoxAndTex(this.state.select)
        //data save confirmation on logout changes
        this.props.getAndSetIsDirty(true);
       
    }


    collectDataArray=[];noumberOfQuestionFill=[0,0,0,0]

    checkSelectBoxAndTex(index) {
        console.log("188",this.state.tableAssessmentLitral)
        const data=  this.state.tableAssessmentLitral.filter((res)=>{
            return res.uwComplexityScore!==0 && res.wComplexityScore!==0 && res.remark!="" && res.remark!=null  && res.Factor===this.state.data[index].id })
        this.noumberOfQuestionFill[index]=data.length
        this.noumberOfQuestionFill.length>0?this.setState({noumberOfQuestionFill:this.noumberOfQuestionFill}):console.log()
    }

 
    FactorsName=[];subFactorDetails=[]
    creatCustomeAccordion(){

        this.FactorsName= this.state.data?this.state.data.map((x)=>x.name):litral.dataCheck.map((x)=>x.name);
        this.subFactorDetails = this.state.data?this.state.data.map((x)=>x.subFactorDetails):litral.dataCheck.map((x)=>x.subFactorDetails);

        const factory = this.subFactorDetails?this.drowFactory(this.FactorsName,this.subFactorDetails):''; 
         
        const check =  this.state.tableAssessmentLitral.filter((res)=>{return res.uwComplexityScore!==0 && res.wComplexityScore!==0 && res.remark!=null && res.remark!=""  })
        const totalFillnumberOfSubfactors=check.length
        let disabled=false
        const {OPPORTUNITY}=this.props.payload
        const {selectedOperation} =OPPORTUNITY?OPPORTUNITY:''

        if(selectedOperation=="trial"){
            disabled = false;
        } else if(this.state.select==3){
            disabled = totalFillnumberOfSubfactors==14?false:true;
        }else{
            disabled = false;
        }
    
        const factor= this.FactorsName.map((x,index)=>{
            return (
            <CustomeAccordion key={x} data={x} index={index} litelardata={litelar.AccoudentButton} litelar={litelar.buttonType2} 
                selecter={this.state.noumberOfQuestionFill.length !=0 ? this.state.noumberOfQuestionFill[index]:0}  
                facroty={index==this.state.select?factory:''} length={this.subFactorDetails[index].length} 
                open={this.state.opendata[index]} disabled={disabled} 
                clickListener={this.clickListener.bind(this)}
                nextButton={this.nextButton.bind(this)} saveButton={this.saveButton.bind(this)}
              
                >
                </CustomeAccordion>)
        });
        return (
            <div id="accordion">{factor}</div>
        )
    }

    drowFactory=(FactorsName,subFactorDetails)=>{ 

        let data=subFactorDetails?subFactorDetails[this.state.select]:litral.dataCheck.map((x)=>x.subFactorDetails);

        const factor= data?data.map((x,index)=>{

            const updateData=  this.state.tableAssessmentLitral? this.state.tableAssessmentLitral.filter((res)=>{return res.subFactorId==x.id}):[]
            return (
            <Factory getAndSetIsDirty={this.props.getAndSetIsDirty.bind(this)} key={index} index={index} inputAndTexDta={this.state.allData[this.state.select][index]} data={x} length={data.length}  inputTex={this.inputTex.bind(this)} 
             open={this.state.opendata} openAndCloseAcc={this.openAndCloseAcc} updateData={updateData?updateData[0]:{}}>
            </Factory>)
        }):'';
        return (
            <div id={FactorsName?FactorsName[this.state.select]:''}>{factor}</div>
        )
    }

     opendataDta = [];

    nextButton(event,key){
        //data save confirmation on logout changes
        // this.props.getAndSetIsDirty(true);
        this.collectDataArray=[]

        if(event==3){ 
            this.nextForNavigation()
            this.setState({select:event});
        }else{

            this.setState({opendata:this.opendataDta,select:event+1});
            this.opendataDta=this.state.opendata
            const element=document.getElementById(`Acc${event+1}`)
            const imag=document.getElementById(`IMG${event+1}`)
            const arry =[0,1,2,3]
            for (const elem of arry) {
                event+1== elem? this.opendataDta[event+1]=true :this.opendataDta[elem]=false
                event+1== elem? element.style.display='block' : document.getElementById(`Acc${elem}`).style.display='none'
                event+1== elem?  imag.classList.add(classes.rotate1) :document.getElementById(`IMG${elem}`).classList.remove(classes.rotate1)
            }
          
       
        }
        document.body.scrollTop=0;
    }

    clickListener(event,key) {
        this.collectDataArray=[]
        this.opendataDta=this.state.opendata
        this.setState({opendata:this.opendataDta,select:event});
        const arry =[0,1,2,3]
        const element=document.getElementById(`Acc${event}`)
        const imag=document.getElementById(`IMG${event}`)

        for (const elem of arry) {
            event== elem ? this.opendataDta[elem]=!this.opendataDta[elem] :this.opendataDta[elem]=false
            this.opendataDta[elem] ? element.style.display='block' : document.getElementById(`Acc${elem}`).style.display='none'
            this.opendataDta[elem] ?  imag.classList.add(classes.rotate1) :document.getElementById(`IMG${elem}`).classList.remove(classes.rotate1)
        }
        document.body.scrollTop=0;
    }

    backButton=()=>{
        this.saveInStorage() ;
        const {OPPORTUNITY} = this.props.payload
        const {selectedOperation}=OPPORTUNITY?OPPORTUNITY:''
        this.state.isFastTrack == 0 ?this.props.history.push(`/opportunitysearch/${selectedOperation}`): this.props.history.push('/FastTrack')
    }

    saveInStorage(){ 
        this.setState({isFastTrack:0})
        this.props.oppSerch({
            isFastTrack:0
        });
        
        const { select,index,length,objectData,collectData,allData,factors,opendata,noumberOfQuestionFill,totalFillnumberOfSubfactors} =this.state
        const {OPPORTUNITY}=this.props.payload
        const {selectedOperation} =OPPORTUNITY?OPPORTUNITY:''
        if(selectedOperation=="trial"){
            this.props.onNORMAL({subFactorName:this.subFactorDetails,factors:this.FactorsName,tblAssessmentEntriesData: this.state.tableAssessmentLitral})
        }else{
            this.props.onNORMAL({select,index,length,objectData,collectData,allData,subFactorName:this.subFactorDetails,factors:this.FactorsName,
                opendata,noumberOfQuestionFill,totalFillnumberOfSubfactors,tblAssessmentEntriesData: this.state.tableAssessmentLitral})
        }
        const tblAssessmentEntries =  this.state.tableAssessmentLitral.filter((res)=>{return res.uwComplexityScore!==0 && res.wComplexityScore!==0 && res.remark!==null})
            this.props.onEditInspection({
                tblAssessmentEntries:tblAssessmentEntries,
                isFastrack:0
            })
           
            
        
        return true;
    }
    getDataStrore(){

        const {CREATEASSESSEMENT} = this.props.payload;
        
        const { opportunityId,nickName,isFastrack,gateId,completedBy,calculatedComplexity,moderatedComplexity,moderationReason,status,createdBy,modifiedBy,remarks,
            isActive,tblAssessmentEntries} = CREATEASSESSEMENT?CREATEASSESSEMENT:'';
        const tblAssessmentEntry =  this.state.tableAssessmentLitral.filter((res)=>{return res.uwComplexityScore!==0 && res.wComplexityScore!==0 && res.remark!==null})
        const data ={opportunityId,nickName,isFastrack,gateId,completedBy,calculatedComplexity,moderatedComplexity,moderationReason,status:0,remarks,createdBy,modifiedBy,
            isActive,tblAssessmentEntries:tblAssessmentEntry}
        
        tblAssessmentEntries?this.creatAssessement(data):console.log()
    }


    saveButton=()=>{
        //data save confirmation on logout changes
        this.props.getAndSetIsDirty(false);
        this.saveInStorage()?this.getDataStrore() :console.log() 
        
    }

    creatAssessement(data){

        axiosInstance.post('Assessment/Persist',data)
        .then(res => {
            const data =res.data.data;
            this.props.oppSerch ({assessmentId: data.id})
            this.setState({showTrialModal:true})
        }).catch(error => {
            console.log(error);
        });
    }


    nextForNavigation=()=>{ 
        this.saveInStorage() ;
        const {OPPORTUNITY}=this.props.payload
        const {selectedOperation} =OPPORTUNITY?OPPORTUNITY:''
        if(selectedOperation=="trial"){
            this.setState({showTrialModalForNextScreen:true})
        }
        else{    
            this.props.history.push('/assessmentresult' + '/Normal')
        }
    }

    closeTrialModalForNextScreen = ()=>{
        this.setState({showTrialModalForNextScreen:false})
    }
   
    render()
    {
        const CustomeAccordion= this.creatCustomeAccordion()
        return(
            <div > 
                <ConfirmationModal modalFooter="singleButton" message={litral.saveConfirmationMessage} showModal={this.state.showTrialModal} onClick={this.closeTrialModal} onHide={this.closeTrialModal} />
                <ConfirmationModal modalFooter="singleButton" message={litral.trialMessege811} showModal={this.state.showTrialModalForNextScreen} onClick={()=>  this.props.history.push('/assessmentresult' + '/Normal')} onHide={this.closeTrialModalForNextScreen} />
                {showSpinner(this.state.loading)}
               <TitleBar title="Engagement Complexity Assessment" id="normalComplexity"></TitleBar>
                <ToolBarContainer type='readonly' redOnlydataForToolBar={litelar.redOnlydataForToolBar}/>
                <div className={classNames(classes.accHeight)}>{CustomeAccordion ? CustomeAccordion : 'Not Available' }</div>
                 <div className={classes.buttonStyle}>
                     <Row>
                    <Col md={1}><CustomeButton key="0" data={litelar.buttonType2[0]} onClick={this.backButton.bind(this)}/></Col>
                    <Col md={11}><div><p>{litral.normalComplexityMsg}</p></div></Col>
                    </Row>
                </div> 
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {payload: state.oppSerch};
};
const mapDispatchToProps = dispatch => {
    return {
        onNORMAL: data => dispatch(onNORMAL(data)),
        onEditInspection:data=>dispatch(onEditInspection(data)),
        oppSerch: data => dispatch(oppSerch(data)),

    };
};

 const NormalCom = connect(mapStateToProps, mapDispatchToProps)(Normal);



export default NormalCom;