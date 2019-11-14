import React, {Component} from 'react';
import classes from './Assessment.module.css';
import litral from '../../litral/litral';
import {Row, Col,Button,Alert } from 'react-bootstrap';
import classNames from 'classnames';
import Table from '../../UIComponent/Table/Table';
import TitleBar from '../TitleBar/TitleBar'
import Globle from '../../GlobleCss.module.css'
import ConfirmationModal from '../../UIComponent/ConfirmationModal/ConfirmationModal'
import Tooltip from 'react-tooltip-lite';
import { oppSerch } from "../../store/Action/OpportunitySerchAction";
import {onCleanOpportunity,onCleanCreateAssessement,onNORMAL,onFastTrack,onCleanFastTrack} from '../../store/Action/LoginAction'
import { connect } from "react-redux";
import {axiosInstance} from '../../AxiosHandler';
import {showSpinner} from '../../HelperFunctions';


class Assessment extends Component{

    constructor (props){
        super(props)
        this.state={
            tabledata:{theader :['OCOD opportunity name','Nickname','Account','Next assessment gate',' '],tbody:[]},
            data:[],
            opportnityId:[],
            loading:false,
            showTrial203:false,
            ConfirmationModal:false,
            res:""
        }
      
    }
    moveToolbar(type){
        this.props.oppSerch({ 
          selectedOperation:type
            });
        switch(type){
            case 'update':
                this.props.history.push('/SearchAssessment/'+type) 
            break;
            case 'create':
                this.props.history.push('/opportunitysearch/'+type) 
            break;
            case 'report':
                this.props.history.push('/SearchAssessment/'+type)
            break;
            case 'trial':
                this.setState({showTrial202:true})
                // this.props.history.push('/opportunitysearch/'+type)
            break;
        }
    }

    goBack(){
        this.props.history.push('/LayOut')
    }
    componentDidMount() {
        this._isMounted = true;
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function() {
            window.history.pushState(null, "", window.location.href);
        };
        localStorage.getItem('webtoken')?this.getAssessment():console.log();
        this.props.onCleanOpportunity()
        this.props.onCleanCreateAssessement()
        this.props.onCleanFastTrack()
        this.props.onNORMAL('')
        this.props.onFastTrack('')
        this.getAssessment()
        litral.tblAssessmentEntries = litral.tblAssessmentEntriesBlank;
        //data save confirmation on logout changes
        this.props.getAndSetIsDirty(false);
        
      }
   
      getAssessment(){
          this.setState({loading:true})
        const data= 'LOGIN' in  this.props.payload ? this.props.payload.LOGIN:''
        const {username}=data?data:''
        axiosInstance.get(`Assessment/GetDataForUser/${localStorage.getItem('userid')}`)
        .then(res => {
            if(this._isMounted){
            const Data =res.data.data
            const tbody1=Data.map((x)=>{
                return {ocodOpportunityName:x.ocodOpportunityName,nickName:x.nickName,account:x.account,assessmentGate:x.assessmentGate,update:'update'}
            })
            const opportnityId=Data.map((x)=>x.assessmentId)
            this.setState(prevState  => ({
                tabledata: {
                    ...prevState.tabledata,
                    tbody:tbody1
                },
                data:Data,
                opportnityId:[...opportnityId,opportnityId]
            }))
            this.setState({loading:false})

        }}).catch(error => {
            console.log(error);
            this.setState({loading:false})
        });
      }

      componentWillUnmount(){
        this._isMounted = false;
      }

    checkBOx(event){
        localStorage.setItem('createUpdateBOx',event.target.checked)
    }
    getId=(id,e)=>{
        let getSelectedData=[]
        getSelectedData = this.state.data.filter((res)=>{
            return res.assessmentId==id
        })
        const {opportunityId,ocodOpportunityName,nickName,assessmentGateId,assessmentGate,isFastTrack} =getSelectedData.length>0?getSelectedData[0]:''
        this.props.oppSerch({ 
                    occodRefNumber:opportunityId,
                    opportunityName:ocodOpportunityName,
                    nickName:nickName,
                    assessmentGateId:assessmentGateId,
                    assessmentGateName:assessmentGate,
                    isFastTrack:isFastTrack,
                    selectedOperation: "update",
                    assessmentId:id
        });
        this.props.history.push(`/opportunitysearch/${'update'}`)
    }

