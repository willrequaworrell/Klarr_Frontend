import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CardType } from '../util/Types'
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fireAuth } from '../util/firebase';
import CustomDatePicker from './CustomDatePicker';
import { Dayjs } from 'dayjs';


interface NewCardType {
    userId: string, 
    title: string, 
    column: 'today' | 'upcoming' | 'optional',
    dueDate: Date | null, 
}

interface AddCardPropsType {
    column: 'today' | 'upcoming' | 'optional'
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>
}

const columnToColor = {
    'today': 'bg-red/75',
    'upcoming': 'bg-yellow/75',
    'optional': 'bg-blue/75'
}

const AddCard = ({column, setCards}: AddCardPropsType) => {
    const [user] = useAuthState(fireAuth)
    const [text, setText] = useState<string>("")
    const [dueDate, setDueDate] = useState<Dayjs | null>(null)
    const [adding, setAdding] = useState<boolean>(false)

    const insertCard = async (data: NewCardType) => {
        try {
            const res = await axios.post(`https://staatlidobackend.onrender.com/api/tasks/`, data)
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!text.trim().length) return

        if (!user) return 

        !dueDate && console.log("nope")
        
        if ( !dueDate && (column === "upcoming" || column === 'today'))  return 

        const newCardForDatabase: NewCardType = {
            userId: user?.uid,
            title: text.trim(),
            column: column,
            dueDate: dueDate ? dueDate.toDate() : null
        }

        console.log("Sending to server:", newCardForDatabase)

        const insertedCard = await insertCard(newCardForDatabase)
        if (insertedCard) {
            console.log(insertedCard)
            const newCard: CardType = {
                column: column,
                title: text.trim(),
                id: insertedCard._id
            }
            setText("")
            setAdding(false)
            setCards(prev => [...prev, newCard] )

        } else {
            console.log("error adding task")
        }
        

    }

    return (
        <>
            {adding 
            ? 
                <motion.form 
                    layout 
                    onSubmit={handleSubmit}
                    // onBlur={() => setAdding(false)}
                >
                    <textarea 
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        placeholder='Add new task...'
                        className={`resize-none w-full p-2 text-md font-Barlow rounded-xl ${columnToColor[column]} text-offblack/75 placeholder-offblack/50 focus:outline-0 border-offblack/75 border-l-8 border-b-8`}
                    />
                    <div className='flex items-center mt-1.5 justify-end gap-1.5'>
                        <CustomDatePicker
                            dueDate={dueDate}
                            setDueDate={setDueDate}
                        />
                        <button
                            type='button'
                            onClick={() => setAdding(false)}
                            className='px-3 py-1.5 text-xs text-offblack transition-colors hover:text-white'
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className='flex rounded-full justify-center items-center w-min text-sm  gap-1.5 px-3 py-1.5  text-white bg-offblack transition-colors  hover:scale-105'
                        >
                            <span>Add</span>
                        </button>
                    </div>
                </motion.form>
            : 
                <motion.button
                    layout
                    onClick={() => setAdding(true)}
                    className={`flex text-lg rounded-full text-center justify-center items-center size-10 min-h-10 p-2  bg-offblack text-white transition-colors hover:scale-105`}
                >
                    
                    <FaPlus />
                </motion.button>
            }
        </>
    )
}

export default AddCard
