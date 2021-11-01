import { useState } from 'react'

export const usePrevImg = () => {
    

    const [ FileUrl, setFileUrl ] = useState({
        url: null,
        file: null
    })

    return {
        FileUrl,
        setFileUrl
    }
}
