import React,{Component} from 'react';
import './App.css';
import Login from './components/Login/Login'
import CAUX from './hoc/CAux'
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route,withRouter,Switch  } from 'react-router-dom';
import OpportunitySearch from './components/OpportunitySearch/OpportunitySearch'
import Assessment from './components/Assessment/Assessment'
import Normal from './components/NormalComplexity/Normal'
import Report from './components/Report/Report'
import FastTrack from './components/FastTrack/FastTrack';
import LayOut from './components/LayOut/LayOut'
import FastTrackAssessmentResult from './components/FastTrackAssessmentResult/FastTrackAssessmentResult'
import DownloadAssesment from './components/DownloadAssesment/DownloadAssesment';
import Help from './components/Help/Help';
import ExtractReports from './components/ExtractReports/ExtractReports';
import ListOfAssessment from './components/ListOfAssessment/ListOfAssessment'
import ProtectedRoute from './components/ProtectedRouter/ProtectedRouter'
import { connect } from "react-redux";
import CacheCleaner from './CacheCleaner'
class App extends Component {
  constructor(props) {
    super(props); 
    this.state={
      saveDataOnLogout : false,
      isDirty : false,
    }
  }

  setLogOutState(x){
     this.setState({saveDataOnLogout:x});
     console.log("setting saveDataOnLogout >> "+x)
  }

  getAndSetLogOutState(value){
    let temp = this.state.saveDataOnLogout;
    if(!temp===value){
      this.setState({saveDataOnLogout:value});
    }
    return temp;
  }
 
  getAndSetIsDirty(value){
    let temp = this.state.isDirty;
    console.log("Before isDirty : "+temp)
    if(!temp===value){
      console.log("state of Dirty flag changed")
      this.setState({isDirty:value});
      console.log("After isDirty : "+this.state.isDirty)
    }
   
    return temp;
  }

  
  render(){

    document.addEventListener('keydown',
    function (event) {

      // Internet Explorer
      if ("onhelp" in window){
      // alert("IE was pressed!!");
      window.onhelp = function () {
      return false;
      }
      } 

    if (event.code ===112 || event.key == 'F1' ) {
      event.preventDefault ? event.preventDefault() : (event.returnValue = false); 
       event.stopPropagation();
   
    
    }
    
    });

    

    let loggedIn = this.props.isAuthenticated
    return (
    
      <CacheCleaner>
      {({ loading, isLatestVersion, refreshCacheAndReload }) => {
        if (loading) return null;
        if (!loading && !isLatestVersion) {
          refreshCacheAndReload();
        }
    return(
    <Container  fluid={true}>
     
      <Router basename="/ect" >
        <LayOut
          setSaveDataOnLogout={this.setLogOutState.bind(this)}
          getAndSetIsDirty = {this.getAndSetIsDirty.bind(this)} >
        </LayOut>
        <Switch>
          <ProtectedRoute  path='/assessment'  component={Assessment}
           isAuthenticated={loggedIn}
           getAndSetIsDirty = {this.getAndSetIsDirty.bind(this)} 
          />

          <ProtectedRoute  path='/opportunitysearch/:type'  component={OpportunitySearch} saveDataOnLogout={this.getAndSetLogOutState.bind(this)}  
            isAuthenticated={this.props.isAuthenticated} 
            getAndSetIsDirty = {this.getAndSetIsDirty.bind(this)}
          />

          <ProtectedRoute  path="/FastTrack"  component={FastTrack} saveDataOnLogout={this.getAndSetLogOutState.bind(this)}
            isAuthenticated={this.props.isAuthenticated}
            getAndSetIsDirty = {this.getAndSetIsDirty.bind(this)} 
          />

          <ProtectedRoute  path='/Normal' component ={Normal} saveDataOnLogout={this.getAndSetLogOutState.bind(this)}
            isAuthenticated={this.props.isAuthenticated}
            getAndSetIsDirty = {this.getAndSetIsDirty.bind(this)}
          />

          <ProtectedRoute  path='/Report' component={Report} isAuthenticated={this.props.isAuthenticated}/>
          <ProtectedRoute  path='/download/:id' component={DownloadAssesment} isAuthenticated={this.props.isAuthenticated}/>
          <ProtectedRoute  path="/assessmentresult/:id" saveDataOnLogout={this.getAndSetLogOutState.bind(this)} component={FastTrackAssessmentResult} 
            isAuthenticated={this.props.isAuthenticated} 
            getAndSetIsDirty = {this.getAndSetIsDirty.bind(this)}
          />
        {/* <ProtectedRoute  path ='/Help/:id' component={Help} isAuthenticated={this.props.isAuthenticated} /> */}
        <ProtectedRoute  path='/SearchAssessment/:id' component={ExtractReports} isAuthenticated={this.props.isAuthenticated}/>
        <ProtectedRoute  path='/ListOfAssessment' component={ListOfAssessment} isAuthenticated={this.props.isAuthenticated} />
        <Route  path='/Help/:id' component={Help} />
        <Route exact path='/' component={Login} />
        </Switch>
      </Router>
     
    </Container>
    )}}
    </CacheCleaner>

  );
}
}
const mapStateToProps = state => {
  let payload=state.oppSerch

  return {isAuthenticated:payload?(payload.LOGIN?payload.LOGIN.isAuthenticated:false):false};
};

export default connect(mapStateToProps,null,null,{pure:false})(App);
