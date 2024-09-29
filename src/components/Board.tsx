import { useState } from "react"
import Column from "./Column"
import { DEFAULT_CARDS } from "../util/DummyData"
import { CardType } from "../util/Types"
import DeleteArea from "./DeleteArea"


// https://play.tailwindcss.com/aoOayGLBIX


const Board = () => {
    const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS)

    return (
        <div className="flex flex-wrap justify-center gap-8 p-16 size-full">

            <div className="flex w-full gap-8 h-1/2">
                <Column
                    title="Today"
                    column="today"
                    headingColor="text-offblack"
                    bgColor="bg-red"
                    cards={cards}
                    setCards={setCards}
                    width="w-3/4"
                />
                <div className="flex flex-col items-center justify-center flex-1 gap-8">
                    <div className="flex items-center justify-center w-full bg-black h-1/2 rounded-xl">
                    <p>12:34</p>
                    </div>
                    <div className="flex items-center justify-center w-full bg-black h-1/2 rounded-xl">
                    <p>Trash</p>
                    </div>
                </div>

            </div>
            <div className="flex w-full gap-8 h-1/2">
                <Column
                    title="Upcoming"
                    column="upcoming"
                    headingColor="text-offblack"
                    bgColor="bg-blue"
                    cards={cards}
                    setCards={setCards}
                    width="w-2/5"
                />
            
                <Column
                    title="Optional"
                    column="optional"
                    headingColor="text-offblack"
                    bgColor="bg-yellow"
                    cards={cards}
                    setCards={setCards}
                    width="flex-1"
                />
            </div>
            {/* <DeleteArea setCards={setCards}/> */}
            
        </div>
    )
}

export default Board
