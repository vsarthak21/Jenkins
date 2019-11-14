import Spinner from './UIComponent/Spinner/Spinner';
import React from 'react'

export const showSpinner = (shouldShowSpinner)=>shouldShowSpinner?<Spinner /> :"";

export const clearLoginData = ()=>{
        localStorage.removeItem('webtoken');
        localStorage.removeItem('userid')
        localStorage.removeItem('username')
}

export const logoutSaveModalURL=[
        "/opportunitysearch/create",
        "/opportunitysearch/update",
        "/FastTrack",
        "/assessmentresult/FastTrack",
        "/Normal",
        "/assessmentresult/Normal"
]