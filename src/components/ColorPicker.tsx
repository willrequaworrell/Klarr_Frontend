import { useCards } from "../context/CardContext";

interface ColumnColorsType {
    today: string;
    upcoming: string;
    optional: string;
}

interface ColorPickerPropsType {
    column: keyof ColumnColorsType
}


const ColorPicker = ({column}: ColorPickerPropsType) => {

    const {updateColumnColor, columnColors} = useCards();

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        updateColumnColor({[column]: e.target.value})
    }
    
    return (
        <input 
            type="color" 
            value={columnColors[column]}
            onChange={handleColorChange}
            className="rounded-full cursor-pointer"
        />
    )
}

export default ColorPicker
