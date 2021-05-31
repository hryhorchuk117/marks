import {authorize_request, authorize_success, get_groups_request, get_groups_success} from "../constants/actions";

const reducer = (state = {}, action) => {
 switch (action.type) {
     case get_groups_request:
         return { ...state, loading: true };
     case get_groups_success:
         console.log('action', action);
         return { ...state, groups: action.response, loading: false }
     case authorize_request:
         return { ...state, loading: true };
     case authorize_success:
         console.log('action', action);
         return { ...state, isAuthorized: action.response, loading: false }
   default:
        return state;
 }
};

export default reducer;
