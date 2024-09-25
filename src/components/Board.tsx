import { useState } from "react"
import Column from "./Column"
import { DEFAULT_CARDS } from "../util/DummyData"
import { CardType } from "../util/Types"



const Board = () => {
    const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS)

    return (
        <div className="flex w-full h-full gap-3 p-12 overflow-scroll">
            <Column
                title="Today"
                column="today"
                headingColor="text-red-200"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="Upcoming"
                column="upcoming"
                headingColor="text-emerald-200"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="Optional"
                column="optional"
                headingColor="text-yellow-200"
                cards={cards}
                setCards={setCards}
            />
            
        </div>
    )
}

export default Board
