import React from 'react'
import burgerLogo from '../../assets/images/sslogo.png'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo} >
        <img src={burgerLogo} alt="Sopra Steria"/>
    </div>
)
export default logo;