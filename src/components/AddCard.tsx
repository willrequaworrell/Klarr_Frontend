import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CardType } from '../util/Types'
import { FiPlus } from 'react-icons/fi'

interface AddCardType {
    column: 'today' | 'upcoming' | 'optional'
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>
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
                <motion.form layout onSubmit={handleSubmit}>
                    <textarea 
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        placeholder='Add new task...'
                        className='w-full p-3 text-sm border rounded border-violet-400 bg-violet-400/20 text-neutral-50 placeholder-violet-300 focus:outline-0'
                    />
                    <div className='flex items-center mt-1.5 justify-end gap-1.5'>
                        <button
                            type='button'
                            onClick={() => setAdding(false)}
                            className='px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className='flex items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-950 rounded bg-neutral-50 transition-colors hover:text-neutral-50'
                        >
                            <span>Add</span>
                            <FiPlus/>
                        </button>
                    </div>
                </motion.form>
            : 
                <motion.button
                    layout
                    onClick={() => setAdding(true)}
                    className='flex w-8 rounded-full items-center text-xl gap-1.5 px-3 py-1.5  text-offwhite bg-offblack transition-colors hover:text-neutral-50'
                >
                    {/* <span>Add</span> */}
                    <FiPlus />
                </motion.button>
            }
        </>
    )
}

export default AddCard
