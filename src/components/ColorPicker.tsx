interface ColorPickerPropsType {
    color: string
    onChange: (value: string) => void
}


const ColorPicker = ({color, onChange}: ColorPickerPropsType) => {
    return (
        <input 
            type="color" 
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-full cursor-pointer"
        />
    )
}

export default ColorPicker
