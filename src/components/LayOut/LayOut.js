import React, { Component } from 'react';
import Header from '../Header/Header'
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { onLogOut } from "../../store/Action/LoginAction"
import { axiosInstance } from '../../AxiosHandler';
import axios from 'axios';

import {clearLoginData,logoutSaveModalURL } from '../../HelperFunctions';
class LayOut extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            showSaveConfirmationModal:false
        }
        this.request()
    }
    openModal = () => {
        const modalVisible = !this.state.modalVisible;
        this.setState({
            modalVisible
        });
    }
    onBackDropClicked = () => {
        const modalVisible = !this.state.modalVisible;
        this.setState({
            modalVisible
        });
    }

    close = () => {
        this.setState({
            modalVisible:false
        });
        //clearLoginData()
        this.props.onLogOut({})
        this.props.history.push('/');
    }

    logOut = () => {
        this.closeSaveConfirmationModal()
        this.openModal();
    }
    okay=()=>{
        this.setState({
            modalVisible:false
        });
        this.closeSaveConfirmationModal()
        this.close()
    }

    persistDataAndLogout = () => {
        this.props.setSaveDataOnLogout(true);
        this.closeSaveConfirmationModal()
        this.logOut()  

    }

    creatAssessement(data) {
        axiosInstance.post('Assessment/Persist', data)
            .then(res => {
                const data = res.data.data;
                this.backToAssessmentFromConfirmationModal()
            }).catch(error => {
                console.log(error);
            });
    }

    closeSaveConfirmationModal = ()=>this.setState({showSaveConfirmationModal:false});

    openSaveConfirmationModal = ()=>{
        this.setState({showSaveConfirmationModal:true})
    }

    buttonFunction=[
        this.okay,
        this.logOut
    ]

     request(){
        axios({
            method: 'get',
            url: process.env.REACT_APP_UI+'properties.json',
          }).then((response) => response.data)
            .then((prop) => {
              const showMar = prop.marquee
                this.setState({showMar})
         });
        }



    processLogout = ()=>{
        if(logoutSaveModalURL.indexOf(this.props.location.pathname)!=-1 && this.props.getAndSetIsDirty())
            this.openSaveConfirmationModal()
        else{
            this.props.setSaveDataOnLogout(false);
            this.logOut()
        }
    }
    

    render() {
        

        if (localStorage.getItem("isRefresh")) {
             this.props.history.push('/');
             return null;

        } else {
            const data = localStorage.getItem('username')
            let path=this.props.location.pathname
            return (path.includes('Help')?'':<Header name={this.props.location.pathname != '/' && data ? data : ''}
                openModal={this.openModal} close={this.close.bind(this)}
                onBackDropClicked={this.onBackDropClicked}
                modalVisible={this.state.modalVisible} buttonFunction={this.buttonFunction} logout={this.logOut} 
                showSaveConfirmationModal={this.state.showSaveConfirmationModal}
                openSaveConfirmationModal={this.openSaveConfirmationModal}  
                closeSaveConfirmationModal={this.closeSaveConfirmationModal} 
                persistDataAndLogout={this.persistDataAndLogout}
                processLogout={this.processLogout}
                showMar = {this.state.showMar}
                >
                </Header>)
        }
        //const data= 'LOGIN' in  this.props.oppSerch ? this.props.oppSerch.LOGIN:''

    }

}
const mapStateToProps = state => {
    return { oppSerch: state.oppSerch };
};
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: data => dispatch(onLogOut(data))
    };
};

const LayOutData = connect(mapStateToProps, mapDispatchToProps)(LayOut);

LayOut.propTypes = {
    oppSerch: PropTypes.object.isRequired
};
export default withRouter(LayOutData)
