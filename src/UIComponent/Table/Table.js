import React, { Component } from 'react'
import classes from './Table.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import classNames from 'classnames'
import Globle from '../../GlobleCss.module.css'
import {Form} from 'react-bootstrap'
class Table extends Component {
   constructor(props) {
      super(props) 
   }
   renderTableData() {
    return this.props.data.tbody.map((data,index) => {
      return <tr key={'row'+index} onClick={this.props.checkbox?()=>{}:this.props.getId.bind(this,this.props.opportnityId?this.props.opportnityId[index]:index)}>{Object.keys(data).map( (x,i)=>{return (i===Object.keys(data).length-1 ? 
               <td key={'col'+i}>
                  {this.props.checkbox? <div style={{margin:'10px'}} >{
                  <Form.Check onChange={this.props.checkbox?this.props.getId.bind(this,this.props.opportnityId?this.props.opportnityId[index]:index):()=>{}} tabIndex="-1"type={'checkbox'} id={`default-${this.props.opportnityId[index]}`}
                  //checked={true}
                  />
                  }</div>:<FontAwesomeIcon  className={classes.IconStyle} icon={faChevronCircleRight}  transform='down-3 grow-6' />}
               </td> : 
               <td key={'col'+i}>{data[x]}</td>)})}
            </tr>
   })
 }
   renderTableHeader() {
    return this.props.data.theader.map((header, index) => {
       return <th key={index}>{this.props.checkbox && header==''  ?<div >
         <div style={{margin:'0 0px 0px 10px'}}>{<Form.Check onClick={this.props.sellectAll.bind(this,this.props.opportnityId)} tabIndex="-1"type={'checkbox'} id={`default`}/>}</div>
       </div>:header}</th>
    })
 }

 render() {
    return (
       <div>
          <h3 className={classes.title}>{this.props.tableTitle}</h3>
          <table className={classNames(classes.TableStyle,Globle.normalText) }>
          <thead><tr>{this.renderTableHeader()?this.renderTableHeader():''}</tr></thead>
             <tbody className={classes.TableBody} style={{height:this.props.height,overflowY:"scroll"}}>
                {this.renderTableData()?this.renderTableData():''}
             </tbody>
          </table>
       </div>
    )
 }
}

export default Table