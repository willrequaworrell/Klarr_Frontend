import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CardType } from '../util/Types'
import { FaPlus } from "react-icons/fa";


interface AddCardType {
    column: 'today' | 'upcoming' | 'optional'
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>
}

const columnToColor = {
    'today': 'bg-red/75',
    'upcoming': 'bg-yellow/75',
    'optional': 'bg-blue/75'
}

const AddCard = ({column, setCards}: AddCardType) => {
    const [text, setText] = useState<string>("")
    const [adding, setAdding] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!text.trim().length) return

        const newCard: CardType = {
            column: column,
            title: text.trim(),
            id: Math.random().toString()
        }
        
        setText("")
        setAdding(false)
        setCards(prev => [...prev, newCard] )
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
                    className={`flex text-lg rounded-full text-center justify-center items-center w-min  gap-1.5 px-3 py-1.5  text-offblack  transition-colors hover:scale-105`}
                >
                    <p>Add</p>
                    <FaPlus />
                </motion.button>
            }
        </>
    )
}

export default AddCard
