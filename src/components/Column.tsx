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
    // const [active, setActive] = useState<boolean>(false)

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

    const handleDrop = (e: React.DragEvent) => {
        const cardId = e.dataTransfer.getData("cardId")
        // setActive(false)
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

    const handleEditCard = (id: string, newTitle: string) => {
        setCards(prev => {
            return prev.map(card => (card.id === id ? {...card, title: newTitle} : card))
        })
    }


    const filteredCards = cards.filter(c => c.column === column)
    return (

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
        </div>
    )
}

export default Column
