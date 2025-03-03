import { ReactNode } from "react"

interface BoardRowPropsType {
    children: ReactNode
    styles?: string
}

const BoardRow = ({children, styles=""}: BoardRowPropsType) => {

    return (
        <div className={`flex w-full h-1/2 ${styles}`}>
            {children}
        </div>
    )
}

export default BoardRow
