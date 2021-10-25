import React from 'react'

import './css/toast.css'

export const ToastMess = ({titulo, mensaje}) => {
    
    return (
        <>
            <div id="t" class="toast pt-3 show position-absolute animate__animated animate__fadeIn">
                <div class="toast-header">
                <strong class="me-auto">{titulo}</strong>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="toast"
                ></button>
                </div>
                <div class="toast-body">
                <p>{mensaje}</p>
                </div>
            </div>
        </>
    )
}
