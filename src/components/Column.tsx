import { useState } from "react"

import { useCards } from "../context/CardContext"
import Card from "./Card"
import DropIndicator from "./DropIndicator"
import AddCard from "./AddCard"
import AddCardDatePickerModal from "./AddCardDatePickerModal"

import { CardType } from "../util/Types"

interface ColumnProps {
    title: string
    headingColor: string
    bgColor: string
    column: 'today' | 'upcoming' | 'optional'
    width: string
}


const Column = ({title, headingColor, bgColor, column, width}: ColumnProps) => {
    // const [active, setActive] = useState<boolean>(false)
    const { cards, setCards, updateCardColumn, updateCardTitle, updateCardOrders } = useCards();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [droppingCard, setDroppingCard] = useState<CardType | null>(null);
    const [beforeState, setBeforeState] = useState<string>("-1")


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

    const completeDrop = async (cardToTransfer: CardType, before?: string) => {
        // console.log(before)
        let copy = [...cards]
        copy = copy.filter(c => c.id !== cardToTransfer.id)
        
        // cardToTransfer = {...cardToTransfer, column}

        const moveToBack = before === "-1"
        let newOrder: number | null;

        if (column === "upcoming") {
            // copy.map(c => console.log( new Date(c.dueDate) < cardToTransfer.dueDate))
            newOrder = null
            const indexOfNextLatestDueDate = copy.findIndex(card => new Date(card.dueDate) > cardToTransfer.dueDate)
            console.log("insert at:", indexOfNextLatestDueDate, indexOfNextLatestDueDate === -1)
            if (indexOfNextLatestDueDate === -1) {
                copy.push({ ...cardToTransfer, order: newOrder })
            } else {
                // copy.map(c => console.log(c.title, copy.indexOf(c)))
                // console.log("_________")
                copy.splice(indexOfNextLatestDueDate, 0, { ...cardToTransfer, order: newOrder })
                // copy.map(c => console.log(c.title, copy.indexOf(c)))
                // console.log("_________")
            }
            
        } else {
            if (moveToBack) {
                newOrder = copy.length > 0 ? Math.max(...copy.map(c => c.order || 0)) + 1 : 0 // place at max index + 1
                copy.push({ ...cardToTransfer, order: newOrder })
            } else {
                const insertAtIndex = copy.findIndex(card => card.id === before)
                if (insertAtIndex === undefined) return
                
                newOrder = copy[insertAtIndex].order || 0;
                // console.log(insertAtIndex, copy[insertAtIndex].order)
                copy.splice(insertAtIndex, 0, { ...cardToTransfer, order: newOrder })


                // update backend of card list after new insertion 
                for (let i = insertAtIndex + 1; i < copy.length; i++) {
                    
                    copy[i].order = (copy[i - 1].order || 0) + 1;
                }   
            }
        }
        
        await updateCardColumn(cardToTransfer.id, column, cardToTransfer.dueDate, newOrder);
        await updateCardOrders(copy.filter(c => c.column === column));
        setCards(copy)
    }

    const handleDrop = (e: React.DragEvent) => {
        const cardId = e.dataTransfer.getData("cardId")
        // setActive(false)
        clearIndicatorHighlights()

        const indicators = getIndicators()
        const nearestIndicator = getNearestIndicator(e, indicators).element 
        const before = nearestIndicator.dataset.before || "-1"
        setBeforeState(before)
        // console.log(nearestIndicator, nearestIndicator.dataset.before)

        if (before !== cardId) {
            let copy = [...cards];
            let cardToTransfer = copy.find(c => c.id === cardId);
            if (!cardToTransfer) return;
            if (column === "today" && cardToTransfer.column !== "today") {
                cardToTransfer.dueDate = new Date()
            }

            if (column === "upcoming" && cardToTransfer.column !== "upcoming") {
                setDroppingCard({...cardToTransfer, column});
                setShowDatePicker(true);
            } else {
                completeDrop({...cardToTransfer, column}, before);
            }
            
        }
    }

    const handleEditCard = async (id: string, newTitle: string):Promise<boolean> => {
        try {
            
            const res = await updateCardTitle(id, newTitle)
            if (res) {
                setCards(prev => {
                    return prev.map(card => (card.id === id ? {...card, title: newTitle} : card))
                })
                return true
            }
        } catch (error) {
            console.log(error)
            return false
        }
        return false
        
    }

    const filteredCards = cards.filter(c => c.column === column)
    const sortedCards = column === 'upcoming' ? filteredCards : filteredCards.sort((a, b) => (a.order as number) - (b.order as number));
    return (
        <>
            <AddCardDatePickerModal
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                droppingCard={droppingCard}
                completeDrop={completeDrop}
                before={beforeState}
            />
            <div 
                onDragOver={handleDragOver} 
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col font-Staat ${width} size-full p-2 rounded-xl transition-colors border-l-[1.25vh] border-b-[1.25vh] border-t-[.5vh] border-r-[.5vh] border-offblack`}
            >
                <div className="flex items-center justify-between mb-[1vh]">
                    <h3 className={`font-bold text-[3vh] tracking-wider  ${headingColor}`}>
                        <span className="text-[4vh]">{title.slice(0,1)}</span>{title.slice(1)}
                    </h3>
                    <span className="flex items-center justify-center p-2 text-[3vh] font-bold text-center rounded-full font-Barlow size-[5vh] bg-offblack">{filteredCards.length}</span>
                </div>
                <div className="py-4 overflow-hidden hover:overflow-y-auto">
                    {sortedCards.map(c => {
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
                <AddCard column={column} cards={cards} setCards={setCards}/>
            </div>
        </>
    )
}

export default Column
