import { PropsWithChildren } from "react"

const Background = ({children}: PropsWithChildren) => {
    return (
        <div className="w-full h-screen bg-neutral-900 text-neutral-50">
            {children}
        </div>
    )
}

export default Background
