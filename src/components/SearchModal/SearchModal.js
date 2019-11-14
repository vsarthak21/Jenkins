import React, { Component } from 'react';
import {Row,Alert, Col} from 'react-bootstrap';
import classes from './SearchModal.module.css'
import Table from '../../UIComponent/Table/Table'
import ToolBarContainer from './../ToolBar/ToolBar'
import ButtonPanel from '../../UIComponent/ButtonPanel/ButtonPanel'
import Globle from '../../GlobleCss.module.css'
import classNames from 'classnames'
import close from '../../assets/images/close.png'

class SearchModal extends Component {
    raiseInvoiceClicked=()=>{
      var otherWindow = window.open(window.location.origin + `/ect/Help/${this.props.id}.html`, "ectHelpWindow");
      //otherWindow.opener = null;
    }
   
    render(){
    console.log(this.props)
      return (
        <Row className={classes.ContainerVertical}>
         <Col lg={12}> 
            <Row > 
              <Col> <Alert className={Globle.subHeaderText} style={{padding: '.75rem 0rem'}}>{this.props.header}</Alert></Col> 
              <Col><Alert style={{float:"right"}} onClick={this.props.close}> <img src={close}  className={classes.imageStyle} alt="Sopra Steria"/></Alert></Col>
              
            </Row>
          </Col >
          <Col lg={12} style={{textAlign:'right'}}>
            <div>
              <span  style={{ marginLeft: '15px' }} >
                <u><a tabIndex={-1}  onClick={this.raiseInvoiceClicked}><b>Help with this page</b></a></u>
              </span>
            </div>
          </Col>
          {this.props.data? 
            <Col lg={12}>
              <ToolBarContainer selectedSector={this.props.selectedSector} selectedAccount={this.props.selectedAccount} type='opportunitysearch' accounts={ this.props.accounts} sectors={this.props.sectors} SearchHideData={this.props.SearchHideData} 
              handleChange={this.props.handleChange}  Buttondata = {this.props.serchButton2} isAccountDisabled={this.props.isAccountDisabled}/>
            </Col>:''}

          <div style={{width:'100%'}}>
            <Col lg={12} style={{maxHeight:"55vh", overflowY:'scroll'}}> 
              <Table data={this.props.tabledata} getId={this.props.getId} opportnityId={this.props.opportnityId}></Table>
            </Col>
            
            <Col lg={12} className="mb-2">
              <Alert className={classNames(Globle.normalText,classes.textStyle)} style={{margin:'auto'}}>{this.props.findAnOpportunity}</Alert>
            </Col>
          </div>
        </Row>
    );
  }

}
export default SearchModal;