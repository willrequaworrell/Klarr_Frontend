import { Modal } from '@mui/material'
import CustomDatePicker from './CustomDatePicker'
import { useState } from 'react'
import { Dayjs } from 'dayjs'
import {DatePickerModalPropsType } from '../util/Types'

interface UpdateCardDatePickerModalPropsType extends DatePickerModalPropsType {
    id: string
}

const UpdateCardDatePickerModal = ({id, showDatePicker, setShowDatePicker}: UpdateCardDatePickerModalPropsType) => {
    const [dueDate, setDueDate] = useState<Dayjs | null>(null)

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     if (droppingCard) {
    //         // console.log(droppingCard)
    //         const updatedCard = {...droppingCard, dueDate: dueDate?.toDate() as Date}
    //         completeDrop(updatedCard, before)
    //         setShowDatePicker(false)
    //         setDueDate(null)
    //     }
    // }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(id)
        // find card by id in cards, then send it to complete drop to update the db
        // let copy = [...cards];
        // let cardToTransfer = copy.find(c => c.id === cardId)
        // const updatedCard = {...cardToTransfer, dueDate: dueDate?.toDate() as Date}
        // completeDrop(updatedCard)
        // setShowDatePicker(false)
        // setDueDate(null)
    }

    const handleCancel = () => {
        setShowDatePicker(false)
        setDueDate(null)
    }

    
    return (
        <Modal 
            open={showDatePicker} 
            onClose={() => setShowDatePicker(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={handleSubmit}>

                <div className="absolute flex flex-col p-8 -translate-x-1/2 -translate-y-1/2 border-t-4 border-b-8 border-l-8 border-r-4 gap-y-4 bg-offwhite top-1/2 left-1/2 border-offblack rounded-xl font-Barlow text-offblack">
                    <div>Pick a date for your upcoming task:</div>
                    <CustomDatePicker
                        dueDate={dueDate}
                        setDueDate={setDueDate}
                    />
                    <div className='flex items-center justify-center'>
                        <button 
                            className='px-4 py-2 rounded-xl' 
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button  
                            className='px-4 py-2 text-white bg-offblack rounded-xl' 
                            type="submit" 
                        >
                            Submit
                        </button>
                        
                    </div>
                </div>

            </form>
        </Modal>
    )
}

export default UpdateCardDatePickerModal
