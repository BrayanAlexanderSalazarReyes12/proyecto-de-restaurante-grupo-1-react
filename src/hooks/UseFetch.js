import  { useState, useEffect } from 'react'

export const UseFetch = ( url ) => {
    
    
    const [ state, setState ] = useState({
        data: null,
        loading: true,
        err: null
    })

    useEffect( () => {
        fetch( url )
        .then( ( response ) => response.json() )
        .then( ( d ) => {
            setState( {
                data: d,
                loading: false,
                err: null
            } )
        })
    }, [ url ])
    
    
    
    return state
}
