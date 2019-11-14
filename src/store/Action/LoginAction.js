import  {LOGIN,FASTTRACK,NORMAL,LOGOUT,CREATEASSESSEMENT,CLEANOPPORTUNITYDATA,CLEANCREATEASSESSEMENT,CLEANFASTTRACK}  from "../ActionType/ActionTypes";
import litral from '../../litral/litral'
// Action to add article to store
export const login = data => ({
    type: LOGIN,
    payload: data
});

export const onFastTrack = data=>({
    type:FASTTRACK,
    payload:data
})

export const onNORMAL=data=>({
    type:NORMAL,
    payload:data
})

export const onLogOut=data=>({
    type:LOGOUT,
    payload:data

})

export const onEditInspection=data=>({
    type:CREATEASSESSEMENT,
    payload:data
})

export const onCleanOpportunity=data=>({
    type:CLEANOPPORTUNITYDATA,
    payload:''
})

export const onCleanCreateAssessement=data=>({
    type:CLEANCREATEASSESSEMENT,
    payload:''
})

export const onCleanFastTrack=data=>({
    type:CLEANFASTTRACK,
    payload:''
})