import { useState } from "react"

import { useCards } from "../context/CardContext"
import Card from "./Card"
import DropIndicator from "./DropIndicator"
import AddCard from "./AddCard"
import AddCardDatePickerModal from "./AddCardDatePickerModal"

import { CardType } from "../util/Types"
import { useDemoContext } from "../context/DemoContext"
import { clearIndicatorHighlights, getIndicators, getNearestIndicator, highlightIndicators } from "../util/indicatorFunctions"
import ColumnTitle from "./ColumnTitle"

interface ColumnProps {
    title: string
    headingColor: string
    bgColor: string
    column: 'today' | 'upcoming' | 'optional'
    width: string
}


const Column = ({title, headingColor, bgColor, column, width}: ColumnProps) => {
    const { cards, setCards, updateCardColumn, updateCardTitle, updateCardOrders } = useCards();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [droppingCard, setDroppingCard] = useState<CardType | null>(null);
    const [beforeState, setBeforeState] = useState<string>("-1")
    const {isDemoMode} = useDemoContext()


    const handleDragStart = (e: React.DragEvent, card: CardType) => {
        e.dataTransfer.setData("cardId", card.id)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        highlightIndicators(e, column)
    }

    const handleDragLeave = () => {
        clearIndicatorHighlights(column) 
    }

    const completeDrop = async (cardToTransfer: CardType, before?: string) => {
        let copy = [...cards]
        copy = copy.filter(c => c.id !== cardToTransfer.id)

        const moveToBack = before === "-1"
        let newOrder: number | null;

        if (column === "upcoming") {
            newOrder = null
            const indexOfNextLatestDueDate = copy.findIndex(card => new Date(card.dueDate as Date) > (cardToTransfer.dueDate as Date))
            if (indexOfNextLatestDueDate === -1) {
                copy.push({ ...cardToTransfer, order: newOrder })
            } else {
                copy.splice(indexOfNextLatestDueDate, 0, { ...cardToTransfer, order: newOrder })
            }
            
        } else {
            
            if (moveToBack) {
                newOrder = copy.length > 0 ? Math.max(...copy.map(c => c.order || 0)) + 1 : 0 // place at max index + 1
                copy.push({ ...cardToTransfer, order: newOrder })
                
            } else {
                const insertAtIndex = copy.findIndex(card => card.id === before)
                if (insertAtIndex === undefined) return
                
                newOrder = copy[insertAtIndex].order || 0;
                copy.splice(insertAtIndex, 0, { ...cardToTransfer, order: newOrder })

                // update backend of card list after new insertion 
                for (let i = insertAtIndex + 1; i < copy.length; i++) {
                    
                    copy[i].order = (copy[i - 1].order || 0) + 1;
                }   
                
            }
        }
        
        await updateCardColumn(cardToTransfer.id, column, cardToTransfer.dueDate, newOrder);
        await updateCardOrders(copy.filter(c => c.column === column));
        setCards(() => {
            return copy
        })
        
    }

    const handleDrop = (e: React.DragEvent) => {
        const cardId = e.dataTransfer.getData("cardId")
        clearIndicatorHighlights(column)

        const indicators = getIndicators(column)
        const nearestIndicator = getNearestIndicator(e, indicators).element 
        const before = nearestIndicator.dataset.before || "-1"
        setBeforeState(before)

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
            let res
            if (!isDemoMode) {
                res = await updateCardTitle(id, newTitle)
            } else {
                res = true
            }
            
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
                className={`flex flex-col font-Staat ${width} size-full p-2 rounded-2xl transition-colors border-l-[1.25vh] border-b-[1.25vh] border-t-[.5vh] border-r-[.5vh] border-offblack`}
            >
                <ColumnTitle
                    title={title}
                    headingColor={headingColor}
                    filteredCards={filteredCards}
                />

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
