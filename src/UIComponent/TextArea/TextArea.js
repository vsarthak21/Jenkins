import React, {Component}from 'react';
import classes from './TextArea.module.css';
import {FormControl} from 'react-bootstrap'
import classNames from 'classnames';
 const TextArea = (props)=> 
 {
    const {text}=props?props:''
 return (
            <div className={classNames(classes.ContainerColumn)} >
                {props.header?<div><h6>{props.header}</h6></div>:''}
                <FormControl as="textarea" style={{height:'inherit'}} rows={props.rows} onChange={props.onChange} maxLength={props.maxLength} cols={props.cols} value={props.value} defaultValue={text} disabled={props.disabled} />
            </div>
            )}
export default TextArea;