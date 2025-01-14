// import { generateToastMessage } from "../util/ToastMessageHandling"

import { generateToastMessage } from "../util/ToastMessageHandling"


interface ToastPropsType {
    message: string
    position: "top" | "bottom"
    // type: 'error' | 'success'
}

const Toast = ({message, position}: ToastPropsType) => {
    // const bgColor = type === 'error' ? 'bg-red' : 'bg-offblack'
    // const textColor = type === 'error' ? 'text-offblack' : 'bg-white'
    let bgColor
    let textColor
    let positionStyle

    const type = message.split("/")[0]

    if (type === "error" || type === "auth") {
        bgColor = 'bg-red'
        textColor = 'text-offblack'
    } else {
        bgColor = 'bg-offblack'
        textColor = 'text-white'
    }

    if (position === "top") {
        positionStyle = "top-[5%]"
    } else {
        positionStyle = "bottom-[10%]"
    }

    const errorMessage = generateToastMessage(message)
    return (
        <div className={`${bgColor} ${textColor} ${positionStyle} fixed w-1/5 text-[1.75vh] text-center shadow-xl rounded-xl p-4 font-Barlow left-1/2 -translate-x-1/2 transition-colors duration-500 ease-in-out`}>
            {errorMessage}
        </div>
    )
}

export default Toast
