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
import { useDemoContext } from '../context/DemoContext';


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

const AddCard = ({column, cards, setCards}: AddCardPropsType) => {
    const [user] = useAuthState(fireAuth)
    const [text, setText] = useState<string>("")
    const [dueDate, setDueDate] = useState<Dayjs | null>(null)
    const [adding, setAdding] = useState<boolean>(false)
    const [addLoading, setAddLoading] = useState<boolean>(false)

    const {isDemoMode} = useDemoContext()

    const {columnColors } = useCards();

    function generateUniqueId(): string {
        return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    }
      

    const insertCard = async (data: NewCardType) => {
        
        try {
            const res = await axios.post(`https://staatlidobackend.onrender.com/api/tasks/`, data)
            console.log(res)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()

        if (addLoading) return

        if (!text.trim().length) return

        if (!user && !isDemoMode) return 

        if ( !dueDate && (column === "upcoming"))  return 

        setAddLoading(true)

        const determineDueDate = (dueDate: Dayjs, column: string) => {
            
            if (column === "upcoming"){
                return dueDate.toDate()
            }else if (column === "today") {
                return new Date()
            }else {
                return null
            }
        }


        if (isDemoMode) {
            const newDemoCard = {
                column: column,
                title: text.trim(),
                id: generateUniqueId(),
                dueDate: determineDueDate(dueDate as Dayjs, column),
                order: Math.max(...cards.map(card => card.order as number)) + 1 // highest current order + 1
            }
            setText("")
            setAdding(false)
            if (column === "upcoming") {
                let copy = [...cards]
                const indexOfNextLatestDueDate = copy.findIndex(card => new Date(card.dueDate as Date) > new Date(newDemoCard.dueDate as Date))
                if (indexOfNextLatestDueDate === -1) {
                    copy.push({ ...newDemoCard })
                } else {
                    copy.splice(indexOfNextLatestDueDate, 0, { ...newDemoCard})
                }
                setCards(copy)
            } else {
                setCards(prev => [...prev, newDemoCard])
            }
            setAddLoading(false)
        } else {
            if (!user) return // to make typescript happy even though this is already checked up top

            const newCardForDatabase: NewCardType = {
                userId: user?.uid,
                title: text.trim(),
                column: column,
                dueDate: determineDueDate(dueDate as Dayjs, column),
                order: null
                // dueDate: dueDate ? dueDate.toDate() : null
            }

            const insertedCard = await insertCard(newCardForDatabase)
            setAddLoading(false)

            if (insertedCard) {
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
                    const indexOfNextLatestDueDate = copy.findIndex(card => new Date(card.dueDate as Date) > new Date(newCard.dueDate as Date))
                    if (indexOfNextLatestDueDate === -1) {
                        copy.push({ ...newCard })
                    } else {
                        copy.splice(indexOfNextLatestDueDate, 0, { ...newCard})
                    }
                    setCards(copy)
                } else {
                    setCards(prev => [...prev, newCard])
                }
    
            } else {
                console.log("error adding task")
            }
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
                        className={`resize-none w-full p-2 text-[min(2vh,16px)] font-Barlow rounded-xl text-offblack/75 placeholder-offblack/50 focus:outline-0 border-offblack/75 border-l-8 border-b-8`}
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
                    className={`flex text-lg rounded-full text-center justify-center items-center size-[5vh] min-h-[5vh] p-2 bg-offblack text-white transition-all hover:bg-offblack/50`}
                >
                    
                    <FaPlus />
                </motion.button>
            }
        </>
    )
}

export default AddCard
