import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CardType } from '../util/Types'
import { FaPlus } from "react-icons/fa";
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fireAuth } from '../util/firebase';

interface NewCardType {
    userId: string, 
    title: string, 
    column: 'today' | 'upcoming' | 'optional',
    dueDate: Date, 
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
    const [user, loading] = useAuthState(fireAuth)
    const [text, setText] = useState<string>("")
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
        
        const newCardForDatabase: NewCardType = {
            userId: user?.uid,
            title: text.trim(),
            column: column,
            dueDate: new Date()
        }

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
                        className={`w-full p-2 text-md font-Barlow rounded-xl ${columnToColor[column]} text-offblack placeholder-offblack focus:outline-0`}
                    />
                    <div className='flex items-center mt-1.5 justify-end gap-1.5'>
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
