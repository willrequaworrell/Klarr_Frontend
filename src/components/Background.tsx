import { PropsWithChildren } from "react"

const Background = ({children}: PropsWithChildren) => {
    return (
        <div className="w-full h-screen bg-offwhite text-neutral-50">
            {children}
        </div>
    )
}

export default Background
