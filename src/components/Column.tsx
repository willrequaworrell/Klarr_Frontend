import React, { useState } from "react"
import { CardType } from "../util/Types"
import Card from "./Card"
import DropIndicator from "./DropIndicator"
import AddCard from "./AddCard"

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
    const [active, setActive] = useState<boolean>(false)

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
        setActive(true)
    }

    const handleDragLeave = () => {
        setActive(false)
        clearIndicatorHighlights() 
    }

    const handleDrop = (e: React.DragEvent) => {
        const cardId = e.dataTransfer.getData("cardId")
        setActive(false)
        clearIndicatorHighlights()

        const indicators = getIndicators()
        const nearestIndicator = getNearestIndicator(e, indicators).element 
        const before = nearestIndicator.dataset.before || "-1"

        if (before !== cardId) {
            let copy = [...cards]

            let cardToTransfer = copy.find(c => c.id === cardId)
            if (!cardToTransfer) return

            cardToTransfer = {...cardToTransfer, column}

            copy = copy.filter(c => c.id !== cardId)

            const moveToBack = before === "-1"
            if (moveToBack) {
                copy.push(cardToTransfer)
            } else {
                const insertAtIndex = copy.findIndex(card => card.id === before)
                if (insertAtIndex === undefined) return

                copy.splice(insertAtIndex, 0, cardToTransfer)
            }

            setCards(copy)
        }
    }

    
    const filteredCards = cards.filter(c => c.column === column)
    return (
        <div className={`${width} shrink-0 h-full flex-col rounded-xl bg-red-400`}>
            <div className="flex items-center justify-between mb-3">
                <h3 className={`font-medium ${headingColor}`}>
                    {title}
                </h3>
                <span className="text-sm rounded text-neutral-400">{filteredCards.length}</span>
            </div>
            <div 
                onDragOver={handleDragOver} 
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={` w-full p-2 rounded-xl transition-colors ${active ? "bg-neutral-500/20" : bgColor}`}
            >
                    {filteredCards.map(c => {
                        return (
                            <Card 
                                key={c.id} 
                                {...c}
                                handleDragStart={handleDragStart}
                            />
                        )
                    })}
                    <DropIndicator beforeId={"-1"} column={column}/>
                    <AddCard column={column} setCards={setCards}/>
            </div>
        </div>
    )
}

export default Column