    hideConformation=()=>{
        this.setState({ConformationModal:false})
        this.moveToolbar(this.state.res)
    }
    createButtonWithText=(text,res,tabIndex,autoFocus)=>( 
        <Col style={{display:'flex'}}>
            <Col xs={11}><Button  tabIndex={tabIndex} size="lg" autoFocus={autoFocus}  block variant="primary" className={classNames('mb-5', classes.buttonStyle,res=="create" ?classes.buttonColor1:classes.buttonColor )} onClick={ (res === "create" || res === "update") ? this.handleClick.bind(this,res) : this.moveToolbar.bind(this,res)}>{text}</Button> </Col>
        </Col>)
    
    handleClick(res){
        (localStorage.getItem('createUpdateBOx')==null || localStorage.getItem('createUpdateBOx')==='false') ?this.setState({ConformationModal:true, res:res}):console.log()
        localStorage.getItem('createUpdateBOx')==='true'?this.moveToolbar(res):console.log()
        
    }
    render(){

        const createText= this.createButtonWithText(litral.createText,'create',1,true);
        const updateText= this.createButtonWithText(litral.updateText,'update',2)
        const tryText= this.createButtonWithText(litral.tryText,'trial',3)
        const report= this.createButtonWithText(litral.report,'report',4)
        return(
            <div>

                <ConfirmationModal modalFooter="singleButton" message={litral.createUpdateMessage} includeCheckbox={true} checkboxKey={'createUpdateBOx'} checkBoxFunction={this.checkBOx.bind(this)}
                    localCheck={(localStorage.getItem('createUpdateBOx')==null || localStorage.getItem('createUpdateBOx')==='false')}
                    showModal={this.state.ConformationModal} onClick={this.hideConformation} onHide={this.hideConformation}  checboxLeble={litral.checboxLeble}/>


                <ConfirmationModal modalFooter="singleButton" message={litral.trialMessege203} showModal={this.state.showTrial202} onClick={() => this.props.history.push('/opportunitysearch/trial')}  />
                 {showSpinner(this.state.loading)}
              <TitleBar title="Home Page" id="home" ></TitleBar>
                <div style={{paddingTop: '20px'}}>
                <Row  className={classNames(classes.contenarDat)}>
                    <Col className={classes.rightBoder}>
                        {createText}
                        {updateText}
                        <Col xs={11} style={{marginTop:'-50px', height: '28%'}}><Alert className={classNames('mb-2',Globle.normalText)} className={classes.Heading}>{litral.TextForAssessement}</Alert></Col>
                        <Tooltip content={litral.helpTextForTrialButton} distance={10}  direction="up" hoverDelay={400} > {tryText}  </Tooltip> 
                        <Tooltip content={litral.hoverTextForExtractReportBtn} distance={10}   hoverDelay={400}  > {report}  </Tooltip>                  
                     </Col>
                    <Col>
                       <label className={Globle.subHeaderText} style={{padding:'0px',marginBottom:'0px'}}> {litral.assessmenttableText}</label> 
                        <br>
                        </br>
                         <Alert className={Globle.normalText} style={{padding:'0px',marginBottom:'0px'}}>{litral.assessmentTableHelper}</Alert>
                        <div className={classes.heightOfTable}><Table data={this.state.tabledata?this.state.tabledata:litral.table} getId={this.getId} opportnityId={this.state.opportnityId}></Table></div>
                    </Col>
                </Row>
                </div>
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
        onCleanOpportunity:data=>dispatch(onCleanOpportunity(data)),
        onCleanCreateAssessement:data=>dispatch(onCleanCreateAssessement(data)),
        onNORMAL:data=>dispatch(onNORMAL(data)),
        onFastTrack:data=>dispatch(onFastTrack(data)),
        onCleanFastTrack:data=>dispatch(onCleanFastTrack(data)),
    };
};
const AssessmentData = connect(mapStateToProps, mapDispatchToProps)(Assessment);

export default AssessmentData