import React, { Component } from 'react'
import { Form, Row, Col } from 'react-bootstrap';
import classes from './DownloadAssesment.module.css'
import ButtonPanel from '../../UIComponent/ButtonPanel/ButtonPanel'
import litral from '../../litral/litral'
import ToolBarContainer from '../ToolBar/ToolBar'
import TitleBar from '../TitleBar/TitleBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import axios from 'axios';
import { baseURL, baseUIURL } from '../../AxiosHandler'
import ConfirmationModal from '../../UIComponent/ConfirmationModal/ConfirmationModal';


class DownloadAssesment extends Component {
    constructor(props) {
        super(props)

        const { OPPORTUNITY, CREATEASSESSEMENT } = this.props.payload
        const { selectedOperation, selectedAssessmentNo } = OPPORTUNITY ? OPPORTUNITY : ''
        const { isFastrack } = CREATEASSESSEMENT ? CREATEASSESSEMENT : ''
        const { id } = this.props.match.params
        console.log(id)
        this.state = {
            id: id,
            selectedOperation: selectedOperation,
            isFastrack: selectedAssessmentNo != undefined && selectedAssessmentNo.length > 0 ? selectedAssessmentNo[0].isFastrack : isFastrack,
            selectedAssessmentNo: selectedAssessmentNo ? selectedAssessmentNo : [],
            trialMessege1013: false
        }
    }

