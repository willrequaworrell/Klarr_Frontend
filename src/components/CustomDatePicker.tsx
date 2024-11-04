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
            value={dueDate}
            onChange={handleDueDateChange}
            slotProps={{
                textField: {size: "small"}
            }}
            minDate={dayjs(new Date())}
        />

    )
}

export default CustomDatePicker
