import React, { useState, useEffect } from 'react'

export const UseFetch = ( action ) => {
    
    
    const [ state, setState ] = useState({
        data: null,
        loading: true,
        err: null
    })

    useEffect( () => {

        
    }, [ action ])
    
    
    
    return state
}
