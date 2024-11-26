interface SpinnerPropsStyle {
    size: string // size-<#>
    color: string // text-<color>
    borderWidth: string //border-<#>
}

const Spinner = ({size, color, borderWidth}: SpinnerPropsStyle) => {
   
    
    return (
        <div 
            className={`${size} ${color} ${borderWidth} animate-spin inline-block border-current border-t-transparent rounded-full aria-label="loading`} 
            // className={`${size} ${colorMap[color]} ${borderWidth} animate-spin inline-block text-white border-current border-t-transparent rounded-full`} 
            role="status" 
            aria-label="loading"
        />
    )
}

export default Spinner
