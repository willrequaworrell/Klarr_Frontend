import { CardType } from "../util/Types"
import Card from "./Card"
import DropIndicator from "./DropIndicator"
import AddCard from "./AddCard"
import axios from "axios"
import { useState } from "react"
import { Modal } from "@mui/material"
import CustomDatePicker from "./CustomDatePicker"
import DatePickerModal from "./DatePickerModal"

interface ColumnProps {
    title: string
    headingColor: string
    bgColor: string
    column: 'today' | 'upcoming' | 'optional'
    cards: CardType[]
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>
    width: string
}


const Column = ({title, headingColor, bgColor, column, cards, setCards, width}: ColumnProps) => {
    // const [active, setActive] = useState<boolean>(false)
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [droppingCard, setDroppingCard] = useState<CardType | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [before, setBefore] = useState<string>("-1")

    const updateCardColumn = async (id: string, newColumn: 'today' | 'upcoming' | 'optional' ) => {
        try {
            const res = await axios.patch(`https://staatlidobackend.onrender.com/api/tasks/${id}`, {column: newColumn })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const updateCardTitle = async (id: string, newTitle: string) => {
        try {
            const res = await axios.patch(`https://staatlidobackend.onrender.com/api/tasks/${id}`, {title: newTitle })
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`)) as HTMLElement[]
    }

    const getNearestIndicator = (e: React.DragEvent, indicators: HTMLElement[]) => {
        const DISTANCE_OFFSET = 50

        const nearest = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect()
                const offset = e.clientY - (box.top + DISTANCE_OFFSET)

                if (offset < 0 && offset > closest.offset) {
                    return {offset: offset, element: child}
                } else {
                    return closest
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1]
            }
        )

        return nearest
    }
    const clearIndicatorHighlights = (indicatorList?: HTMLElement[]) => {
        const indicators = indicatorList || getIndicators()

        indicators.forEach( i => {
            i.style.opacity = "0"
        })
    }

    const highlightIndicators = (e: React.DragEvent) => {
        const indicators = getIndicators()
        clearIndicatorHighlights(indicators)
        const nearestIndicator = getNearestIndicator(e, indicators)
        nearestIndicator.element.style.opacity = "1"
    }


    const handleDragStart = (e: React.DragEvent, card: CardType) => {
        e.dataTransfer.setData("cardId", card.id)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        highlightIndicators(e)
        // setActive(true)
    }

    const handleDragLeave = () => {
        // setActive(false)
        clearIndicatorHighlights() 
    }

    const completeDrop = (cardToTransfer: CardType, before: string) => {
        console.log(cardToTransfer)
        let copy = [...cards]
        copy = copy.filter(c => c.id !== cardToTransfer.id)

        // cardToTransfer = {...cardToTransfer, column}

        const moveToBack = before === "-1"
        if (moveToBack) {
            copy.push(cardToTransfer)
        } else {
            const insertAtIndex = copy.findIndex(card => card.id === before)
            if (insertAtIndex === undefined) return

            copy.splice(insertAtIndex, 0, cardToTransfer)
        }
        console.log(copy)
        
        updateCardColumn(cardToTransfer.id, column);
        setCards(copy)
    }

    const handleDrop = (e: React.DragEvent) => {
        const cardId = e.dataTransfer.getData("cardId")
        // setActive(false)
        clearIndicatorHighlights()

        const indicators = getIndicators()
        const nearestIndicator = getNearestIndicator(e, indicators).element 
        // const before = nearestIndicator.dataset.before || "-1"
        setBefore(nearestIndicator.dataset.before || "-1")

        if (before !== cardId) {
            let copy = [...cards];
            let cardToTransfer = copy.find(c => c.id === cardId);
            if (!cardToTransfer) return;

            if (column === "upcoming") {
                setDroppingCard({...cardToTransfer, column});
                setShowDatePicker(true);
            } else {
                completeDrop({...cardToTransfer, column}, before);
            }
            
        }
    }

    const handleEditCard = async (id: string, newTitle: string) => {
        try {
            console.log(id, newTitle)
            const res = await updateCardTitle(id, newTitle)
            if (res) {
                setCards(prev => {
                    return prev.map(card => (card.id === id ? {...card, title: newTitle} : card))
                })
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const filteredCards = cards.filter(c => c.column === column)
    return (
        <>
            <DatePickerModal
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                droppingCard={droppingCard}
                completeDrop={completeDrop}
                before={before}
            />
            <div 
                onDragOver={handleDragOver} 
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col font-Staat ${width} size-full p-2 rounded-xl transition-colors border-l-8 border-b-8 border-t-4 border-r-4 border-offblack`}
            >
                <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-bold text-2xl  ${headingColor}`}>
                        <span className="text-4xl">{title.slice(0,1)}</span>{title.slice(1)}
                    </h3>
                    <span className="flex items-center justify-center p-2 text-2xl font-bold text-center rounded-full size-10 bg-offblack">{filteredCards.length}</span>
                </div>
                <div className="py-4 overflow-hidden hover:overflow-y-auto">
                    {filteredCards.map(c => {
                        return (
                            <Card 
                                key={c.id} 
                                {...c}
                                handleDragStart={handleDragStart}
                                bgColor={bgColor}
                                onEdit={handleEditCard}
                            />
                        )
                    })}

                </div>
                <DropIndicator beforeId={"-1"} column={column}/>
                <AddCard column={column} setCards={setCards}/>
                {showDatePicker && <p>Pick Date!</p>}
            </div>
        </>
    )
}

export default Column
