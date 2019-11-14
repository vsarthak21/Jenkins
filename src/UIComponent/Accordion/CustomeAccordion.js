import React,{Component} from 'react';
import {Accordion,Card,Button} from 'react-bootstrap';
import classes from './Accordion.module.css';
import rightDropdown from '../../assets/images/rightDropdown.png';
import CustomeButton from '../../UIComponent/Button/CustomeButton';
import Tooltip from 'react-tooltip-lite';
import litral from '../../litral/litral';

class CustomeAccordion extends Component {
    constructor(props){
        super(props)
        this.state = {
          open1: false,
        };
    }
   
   
 
   cerateButton =()=> (<div style={{marginTop:'10px',float:'right',marginBottom:'10px' , display: 'flex' }}>

          <CustomeButton key="1" data={this.props.litelar[2]}  onClick={this.props.saveButton} />
          {this.props.index!==3?
            <CustomeButton  key="0" data={this.props.litelar[1]} disabled={this.props.disabled}  onClick={this.props.nextButton.bind(this,this.props.index)}/> 
            :
            <Tooltip content={litral.nextbuttonSubnit} distance={9} direction="up" hoverDelay={400} >
               <CustomeButton key="0" data={this.props.litelar[1]} disabled={this.props.disabled} margin={'0 0 0 20px'} onClick={this.props.nextButton.bind(this,this.props.index)}/> 
            </Tooltip>
          }
          </div>)

    render(){
      const {index,selecter,data,length,litelar,facroty ,open} =this.props
      const cerateButton = this.cerateButton();
        return (
                  <div className="card">
                    <div className={classes.cardHeader} id={`heading${index}`} onClick={this.props.clickListener.bind(this,index)}>
                      <div  className=" mb-0 " data-toggle="collapse" data-target={`#Acc${index}`} aria-expanded="true" aria-controls={`Acc${index}`}>
                        {data}
                        <span style={{float: 'right'}} className={classes.ter}>{selecter}/{length} <img height='25px' id={`IMG${index}`}  src={rightDropdown} alt="Sopra Steria"/></span>
                      </div>
                    </div>

                    <div id={`Acc${index}`} className="collapse" aria-labelledby={`heading${index}`} data-parent="#accordion">
                      <div className={classes.cardBody}>
                        <form noValidate>{facroty}{cerateButton}</form>
                      </div>
                    </div>
                  </div>


        )
    }
}
export default CustomeAccordion