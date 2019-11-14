import React, { Component } from 'react';
import { Row, Col, Form, Modal, Alert } from 'react-bootstrap';
import ButtonPanel from '../../UIComponent/ButtonPanel/ButtonPanel';
import litral from '../../litral/litral';
import SearchModal from '../SearchModal/SearchModal';
import SelectBox from '../../UIComponent/SelectBox/SelectBox';
import TitleBar from '../TitleBar/TitleBar'
import Suggestion from '../Suggestion/Suggestion'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import calenderIcon from '../../assets/images/calenderIcon.png';
import serch from '../../assets/images/serch.png';
import classes from './ExtractReports.module.css';
import { axiosInstance } from '../../AxiosHandler';
import Table from '../../UIComponent/Table/Table'
import { connect } from "react-redux";
import Globle from '../../GlobleCss.module.css'
import classNames from 'classnames'
import { oppSerch } from "../../store/Action/OpportunitySerchAction";
import close from '../../assets/images/close.png'
import LoadingOverlay from 'react-loading-overlay';
import Tooltip from 'react-tooltip-lite';
import ConfirmationModal from '../../UIComponent/ConfirmationModal/ConfirmationModal'


class ExtractReports extends Component {

    textForbutton = JSON.parse(JSON.stringify(litral.AssessmentButton[0].buttonText))
    constructor(props) {
        super(props);
        this.state = {
            sector: '',
            account: '',
            startDate: '',
            endDate: new Date(),
            value: '',
            suggestions: [],
            modalVisible: false,
            modalVisibleforAssessement: false,
            occodRefNumber: '',
            opportunityName: '',
            data: [],
            fromdate: '',
            todate: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
            assessementData: [],
            tabledata: { theader: ["Opportunity name", "Account", "Primary horizontal", "Owner", "Sales stage", ""], tbody: [] },
            opportnityId: [],
            assessmentId: [],
            tabledataForAssesment: { theader: ["Opportunity name", "Nickname", "Account", "Next assessment gate", ""], tbody: [] },
            canContinue: false,
            autoSuggest: true,
            getaccounts: [],
            getsectors: [],
            loading: false,
            assessmentGate: [],
            ConformationModal: false,
            showMessage: false
        }
        this.openModal = this.openModal.bind(this);
        this.opneAssesmentModal = this.opneAssesmentModal.bind(this)
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this)

