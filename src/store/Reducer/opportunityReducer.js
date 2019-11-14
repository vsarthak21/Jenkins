
import {LOGOUT,OPPORTUNITY,LOGIN,FASTTRACK,NORMAL,CREATEASSESSEMENT,CLEANOPPORTUNITYDATA,CLEANCREATEASSESSEMENT,CLEANFASTTRACK} from '../ActionType/ActionTypes'

const opportunitySerch = (state = {}, action) => {
    switch (action.type) {
        case LOGOUT:
            return state = {}
        case OPPORTUNITY:
            let data = Object.assign({}, state.OPPORTUNITY, action.payload)    
            return {...state, OPPORTUNITY: data};
        case LOGIN:
            return { ...state,LOGIN:action.payload};
        case FASTTRACK:
            let dataFastTrack = Object.assign({}, state.FASTTRACK, action.payload) 
            return {...state,FASTTRACK:dataFastTrack}
        case NORMAL:
            return {...state,NORMAL:action.payload}
        case CREATEASSESSEMENT:
                let payload = Object.assign({}, state.CREATEASSESSEMENT, action.payload) 
            return {...state,CREATEASSESSEMENT:payload}
        case CLEANOPPORTUNITYDATA:
            return {...state,OPPORTUNITY: ''}
        case CLEANCREATEASSESSEMENT:
            return {...state,CREATEASSESSEMENT: ''}
        case CLEANFASTTRACK:
             return {...state,FASTTRACK: ''}
        default:
            return state;
    }
}

export default opportunitySerch;