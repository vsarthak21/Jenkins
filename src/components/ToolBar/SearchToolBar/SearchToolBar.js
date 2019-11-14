import React from 'react';
import {Row,Col } from 'react-bootstrap';
import CustomeButton from '../../../UIComponent/Button/CustomeButton'
import SelectBox  from '../../../UIComponent/SelectBox/SelectBox'
import {Form} from 'react-bootstrap';
import classes from '../../ToolBar/ToolBar.module.css';
import Tooltip from 'react-tooltip-lite';
import litral from '../../../litral/litral'


const  OpportunitySearchToolBar =(props)=> {
  // validated={props.validated}
return <Form noValidate onSubmit={props.hide}>
          <Row >
            <Col> 
              <Row>
                <Col><label >Sector:</label> </Col>
                <Col md={9}>
                    <Tooltip content={litral.helpTextForSectorDropDown} distance={10}  direction="up" hoverDelay={400} >
                      <SelectBox autoFocus={true} selectedOption={props.selectedSector} name="sector" handleChange ={props.handleChange.bind(this,'sector')} optiondata={props.sectors}></SelectBox>
                  </Tooltip>
                </Col>
              </Row>
            </Col>

            <Col>
              <Row><Col><label >Account:</label></Col>
                <Col md={9}>
                  <Tooltip useHover={props.isAccountDisabled ? false : true} content={litral.helpTextForAccountDropDown} distance={10}  direction="up" hoverDelay={400} >
                    <SelectBox selectedOption={props.selectedAccount} name="account" handleChange ={props.handleChange.bind(this,'account')} optiondata={props.accounts} isDisabled={props.isAccountDisabled}></SelectBox>
                  </Tooltip>
                </Col>
              </Row> 
            </Col>
            
            <Col ><CustomeButton data={props.Buttondata} floatRight={classes.floatRight}> </CustomeButton></Col>
          </Row>
        </Form>
}


  export default OpportunitySearchToolBar;