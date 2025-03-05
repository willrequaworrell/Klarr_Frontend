import { ReactNode } from "react"
import { FcGoogle } from "react-icons/fc"

interface AuthButtonPropsStyle {
    text: string | ReactNode
    onClick?: () => void
    google?: boolean
    account?: boolean
}


const AuthButton = ({text, onClick, google=false, account=false}: AuthButtonPropsStyle) => {
    
    if (google) {
        return (
            <>
                <a onClick={onClick} className="flex items-center justify-center w-full p-[.5vh] mt-[1vh] text-[2.25vh] bg-white font-Barlow hover:bg-offblack/50 text-offblack rounded-xl cursor-pointer">
                    <div className="flex items-center justify-center h-full mr-2">
                        <FcGoogle className="p-[.5vh] text-[4vh]"/>
                    </div>
                    <p className="">{text}</p>
                </a>
            </>
        )
    } else if (account) {
        return (
            <div className="flex justify-center">
                <button className="mt-2 text-[1.5vh] text-center">
                    {text}
                </button>
            </div>
        )
    } else {

        return (
            <button 
                onClick={onClick}
                className="flex w-1/2 items-center justify-center p-[1vh] text-[2.25vh] text-white rounded-lg bg-offblack hover:bg-offblack/50"
            >
                <p className="flex-1">{text}</p>
            </button>
        )
    }
    
}

export default AuthButton
