import React, { useState } from "react"
import { CardType } from "../util/Types"
import Card from "./Card"

interface ColumnProps {
    title: string
    headingColor: string
    column: string
    cards: CardType[]
    setCards: React.Dispatch<React.SetStateAction<CardType[]>>
}


const Column = ({title, headingColor, column, cards, setCards}: ColumnProps) => {
    const [active, setActive] = useState<boolean>(!false)

    const filteredCards = cards.filter(c => c.column === column)

    return (
        <div className="w-56 shrink-0">
            <div className="flex items-center justify-between mb-3">
                <h3 className={`font-medium ${headingColor}`}>
                    {title}
                </h3>
                <span className="text-sm rounded text-neutral-400">{filteredCards.length}</span>
            </div>
            <div className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
                {filteredCards.map(c => {
                    return <Card key={c.id} {...c}/>
                })}
            </div>
        </div>
    )
}

export default Column
