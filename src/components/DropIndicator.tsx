interface DropIndicatorType {
    beforeId: string
    column: string
}

const DropIndicator = ({beforeId, column}: DropIndicatorType) => {
    return (
        <div
            className='my-0.5 h-0.5 w-full bg-violet-400 opacity-0'
            data-before={beforeId || "-1"}
            data-column={column}
        />
        
    )
}

export default DropIndicator
