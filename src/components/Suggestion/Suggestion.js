import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { Row, Col } from 'react-bootstrap';
import classes from './Suggestion.module.css'
import CustomeButton from '../../UIComponent/Button/CustomeButton'
import Tooltip from 'react-tooltip-lite';
import litral from '../../litral/litral';
import CAux from '../../hoc/CAux';
import event from '../eventEmitter/eventEmitter'
// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters


class Suggestion extends Component {
  constructor(props) {
    super(props);
    const { occodRefNumber, opportunityName } = this.props
    this.state = {
      occodRefNumber: occodRefNumber ? occodRefNumber : '',
      opportunityName: opportunityName ? opportunityName : '',
      occodRefNumberSuggestions: [],
      emailSuggestions: []
    };

  }



  getSuggestions(value, type) {
    const data = this.props.data() ? this.props.data() : this.users;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    var suggestions = inputLength === 0 ? [] : data.filter(lang =>
      lang[type].toLowerCase().includes(inputValue)
    );
    return suggestions !== [] ? suggestions.sort((a, b) => (a[type] > b[type] ? 1 : (a[type] < b[type] ? -1 : 0))) : []
  }

  getSuggestionNickname(suggestion) {
    return suggestion.rowId;
  }

  getSuggestionEmail(suggestion) {
    return suggestion.opportunityName;
  }

  renderOcodRef(suggestion) {
    return (
      <span>{suggestion.rowId}
      </span>
    );
  }

  renderOpportunityName(suggestion) {
    return (
      <span>{suggestion.opportunityName}
      </span>
    );
  }


  onoccodRefNumberChange = (event, { newValue }) => {
    this.props.getOCODRefNumber(newValue)
    this.setState({
      occodRefNumber: newValue
    });
  };

  onopportunityNameChange = (event, { newValue }) => {
    this.props.getOpportunityName(newValue)
    this.setState({
      opportunityName: newValue
    });
  };

  onNicknameSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      occodRefNumberSuggestions: this.getSuggestions(value, 'rowId')
    });
  };

  onNicknameSuggestionsClearRequested = () => {
    this.setState({
      occodRefNumberSuggestions: []
    });
  };

  onNicknameSuggestionSelected = (event, { suggestion }) => {
    this.props.getOpportunityName(suggestion.opportunityName)
    this.setState({
      opportunityName: suggestion.opportunityName
    });
  };

  onEmailSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      emailSuggestions: this.getSuggestions(value, 'opportunityName')
    });
  };

  onEmailSuggestionsClearRequested = () => {
    this.setState({
      emailSuggestions: []
    });
  };

  onEmailSuggestionSelected = (event, { suggestion }) => {
    this.props.getOCODRefNumber(suggestion.rowId)
    this.setState({
      occodRefNumber: suggestion.rowId
    });
  };


  render() {
    const {
      occodRefNumber,
      occodRefNumberSuggestions,
      opportunityName,
      emailSuggestions
    } = this.state;
    const occodRefNumberInputProps = {
      value: occodRefNumber,
      onChange: this.onoccodRefNumberChange,
      maxLength: "15", size: "15",
      width: "380px",
      autoFocus: this.props.OcodFocus,
      disabled: this.props.isEditable ? false : true,
      tabIndex: this.props.tabIndex1,
    };
    const opportunityNameInputProps = {
      value: opportunityName,
      width: "380px",
      onChange: this.onopportunityNameChange,
      maxLength: "40", size: "40",
      disabled: this.props.isEditable ? false : true,
      tabIndex: this.props.tabIndex2
    };
    
    

    const showOcodReference = <Autosuggest suggestions={occodRefNumberSuggestions} onSuggestionsFetchRequested={this.onNicknameSuggestionsFetchRequested} onSuggestionsClearRequested={this.onNicknameSuggestionsClearRequested} onSuggestionSelected={this.onNicknameSuggestionSelected} getSuggestionValue={this.getSuggestionNickname} renderSuggestion={this.renderOcodRef} inputProps={occodRefNumberInputProps} ></Autosuggest>;
    const showOpportunityName = <Autosuggest suggestions={emailSuggestions} onSuggestionsFetchRequested={this.onEmailSuggestionsFetchRequested} onSuggestionsClearRequested={this.onEmailSuggestionsClearRequested} onSuggestionSelected={this.onEmailSuggestionSelected} getSuggestionValue={this.getSuggestionEmail} renderSuggestion={this.renderOpportunityName} inputProps={opportunityNameInputProps} ></Autosuggest>;
    const oppName = this.props.showHelp ? <Tooltip padding={'1'}   eventOff={'onBlur'}  content={this.props.showHelp ? this.props.toolTipOcod : ""} distance={10} direction="up" hoverDelay={400} >
      {showOpportunityName}
    </Tooltip> : <CAux>{showOpportunityName}</CAux>
    const oppRef = this.props.showHelp ? <Tooltip padding={'1'} eventOff={'onBlur'}  content={this.props.showHelp ? this.props.toolTipOpp : ""} distance={10} direction="up" forceDirection={true} hoverDelay={400}>
      {showOcodReference}
    </Tooltip> : <CAux>{showOcodReference} </CAux>
    return (
      <div className="container">
        <Row>
          <Col>
            <Row>
              <Col className={classes.textLeft}>OCOD reference:</Col>
              <Col className={this.props.image ? classes.testClass : " "}>
                {oppRef}
              </Col>
              {/* {this.props.image?this.props.image:''} */}
            </Row>
            <Row className={classes.ortext}><Col > {this.props.col ? '' : 'or'}</Col></Row>
            <Row>
              <Col className={classes.textLeft}>Opportunity name:</Col>
              <Col  className={this.props.image ? classes.testClass : " "}>
                {oppName}
              </Col>
            </Row>
            <Row className={classes.ortext2}><Col > {this.props.col ? '' : 'or'}</Col></Row>
            <Row>
              <Col md={8} >
                {this.props.col ? '' : <div className={classes.oppbtn} >
                  <CustomeButton disabled={!this.props.isEditable} key="0" onClick={this.props.onClick} width={'100%'} data={{ tabindex: 4, color: '#b5b3b3', buttonText: 'Search for an opportunity', type: 'button' }} />
                </div>}


                {/* {this.props.image?this.props.image:''} */}
              </Col>
            </Row>
          </Col>
          <Col md={2} className={classes.imgClass}>
            <span>{this.props.image ? this.props.image : ''}</span>
          </Col>

        </Row>
      </div>
    );
  }
}


export default Suggestion;
