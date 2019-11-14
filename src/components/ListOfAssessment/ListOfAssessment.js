import React,{Component} from 'react';
import Table from '../../UIComponent/Table/Table';
import {axiosInstance} from '../../AxiosHandler';
import { connect } from "react-redux";
import litral from '../../litral/litral'

class ListOfAssessment extends Component{
constructor(props){
    super(props)
    this.state={
        tabledata:{theader :['OCOD opportunity name','Nickname','Account','Next assessment gate',' '],tbody:[]},
        data:[],
        opportnityId:[]
    }
}
componentDidMount(){
    this.getAssessment()
}
getAssessment(){
    const data= 'LOGIN' in  this.props.payload ? this.props.payload.LOGIN:''
    const {username}=data?data:''
    axiosInstance.get(`Assessment/GetDataForUser/${username}`)
    .then(res => {
        const Data =res.data.data
        const tbody1=Data.map((x)=>{
            return {ocodOpportunityName:x.ocodOpportunityName,nickName:x.nickName,account:x.account,assessmentGate:x.assessmentGate,update:'update'}
        })
        const opportnityId=Data.map((x)=>x.opportunityId)
        this.setState(prevState  => ({
            tabledata: {
                ...prevState.tabledata,
                tbody:tbody1
            },
            data:Data,
            opportnityId:[...opportnityId,opportnityId]
        }))

    }).catch(error => {
        console.log(error);
    });
  }
  getId=(id,e)=>{
     
    // let getSelectedData=[]
    // getSelectedData = this.state.data.filter((res)=>{
    //     return res.opportunityId==id
    // })
    // const {opportunityId,ocodOpportunityName,nickName,assessmentGate} =getSelectedData.length>0?getSelectedData[0]:''
    // this.props.oppSerch({ 
    //             occodRefNumber:opportunityId,
    //             opportunityName:ocodOpportunityName,
    //             nickName:nickName,
    //             assessmentGateway:assessmentGate,
    // });
    // this.props.history.push(`/opportunitysearch/${id}`)
    this.props.history.push('/download/Exteact');
}

render(){
      return  <Table data={this.state.tabledata?this.state.tabledata:litral.table} getId={this.getId} opportnityId={this.state.opportnityId}></Table>
}
}
const mapStateToProps = state => {
    return {payload: state.oppSerch};
};
const ListOfAssessmentData = connect(mapStateToProps)(ListOfAssessment);

export default ListOfAssessmentData
