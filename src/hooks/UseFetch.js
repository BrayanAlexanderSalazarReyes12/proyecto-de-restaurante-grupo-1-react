import  { useState, useEffect } from 'react'

export const UseFetch = () => {
    
    
    const [ state, setState ] = useState({
        data: null,
        loading: true,
        err: false
    })

    const fet = (url, options = {}) => {
        fetch( url, options )
        .then( res => res.json() )
        .then( data => {
            setState({
                data,
                loading: false,
                err: false
            })
        })
    }
    
    
    return { state, fet }
}
