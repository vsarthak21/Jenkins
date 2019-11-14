import React from 'react'
import classes from './Input.module.css';

import {InputGroup,FormControl,Form} from 'react-bootstrap'
 

const Input = (props) => {
  const {handleChange} =props;
  return(
     <InputGroup className={classes.centerInput}>
     <FormControl  className={classes.formControl}
       tabIndex={props.tabIndex}
       placeholder={props.placeholder}
       aria-label={props.placeholder}
       aria-describedby="basic-addon1"
       value={props.value}
       type={props.Type}
       autoComplete="off"
       autoFocus={props.autoFocus}
       maxLength={props.maxlength}
       onChange={handleChange.bind(this,props.placeholder)}
     />
   </InputGroup>
)
  }

export default Input;