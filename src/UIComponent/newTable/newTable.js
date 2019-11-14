import React,{Component} from 'react';
import classes from './newTable.module.css';

 class Newtable extends Component{
     constructor(props){
         super(props)
         
     
     }
     creatBody(){
        const factors= this.props.factors?this.props.factors:this.props.data.map((x)=>x.name);
        const subFactorName = this.props.subFactorName
        const factor= factors.map((x,index)=>{
        const rowCol= this.creatRowCol(subFactorName[index],x)
            return (rowCol)
        });
        return (<tbody>{factor}</tbody>);
     }
     creatRowCol(subFactorName,header){
        return subFactorName.map((res,index)=>{
            const updateData=this.props.tblAssessmentEntriesData.filter((r)=>{return r.subFactorId==res.id})
            const selectBox=this.props.selectBoxName?this.props.selectBoxName.filter((r)=>{return r.id==updateData[0].uwComplexityScore}):[{name:'Not selected'}]
         return(   
           <tr key={index}>
            <td valign={"bottom"}>
            {index==0 && <div className={classes.header}>{header?header:''}</div>}
            {res?res.name:''}
            </td>
            <td valign={"bottom"}>{selectBox[0]?selectBox[0].name:"Not selected"}</td>
            <td valign={"bottom"}>{updateData[0]?updateData[0].wComplexityScore:0}</td>
        </tr>)
         })

     }

     creatheader(){
        return(
        <thead>
            <tr>
                <th> </th>
                <th>Complexity</th>
                <th>Weighted Score</th>
            </tr>
      </thead>)
     }
   
     creatFooter(){
         this.props.getLevel(this.props.totalComplexity)
        return(
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td><b>{this.props.totalComplexity?this.props.totalComplexity:'0'}</b></td>
            </tr>
      </tfoot>)
     }
 render(){
     const body=this.creatBody();
     const header = this.creatheader();
     const footer = this.creatFooter();
    return(
        <table>{header?header:''}{body?body:''}{footer?footer:''}</table>
    )
 }
}
export default Newtable