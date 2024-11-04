import { Modal } from '@mui/material'
import CustomDatePicker from './CustomDatePicker'
import { FormEventHandler, useState } from 'react'
import { Dayjs } from 'dayjs'

interface DatePickerModalPropsType {
    showDatePicker: boolean
    setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>
}

const DatePickerModal = ({showDatePicker, setShowDatePicker}: DatePickerModalPropsType) => {

    const [dueDate, setDueDate] = useState<Dayjs | null>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log("submitting", dueDate?.toDate())
    }

    return (
        <Modal 
            open={showDatePicker} 
            onClose={() => setShowDatePicker(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={handleSubmit}>

                <div className="absolute flex flex-col p-8 -translate-x-1/2 -translate-y-1/2 border-t-4 border-b-8 border-l-8 border-r-4 bg-offwhite top-1/2 left-1/2 border-offblack rounded-xl font-Barlow text-offblack">
                    <div>Pick a date for your upcoming task:</div>
                    <CustomDatePicker
                        dueDate={dueDate}
                        setDueDate={setDueDate}
                    />
                    <div className='flex items-center justify-around'>
                        <button type="submit">Submit</button>
                        <button>Cancel</button>
                    </div>
                </div>

            </form>
        </Modal>
    )
}

export default DatePickerModal
