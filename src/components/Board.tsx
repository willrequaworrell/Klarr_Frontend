import { useState } from "react"
import Column from "./Column"
import { DEFAULT_CARDS } from "../util/DummyData"
import { CardType } from "../util/Types"
import DeleteArea from "./DeleteArea"


// https://play.tailwindcss.com/aoOayGLBIX


const Board = () => {
    const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS)

    return (
        <div className="flex w-full h-full gap-3 p-12 overflow-scroll">
            <Column
                title="Today"
                column="today"
                headingColor="text-offblack"
                bgColor="bg-red"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="Upcoming"
                column="upcoming"
                headingColor="text-offblack"
                bgColor="bg-blue"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="Optional"
                column="optional"
                headingColor="text-offblack"
                bgColor="bg-yellow"
                cards={cards}
                setCards={setCards}
            />
            <DeleteArea setCards={setCards}/>
            
        </div>
    )
}

export default Board
