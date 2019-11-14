
import React, { Component } from 'react';
import classes from './../ToolBar/ToolBar.module.css'
import ToolBarReadOnly from './DisplayToolBar/DisplayToolBar'
import OpportunitySearchToolBar from './SearchToolBar/SearchToolBar'

class ToolBar extends Component {

  constructor(props) {
    super(props);
  }

  updateSearchParameter(data){
    //this.props.updateSearchParameter(data);
    console.log(data)
  }
 
  toolBar(type){
      switch(type) {
          case 'readonly':
            return <ToolBarReadOnly   redOnlydataForToolBar={this.props.redOnlydataForToolBar}/>;
          case 'opportunitysearch':
            return <OpportunitySearchToolBar selectedSector={this.props.selectedSector} selectedAccount={this.props.selectedAccount} updateSearchParameter={this.updateSearchParameter.bind(this)} 
            hide={this.props.SearchHideData}   handleChange={this.props.handleChange}
            accounts={this.props.accounts} sectors={this.props.sectors} Buttondata={this.props.Buttondata} isAccountDisabled={this.props.isAccountDisabled}/>;
      }
  }
    render (){
        return(
            <div className={classes.Toolbar}>
                {this.toolBar(this.props.type)}
            </div>
        )
    }
}

export default ToolBar;