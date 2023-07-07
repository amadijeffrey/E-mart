import { LOGIN } from "../actions/action_login";
import { LOGOUT } from "../actions/action_logout";
import { REGISTER} from '../actions/action_signup'



export default function userReducer(state = {},action){
    switch(action.type){
        case LOGIN: return {...state, 
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            isLoggedIn: true
        }
        case LOGOUT: return {...state, firstName: null, lastName : null, email: null, isLoggedIn: false}
        case REGISTER: return {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            isLoggedIn: true
        }
        default:return state 
    }
}