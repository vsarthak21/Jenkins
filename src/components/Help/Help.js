import React,{Component} from 'react';

class Help extends Component{

    constructor(props){
        super(props)
        console.log(this.props.match.params.id)
    }
    
   render(){ return<div>
        {this.props.match.params.id === "home" ?"home.html":''}
        {this.props.match.params.id === "selectOpportunity" ?"selectOpportunity.html":''}
        {this.props.match.params.id === "fastTrack" ? "fastTrack.html" :''}
        {this.props.match.params.id === "fastTrackAssessmentModerate" ?"fastTrackAssessmentModerate.html":''}
        {this.props.match.params.id === "searchOpportunities" ?"searchOpportunities.html":''}



        {this.props.match.params.id === "normalComplexity" ?"normalComplexity.html":''}
        {this.props.match.params.id === "normalComplexityAssessmentModerate" ?"normalComplexityAssessmentModerate.html":''}
        {this.props.match.params.id === "searchResults" ?"searchResults.html":''}
        {this.props.match.params.id === "downloadReport" ?"downloadReport.html":''}
        {this.props.match.params.id === "downloadyourComplexityAssessmentReport" ?"downloadyourComplexityAssessmentReport.html":''}
        {this.props.match.params.id== "searchComplexityAssessments"?"searchComplexityAssessments.html":''}

    </div>
   }

}
export default Help;