import { types } from '../types/types';

export const authReducer = (state = {},action) => {
    
    switch ( action.types ) {
        case types.login:
            return {
                uid : action.payload.uid,
                name: "ADMIN",
                login: true
            }
        
        case types.logout:
            return { 
                login: false
            }
        
        default:
            return state
        
    }
}
