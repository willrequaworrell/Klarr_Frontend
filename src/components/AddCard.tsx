import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CardType } from '../util/Types'
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fireAuth } from '../util/firebase';
import CustomDatePicker from './CustomDatePicker';
import { Dayjs } from 'dayjs';
import Spinner from './Spinner';
import { useCards } from '../context/CardContext';


interface NewCardType {
    userId: string, 
    title: string, 
    column: 'today' | 'upcoming' | 'optional',
    dueDate: Date | null, 
    order: number | null
}

interface AddCardPropsType {
    column: 'today' | 'upcoming' | 'optional'
    cards: CardType[]
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>
}

// const columnToColor = {
//     'today': 'bg-red/75',
//     'upcoming': 'bg-yellow/75',
//     'optional': 'bg-blue/75'
// }

const AddCard = ({column, cards, setCards}: AddCardPropsType) => {
    const [user] = useAuthState(fireAuth)
    const [text, setText] = useState<string>("")
    const [dueDate, setDueDate] = useState<Dayjs | null>(null)
    const [adding, setAdding] = useState<boolean>(false)
    const [addLoading, setAddLoading] = useState<boolean>(false)

    const {columnColors } = useCards();

    const insertCard = async (data: NewCardType) => {
        try {
            // const res = await axios.post(`http://localhost:3000/api/tasks/`, data)
            const res = await axios.post(`https://staatlidobackend.onrender.com/api/tasks/`, data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        if (addLoading) return

        if (!text.trim().length) return

        if (!user) return 

        if ( !dueDate && (column === "upcoming"))  return 

        setAddLoading(true)

        const determineDueDate = (dueDate: Dayjs, column: string) => {
            
            if (column === "upcoming"){
                console.log('upcoming hit')
                return dueDate.toDate()
            }else if (column === "today") {
                return new Date()
            }else {
                console.log("optional hit")
                return null
            }
        }

        const newCardForDatabase: NewCardType = {
            userId: user?.uid,
            title: text.trim(),
            column: column,
            dueDate: determineDueDate(dueDate as Dayjs, column),
            order: null
            // dueDate: dueDate ? dueDate.toDate() : null
        }

        console.log("Sending to server:", newCardForDatabase)

        const insertedCard = await insertCard(newCardForDatabase)
        setAddLoading(false)
        if (insertedCard) {
            console.log("inserted" ,insertedCard)
            const newCard: CardType = {
                column: column,
                title: text.trim(),
                id: insertedCard._id,
                dueDate: insertedCard.dueDate,
                order: insertedCard.order
            }
            setText("")
            setAdding(false)
            if (column === "upcoming") {
                let copy = [...cards]
                const indexOfNextLatestDueDate = copy.findIndex(card => new Date(card.dueDate) > new Date(newCard.dueDate))
                if (indexOfNextLatestDueDate === -1) {
                    copy.push({ ...newCard })
                } else {
                    copy.splice(indexOfNextLatestDueDate, 0, { ...newCard})
                }
                setCards(copy)
            } else {
                setCards(prev => [...prev, newCard] )
            }

        } else {
            console.log("error adding task")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
        }
    }

    return (
        <>
            {adding 
            ? 
                <motion.form 
                    layout 
                    onSubmit={handleSubmit}
                >
                    <textarea 
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        placeholder='Add new task...'
                        className={`resize-none w-full p-2 text-md font-Barlow rounded-xl  text-offblack/75 placeholder-offblack/50 focus:outline-0 border-offblack/75 border-l-8 border-b-8`}
                        style={{backgroundColor: columnColors[column]}}
                    />
                    <div className='flex items-center mt-1.5 justify-end gap-1.5'>
                        {column === "upcoming" && (
                            <CustomDatePicker
                                dueDate={dueDate}
                                setDueDate={setDueDate}
                            />
                        )}
                        <button
                            type='button'
                            onClick={() => setAdding(false)}
                            className='px-3 py-1.5 text-xs text-offblack transition-colors hover:text-white'
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={addLoading}
                            className='flex rounded-full justify-center items-center w-min text-sm  gap-1.5 px-3 py-1.5 text-white bg-offblack transition-colors  hover:scale-105'
                        >
                            {addLoading ? 
                                <Spinner size='size-4' color='text-white' borderWidth='border-4'/>
                            :
                                <span>Add</span>
                            }
                        </button>
                    </div>
                </motion.form>
            : 
                <motion.button
                    layout
                    onClick={() => setAdding(true)}
                    className={`flex text-lg rounded-full text-center justify-center items-center size-[5vh] min-h-[5vh] p-2 bg-offblack text-white transition-colors hover:scale-105`}
                >
                    
                    <FaPlus />
                </motion.button>
            }
        </>
    )
}

export default AddCard
