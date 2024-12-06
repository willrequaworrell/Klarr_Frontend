interface DropIndicatorType {
    beforeId: string
    column: string
}

const DropIndicator = ({beforeId, column}: DropIndicatorType) => {
    return (
        <div
            className='w-full h-[.75vh] my-0.5 opacity-0 bg-offblack rounded-full'
            data-before={beforeId || "-1"}
            data-column={column}
        />
        
    )
}

export default DropIndicator
