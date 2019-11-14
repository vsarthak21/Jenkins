import  {OPPORTUNITY}  from "../ActionType/ActionTypes";

// Action to add article to store
export const oppSerch = opportunitySerch => ({
    type: OPPORTUNITY,
    payload: opportunitySerch
});