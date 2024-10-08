import { useState } from "react"

interface ToastPropsType {
    message: string
    type: 'error' | 'success'
}

const Toast = ({message, type}: ToastPropsType) => {
    const bgColor = type === 'error' ? 'bg-red' : 'bg-offblack'
    const textColor = type === 'error' ? 'text-offblack' : 'bg-white'

    
    return (
        <div className={`${bgColor} ${textColor} fixed w-1/4 text-md shadow-xl rounded-xl p-4 font-Barlow left-1/2 top-[10%] -translate-x-1/2 transition-all duration-300 ease-in-out`}>
            {message}
        </div>
    )
}

export default Toast