        this.calendarFromRef = React.createRef();
        this.calendarToRef = React.createRef();

    }
    componentWillUnmount() {

        litral.AssessmentButton[0].buttonText = JSON.parse(JSON.stringify(this.textForbutton))
    }
    componentDidMount() {
        //litral.AssessmentButton[1].buttonText=JSON.parse(JSON.stringify(this.textForbutton))
        this.setState({ loading: true });
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function () {
            window.history.pushState(null, "", window.location.href);
        };
        const { OPPORTUNITY } = this.props.payload

        const { selectedOperation } = OPPORTUNITY
        this.getOpportunityNameApi(selectedOperation == "report" ? 'GetMasterData' : 'GetOpenOpportunities');
        this.getOcodSectors();
        this.getAssessmentGateApi()
    }

    getAssessmentGateApi() {
        axiosInstance.get('AssessmentGate/GetAllGates')
            .then(res => {
                const data = res.data;
                this.setState({ assessmentGate: data.data.map((gate) => { return { 'name': gate.gateName, 'id': gate.gateId } }) });
                this.setState({ loading: false })
            }).catch(error => {
                console.log(error);
                this.setState({ loading: false })
            });
    }

    getOpportunityNameApi(data) {
        axiosInstance.get(`OCOD/${data}`)
            .then(res => {
                const data = res.data.data
                this.state.data = res.data.data;

                this.setState({ ...data })
                this.setState({ loading: false });
            }).catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    handleChangeStart(date) {
        const parsedDate = date ? `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}` : ''
        var includ = date ? date.toString() : ''
        includ = includ.includes("GMT")

        if (includ) {
            includ = false
        } else {
            let s = document.getElementById("date_picker_id")
            let pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{2})$/;
            includ = !pattern.test(s.value)
        }


        if (includ || new Date(date) > new Date() || new Date(date) > new Date(this.state.endDate)) {

            this.setState({
                startDate: "",
            });
        } else {

            this.setState({
                startDate: new Date(date),
                fromdate: parsedDate
            });
        }
    }


    handleChangeEnd(date) {
        const parsedDate = date ? `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}` : ''

        var includ = date ? date.toString() : ''
        includ = includ.includes("GMT")
        if (includ) {
            includ = false
        } else {
            let s = document.getElementById("date_picker_end")
            let pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{2})$/;
            includ = !pattern.test(s.value)
        }


        if (includ || new Date(date) > new Date() || new Date(date) < new Date(this.state.startDate)) {
            this.setState({
                endDate: "",
            });
        } else {
            this.setState({
                endDate: date,
                todate: parsedDate
            });
        }
    }


    getOCODRefNumber(suggestion) {

        this.setState({ occodRefNumber: suggestion })
    }

    getOpportunityName(suggestion) {
        this.setState({ opportunityName: suggestion })
    }


    openModal() {
        const autoSuggest = !this.state.autoSuggest
        const modalVisible = !this.state.modalVisible;
        this.setState({ modalVisible, autoSuggest });
        this.setState(prevState => ({
            tabledata: {
                ...prevState.tabledata,
                tbody: [],
                theader: ["Opportunity name", "Account", "Primary horizontal", "Owner", "Sales stage", ""]
            },
        }))
    }

    opneAssesmentModal() {
        const modalVisibleforAssessement = !this.state.modalVisibleforAssessement;
        this.setState({ modalVisibleforAssessement });
    }
    close() {
        const autoSuggest = !this.state.autoSuggest
        const modalVisible = !this.state.modalVisible;
        this.setState({
            modalVisible,
            autoSuggest,
            showMessage: false
        });
    }
    closeAssessement() {
        this.AssessmentId = []
        this.setState({ canContinue: this.AssessmentId.length > 0 ? true : false });
        litral.AssessmentButton[0].buttonText = JSON.parse(JSON.stringify(this.textForbutton))
        const modalVisibleforAssessement = !this.state.modalVisibleforAssessement;
        this.setState({ modalVisibleforAssessement });
    }

    onBackDropClicked(res, e) {
        //   switch(res){
        //     case 'opportunity':
        //         const modalVisible = !this.state.modalVisible;
        //         this.setState({modalVisible});
        //         break;
        //     case 'Assessement':
        //         const modalVisibleforAssessement = !this.state.modalVisibleforAssessement;
        //         this.setState({modalVisibleforAssessement});
        //         break;
        //   }

    }



    backButton() {
        this.props.history.push('/Assessment')
    }
    submit(e) {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        if (this.props.match.params.id == 'report') {
            (localStorage.getItem('ReportCheckBOx') == null || localStorage.getItem('ReportCheckBOx') === 'false') ? this.setState({ ConformationModal: true }) : console.log()

            localStorage.getItem('ReportCheckBOx') === 'true' ? this.moveToNextPage() : console.log()
        } else {
            this.moveToNextPage()
        }

    }
    buttonFunction = [
        this.backButton.bind(this),
        this.submit.bind(this),
    ]




    sellectAll(assessmentId, e) {

        if (e.target.checked) {

            assessmentId = assessmentId.filter((res) => typeof res == 'number')
            this.AssessmentId = assessmentId.map((res) => { return { 'id': res } })
            this.setState({ canContinue: this.AssessmentId.length > 0 ? true : false });
            litral.AssessmentButton[0].buttonText = this.textForbutton + '(' + this.AssessmentId.length + ')'
            this.AssessmentId.length > 0 ? this.AssessmentId.map((res) => typeof res.id == 'number' ? document.getElementById(`default-${res.id}`).checked = true : '') : console.log()

        } else {

            this.AssessmentId.length > 0 ? this.AssessmentId.map((res) => typeof res.id == 'number' ? document.getElementById(`default-${res.id}`).checked = false : '') : console.log()
            this.AssessmentId = []
            this.setState({ canContinue: this.AssessmentId.length > 0 ? true : false });
            litral.AssessmentButton[0].buttonText = this.textForbutton
        }
        if (this.AssessmentId.length === 1) {
            this.props.oppSerch({
                selectedAssessmentNo: [{ assessmentId: assessmentId, status: this.state.assessementData[0].status, isFastrack: this.state.assessementData[0].isFastrack }]
            });
        }
        else {
            this.props.oppSerch({
                selectedAssessmentNo: []
            });
        }

    }


    SearchHideData = (event) => {
        event.preventDefault();
        event.stopPropagation();
        //if(this.state.account=='' || this.state.sector==''){this.getOpportunitySerchData()}else{this.getAccountAndSectorApi();}

        this.searchDataForSectorAndAccount();
    }

    searchDataForSectorAndAccount = () => {

        const filteredData = this.state.data.filter((res) => {
            if (this.state.sector == '' || this.state.sector === '-1') {
                return res;
            }
            else {
                if (this.state.account === '' || this.state.account === '-1') {
                    return res.sector == this.state.sector;
                }
                else {
                    return res.account === this.state.account && res.sector === this.state.sector
                }
            }
        })

        const tbody = filteredData.map((x) => {
            return { opportunityName: x.opportunityName, Account: x.account, primaryHorizontal: x.primaryHorizontal, ownerFullName: x.ownerFullName, salesStage: x.salesStage, update: 'update' }
        })

        if (tbody.length === 0) {
            this.setState({
                showMessage: true
            })
        }
        else {
            this.setState({
                showMessage: false
            })
        }

        const opportnityId = filteredData.map((x) => x.rowId)
        this.setState(prevState => ({
            tabledata: {
                ...prevState.tabledata,
                tbody: tbody,
                theader: ["Opportunity name", "Account", "Primary horizontal", "Owner", "Sales stage", ""]
            },
            opportnityId: [...opportnityId, opportnityId]
        }))
    }



    AssessmentId = []
    getAssessment(data) {
        axiosInstance.post(`Assessment/GetDetailForOpportunity`, data)
            .then(res => {
                const Data = res.data.data
                const tbody1 = Data ? Data.map((x) => {
                    const getName = this.state.assessmentGate.filter((res) => { return res.id == x.gateId })
                    return { ocodOpportunityName: x.opportunityName, nickName: x.nickname, account: x.account, getName: getName.length > 0 ? getName[0].name : '', update: 'update' }
                }) : '';
                this.opneAssesmentModal()
                const opportnityId = Data.map((x) => x.opportunityId)
                const assessmentId = Data.map((x) => x.assessmentId)

                this.setState(prevState => ({
                    tabledataForAssesment: {
                        ...prevState.tabledataForAssesment,
                        tbody: tbody1
                    },
                    assessementData: Data,
                    opportnityId: [...opportnityId, opportnityId],
                    assessmentId: assessmentId
                }))

            }).catch(error => {
                console.log(error);
            });
    }



    handleChange(res, event) {

        const sec = event.target.value;
        switch (res) {
            case 'sector':
                this.setState({
                    sector: sec !== '-1' ? sec : '-1',
                    getaccounts: [],
                    account: ''
                })

                if (sec !== '-1') {
                    this.setState({
                        loading: true

                    })
                    this.getAccountsForSelectedSector(sec);
                }
                else
                    this.setState({ loading: false })
                break;
            case 'account':
                this.setState({
                    account: sec !== '-1' ? sec : ''
                })

                break;
        }

    }

    getId = (id, e) => {
        this.getAssessmentData(id)
        this.close();

        //this.props.history.push(`/opportunitysearch/${id}`)
    }

    count = 0;
    collectAssessementID = (id, e) => {
        const data = { 'id': id }
        e.target.checked ? this.AssessmentId.push(data) : this.remove(this.AssessmentId, data)

        this.setState({ canContinue: this.AssessmentId.length > 0 ? true : false });
        const dataForIndivual = this.AssessmentId.length == 1 ? this.state.assessementData.filter((res) => { return res.assessmentId == id }) : []

        this.AssessmentId.length == this.state.assessmentId.length ? document.getElementById('default').checked = true : document.getElementById('default').checked = false

        litral.AssessmentButton[0].buttonText = this.textForbutton + '(' + this.AssessmentId.length + ')'
        this.props.oppSerch({
            selectedAssessmentNo: dataForIndivual ? dataForIndivual : []
        });
    }

    postAssessmentID(data) {

        axiosInstance.post(`Report/DownloadSummary`, data)
            .then(res => {
                this.props.oppSerch({
                    xlurlTOken: res.data.split("_")
                });
                this.props.history.push(`/download/Exteact${res}`);
            }).catch(error => {
                console.log(error);
            });
    }
    submitSelectedAssesment(e) {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        const { sector, account, occodRefNumber, opportunityName, fromdate, todate } = this.state
        const data = { extractedBy: localStorage.getItem('userid'), OpportunityId: occodRefNumber, Account: account, Sector: sector, OpportunityName: opportunityName, Fromdate: fromdate, Todate: todate, assessmentId: this.AssessmentId }

        this.AssessmentId.length > 0 ? this.postAssessmentID(data) : console.log()
    }


    remove(array, element) {
        const index = array.indexOf(element);
        array.splice(index, 1);
        this.AssessmentId = array;
    }

    getOpportunityId = (id, e) => {
        let getSelectedData = []
        getSelectedData = this.state.assessementData.filter((res) => {
            return res.assessmentId == id
        })

        const { opportunityId, opportunityName, nickname, gateId, assessmentGate, isFastrack } = getSelectedData.length > 0 ? getSelectedData[0] : ''
        this.props.oppSerch({
            occodRefNumber: opportunityId,
            opportunityName: opportunityName,
            nickName: nickname,
            assessmentGateId: gateId,
            assessmentGateName: assessmentGate,
            isFastTrack: isFastrack,
            selectedOperation: "update",
            assessmentId: id
        });
        this.props.history.push(`/opportunitysearch/${'update'}`)
    }

    getAssessmentData(id) {
        let getSelectedData = []
        getSelectedData = this.state.data.filter((res) => {
            return res.rowId == id
        })
        const { rowId, opportunityName, account, sector } = getSelectedData.length > 0 ? getSelectedData[0] : ''

        this.setState({
            occodRefNumber: rowId,
            opportunityName: opportunityName,
            account: account,
            sector: sector
        })
        this.props.oppSerch({
            occodRefNumber: rowId,
            opportunityName: opportunityName,
        });
    }


    getOcodData = () => {
        //return this.state.data;
        return this.state.data.filter((res) => {
            if (this.state.sector == '' || this.state.sector === '-1') {
                return res;
            }
            else {
                if (this.state.account === '' || this.state.account === '-1') {
                    return res.sector == this.state.sector;
                }
                else {
                    return res.account === this.state.account && res.sector === this.state.sector
                }
            }
        })
    }

    getAccountsForSelectedSector = (sec) => {

        axiosInstance.get(`OCOD/GetOcodAccounts/${sec}`)
            .then(res => {
                const accounts = res.data.data;
                this.state.getaccounts = accounts;
                this.setState({ loading: false })
            }).catch(error => {
                console.log(error);
                this.setState({ loading: false })
            });
    }

    getOcodSectors = () => {
        axiosInstance.get('OCOD/GetOcodSectors')
            .then(res => {
                const sectors = res.data.data;
                this.state.getsectors = sectors;
                this.setState({ loading: false })
            }).catch(error => {
                console.log(error);
                this.setState({ loading: false })
            });
    }


    buttonFunction = [
        this.backButton.bind(this),
        this.submit.bind(this)
    ]
    buttonFunctionforClose = [this.close.bind(this)]
    buttonFUnctionForAssClose = [this.submitSelectedAssesment.bind(this)]

    image = () => <Col><span onClick={this.openModal}><img className={classes.calenderIconHeight} src={serch} alt="Sopra Steria" /></span></Col>


    raiseInvoiceClicked = () => {
        var otherWindow = window.open(window.location.origin + `/ect/Help/searchResults.html`,"ectHelpWindow");
        otherWindow.opener = null;
    }



    checkBOx(event) {
        localStorage.setItem('ReportCheckBOx', event.target.checked)
    }
    hideConformation = () => {
        this.setState({ ConformationModal: false })
        this.moveToNextPage()
    }
    moveToNextPage() {
        const { sector, account, occodRefNumber, opportunityName, fromdate, todate } = this.state
        const data = { OpportunityId: occodRefNumber, Account: account, Sector: sector === '-1' ? '' : sector , OpportunityName: opportunityName, Fromdate: fromdate, Todate: todate }
        this.getAssessment(data);
    }

    render() {
        const { occodRefNumber, opportunityName } = this.state;
        const image = this.image();
        const toolTipOppUpdate = <p>You can select a specific OCOD opportunity by entering the OCOD Reference Number in this field, using the “smart search” functionality.<br /><b>Hint:</b> You can also press the magnifying glass to access an OCOD opportunity “lookup” feature</p>
        const toolTipOcodUpdate = <p>You can select a specific OCOD opportunity by entering the OCOD Opportunity Name in this field, using the “smart search” functionality.<br /><b>Hint:</b> You can also press the magnifying glass to access an OCOD opportunity “lookup” feature</p>


        return (

            <div>

                <Modal onHide={this.onBackDropClicked.bind(this, 'opportunity')} show={this.state.modalVisible} size="xl">
                    <LoadingOverlay active={this.state.loading && this.state.modalVisible} spinner text='Getting data...' >
                        <SearchModal selectedSector={this.state.sector} selectedAccount={this.state.account} data={this.state.data} Buttondata={[litral.serchButton]}
                            tabledata={this.state.tabledata ? this.state.tabledata : litral.opportunitySertchTable} header="Search Opportunities"
                            close={this.close.bind(this)} buttonFunction={this.buttonFunctionforClose}
                            getId={this.getId}
                            id="searchOpportunities"
                            accounts={this.state.getaccounts} sectors={this.state.getsectors}
                            SearchHideData={this.SearchHideData} handleChange={this.handleChange.bind(this)} serchButton2={litral.serchButton2}
                            findAnOpportunity={this.state.showMessage ? litral.findAnOpportunityMessage : litral.findAnOpportunity} opportnityId={this.state.opportnityId} isAccountDisabled={this.state.sector === '' || this.state.sector === '-1'} />
                    </LoadingOverlay></Modal>
                {this.props.match.params.id == 'report' ? <ConfirmationModal modalFooter="singleButton" message={litral.reportConformationMassage} includeCheckbox={true} checkboxKey={'ReportCheckBOx'}
                    checkBoxFunction={this.checkBOx.bind(this)}
                    localCheck={(localStorage.getItem('ReportCheckBOx') == null || localStorage.getItem('ReportCheckBOx') === 'false')}
                    showModal={this.state.ConformationModal} onClick={this.hideConformation} onHide={this.hideConformation} checboxLeble={litral.checboxLeble} /> : ''}

                <Modal onHide={this.onBackDropClicked.bind(this, 'Assessement')} show={this.state.modalVisibleforAssessement} size="xl">
                    <Row className={classes.ContainerVertical}>
                        <Col lg={12}>
                            <Alert className={Globle.subHeaderText}>Search Results <Alert className={classes.imageAlert} > <img src={close} tabIndex="3" onClick={this.closeAssessement.bind(this)} className={classes.imageStyle} alt="Sopra Steria" /></Alert></Alert>
                            <Col lg={12} style={{ textAlign: 'right' }}>
                                <div>
                                    <span style={{ marginLeft: '15px' }} >
                                        <u><a tabIndex={-1} href="#" onClick={this.raiseInvoiceClicked}><b>Help with this page</b></a></u>
                                    </span>
                                </div>
                            </Col>
                            <div style={{ maxHeight: "65vh", height: 'auto', overflowY: 'scroll' }}>
                                <Table data={this.state.tabledataForAssesment ? this.state.tabledataForAssesment : litral.table}
                                    getId={this.props.match.params.id == 'report' ? this.collectAssessementID : this.getOpportunityId} sellectAll={this.sellectAll.bind(this)}
                                    opportnityId={this.state.assessmentId} checkbox={this.props.match.params.id == 'report' ? true : ''} >
                                </Table>
                            </div>
                            <Form noValidate lg={12} className="mb-2" onSubmit={this.submitSelectedAssesment.bind(this)}><ButtonPanel Buttondata={this.props.match.params.id == 'report' ? litral.AssessmentButton : []}
                                onClick={this.closeAssessement.bind(this)} buttonFunction={this.buttonFUnctionForAssClose[0]} floatRight={classes.floatRight} disabled={!this.state.canContinue}></ButtonPanel>
                                <Alert className={classNames(Globle.normalText, classes.marginForText)} style={{ margin: 'auto', float: 'left' }}>{this.props.match.params.id == 'report' ? litral.searchPageText : litral.findAnOpportunity}</Alert></Form>
                        </Col>
                    </Row>
                </Modal>
                <LoadingOverlay active={this.state.loading && !this.state.modalVisible} spinner text='Getting data...' >
                    <Form noValidate onSubmit={this.submit.bind(this)}>
                        <TitleBar title="Search Complexity Assessments" id="searchComplexityAssessments" ></TitleBar>
                        <Row className="pt-4" style={{ margin: '0px 0px 0px 2px' }}>
                            <Col md={6}>
                                <Row className={classes.paddingForBOX}>
                                    <Col ><label >Sector:</label> </Col>
                                    <Col >
                                        <Tooltip   eventOff={'onBlur'} content={litral.extractReports.helpSector} distance={10} direction="up" hoverDelay={400}>
                                            <SelectBox autoFocus={true} tabIndex="1" selectedOption={this.state.sector} name="sector" handleChange={this.handleChange.bind(this, 'sector')} optiondata={this.state.getsectors}></SelectBox>
                                        </Tooltip>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row className={classes.paddingForBOX}>
                                    <Col  ><label >Account:</label></Col>
                                    <Col >
                                        <Tooltip    eventOff={'onBlur'} content={litral.extractReports.helpAccount} useHover={!(this.state.sector == '-1' ||this.state.sector == '')} distance={10} direction="up" hoverDelay={400}>
                                            <SelectBox tabIndex="2" selectedOption={this.state.account} name="account" handleChange={this.handleChange.bind(this, 'account')} optiondata={this.state.getaccounts} isDisabled={this.state.sector === '' || this.state.sector === '-1'}></SelectBox>
                                        </Tooltip>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                <Row className={classes.upperText}>
                                    <Col>Find a specific opportunity</Col>
                                </Row>
                                <Row className={classes.paddingForBOX}>
                                    {this.state.autoSuggest ? <Suggestion showHelp={true} toolTipOcod={toolTipOcodUpdate} toolTipOpp={toolTipOppUpdate} tabIndex1="3" tabIndex2="4" data={this.getOcodData.bind(this)} occodRefNumber={occodRefNumber} opportunityName={opportunityName} col={3} colSrmartSerch={5} image={image}
                                        getOpportunityName={this.getOpportunityName.bind(this)} getOCODRefNumber={this.getOCODRefNumber.bind(this)} isEditable={true}></Suggestion> : ""}
                                </Row>
                            </Col>

                            <Col md={6}>
                                <Row className={classes.paddingForBOX}>
                                    <Col style={{ textAlign: 'center' }}>Date created:<label style={{ float: 'right' }}>From:</label></Col>
                                    <Col><DatePicker tabIndex="5"
                                        selected={this.state.startDate}
                                        selectsStart
                                        maxLength="8"
                                        dateFormat="dd/MM/yy"
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        maxDate={this.state.endDate}
                                        onSelect={this.handleChangeStart}
                                        placeholderText=" /  /  "
                                        ref={this.calendarFromRef}
                                        id="date_picker_id"

                                    /><span><img className={classes.calenderIconHeight} onClick={() => { this.calendarFromRef.current.setOpen(true) }} src={calenderIcon} alt="Sopra Steria" /></span>
                                    </Col>
                                </Row>
                                <Row className={classes.paddingForBOX}>
                                    <Col><label style={{ float: 'right' }}>To:</label></Col>
                                    <Col><DatePicker tabIndex="6"
                                        selected={this.state.endDate}
                                        selectsEnd
                                        dateFormat="dd/MM/yy"
                                        minDate={this.state.startDate}
                                        startDate={this.state.startDate}
                                        endDate={this.state.endDate}
                                        maxDate={new Date()}
                                        onSelect={this.handleChangeEnd}
                                        style={{ padding: '5px' }}
                                        placeholderText=" /  /  "
                                        ref={this.calendarToRef}
                                        id="date_picker_end"
                                    /><span><img src={calenderIcon} onClick={() => { this.calendarToRef.current.setOpen(true) }} className={classes.calenderIconHeight} alt="Sopra Steria" /></span></Col></Row>

                            </Col>

                        </Row>
                        <ButtonPanel Buttondata={litral.nextAndBackButton} buttonFunction={this.buttonFunction}></ButtonPanel>
                    </Form>
                </LoadingOverlay>
            </div>

        )
    }


}

const mapStateToProps = state => {
    return { payload: state.oppSerch };
};
const mapDispatchToProps = dispatch => {
    return {
        oppSerch: data => dispatch(oppSerch(data))
    };
};
const ExtractReportsData = connect(mapStateToProps, mapDispatchToProps)(ExtractReports);

export default ExtractReportsData