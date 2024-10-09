import { generateFirebaseErrorMessage } from "../util/AuthErrorHandling"


interface ToastPropsType {
    message: string
    type: 'error' | 'success'
}

const Toast = ({message, type}: ToastPropsType) => {
    const bgColor = type === 'error' ? 'bg-red' : 'bg-offblack'
    const textColor = type === 'error' ? 'text-offblack' : 'bg-white'

    const errorMessage = generateFirebaseErrorMessage(message)
    return (
        <div className={`${bgColor} ${textColor} fixed w-1/4 text-md shadow-xl rounded-xl p-4 font-Barlow left-1/2 bottom-[10%] -translate-x-1/2 transition-colors duration-500 ease-in-out`}>
            {errorMessage}
        </div>
    )
}

export default Toast
