import React,{Component} from 'react'
import ConfirmationModal from '../../UIComponent/ConfirmationModal/ConfirmationModal'
class  ErrorHendler  extends Component{
constructor(props){
    super(props);
}

    render(){
        alert(this.props)
        return( <ConfirmationModal modalFooter="singleButton" message={'wevfgjgbviuhwbeiubriubiuweb'} showModal={this.props.showModal}   />)
    }
}

 export default ErrorHendler




    

