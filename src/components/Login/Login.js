import React ,{ Component } from 'react';
import classes from './Login.module.css';
import Input from '../../UIComponent/InputText/InputText';
import ButtonPanel from '../../UIComponent/ButtonPanel/ButtonPanel'
import litral from '../../litral/litral';
import {Alert, Row,Col} from 'react-bootstrap';
import Globle from '../../GlobleCss.module.css'
import classNames from 'classnames'
import {axiosInstance} from '../../AxiosHandler';
import {showSpinner,clearLoginData} from '../../HelperFunctions';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login,onEditInspection } from "../../store/Action/LoginAction";
import LoadingOverlay from 'react-loading-overlay';
import ConfirmationModal from '../../UIComponent/ConfirmationModal/ConfirmationModal'

class Login extends Component{
    constructor(props){
        super(props)
        this.check1 = this.moveToNextPage.bind(this);
        this.state={
            userid:'',
            pass:'',
            loading:false,
            showModal:false,
            errorMessage:'',
            ConformationModal:false
        }
      //clearLoginData()
    }

    handleChange(res,event){
        if(litral.inputText[0].placeholder===res){
            this.setState({userid:event.target.value})
        }else{
            this.setState({pass:event.target.value})
        }
    
    }

    creatInput=()=>(<div>{litral.inputText.map((x,index)=>{return (<Input autoFocus={x.autoFocus} tabIndex={x.tabindex} key={index} placeholder={x.placeholder} Type={x.type} value={index===0 ? this.state.userid : this.state.pass} handleChange={this.handleChange.bind(this)} maxlength='30'></Input>)})}</div>)

    moveToNextPage(){
        this.props.history.push('/Assessment')
    }
    back=()=>{
        window.open(window.location, '_self').close()
        //setTimeout (window.close, 1000);
    }
    componentDidMount(){
        
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = function() {
            window.history.pushState(null, "", window.location.href);
        };
    }

    handleSubmit(event){
        this.setState({loading:true});
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        axiosInstance.post('Login', { 'username':this.state.userid,'password':this.state.pass })
        .then(res => {
            if (form.checkValidity() === true && res.data) {
                const  Data = {...res.data,username:this.state.userid,isAuthenticated:true}
                this.props.onLogin(Data);
                //localStorage.setItem('loginCheckBOx',false)
               
                (localStorage.getItem('loginCheckBOx')==null || localStorage.getItem('loginCheckBOx')==='false') ?this.setState({ConformationModal:true}):console.log()

                localStorage.setItem('webtoken',`Bearer  ${res.data.bearer}`)
                axiosInstance.defaults.headers.common['Authorization']=`Bearer  ${res.data.bearer}`
                localStorage.setItem('userid',this.state.userid)
                localStorage.setItem('username',res.data.name)
                localStorage.getItem('loginCheckBOx')==='true' && localStorage.getItem('webtoken')?this.moveToNextPage():console.log() 
            }
        }).catch(error => {
            if (error.response) {
                /* * The request was made and the server responded with a * status code that falls out of the range of 2xx*/
                if(error.response.status===400){this.setState({showModal:true, errorMessage:"AD-ONE does not recognise these logon credentials. Please re-enter your AD-ONE User Name and Password to access the Engagement Complexity Tool"}) }
            }else
                this.setState({showModal:true, }) 
               
                clearLoginData()
            this.setState({pass:'',loading:false});
                 
        });
    }

    buttonFunction=[
        this.back,
        this.handleSubmit.bind(this),
    ]
    checkBOx(event){
        localStorage.setItem('loginCheckBOx',event.target.checked)
    }

    hideModal=()=>this.setState({showModal:false, errorMessage:'',ConformationModal:false})
    
    hideConformation=()=>{
        this.setState({ConformationModal:false})
        this.moveToNextPage()
    }
    render()
    {
        const{userid,pass}=this.state
      
       
        const creatInput= this.creatInput()
        return(
            <div>
            <ConfirmationModal modalFooter="singleButton" message={litral.loginConformationMassage} includeCheckbox={true} checkboxKey={'loginCheckBOx'} checkBoxFunction={this.checkBOx.bind(this)}
            localCheck={(localStorage.getItem('loginCheckBOx')==null || localStorage.getItem('loginCheckBOx')==='false')}
            showModal={this.state.ConformationModal} onClick={this.hideConformation} onHide={this.hideConformation}  checboxLeble={litral.checboxLeble}/>

            <ConfirmationModal modalFooter="singleButton" message={this.state.errorMessage} showModal={this.state.showModal} onClick={this.hideModal} onHide={this.hideModal} />
            <LoadingOverlay active={this.state.loading} spinner  text='Logging you in...' >
            <form noValidate name="form"  onSubmit={this.handleSubmit.bind(this)} >
                <Row className={classes.form_login}>
                    <Col sm="2" className={classNames(Globle.subHeaderText,classes.loginTexMargin)}>Login</Col>
                    <Col sm="4">
                        {creatInput}
                        <Alert className={classNames(Globle.normalText,classes.loginText)}>{litral.textForLogin}</Alert> 
                    </Col>
                    <Col sm="6" className={classes.warningText}>
                       {litral.warningMassage}
                    </Col>
                </Row>
                <ButtonPanel Buttondata={litral.inputLoginText} floatRight={classes.floatRight} buttonFunction={this.buttonFunction[1]} disabled={userid&&pass&&pass.length>=12?false:true}></ButtonPanel>
                {showSpinner(this.state.loading)}
            </form>
            </LoadingOverlay>
            </div>
        )
    }
 

}
 // Dispatch action to add to store
 const mapDispatchToProps = dispatch => {
    return {
        onLogin: data => dispatch(login(data)),
        onEditInspection:data=>dispatch(onEditInspection(data))
    };
};

// Wire it up together and export
 const LoginData = connect(null, mapDispatchToProps)(Login);



export default LoginData;