    nextButton = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (this.props.payload.OPPORTUNITY.selectedOperation == 'trial') {
            this.setState({
                trialMessege1013: true
            })
        }
        else {
            this.props.history.push('/Assessment')
        }
        // this.props.history.push('/Assessment')
    }
    backButton = () => {
        window.close();
    }
    buttonFunction = [
        //this.backButton.bind(this),
        this.nextButton.bind(this),
    ]
    reportData = []
    creatul = () => {
        if (this.state.isFastrack == 1) {
            this.reportData[0] = litral.reportData[0]
        } else {
            this.reportData = litral.reportData
        }

        return this.reportData.map((x, index) => {
            return <li key={index}>
                <FontAwesomeIcon icon={index == 0 ? faFilePdf : faFileImage} style={{ marginRight: '15px' }} transform='down-3 grow-6' />
                <a href='#' style={{ color: 'black' }} onClick={this.downLoadFunction[index]}><u>{x}</u></a>
            </li>
        })
        //}

    }

    createReportForXl = () => (<li key={0}>
        <FontAwesomeIcon icon={faFileExcel} style={{ marginRight: '15px' }} transform='down-3 grow-6' />
        <a href='#' style={{ color: 'black' }} onClick={this.downLoadFunctionxl.bind(this)}><u>Complexity Assessment Report (xls)</u></a>
    </li>)
    downLoadFunctionxl() {
        console.log(this.props)
        const { OPPORTUNITY } = this.props.payload
        const { xlurlTOken } = OPPORTUNITY ? OPPORTUNITY : ''
        console.log(xlurlTOken)
        const url = `${baseURL}Report/DownloadSummary/${xlurlTOken[1]}`
        window.open(url)
        // axiosInstance.defaults.headers.common['Accept']="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        // axiosInstance.get(url)
        // .then(res => { 
        //     console.log('dfhhdf')
        //     console.log(res)
        //     this.showFile(res.data)
        // }).catch(error => {

        // });
    }

    // closeTrialModal = () => {
    //     this.setState({
    //         trialMessege1013: false
    //     })
    // }

    downLoadFunction = [
        this.getDownloadReportPDF.bind(this),
        this.getDownloadReportUnweighted.bind(this),
        this.getDownloadReportWeighted.bind(this)
    ]

    getDownloadReportPDF() {
        const { OPPORTUNITY } = this.props.payload
        const { data } = OPPORTUNITY ? OPPORTUNITY : ''
        const { id } = data ? data : ''
        let Assid = this.state.selectedAssessmentNo.length > 0 ? this.state.selectedAssessmentNo[0].assessmentId : id
        let url = `${baseURL}Report/DownloadReport/${Assid}`
        if (this.props.payload.OPPORTUNITY.selectedOperation == 'trial') {
            axios({
                method: 'get',
                url: process.env.REACT_APP_UI+'properties.json',
              }).then((response) => response.data )
                .then((prop) => {
                  const sample = prop.sample
                  const fastTrackSample = prop.fastTrackSample
            url =`${baseUIURL}${sample}`
            if (this.state.isFastrack == 1) {
                url = `${baseUIURL}${fastTrackSample}`
                
            } 
            console.log(126,url)
            this.getDownloadApiCallPDF(url)
             });
        } else {
            url = `${baseURL}Report/DownloadReport/${Assid}`
            this.getDownloadApiCallPDF(url)
        }
    }


    getDownloadReportUnweighted() {
        const { OPPORTUNITY } = this.props.payload
        const { data } = OPPORTUNITY ? OPPORTUNITY : ''
        const { id } = data ? data : ''
        let Assid = this.state.selectedAssessmentNo.length > 0 ? this.state.selectedAssessmentNo[0].assessmentId : id
        let url = `${baseURL}Report/Unweighted/${Assid}`
        if (this.props.payload.OPPORTUNITY.selectedOperation == 'trial') {
            url = `${baseUIURL}/samples/sampleunweighted.png`
        } else {
            url = `${baseURL}Report/Unweighted/${Assid}`
        }
        this.getDownloadApiCallIMAGE(url)
    }


    getDownloadReportWeighted() {
        const { OPPORTUNITY } = this.props.payload
        const { data } = OPPORTUNITY ? OPPORTUNITY : ''
        const { id } = data ? data : ''
        let Assid = this.state.selectedAssessmentNo.length > 0 ? this.state.selectedAssessmentNo[0].assessmentId : id
        let url = `${baseURL}Report/Weighted/${Assid}`
        if (this.props.payload.OPPORTUNITY.selectedOperation == 'trial') {
            url = `${baseUIURL}/samples/sampleweighted.png`
        } else {
            url = `${baseURL}Report/Weighted/${Assid}`
        }
        this.getDownloadApiCallIMAGE(url)

    }
    getDownloadApiCallPDF(url) {
        window.open(url)
        //axiosInstance.defaults.headers.common['Accept']="*"
        // axiosInstance.defaults.headers.common['Content-Type']="application/pdf"
        // axiosInstance.defaults.headers.common['Content-Disposition']="attachment";
        // axiosInstance.get(url)
        // .then(res => { 
        //     console.log(res.headers)
        //     FileDownload(res.data, 'Complexity Assessment Report.pdf')
        //    //this.showPDF(res.data)

        // }).catch(error => {

        // });
    }
    getDownloadApiCallIMAGE(url) {
        window.open(url)
        // axiosInstance.defaults.headers.common['Accept']="*"
        // axiosInstance.get(url)
        // .then(res => { 
        //     console.log(res.headers)

        //   this.showImage(res.data)

        // }).catch(error => {

        // });
    }

    showFile(blob) {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([blob], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
        console.log(newBlob.size)

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        link.download = "file.xls";
        link.click();
        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
        }, 100);



    }
    showPDF(blob) {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([blob], { type: "application/pdf" })
        console.log(newBlob.size)

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        link.download = "file.pdf";
        link.click();
        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
        }, 100);



    }

    showImage(blob) {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([blob], { type: "image/png" })
        console.log(newBlob.size)
        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        link.download = "img.png";
        link.click();
        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
        }, 100);



    }


    componentDidMount() {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };
    }

    render() {
        //console.log("isFastrack"+ this.props.oppSerch.OPPORTUNITY.selectedOperation)
        console.log("isFastrack" + this.props.payload.OPPORTUNITY.selectedOperation);
        const ul = <ul className={classes.ul}>{this.creatul()}</ul>
        const xl = <ul className={classes.ul}>{this.createReportForXl()}</ul>
        return (
            <div>
                <ConfirmationModal modalFooter="singleButton" formattedMsg={litral.trialMessege1013} showModal={this.state.trialMessege1013} onClick={()=>{this.props.history.push('/Assessment')}} />

                <Form noValidate onSubmit={this.nextButton}>
                    <TitleBar className="mt-1" title={this.state.selectedOperation == 'report' && this.state.selectedAssessmentNo.length != 1 ? litral.extReport_Tital : litral.reportNormalAndFarst_Tital} id={this.state.selectedOperation == 'report' ? "downloadReport" : "downloadyourComplexityAssessmentReport"}></TitleBar>
                    {this.state.id == 'report' ? <ToolBarContainer type='readonly' redOnlydataForToolBar={litral.redOnlydataForToolBar} /> : ''}
                    <div style={{ margin: '10px 0px 0px 14px' }}>
                        <h5 className={this.state.id == 'report' ? '' : 'mt-5'}>{this.state.id == 'report' ? litral.reportNormalAndFarst_Text : litral.extReport}</h5>
                        <h6>Downloads : </h6>
                    </div>
                    {this.state.selectedOperation == 'report' && this.state.selectedAssessmentNo.length != 1 || (this.state.selectedAssessmentNo.length == 1 ? this.state.selectedAssessmentNo[0].status == 0 : false) ? xl : ul}
                    <ButtonPanel Buttondata={litral.HomeButton} buttonFunction={this.buttonFunction} floatRight={classes.floatRight} ></ButtonPanel>
                </Form>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return { payload: state.oppSerch };
};
const DownloadAssesmentData = connect(mapStateToProps)(DownloadAssesment);

export default DownloadAssesmentData;