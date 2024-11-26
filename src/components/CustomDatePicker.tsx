// import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";


interface CustomDatePickerProps {
    dueDate: Dayjs | null
    setDueDate: React.Dispatch<React.SetStateAction<Dayjs | null>>
}


const CustomDatePicker = ({dueDate, setDueDate}: CustomDatePickerProps) => {

    const handleDueDateChange = (newDueDate: Dayjs | null) => {
        if (newDueDate) {
            setDueDate(newDueDate)
        }
    }

    return (

        
        <DatePicker
            value={dueDate || dayjs().add(1, 'day') }
            onChange={handleDueDateChange}
            slotProps={{
                textField: {size: "small"},
                actionBar: { actions: ["today"] },
            }}
            
            minDate={dayjs().add(1, 'day')}
        />


    )
}

export default CustomDatePicker
