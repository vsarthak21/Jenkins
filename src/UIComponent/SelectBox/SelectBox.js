import React, {Component}from 'react';
import {Form} from 'react-bootstrap';
import classes from './SelectBox.module.css';
import Tooltip from 'react-tooltip-lite';
import litral from '../../litral/litral'
import CAux from '../../hoc/CAux'

class SelectBox extends Component {
    constructor(props){
        super(props);
        
    
    }
       
     removeDuplicates=(myArr, prop) =>{
                return myArr.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
}
    creatOption=(optiondata,sortingEnabled)=> {

        var uniqueOptions = optiondata ? this.removeDuplicates(optiondata,'name'):"";
        if (uniqueOptions!="" && sortingEnabled)
            uniqueOptions.sort((a,b)=> (a.name.toString().toLowerCase()<b.name.toString().toLowerCase()?1:(a.name.toString().toLowerCase()>b.name.toString().toLowerCase()?-1:0))).reverse();
        return (uniqueOptions ? uniqueOptions.map((res,index)=>{ 
          
            return <option key ={index+1} className={classes.capitalize} value={res.id}>{res.name}</option>
        }) :'')
    }

   
    
    render(){  
        const {optiondata,handleChange,selectedOption,preventSorting,doNotAddDefault} =this.props

        let sortingEnabled = preventSorting && preventSorting===true?false:true;
        let options = this.creatOption(optiondata,sortingEnabled);
        
        if(doNotAddDefault!=null && doNotAddDefault)
        {
            //ToDo
          
        }
        else{
            const defaultOption = <option default value='-1' key='0'>Please Select</option>
            options.splice(0,0,defaultOption);
        }
        const selectedOptionIndex= selectedOption?optiondata.findIndex(x=>x.name===selectedOption):-1;
        const selectedValue=optiondata[selectedOptionIndex]?optiondata[selectedOptionIndex].id:'-1';
        
               
        let formOption=selectedOption?
        <Form.Control value={selectedValue} autoFocus={this.props.autoFocus} tabIndex={this.props.tabIndex} maxLength="40" size="40" as="select"  
                                className={classes.capitalize}  onChange={handleChange} disabled={this.props.isDisabled}>
                                    {options}
                            </Form.Control> :
                            <Form.Control  autoFocus={this.props.autoFocus}    tabIndex={this.props.tabIndex} maxLength="40" size="40" as="select"  
                            className={classes.capitalize}  onChange={handleChange} disabled={this.props.isDisabled}>
                                {options}
                        </Form.Control>;

        let formData = <Form.Group   className={classes.width}>
                            {formOption}
                        </Form.Group>
        
            return( 
                 this.props.showHelp? 
                 <Tooltip content={this.props.showHelp?litral.helpTextForAssessmentGate:''} distance={10}  hoverDelay={400} direction="up"   
                 >
                     {formData}
                </Tooltip>:
                <CAux>{formData}</CAux>
        )
    }
}

export default SelectBox;