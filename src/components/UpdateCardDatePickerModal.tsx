import { Modal } from '@mui/material'
import CustomDatePicker from './CustomDatePicker'
import { useState } from 'react'
import { Dayjs } from 'dayjs'
import { DatePickerModalPropsType } from '../util/Types'
import { useCards } from '../context/CardContext'
import { CardType } from '../util/Types'
import Spinner from './Spinner'
import { useToast } from '../context/ToastContext'
import { useDemoContext } from '../context/DemoContext'

interface UpdateCardDatePickerModalPropsType extends DatePickerModalPropsType {
    id: string,
    currDate: Dayjs,
}

const UpdateCardDatePickerModal = ({id, showDatePicker, setShowDatePicker, currDate}: UpdateCardDatePickerModalPropsType) => {
    const [updateLoading, setUpdateLoading] = useState<boolean>(false)
    const {cards, setCards, updateCardDueDate} = useCards()
    const [dueDate, setDueDate] = useState<Dayjs | null>(currDate || null)
    const {isDemoMode} = useDemoContext()

    const { setShowToast, setToastMessage } = useToast();

    const completeUpdate = async (cardsCopy: CardType[], cardToUpdate: CardType): Promise<boolean> => {
        if (!dueDate) return false
        // copy.map(c => console.log( new Date(c.dueDate) < cardToUpdate.dueDate))
        const indexOfNextLatestDueDate = cardsCopy.findIndex(card => new Date(card.dueDate as Date) >( cardToUpdate.dueDate as Date))
        if (indexOfNextLatestDueDate === -1) {
            cardsCopy.push({ ...cardToUpdate})
        } else {
            cardsCopy.splice(indexOfNextLatestDueDate, 0, { ...cardToUpdate})
        }
        let updatedCard
        if (!isDemoMode) {
            updatedCard = await updateCardDueDate(id, dueDate?.toDate() as Date);
        } else {
            updatedCard = true
        }

        if (updatedCard) {
            setCards(() => {
                return cardsCopy
            })
            setToastMessage("success/update-task-date")
            setShowToast(true)
            setTimeout(() => setShowToast(false), 3000)
        } else {
            setToastMessage("error/update-task-date")
            setShowToast(true)
            setTimeout(() => setShowToast(false), 3000)
        }
        
        return updatedCard ? true : false
    }
   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (updateLoading) return
        setUpdateLoading(true)
        await new Promise(resolve => setTimeout(resolve, 200))
        // find card by id in cards, then send it to complete drop to update the db
        let copy = [...cards];
        let cardToUpdate = copy.find(c => c.id === id) 
        if (!cardToUpdate) {
            console.log("could not find a card with id", id)
            setUpdateLoading(false)
            return
        }
    
        const updatedCard = {...cardToUpdate, dueDate: dueDate?.toDate() as Date, order: null}; 
        copy = copy.filter(c => c.id !== id)
        await completeUpdate(copy, updatedCard)
       
        setUpdateLoading(false)
        setShowDatePicker(false)
        
    }

    const handleCancel = () => {
        setShowDatePicker(false)
        setDueDate(currDate)
    }

    return (
        <Modal 
            open={showDatePicker} 
            onClose={() => setShowDatePicker(false)}
            aria-labelledby="choose-new-due-date"
            aria-describedby="Choose a new date for the upcoming task"
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
                            disabled={updateLoading}
                        >
                            {updateLoading ? <Spinner size='size-4' color='text-white' borderWidth='border-4'/> : "Submit"}
                        </button>
                        
                    </div>
                </div>

            </form>
        </Modal>
    )
}

export default UpdateCardDatePickerModal
